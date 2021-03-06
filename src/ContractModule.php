<?php

namespace Pagekit\Contract;

use Pagekit\Application as App;
use Pagekit\Module\Module;
use Pagekit\Contract\Model\Contract;

class ContractModule extends Module
{

    /**
     * {@inheritdoc}
     */
    public function main(App $app)
    {
        $app['contract'] = function ($app) {

            if (!$contract = $app['auth']->getUser()) {
                $contract = Contract::create();
            }

            return $contract;
        };
    }

}
