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
                <label for="form-status" class="uk-form-label">{{ 'Status' | trans }}</label>
                <div class="uk-form-controls">
                    <select id="form-status" class="uk-width-1-1" v-model="contract.status">
                        <option v-for="(id, status) in data.statuses" :value="id">{{status}}</option>
                    </select>
                </div>
            </div>

            <div class="uk-form-row">
                <label for="form-place" class="uk-form-label">{{ 'Place' | trans }}</label>
                <div class="uk-form-controls">
                    <input id="form-place" class="uk-form-width-large" type="text" name="place" v-model="contract.place" v-validate:required>
                    <p class="uk-form-help-block uk-text-danger" v-show="form.place.invalid">{{ 'Place cannot be blank.' | trans }}</p>
                </div>
            </div>

            <div class="uk-form-row" v-if='contract.date'>
                <span class="uk-form-label">{{ 'Date' | trans }}</span>
                <div class="uk-form-controls uk-form-controls-text">
                    <p>{{ $trans('%date%', { date: contract.date ? $date(contract.date) : $trans('Never') }) }}</p>
                </div>
            </div>

            <div class="uk-form-row">
                <label for="form-status" class="uk-form-label">{{ 'Participated?' | trans }}</label>
                <div class="uk-form-controls">
                    <select id="form-status" class="uk-width-1-1" v-model="contract.participated">
                        <option v-for="(id, participated) in data.participations" :value="id">{{participated}}</option>
                    </select>
                </div>
            </div>

            <div class="uk-form-row">
                <label for="form-status" class="uk-form-label">{{ 'Visited multiple?' | trans }}</label>
                <div class="uk-form-controls">
                    <select id="form-visitedMultiple" class="uk-width-1-1" v-model="contract.visitedMultiple">
                        <option v-for="(id, visitedMultiple) in data.multipleVisits" :value="id">{{visitedMultiple}}</option>
                    </select>
                </div>
            </div>

            <div class="uk-form-row">
                <label for="form-start" class="uk-form-label">
                    {{ 'Start' | trans }}
                    <a href="#" v-show="!editingStartdate" class="pk-icon-edit pk-icon-hover" :title="'Edit Startdate' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="statusStartdate(1)"></a>
                    <a href="#" :class="{'uk-hidden' : (!editingStartdate)}" class="pk-icon-block pk-icon-hover" :title="'Hide Startdate' | trans" data-uk-tooltip="{delay: 500}" @click="statusStartdate(0)"></a>
                </label>

                <div class="uk-form-controls uk-form-controls-text" v-show="!editingStartdate">
                    {{ startDate ? $trans('%date%', { date: $date(startDate) }) : '-' }}
                </div>
                <div class="uk-form-controls" :class="{'uk-hidden' : (!editingStartdate)}">
                    <div class="uk-form-start">
                        <input-date :datetime.sync="contract.startDate" id="form-date" class="uk-form-width-large" ></input-date>
                        <input type="hidden" name="startDate" :value=contract.startDate @blur="status(0);">
                    </div>
                </div>
            </div>

            <div class="uk-form-row">
                <label for="form-cancellation" class="uk-form-label">
                    {{ 'Cancellation' | trans }}
                    <a href="#" v-show="!editingCancellationdate" class="pk-icon-edit pk-icon-hover" :title="'Edit Cancellationdate' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="statusCancellationdate(1)"></a>
                    <a href="#" :class="{'uk-hidden' : (!editingCancellationdate)}" class="pk-icon-block pk-icon-hover" :title="'Hide Cancellationdate' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="statusCancellationdate(0)"></a>
                </label>

                <div class="uk-form-controls uk-form-controls-text" v-show="!editingCancellationdate">
                    {{ cancellationDate ? $trans('%date%', { date: $date(cancellationDate) }) : '-' }}
                </div>
                <div class="uk-form-controls" :class="{'uk-hidden' : (!editingCancellationdate)}">
                    <div class="uk-form-cancellation">
                        <input-date :datetime.sync="contract.cancellationDate" id="form-date" class="uk-form-width-large" ></input-date>
                    </div>
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

        props: ['contract', 'data', 'config', 'form'],

        data: function () {
            var data = window.$data.contract;

            var startDate = data.startDate;
            var cancellationDate = data.cancellationDate;

            data.startDate = data.startDate == null ? new Date() : data.startDate;
            data.cancellationDate = data.cancellationDate == null ? new Date() : data.cancellationDate;

            return {
                data: window.$data,
                contract: data,
                sections: [],
                editingStartdate: false,
                editingCancellationdate: false,
                startDate: startDate,
                cancellationDate: cancellationDate,
                saved: false,
                newStartDateValue: data.startDate,
                oldStartDateValue: startDate,
                newCancellationDateValue: data.cancellationDate,
                oldCancellationDateValue: cancellationDate,
            }
        },

        ready: function () {
            UIkit.init(this.$el);
        },
        methods: {
            statusStartdate: function (value) {
                this.$data.editingStartdate = value;

                if(value){
                    this.contract.startDate =  this.$data.newStartDateValue == null ? new Date() : this.$data.newStartDateValue;
                }else{
                    this.$data.newStartDateValue = this.contract.startDate;
                }

            },
            statusCancellationdate: function (value) {
                this.$data.editingCancellationdate = value;

                if(value){
                    this.contract.cancellationDate =  this.$data.newCancellationDateValue == null ? new Date() : this.$data.newCancellationDateValue;;
                }else{
                    this.$data.newCancellationDateValue = this.contract.cancellationDate;
                }
            }

        },

        computed: {
        },

        events: {
            save: function (data) {
                this.$data.oldStartDateValue = this.$data.editingStartdate && this.$data.oldStartDateValue == null ? data.contract.startDate : this.$data.oldStartDateValue;
                this.$data.newStartDateValue = data.contract.startDate;
                data.contract.startDate = this.$data.editingStartdate ? this.$data.newStartDateValue : this.$data.oldStartDateValue;

                this.$data.oldCancellationDateValue = this.$data.editingCancellationdate && this.$data.oldCancellationDateValue == null ? data.contract.cancellationDate : this.$data.oldCancellationDateValue;
                this.$data.newCancellationDateValue = data.contract.cancellationDate;
                data.contract.cancellationDate = this.$data.editingCancellationdate ? this.$data.newCancellationDateValue : this.$data.oldCancellationDateValue;


                this.$data.saved = true;

            }
        }

    };

</script>
