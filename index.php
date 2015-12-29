<?php

use Pagekit\Application;

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
     * Main entry point. Called when your extension is both installed and activated.
     * Either assign an closure or a string that points to a PHP class.
     * Example: 'main' => 'Pagekit\\Contract\\ContractExtension'
     */
    'main' => function (Application $app) {

        // bootstrap code

    },
    'main' => 'Pagekit\\Contract\\ContractModule',

    /*
     * Register all namespaces to be loaded.
     * Map from namespace to folder where the classes are located.
     * Remember to escape backslashes with a second backslash.
     */
    'autoload' => [

        'Pagekit\\Contract\\' => 'src'

    ],

    /*
    'resources' => [
        'views:contract' => 'views'
    ],

    */

    /*
     * Define routes.
     */
    'routes' => [

        '/contract' => [
            'name' => '@contract/admin',
            'controller' => [
                'Pagekit\\Contract\\Controller\\ContractController'
            ]
        ],
        '/contract: contract' => [
            'label' => 'List',
            'parent' => 'contract',
            'url' => '@contract',
            'active' => '@contract(/edit)?',
            'access' => 'contract: manage contracts',
        ],
        '/api/contract' => [
            'name' => '@contract/api',
            'controller' => [
                'Pagekit\\Contract\\Controller\\ContractApiController'
            ]
        ],

    ],

    /*
     * Define menu items for the backend.
     */
    'menu' => [

        // name, can be used for menu hierarchy
        'contract' => [

            // Label to display
            'label' => 'Contract',

            // Icon to display
            'icon' => 'contract:contract.svg',

            // URL this menu item links to
            'url' => '@contract/admin',

            // Optional: Expression to check if menu item is active on current url
            // 'active' => '@contract*'

            // Optional: Limit access to roles which have specific permission assigned
            // 'access' => 'contract: manage contract'
        ],

        'contract: panel' => [

            // Parent menu item, makes this appear on 2nd level
            'parent' => 'contract',

            // See above
            'label' => 'Verträge',
            'icon' => 'contract:contract.svg',
            'url' => '@contract/admin'
            // 'access' => 'contract: manage contract'
        ],

        'contract: accounts' => [
            'parent' => 'contract',
            'label' => 'Accounts',
            'url' => '@contract/admin/accounts'
        ],
        'contract: companies' => [
            'parent' => 'contract',
            'label' => 'Companies',
            'url' => '@contract/admin/companies'
        ],

        'contract: versions' => [
            'parent' => 'contract',
            'label' => 'Versions',
            'url' => '@contract/admin/versions'
        ],


        'contract: statuses' => [
            'parent' => 'contract',
            'label' => 'Statuses',
            'url' => '@contract/admin/statuses'
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
        'contract: manage settings' => [
            'title' => 'Manage settings'
        ],
        'contract: manage all posts' => [
            'title' => 'Manage all posts',
            'description' => 'Create, edit, delete and publish posts by all users'
        ],

    ],

    /*
     * Link to a settings screen from the extensions listing.
     */
    'settings' => '@contract/admin/settings',

    /*
     * Default module configuration.
     * Can be overwritten by changed config during runtime.
     */
    'config' => [
        'default' => 'World',
        'registration' => 'admin',
        'require_verification' => true,
        'contracts_per_page' => 20,

        'auth' => [
            'refresh_token' => false
        ]

    ],


    /*
     * Listen to events.
     */
    'events' => [

        'view.scripts' => function ($event, $scripts) {
            /*
            $scripts->register('contract-settings', 'contract:app/bundle/settings.js', '~extensions');
            $scripts->register('contract-site', 'contract:app/bundle/site.js', '~site-edit');
            $scripts->register('contract-link', 'contract:app/bundle/link.js', '~panel-link');
            */
        }

    ]

];
