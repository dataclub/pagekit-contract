<?php

namespace Pagekit\Contract\Controller;

use Pagekit\Application as App;
use Pagekit\Application\Exception;
use Pagekit\Contract\Model\Status;
use Pagekit\Contract\Model\Version;
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
        $filter = array_merge(array_fill_keys(['status', 'search', 'author', 'limit'], ''), $filter);

        extract($filter, EXTR_SKIP);

        if ($author) {
            $query->where(function ($query) use ($author) {
                $query->orWhere(['user_id' => (int) $author]);
            });
        }

        $query->where(function ($query) use ($search) {
            $query->orWhere(['place LIKE :search', 'name LIKE :search'], ['search' => "%{$search}%"]);
        });


        if (is_numeric($status_id)) {

            $query->where(['status_id' => (int) $status_id]);

            if ($status_id) {
                $query->where('date IS NOT NULL');
            }
        }

        if (is_numeric($version_id)) {

            $query->where(['version_id' => (int) $version_id]);

            if ($version_id) {
                $query->where('date IS NOT NULL');
            }
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
        $contracts  = array_values($query->offset($page * $limit)->related('user', 'status', 'version')->limit($limit)->orderBy($order[1], $order[2])->get());

        return compact('contracts', 'pages', 'count');
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
            $contract->participated = @$data['participated'];
            $contract->visitedMultiple = @$data['visitedMultiple'];
            $contract->status_id = @$data['status_id'];
            $contract->version_id = @$data['version_id'];


            // user without universal access can only edit their own posts
            if(!App::user()->hasAccess('contract') && $contract->user_id !== App::user()->id) {
                return ['error' => __('Access denied.')];
            }

            // user without universal access is not allowed to assign posts to other users
            if(App::user()->hasAccess('contract: manage all contracts')) {
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
     * @Route("/status", methods="POST")
     * @Request({"contract": "array", "id": "int", "status": "string"}, csrf=true)
     */
    public function statusSaveAction($data, $id = 0, $status = null)
    {
        try {
            if (!$contract = Contract::find($id)) {
                if ($id) {
                    App::abort(404, __('Contract not found.'));
                }
            }

            // user without universal access can only edit their own posts
            if(!App::user()->hasAccess('contract') && $contract->user_id !== App::user()->id) {
                return ['error' => __('Access denied.')];
            }

            if($status != null){
                $statusID = Status::setStatus($status);
                if($statusID){
                    $data['status_id'] = $statusID;
                }
            }

            $contract->name = @$data['name'];
            $contract->place = @$data['place'];
            $contract->participated = @$data['participated'];
            $contract->visitedMultiple = @$data['visitedMultiple'];
            $contract->status_id = @$data['status_id'];
            $contract->version_id = @$data['version_id'];

            return [
                'message' => 'success',
                'contract' => $contract,
                'statuses' => Status::getStatuses()
            ];

        } catch (Exception $e) {
            App::abort(400, $e->getMessage());
        }
    }

    /**
     * @Route("/version", methods="POST")
     * @Request({"contract": "array", "id": "int", "version": "string"}, csrf=true)
     */
    public function versionSaveAction($data, $id = 0, $version = null)
    {
        try {
            if (!$contract = Contract::find($id)) {
                if ($id) {
                    App::abort(404, __('Contract not found.'));
                }
            }

            // user without universal access can only edit their own posts
            if(!App::user()->hasAccess('contract') && $contract->user_id !== App::user()->id) {
                return ['error' => __('Access denied.')];
            }

            if($version != null){
                $versionID = Version::setVersion($version);
                if($versionID){
                    $data['version_id'] = $versionID;
                }
            }

            $contract->name = @$data['name'];
            $contract->place = @$data['place'];
            $contract->participated = @$data['participated'];
            $contract->visitedMultiple = @$data['visitedMultiple'];
            $contract->status_id = @$data['status_id'];
            $contract->version_id = @$data['version_id'];

            return [
                'message' => 'success',
                'contract' => $contract,
                'versions' => Version::getVersions()
            ];

        } catch (Exception $e) {
            App::abort(400, $e->getMessage());
        }
    }

    /**
     * @Route("/random", methods="POST")
     * @Request({"contract": "array", "id": "int"}, csrf=true)
     */
    public function getRandomAction($data, $id = 0)
    {
        try {
            if (!$contract = Contract::find($id)) {

                if ($id) {
                    App::abort(404, __('Contract not found.'));
                }

                $data['date'] = new \DateTime;
                $data['status_id'] = Status::getFirstStatus();
                $data['version_id'] = Version::getFirstVersion();
                $contract = Contract::create(['date' => $data['date'], 'status_id' => $data['status_id'], 'version_id' => $data['version_id']]);
            }else{
                $contract->status_id = @$data['status_id'];
                $contract->version_id = @$data['version_id'];
            }

            // user without universal access can only edit their own posts
            if(!App::user()->hasAccess('contract') && $contract->user_id !== App::user()->id) {
                return ['error' => __('Access denied.')];
            }

            $sqlUID = Contract::getRandomSQLID();
            $uid = Contract::getRandomID();
            $contract->name = $sqlUID == null ? $uid : $sqlUID;
            $contract->place = @$data['place'];
            $contract->participated = @$data['participated'];
            $contract->visitedMultiple = @$data['visitedMultiple'];


            return [
                'message' => 'success',
                'contract' => $contract,
            ];

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
