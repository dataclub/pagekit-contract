<?php $view->script('contract-version', 'contract:app/bundle/contract-version.js', 'vue') ?>

<div id="contract-version" class="uk-form" v-cloak>

    <div class="uk-margin uk-flex uk-flex-space-between uk-flex-wrap" data-uk-margin>
        <div class="uk-flex uk-flex-middle uk-flex-wrap" data-uk-margin>

            <h2 class="uk-margin-remove" v-if="!selected.length">{{ '{0} %count% Contracts|{1} %count% Contract|]1,Inf[ %count% Contracts' | transChoice count {count:count} }}</h2>

            <template v-else>
                <h2 class="uk-margin-remove">{{ '{1} %count% Contract selected|]1,Inf[ %count% Contracts selected' | transChoice selected.length {count:selected.length} }}</h2>

                <div class="uk-margin-left">
                    <ul class="uk-subnav pk-subnav-icon">
                        <li><a class="pk-icon-check pk-icon-hover" :title="'Activate status' | trans" data-uk-tooltip="{delay: 500}" @click="status(1)"></a></li>
                        <li><a class="pk-icon-block pk-icon-hover" :title="'Block status' | trans" data-uk-tooltip="{delay: 500}" @click="status(0)"></a></li>
                        <li><a class="pk-icon-delete pk-icon-hover" :title="'Delete' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="remove" v-confirm="'Delete contracts?'"></a></li>
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
                <th colspan="" v-order:name="config.filter.order">
                    {{ 'Contracts' | trans }}
                </th>
                <th class="pk-table-width-100 uk-text-center">
                    <input-filter :title="$trans('Status')" :value.sync="config.filter.status_id" :options="statusOptions"></input-filter>
                </th>
                <th class="pk-table-width-100" v-order:date="config.filter.order">
                    {{ 'Date' | trans }}
                </th>
                <th class="pk-table-width-100" v-order:place="config.filter.order">
                    {{ 'Place' | trans }}
                </th>
                <th class="pk-table-width-100" v-order:startDate="config.filter.order">
                    {{ 'Start' | trans }}
                </th>
                <th class="pk-table-width-100" v-order:cancellationDate="config.filter.order">
                    {{ 'Cancellation' | trans }}
                </th>
                <th class="pk-table-width-100">
                    <input-filter :title="$trans('Participated?')" :value.sync="config.filter.participated" :options="participations"></input-filter>
                </th>
                <th class="pk-table-width-100">
                    <input-filter :title="$trans('Visited multiple?')" :value.sync="config.filter.visitedMultiple" :options="multipleVisits"></input-filter>
                </th>
                <th class="pk-table-width-100">
                    <input-filter :title="$trans('Author')" :value.sync="config.filter.author" :options="authors"></input-filter>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr class="check-item" v-for="contract in contracts" :class="{'uk-active': active(contract)}">
                <td><input type="checkbox" name="id" :value="contract.id"></td>
                <!--td class="pk-table-width-minimum">
                    <img class="uk-img-preserve uk-border-circle" width="40" height="40">
                </td-->
                <td class="uk-text-nowrap">
                    <a :href="$url.route('admin/contract/edit', { id: contract.id })">{{ contract.name }}</a>
                    <div class="uk-text-muted">{{ contract.name }}</div>
                </td>
                <td class="uk-text-center">
                    <a :href="$url.route('admin/contract/statuses/edit', { id: contract.status_id })">{{ contract.state | trans }}</a>
                </td>
                <td class="uk-text-left">
                    {{ $trans('%date%', { date: contract.date ? $date(contract.date) : $trans('Never') }) }}
                </td>
                <td class="uk-text-left">
                    {{ contract.place }}
                </td >
                <td class="uk-text-center">
                    {{ $trans('%date%', { date: contract.startDate ? $date(contract.startDate) : $trans('Never') }) }}
                </td>
                <td class="uk-text-center">
                    {{ $trans('%date%', { date: contract.cancellationDate ? $date(contract.cancellationDate) : $trans('Never') }) }}
                </td>
                <td class="uk-text-center">
                    <a href="#" :class="{
                            'pk-icon-circle-success': contract.date && contract.participated,
                            'pk-icon-circle-danger': !contract.participated,
                            'pk-icon-circle-primary': contract.participated
                        }" @click="toggleParticipation(contract)"></a>
                </td>
                <td class="uk-text-center">
                    <a href="#" :class="{
                            'pk-icon-circle-success': contract.date && contract.visitedMultiple,
                            'pk-icon-circle-danger': !contract.visitedMultiple,
                            'pk-icon-circle-primary': contract.visitedMultiple
                        }" @click="toggleMultipleVisit(contract)"></a>
                </td>
                <td>
                    <a :href="$url.route('admin/user/edit', { id: contract.user_id })">{{ contract.author }}</a>
                </td>
            </tr>
            </tbody>
        </table>
    </div>

    <h3 class="uk-h1 uk-text-muted uk-text-center" v-show="contracts && !contracts.length">{{ 'No contracts found.' | trans }}</h3>

    <v-pagination :page.sync="config.page" :pages="pages" v-show="pages > 1"></v-pagination>

</div>
