<?php $view->script('contract-edit', 'contract:app/bundle/contract-edit.js', ['vue', 'editor', 'uikit']) ?>
<?php $view->style('contract-edit', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css') ?>
<?php $view->render('head') ?>

<form id="contract-edit" class="uk-form uk-form-horizontal" v-validator="form" @submit.prevent="save | valid" v-cloak>

    <div class="uk-margin uk-flex uk-flex-space-between uk-flex-wrap" data-uk-margin>
        <div data-uk-margin>

            <h2 class="uk-margin-remove" v-if="contract.id">{{ 'Edit Contract' | trans }}</h2>
            <h2 class="uk-margin-remove" v-else>{{ 'Add Contract' | trans }}</h2>

        </div>
        <div data-uk-margin>

            <a class="uk-button uk-margin-small-right" :href="$url.route('admin/contract')">{{ contract.id ? 'Close' : 'Cancel' | trans }}</a>
            <button class="uk-button uk-button-primary" type="submit">{{ 'Save' | trans }}</button>

        </div>
    </div>

    <ul class="uk-tab" v-el:tab v-show="sections.length > 1">
        <li v-for="section in sections"><a>{{ section.label | trans }}</a></li>
    </ul>

    <div class="uk-switcher uk-margin" v-el:content>
        <div v-for="section in sections">
            <component :is="section.name" :contract.sync="contract" :data.sync="data" :config="data.config" :form="form"></component>
        </div>
    </div>

</form>
