<?php

return [

    /*
     * Installation hook.
     */
    'install' => function ($app) {



    },

    /*
     * Enable hook
     *
     */
    'enable' => function ($app) {

        $util = $app['db']->getUtility();

        /**
         * Contracts-Table
         */
        if ($util->tableExists('@contracts') === false) {
            $util->createTable('@contracts', function ($table) {
                $table->addColumn('id', 'integer', ['unsigned' => true, 'length' => 10, 'autoincrement' => true]);
                $table->addColumn('name', 'string', ['length' => 255]);
                $table->addColumn('date', 'datetime', ['notnull' => false]);
                $table->addColumn('place', 'string', ['length' => 255, 'notnull' => false]);
                $table->addColumn('startDate', 'datetime');
                $table->addColumn('cancellationDate', 'datetime');
                $table->addColumn('participated', 'boolean', ['default' => false]);
                $table->addColumn('visitedMultiple', 'boolean', ['default' => false]);

                $table->addColumn('version_id', 'integer', ['unsigned' => true, 'length' => 10, 'default' => 0]);
                $table->addColumn('status_id', 'integer', ['unsigned' => true, 'length' => 10, 'default' => 0]);
                $table->addColumn('user_id', 'string', ['length' => 255]);

                $table->setPrimaryKey(['id']);
                $table->addUniqueIndex(['name'], 'CONTRACTS_NAME');
                $table->addIndex(['version_id'], 'CONTRACTS_CONTRACT_VERSION_ID');
                $table->addIndex(['status_id'], 'CONTRACTS_CONTRACT_STATUS_ID');
            });
        }

        /**
         *  Contract_Comments-Table
         */
        if ($util->tableExists('@contract_comments') === false) {
            $util->createTable('@contract_comments', function ($table) {
                $table->addColumn('id', 'integer', ['unsigned' => true, 'length' => 10, 'autoincrement' => true]);
                $table->addColumn('contract_id', 'integer', ['unsigned' => true, 'length' => 10]);
                $table->addColumn('content', 'text');
                $table->setPrimaryKey(['id']);
                $table->addIndex(['contract_id'], 'CONTRACT_COMMENTS_CONTRACT_ID');
            });
        }

        /**
         *  Contract_Versions-Table
         */
        if ($util->tableExists('@contract_versions') === false) {
            $util->createTable('@contract_versions', function ($table) {
                $table->addColumn('id', 'integer', ['unsigned' => true, 'length' => 10, 'autoincrement' => true]);
                $table->addColumn('Name', 'string', ['length' => 255]);

                $table->setPrimaryKey(['id']);
            });
        }

        /**
         *  Contract_Status-Table
         */
        if ($util->tableExists('@contract_status') === false) {
            $util->createTable('@contract_status', function ($table) {
                $table->addColumn('id', 'integer', ['unsigned' => true, 'length' => 10, 'autoincrement' => true]);
                $table->addColumn('name', 'string', ['length' => 255]);

                $table->setPrimaryKey(['id']);
            });
        }

        /**
         *  Contract_Companies-Table
         */
        if ($util->tableExists('@contract_companies') === false) {
            $util->createTable('@contract_companies', function ($table) {
                $table->addColumn('id', 'integer', ['unsigned' => true, 'length' => 10, 'autoincrement' => true]);
                $table->addColumn('name', 'string', ['length' => 255]);

                $table->setPrimaryKey(['id']);
            });
        }

        /**
         *  Contract_Partner-Table
         */
        if ($util->tableExists('@contract_accounts') === false) {
            $util->createTable('@contract_accounts', function ($table) {
                $table->addColumn('id', 'integer', ['unsigned' => true, 'length' => 10, 'autoincrement' => true]);
                $table->addColumn('first_name', 'string', ['length' => 255]);
                $table->addColumn('last_name', 'string', ['length' => 255]);
                $table->addColumn('phone', 'string', ['length' => 255]);
                $table->addColumn('mobile', 'string', ['length' => 255]);
                $table->addColumn('postal_code', 'string', ['length' => 255]);
                $table->addColumn('city', 'string', ['length' => 255]);
                $table->addColumn('street', 'string', ['length' => 255]);

                $table->addColumn('customer_number', 'string', ['length' => 255]);
                $table->setPrimaryKey(['id']);
                $table->addUniqueIndex(['customer_number'], 'CONTRACT_PARTNER_CUSTOMER_NUMBER');
            });
        }

    },


    /*
     * Uninstall hook
     *
     */
    'uninstall' => function ($app) {

        // remove the config
        $app['config']->remove('contract');

        $util = $app['db']->getUtility();

        if ($util->tableExists('@contracts')) {
            $util->dropTable('@contracts');
        }

        if ($util->tableExists('@contract_accounts')) {
            $util->dropTable('@contract_accounts');
        }

        if ($util->tableExists('@contract_comments')) {
            $util->dropTable('@contract_comments');
        }

        if ($util->tableExists('@contract_companies')) {
            $util->dropTable('@contract_companies');
        }

        if ($util->tableExists('@contract_status')) {
            $util->dropTable('@contract_status');
        }

        if ($util->tableExists('@contract_versions')) {
            $util->dropTable('@contract_versions');
        }

    },

    /*
     * Runs all updates that are newer than the current version.
     *
     */
    'updates' => [

        '0.5.0' => function ($app) {

        },

        '0.9.0' => function ($app) {

        },

    ],

];