<?php

namespace Pagekit\Contract\Controller;

use Pagekit\Application as App;
use Pagekit\Application\Exception;
use Pagekit\User\Model\User;
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
        $filter = array_merge(array_fill_keys(['status', 'search', 'order'], ''), $filter);
        extract($filter, EXTR_SKIP);

        $author = false;
        if(!App::user()->hasAccess('contract: manage all contracts')) {
            $author = App::user()->id;
        }

        if ($author) {
            $query->where(function ($query) use ($author) {
                $query->orWhere(['user_id' => (int) $author]);
            });
        }

        $query->where(function ($query) use ($search) {
            $query->orWhere(['place LIKE :search', 'name LIKE :search'], ['search' => "%{$search}%"]);
        });


        if (is_numeric($status)) {

            $query->where(['status' => (int) $status]);

            if ($status) {
                $query->where('date IS NOT NULL');
            }

        } elseif ('new' == $status) {
            $query->where(['status' => User::STATUS_ACTIVE]);
        }

        if (is_numeric($participated)) {
            $query->where(['participated' => (int) $participated]);

        }

        if (is_numeric($visitedMultiple)) {
            $query->where(['visitedMultiple' => (int) $visitedMultiple]);
        }


        if (preg_match('/^(date|name|place|startDate|cancellationDate)\s(asc|desc)$/i', $order, $match)) {
            $order = $match;
        } else {
            $order = [1=>'date', 2=>'asc'];
        }


        $default = App::module('contract')->config('contracts_per_page');
        $limit   = min(max(0, $limit), $default) ?: $default;
        $count   = $query->count();
        $pages   = ceil($count / $limit);
        $page    = max(0, min($pages - 1, $page));
        $contracts  = array_values($query->offset($page * $limit)->related('user')->limit($limit)->orderBy($order[1], $order[2])->get());

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
     * @Request({"contract": "array", "id": "int"}, csrf=true)
     */
    public function saveAction($data, $id = 0)
    {
        try {

            // is new ?
            if (!$contract = Contract::find($id)) {

                if ($id) {
                    App::abort(404, __('Contract not found.'));
                }

                $data['date'] = new \DateTime;
                $contract = Contract::create(['date' => $data['date']]);

            }

            $contract->name = @$data['name'];
            $contract->place = @$data['place'];

            $self = App::contract()->id == $contract->id;
            if ($self && @$data['status'] == Contract::STATUS_BLOCKED) {
                App::abort(400, __('Unable to block yourself.'));
            }

            // user without universal access can only edit their own posts
            if(!App::user()->hasAccess('contract') && $contract->user_id !== App::user()->id) {
                return ['error' => __('Access denied.')];
            }

            // user without universal access is not allowed to assign posts to other users
            if(App::user()->hasAccess('contract: manage all posts')) {
                $data['user_id'] = App::user()->id;
            }

            if($contract->validate()){
                $contract->save($data);
            }


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
