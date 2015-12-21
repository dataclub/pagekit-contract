<?php $view->script('index', 'contract:app/bundle/index.js', 'vue') ?>

<div id="contracts" class="uk-form" v-cloak>

    <div class="uk-margin uk-flex uk-flex-space-between uk-flex-wrap" data-uk-margin>
        <div class="uk-flex uk-flex-middle uk-flex-wrap" data-uk-margin>

            <h2 class="uk-margin-remove" v-if="!selected.length">{{ '{0} %count% Contracts|{1} %count% Contract|]1,Inf[ %count% Contracts' | transChoice count {count:count} }}</h2>

            <template v-else>
                <h2 class="uk-margin-remove">{{ '{1} %count% Contract selected|]1,Inf[ %count% Contracts selected' | transChoice selected.length {count:selected.length} }}</h2>

                <div class="uk-margin-left">
                    <ul class="uk-subnav pk-subnav-icon">
                        <li><a class="pk-icon-check pk-icon-hover" :title="'Activate' | trans" data-uk-tooltip="{delay: 500}" @click="status(1)"></a></li>
                        <li><a class="pk-icon-block pk-icon-hover" :title="'Block' | trans" data-uk-tooltip="{delay: 500}" @click="status(0)"></a></li>
                        <li><a class="pk-icon-delete pk-icon-hover" :title="'Delete' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="remove" v-confirm="'Delete users?'"></a></li>
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

            <a class="uk-button uk-button-primary" :href="$url.route('admin/contract/edit')">{{ 'Add Contract' | trans }}</a>

        </div>
    </div>

    <div class="uk-overflow-container">
        <table class="uk-table uk-table-hover uk-table-middle">
            <thead>
            <tr>
                <th class="pk-table-width-minimum"><input type="checkbox" v-check-all:selected.literal="input[name=id]" number></th>
                <th colspan="2" v-order:name="config.filter.order">
                    {{ 'Contracts' | trans }}
                </th>
                <th class="pk-table-width-100 uk-text-center">
                    <input-filter :title="$trans('Status')" :value.sync="config.filter.status" :options="statuses"></input-filter>
                </th>
                <th class="pk-table-width-100" v-order:date="config.filter.order">
                    {{ 'Date' | trans }}
                </th>
                <th class="pk-table-width-100" v-order:place="config.filter.order">
                    {{ 'Place' | trans }}
                </th>
                <th class="pk-table-width-100" v-order:startDate="config.filter.order">
                    {{ 'Startdate' | trans }}
                </th>
                <th class="pk-table-width-100" v-order:cancellationDate="config.filter.order">
                    {{ 'Cancellationdate' | trans }}
                </th>
            </tr>
            </thead>
            <tbody>
            <tr class="check-item" v-for="contract in contracts" :class="{'uk-active': active(contract)}">
                <td><input type="checkbox" name="id" :value="contract.id"></td>
                <td class="pk-table-width-minimum">
                    <img class="uk-img-preserve uk-border-circle" width="40" height="40">
                </td>
                <td class="uk-text-nowrap">
                    <a :href="$url.route('admin/contract/edit', { id: contract.id })">{{ contract.name }}</a>
                    <div class="uk-text-muted">{{ contract.name }}</div>
                </td>
                <td class="uk-text-center">
                    <a href="#" :title="contract.statusText" :class="{
                            'pk-icon-circle-success': contract.login && user.status,
                            'pk-icon-circle-danger': !contract.status,
                            'pk-icon-circle-primary': contract.status
                        }" @click="toggleStatus(contract)"></a>
                </td>
                <td>
                    {{ contract.date }}
                </td>
                <td>
                    {{ contract.place }}
                </td>
                <td>
                    {{ contract.startDate }}
                </td>
                <td>
                    {{ contract.cancellationDate }}
                </td>
            </tr>
            </tbody>
        </table>
    </div>

    <h3 class="uk-h1 uk-text-muted uk-text-center" v-show="contracts && !contracts.length">{{ 'No contract found.' | trans }}</h3>

    <v-pagination :page.sync="config.page" :pages="pages" v-show="pages > 1"></v-pagination>

</div>
