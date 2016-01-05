<?php

namespace Pagekit\Contract\Controller;

use Pagekit\Application as App;
use Pagekit\Contract\Model\Contract;
use Pagekit\Contract\Model\Status;
use Pagekit\Contract\Model\Version;
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
                'name' => 'contract:views/admin/contract-index.php'
            ],
            '$data' => [
                'statuses' => Status::getStatuses(),
                'versions' => Version::getVersions(),
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
            $contract = Contract::create(['date' => new \DateTime(), 'status_id' => Status::getFirstStatus(), 'version_id' => Version::getFirstVersion()]);
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
                'versions' => Version::getVersions(),
                'multipleVisits' => Contract::getMultipleVisits(),
                'participations' => Contract::getParticipations(),
                'config' => [],
            ],
        ];
    }

    public function companiesAction(){
        return "companies  View";
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
