<template>

    <div class="uk-grid" data-uk-grid-margin>
        <div class="uk-width-medium-2-3 uk-width-large-3-4">

            <div class="uk-form-row">
                <label for="form-username" class="uk-form-label">{{ 'Username' | trans }}</label>
                <div class="uk-form-controls">
                    <input id="form-username" class="uk-form-width-large" type="text" name="username" v-model="contract.username" v-validate:required>
                    <p class="uk-form-help-block uk-text-danger" v-show="form.username.invalid">{{ 'Username cannot be blank.' | trans }}</p>
                </div>
            </div>

            <div class="uk-form-row">
                <label for="form-name" class="uk-form-label">{{ 'Name' | trans }}</label>
                <div class="uk-form-controls">
                    <input id="form-name" class="uk-form-width-large" type="text" name="name" v-model="contract.name" v-validate:required>
                    <p class="uk-form-help-block uk-text-danger" v-show="form.name.invalid">{{ 'Name cannot be blank.' | trans }}</p>
                </div>
            </div>

            <div class="uk-form-row">
                <label for="form-email" class="uk-form-label">{{ 'Email' | trans }}</label>
                <div class="uk-form-controls">
                    <input id="form-email" class="uk-form-width-large" type="text" name="email" v-model="contract.email" v-validate:email v-validate:required lazy>
                    <p class="uk-form-help-block uk-text-danger" v-show="form.email.invalid">{{ 'Field must be a valid email address.' | trans }}</p>
                </div>
            </div>

            <div class="uk-form-row">
                <label for="form-password" class="uk-form-label">{{ 'Password' | trans }}</label>
                <div class="uk-form-controls uk-form-controls-text" v-show="contract.id && !editingPassword">
                    <a href="#" @click.prevent="editingPassword = true">{{ 'Change password' | trans }}</a>
                </div>
                <div class="uk-form-controls" :class="{'uk-hidden' : (contract.id && !editingPassword)}">
                    <div class="uk-form-password">
                        <input id="form-password" class="uk-form-width-large" :type="hidePassword ? 'password' : 'text'" v-model="password">
                        <a href="#" class="uk-form-password-toggle" @click.prevent="hidePassword = !hidePassword">{{ hidePassword ? 'Show' : 'Hide' | trans }}</a>
                    </div>
                </div>
            </div>

            <div class="uk-form-row">
                <span class="uk-form-label">{{ 'Status' | trans }}</span>
                <div class="uk-form-controls uk-form-controls-text">
                    <p class="uk-form-controls-condensed" v-for="status in config.statuses">
                        <label><input type="radio" v-model="contract.status" :value="parseInt($key)" :disabled="config.currentUser == contract.id"> {{ status }}</label>
                    </p>
                </div>
            </div>

            <div class="uk-form-row">
                <span class="uk-form-label">{{ 'Roles' | trans }}</span>
                <div class="uk-form-controls uk-form-controls-text">
                    <p class="uk-form-controls-condensed" v-for="role in config.roles">
                        <label><input type="checkbox" :value="role.id" :disabled="role.disabled" v-model="contract.roles"> {{ role.name }}</label>
                    </p>
                </div>
            </div>

            <div class="uk-form-row">
                <span class="uk-form-label">{{ 'Last login' | trans }}</span>
                <div class="uk-form-controls uk-form-controls-text">
                    <p>{{ $trans('%date%', { date: contract.login ? $date(contract.login) : $trans('Never') }) }}</p>
                </div>
            </div>

            <div class="uk-form-row">
                <span class="uk-form-label">{{ 'Registered since' | trans }}</span>
                <div class="uk-form-controls uk-form-controls-text">
                    {{ contract.registered ? $trans('%date%', { date: $date(contract.registered) }) : '' }}
                </div>
            </div>

        </div>

        <div class="uk-width-medium-1-3 uk-width-large-1-4">

            <div class="uk-panel uk-panel-box uk-text-center" v-show="contract.name">

                <div class="uk-panel-teaser">
                    <img height="280" width="280" :alt="contract.name" v-gravatar="contract.email">
                </div>

                <h3 class="uk-panel-tile uk-margin-bottom-remove uk-text-break">{{ contract.name }}
                    <i :title="(isNew ? 'New' : config.statuses[contract.status]) | trans" :class="{
                        'pk-icon-circle-primary': isNew,
                        'pk-icon-circle-success': contract.access && contract.status,
                        'pk-icon-circle-danger': !contract.status
                    }"></i>
                </h3>

                <div>
                    <a class="uk-text-break" :href="'mailto:'+contract.email">{{ contract.email }}</a><i class="uk-icon-check" :title="'Verified email address' | trans" v-show="config.emailVerification && contract.data.verified"></i>
                </div>

            </div>

        </div>
    </div>

</template>

<script>

    module.exports = {

        section: {
            label: 'Contract'
        },

        props: ['contract', 'config', 'form'],

        data: function () {
            return {password: '', hidePassword: true, editingPassword: false}
        },

        ready: function () {
            UIkit.init(this.$el);
        },

        computed: {

            isNew: function () {
                return !this.contract.login && this.contract.status;
            }

        },

        events: {

            save: function (data) {
                data.password = this.password;
            }

        }

    };

</script>
