<?php

namespace Pagekit\Contract\Controller;

use Pagekit\Application as App;
use Pagekit\Contract\Model\Contract;
use Pagekit\Contract\Model\Status;

/**
 * @Access(admin=true)
 */
class AccountsController
{
    /**
     * @Access("contract: manage contracts")
     * @Request({"filter": "array", "page":"int"})
     */
    public function indexAction($filter = null, $page = 0)
    {

        return [
            '$view' => [
                'title' => __('Accounts'),
                'name' => 'contract:views/admin/accounts-index.php'
            ],
            '$data' => [
                'config' => [
                    'filter' => $filter,
                    'page' => $page
                ]
            ]
        ];

    }

    /**
     * @Route("/edit", name="edit")
     * @Access("contract: manage own contracs || contract: manage all contracts")
     * @Request({"id": "int"})
     */
    public function editAction($id = 0)
    {

        if (!$id) {

            $contract = Contract::create();

        } else if (!$contract = Contract::find($id)) {
            App::abort(404, 'Contract not found.');
        }

        return [
            '$view' => [
                'title' => $id ? __('Edit Contract') : __('Add Contract'),
                'name' => 'contract/admin/contract-edit.php'
            ],
            '$data' => [
                'contract' => $contract,
                'statuses' => Status::getStatuses(),
                'multipleVisits' => Contract::getMultipleVisits(),
                'participations' => Contract::getParticipations(),
                'config' => [
                    //'currentUser' => App::Contract()->id
                ],
            ],
        ];
    }

    public function accountsIndexAction(){
        return "partner View";
    }

    public function companiesAction(){
        return "companies  View";
    }

    /**
     * @Access("contract: manage contracts")
     * @Request({"filter": "array", "page":"int"})
     */
    public function versionsAction()
    {
        return [
            '$view' => [
                'title' => __('Contracts'),
                'name' => 'contract:views/admin/contract-index.php'
            ],
            '$data' => [
                'statuses' => Status::getStatuses(),
                'authors'  => Contract::getAuthors(),
                'multipleVisits' => Contract::getMultipleVisits(),
                'participations' => Contract::getParticipations(),
                'config' => [
                    'filter' => $filter,
                    'page' => $page
                ]
            ]
        ];
    }

    public function statusesAction()
    {
        return [
            '$view' => [
                'title' => __('Contracts'),
                'name' => 'contract:views/admin/contract-status.php'
            ],
            '$data' => [
                'statuses' => Status::getStatuses(),
                'authors'  => Contract::getAuthors(),
                'multipleVisits' => Contract::getMultipleVisits(),
                'participations' => Contract::getParticipations(),
                'config' => [
                    'filter' => $filter,
                    'page' => $page
                ]
            ]
        ];
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


}
