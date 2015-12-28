<?php

namespace Pagekit\Contract;

use Pagekit\Application as App;
use Pagekit\Module\Module;
use Pagekit\Contract\Model\Role;
use Pagekit\Contract\Model\Contract;

class ContractModule extends Module
{
    protected $perms = [];

    /**
     * {@inheritdoc}
     */
    public function main(App $app)
    {
        $app['contract'] = function ($app) {

            if (!$contract = $app['auth']->getUser()) {
                $contract = Contract::create(['roles' => [Role::ROLE_ANONYMOUS]]);
            }

            return $contract;
        };
    }

    /**
     * @return array
     */
    public function getPermissions()
    {
        if (!$this->perms) {

            foreach (App::module() as $module) {
                if ($perms = $module->get('permissions')) {
                    $this->registerPermissions($module->get('name'), $perms);
                }
            }

            App::trigger('contract.permission', [$this]);
        }

        return $this->perms;
    }

    /**
     * Register permissions.
     *
     * @param string $extension
     * @param array  $permissions
     */
    public function registerPermissions($extension, array $permissions = [])
    {
        $this->perms[$extension] = $permissions;
    }
}
