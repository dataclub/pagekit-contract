<?php

use Pagekit\Contract\Event\RouteListener;
/*
 * This array is the module definition.
 * It's used by Pagekit to load your extension and register all things
 * that your extension provides (routes, menu items, php classes etc)
 */
return [

    /*
     * Define a unique name.
     */
    'name' => 'contract',

    /*
     * Define the type of this module.
     * Has to be 'extension' here. Can be 'theme' for a theme.
     */
    'type' => 'extension',


    /*
     * Register all namespaces to be loaded.
     * Map from namespace to folder where the classes are located.
     * Remember to escape backslashes with a second backslash.
     */
    'autoload' => [

        'Pagekit\\Contract\\' => 'src'

    ],


    'resources' => [
        'views:contract' => 'views'
    ],


    /*
     * Define routes.
     */
    'routes' => [

        '/contract' => [
            'name' => '@contract',
            'controller' => [
                'Pagekit\\Contract\\Controller\\ContractController'
            ]
        ],
        '/contract/accounts' => [
            'name' => '@contract/accounts',
            'controller' => [
                'Pagekit\\Contract\\Controller\\AccountsController'
            ]
        ],
        '/api/contract' => [
            'name' => '@contract/api',
            'controller' => [
                'Pagekit\\Contract\\Controller\\ContractApiController'
            ]
        ],
        '/api/contract/accounts' => [
            'name' => '@contract/api/accounts',
            'controller' => [
                'Pagekit\\Contract\\Controller\\AccountsApiController'
            ]
        ],
    ],
    'main' => 'Pagekit\\Contract\\ContractModule',

    /*
     * Define menu items for the backend.
     */
    'menu' => [

        'contract' => [
            'label' => 'Contract',
            'icon' => 'contract:contract.svg',
            'url' => '@contract',
            'active' => '@contract*',
            'access' => 'contract: manage own contracts || contract: manage all contracts || contract: manage contract comments || system: manage settings',
            'priority' => 110
        ],

        'contract: panel' => [

            // Parent menu item, makes this appear on 2nd level
            'parent' => 'contract',

            // See above
            'label' => 'Contracts',
            'icon' => 'contract:contract.svg',
            'url' => '@contract'
            // 'access' => 'contract: manage contract'
        ],

        'contract: accounts' => [
            'parent' => 'contract',
            'label' => 'Accounts',
            'url' => '@contract/accounts',
            'icon' => 'contract:contract.svg',
        ],
        'contract: companies' => [
            'parent' => 'contract',
            'label' => 'Companies',
            'url' => '@contract/admin/companies'
        ],

        'contract: comments' => [
            'parent' => 'contract',
            'label' => 'Comments',
            'url' => '@contract/admin/comments'
        ],


        'contract: settings' => [
            'parent' => 'contract',
            'label' => 'Settings',
            'url' => '@contract/admin/settings',
            'access' => 'system: manage settings'
        ],

    ],

    /*
     * Define permissions.
     * Will be listed in backend and can then be assigned to certain roles.
     */
    'permissions' => [

        // Unique name.
        // Convention: extension name and speaking name of this permission (spaces allowed)
        'contract: manage contract'  => [
            'title' => 'Manage contract'
        ],
        'contract: manage settings' => [
            'title' => 'Manage contract-settings'
        ],
        'contract: manage all contracts' => [
            'title' => 'Manage all contract-posts',
            'description' => 'Create, edit, delete and publish posts by all users'
        ],
        'contract: manage own contracts' => [
            'title' => 'Manage own contract-posts',
            'description' => 'Create, edit, delete and publish own posts'
        ],
        'contract: manage contract comments' => [
            'title' => 'Manage contract contract-comments',
            'description' => 'Create, edit, delete and publish contract comments'
        ],


        'accounts: manage account'  => [
            'title' => 'Manage account'
        ],
        'accounts: manage all accounts' => [
            'title' => 'Manage all account-posts',
            'description' => 'Create, edit, delete and publish posts by all users'
        ],
        'accounts: manage own accounts' => [
            'title' => 'Manage own account-posts',
            'description' => 'Create, edit, delete and publish own posts'
        ],

    ],

    /*
     * Link to a settings screen from the extensions listing.
     */
    'settings' => '@contract/settings',

    /*
     * Default module configuration.
     * Can be overwritten by changed config during runtime.
     */
    'config' => [
        'default' => 'World',
        'registration' => 'admin',
        'require_verification' => true,
        'contracts_per_page' => 20,
        'accounts_per_page' => 20,

        'auth' => [
            'refresh_token' => false
        ]

    ],


    /*
     * Listen to events.
     */
    'events' => [
        'boot' => function ($event, $app) {
            $app->subscribe(

                new RouteListener()
            );
        },

        'view.styles' => function ($event, $styles) {
            $styles->register('contract-settings', 'blog:app/assets/css/contract.css');
        },
        'view.scripts' => function ($event, $scripts) {
               //$scripts->register('contract-settings', 'contract:app/bundle/contract-settings.js', '~panel-link');

        }

    ],

];
