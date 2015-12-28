<template>

    <div class="uk-grid" data-uk-grid-margin>
        <div class="uk-width-medium-2-3 uk-width-large-3-4">

            <div class="uk-form-row">
                <label for="form-name" class="uk-form-label">{{ 'Name' | trans }}</label>
                <div class="uk-form-controls">
                    <input id="form-name" class="uk-form-width-large" type="text" name="name" v-model="contract.name" v-validate:required>
                    <p class="uk-form-help-block uk-text-danger" v-show="form.name.invalid">{{ 'Name cannot be blank.' | trans }}</p>
                </div>
            </div>

            <div class="uk-form-row">
                <label for="form-place" class="uk-form-label">{{ 'Place' | trans }}</label>
                <div class="uk-form-controls">
                    <input id="form-place" class="uk-form-width-large" type="text" name="place" v-model="contract.place" v-validate:required>
                    <p class="uk-form-help-block uk-text-danger" v-show="form.place.invalid">{{ 'Place cannot be blank.' | trans }}</p>
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

            <div class="uk-form-row" v-if='contract.date'>
                <span class="uk-form-label">{{ 'Date' | trans }}</span>
                <div class="uk-form-controls uk-form-controls-text">
                    <p>{{ $trans('%date%', { date: contract.date ? $date(contract.date) : $trans('Never') }) }}</p>
                </div>
            </div>

            <div class="uk-form-row" v-if='contract.startDate'>
                <span class="uk-form-label">{{ 'Start' | trans }}</span>
                <div class="uk-form-controls uk-form-controls-text">
                    {{ contract.startDate ? $trans('%date%', { date: $date(contract.startDate) }) : '-' }}
                </div>
            </div>

            <div class="uk-form-row" v-if='contract.cancellationDate'>
                <span class="uk-form-label">{{ 'Cancellation' | trans }}</span>
                <div class="uk-form-controls uk-form-controls-text">
                    {{ contract.cancellationDate ? $trans('%date%', { date: $date(contract.cancellationDate) }) : '-' }}
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
                return !this.contract.date && this.contract.status;
            }

        },

        events: {

            save: function (data) {
               
            }

        }

    };

</script>
