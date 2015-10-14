<?php

namespace Pagekit\Contract\Controller;

use Pagekit\Application as App;
use Pagekit\Application\Exception;
use Pagekit\Contract\Model\Role;
use Pagekit\Contract\Model\Contract;

/**
 * @Access("contract: manage contracts")
 */
class ContractApiController
{
    /**
     * @Route("/", methods="GET")
     * @Request({"filter": "array", "page":"int", "limit":"int"})
     */
    public function indexAction($filter = [], $page = 0, $limit = 0)
    {
        $query  = Contract::query();
        $filter = array_merge(array_fill_keys(['status', 'search', 'role', 'order', 'access'], ''), $filter);
        extract($filter, EXTR_SKIP);

        if (is_numeric($status)) {

            $query->where(['status' => (int) $status]);

            if ($status) {
                $query->where('access IS NOT NULL');
            }

        } elseif ('new' == $status) {
            $query->where(['status' => Contract::STATUS_ACTIVE, 'access IS NULL']);
        }

        if ($role) {
            $query->whereInSet('roles', $role);
        }

        if ($access) {
            $query->where('access > ?', [date('Y-m-d H:i:s', time() - max(0, (int) $access))]);
        }

        if (!preg_match('/^(date|name|place|startDate|cancellationDate)\s(asc|desc)$/i', $order, $order)) {
            $order = [1 => 'date', 2 => 'asc'];
        }

        $default = App::module('contract')->config('contracts_per_page');
        $limit   = min(max(0, $limit), $default) ?: $default;
        $count   = $query->count();
        $pages   = ceil($count / $limit);
        $page    = max(0, min($pages - 1, $page));
        $contracts  = array_values($query->offset($page * $limit)->limit($limit)->orderBy($order[1], $order[2])->get());

        return compact('contracts', 'pages', 'count');
    }

    /**
     * @Request({"filter": "array"})
     */
    public function countAction($filter = [])
    {
        $query  = Contract::query();
        $filter = array_merge(array_fill_keys(['status', 'search', 'role', 'order', 'access'], ''), (array)$filter);
        extract($filter, EXTR_SKIP);

        if (is_numeric($status)) {

            $query->where(['status' => (int) $status]);

            if ($status) {
                $query->where('access IS NOT NULL');
            }

        } elseif ('new' == $status) {
            $query->where(['status' => Contract::STATUS_ACTIVE, 'access IS NULL']);
        }

        if ($role) {
            $query->whereInSet('roles', $role);
        }

        if ($access) {
            $query->where('access > ?', [date('Y-m-d H:i:s', time() - max(0, (int) $access))]);
        }

        $count = $query->count();

        return compact('count');
    }

    /**
     * @Route("/{id}", methods="GET", requirements={"id"="\d+"})
     */
    public function getAction($id)
    {
        if (!$contract = Contract::find($id)) {
            App::abort(404, 'Contract not found.');
        }

        return $contract;
    }

    /**
     * @Route("/", methods="POST")
     * @Route("/{id}", methods="POST", requirements={"id"="\d+"})
     * @Request({"contract": "array", "password", "id": "int"}, csrf=true)
     */
    public function saveAction($data, $password = null, $id = 0)
    {
        try {

            // is new ?
            if (!$contract = Contract::find($id)) {

                if ($id) {
                    App::abort(404, __('Contract not found.'));
                }

                $contract = Contract::create(['date' => new \DateTime]);
            }

            $contract->name = @$data['name'];
            $contract->date = @$data['date'];
            $contract->place = @$data['place'];
            $contract->startDate = @$data['startDate'];
            $contract->cancellationDate = @$data['cancellationDate'];


            $self = App::contract()->id == $contract->id;
            if ($self && @$data['status'] == Contract::STATUS_BLOCKED) {
                App::abort(400, __('Unable to block yourself.'));
            }

            if (@$data['date'] != $contract->date) {
                $contract->set('verified', false);
            }

            $key    = array_search(Role::ROLE_ADMINISTRATOR, @$data['roles'] ?: []);
            $add    = false !== $key && !$contract->isAdministrator();
            $remove = false === $key && $contract->isAdministrator();

            if (($self && $remove) || !App::contract()->isAdministrator() && ($remove || $add)) {
                App::abort(403, 'Cannot add/remove Admin Role.');
            }

            unset($data['access'], $data['login'], $data['date']);

            $contract->validate();
            $contract->save($data);

            return ['message' => 'success', 'contract' => $contract];

        } catch (Exception $e) {
            App::abort(400, $e->getMessage());
        }
    }

    /**
     * @Route("/{id}", methods="DELETE", requirements={"id"="\d+"})
     * @Request({"id": "int"}, csrf=true)
     */
    public function deleteAction($id)
    {
        if (App::contract()->id == $id) {
            App::abort(400, __('Unable to delete yourself.'));
        }

        if ($contract = Contract::find($id)) {
            $contract->delete();
        }

        return ['message' => 'success'];
    }

    /**
     * @Route("/bulk", methods="POST")
     * @Request({"contracts": "array"}, csrf=true)
     */
    public function bulkSaveAction($contracts = [])
    {
        foreach ($contracts as $data) {
            $this->saveAction($data, null, isset($data['id']) ? $data['id'] : 0);
        }

        return ['message' => 'success'];
    }

    /**
     * @Route("/bulk", methods="DELETE")
     * @Request({"ids": "array"}, csrf=true)
     */
    public function bulkDeleteAction($ids = [])
    {
        foreach (array_filter($ids) as $id) {
            $this->deleteAction($id);
        }

        return ['message' => 'success'];
    }
}
