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
                'name' => 'contract/admin/edit.php'
            ],
            '$data' => [
                'contract' => $contract,
                'statuses' => Contract::getStatuses(),
                'multipleVisits' => Contract::getMultipleVisits(),
                'participations' => Contract::getParticipations(),
                'config' => [
                    //'currentUser' => App::Contract()->id
                ],
            ],
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


}
