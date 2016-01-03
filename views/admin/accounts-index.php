<?php $view->script('accounts-index', 'contract:app/bundle/accounts-index.js', 'vue') ?>

<div id="accounts-index" class="uk-form" v-cloak>

    <div class="uk-margin uk-flex uk-flex-space-between uk-flex-wrap" data-uk-margin>
        <div class="uk-flex uk-flex-middle uk-flex-wrap" data-uk-margin>

            <h2 class="uk-margin-remove" v-if="!selected.length">{{ '{0} %count% Accounts|{1} %count% Account|]1,Inf[ %count% Accounts' | transChoice count {count:count} }}</h2>

            <template v-else>
                <h2 class="uk-margin-remove">{{ '{1} %count% Account selected|]1,Inf[ %count% Accounts selected' | transChoice selected.length {count:selected.length} }}</h2>

                <div class="uk-margin-left">
                    <ul class="uk-subnav pk-subnav-icon">
                        <li><a class="pk-icon-delete pk-icon-hover" :title="'Delete' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="remove" v-confirm="'Delete accounts?'"></a></li>
                    </ul>
                </div>

            </template>

            <div class="pk-search">
                <div class="uk-search">
                    <input class="uk-search-field" type="text" v-model="config.filter.search" debounce="300">
                </div>
            </div>

        </div>
        <div data-uk-margin>

            <a class="uk-button uk-button-primary" :href="$url.route('admin/contract/edit')">{{ 'Add Account' | trans }}</a>

        </div>
    </div>

    <div class="uk-overflow-container">
        <table class="uk-table uk-table-hover uk-table-middle">
            <thead>
            <tr>
                <th class="pk-table-width-minimum"><input type="checkbox" v-check-all:selected.literal="input[name=id]" number></th>
                <th colspan="" v-order:customer_number="config.filter.order">
                    {{ 'Accounts' | trans }}
                </th>
                <th class="pk-table-width-100" v-order:first_name="config.filter.order">
                    {{ 'Firstname' | trans }}
                </th>
                <th class="pk-table-width-100" v-order:last_name="config.filter.order">
                    {{ 'Lastname' | trans }}
                </th>
                <th class="pk-table-width-100" v-order:phone="config.filter.order">
                    {{ 'Phone' | trans }}
                </th>
                <th class="pk-table-width-100" v-order:mobile="config.filter.order">
                    {{ 'Mobile' | trans }}
                </th>
            </tr>
            </thead>
            <tbody>
            <tr class="check-item" v-for="account in accounts" :class="{'uk-active': active(account)}">
                <td><input type="checkbox" name="id" :value="account.id"></td>
                <td class="uk-text-nowrap">
                    <a :href="$url.route('admin/contract/accounts/edit', { id: account.customer_number })">{{ account.customer_number }}</a>
                    <div class="uk-text-muted">{{ account.customer_number }}</div>
                </td>
                <td class="uk-text-left">
                    {{ account.first_name }}
                </td >
                <td class="uk-text-left">
                    {{ account.last_name }}
                </td >
                <td class="uk-text-left">
                    {{ account.phone }}
                </td >
                <td class="uk-text-left">
                    {{ account.mobile }}
                </td >
            </tr>
            </tbody>
        </table>
    </div>

    <h3 class="uk-h1 uk-text-muted uk-text-center" v-show="accounts && !accounts.length">{{ 'No accounts found.' | trans }}</h3>

    <v-pagination :page.sync="config.page" :pages="pages" v-show="pages > 1"></v-pagination>

</div>
