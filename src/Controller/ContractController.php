<?php

namespace Pagekit\Contract\Controller;

use Pagekit\Application as App;
use Pagekit\Contract\Model\Contract;
use Pagekit\Contract\Model\Role;

/**
 * @Access(admin=true)
 */
class ContractController
{
    /**
     * @Access("contract: manage contracts")
     * @Request({"filter": "array", "page":"int"})
     */
    public function indexAction($filter = null, $page = 0)
    {

        return [
            '$view' => [
                'title' => __('Contracts'),
                'name' => 'contract:views/admin/index.php'
            ],
            '$data' => [
                'statuses' => Contract::getStatuses(),
                'config' => [

                    'filter' => $filter,
                    'page' => $page
                ]
            ]
        ];

    }

    public function accountsAction(){
        return "partner View";
    }

    public function companiesAction(){
        return "companies  View";
    }

    public function versionsAction()
    {
        return "versions View";
    }

    public function statusesAction()
    {
        return "status View";
    }

    public function commentsAction()
    {
        return "comments View";
    }

    public function settingsAction()
    {
        return [
            '$view' => [
                'title' => __('Settings'),
                'name' => 'contract:views/admin/settings.php'
            ],

        ];

    }

    /**
     * @Route("/edit", name="edit")
     * @Access("contract: manage own contracs || contract: manage all contracts")
     * @Request({"id": "int"})
     */
    public function editAction($id = 0)
    {

        try {

                if (!$contract = Contract::where(compact('id'))->related('user')->first()) {

                if ($id) {
                    App::abort(404, __('Invalid post id.'));
                }

                $contract = Contract::create([
                    'user_id' => App::user()->id,
                    'status' => Contract::STATUS_DRAFT,
                    'date' => new \DateTime()
                ]);

            }

            $user = App::user();
            if(!$user->hasAccess('contract: manage all contracts') && $contract->user_id !== $user->id) {
                App::abort(403, __('Insufficient User Rights.'));
            }


            return [
                '$view' => [
                    'title' => $id ? __('Edit Contract') : __('Add Contract'),
                    'name'  => 'contract:views/admin/contract-edit.php'
                ],
                '$data' => [
                    'contract'     => $contract,
                    'statuses' => Contract::getStatuses(),
                    'roles'    => array_values(Role::findAll()),
                    'canEditAll' => $user->hasAccess('contract: manage all contracts'),
                ],
                'contract' => $contract
            ];

        } catch (\Exception $e) {

            App::message()->error($e->getMessage());

            return App::redirect('@contract/admin');
        }
    }
}
