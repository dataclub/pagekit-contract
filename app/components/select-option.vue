<template>
    <div class="uk-form-controls">
        <select :id="id" :name="name" class="uk-width-1-2" v-model="contract[name+'_id']">
                <option v-for="(id, name) in options" :value="id">{{name}}</option>
        </select>
        <a href="#" class="fa fa-minus fa-2x uk-width-1-4" :title="'Remove value' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="deleteOption(value)"></a>
        <p class="uk-form-help-block uk-text-danger" v-show="!contract[name+'_id']">{{ $trans(name.capitalize() +' cannot be blank.') }}</p>

    </div>
    <div class="uk-form-controls uk-form-controls-text" v-show="!status">
         <a href="#" class="fa fa-plus fa-2x uk-width-1-4" :title="'Add field' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="setField(1)"></a>
    </div>
    <div class="uk-form-controls" :class="{'uk-hidden' : (!status)}">
        <div :class="'uk-'+id">
            <input :id="id+'-add'" type="text" :name="name+'-add'">
            <a href="#" class="fa fa-check fa-2x uk-width-1-4" :title="'Add value' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="saveOption('#'+id+'-add')"></a>
        </div>
    </div>
</template>

<script>

    module.exports = {

        props: ['title', 'value', 'options', 'id', 'name', 'status', 'contract'],

        created: function () {
            if (this.value === undefined) {
                this.value = '';
            }

            String.prototype.capitalize = function() {
                return this.charAt(0).toUpperCase() + this.slice(1);
            }

            this.resource = this.$resource('api/contract/:id');
        },

        computed: {},
        methods: {
            setField: function (value) {
                this.status = value;
            },
            saveOption: function (elementID) {
                var value = $(elementID) ? $(elementID)[0].value : '';
                if(value == ''){
                    return;
                }
                var data = {contract: this.contract, id: this.contract.id};
                data[this.name] = value;

                this.$broadcast(this.name+'Save', data);

                this.resource.save({id: this.name}, data, function (data) {
                    if (!this.contract.id) {
                        window.history.replaceState({}, '', this.$url.route('admin/contract/edit', {id: data.contract.id}))
                    }

                    this.options = data.options;
                    this.$set('contract', data.contract);

                    this.$notify(this.$trans(this.title + ' saved.'));
                }, function (data) {
                    this.$notify(data, 'danger');
                });
            },
            deleteOption: function(value){
                var keys = Object.keys(this.options);
                if(keys.length <= 1){
                    this.$notify(this.$trans('It must be set one value at least.'));
                    return;
                }
                var data = {contract: this.contract, id: this.contract.id};
                data[this.name+'ID'] = value;

                this.resource.delete({id: this.name}, data, function (data) {

                    this.options = data.options;
                    this.$set('contract', data.contract);

                    this.$notify(this.$trans(this.title + ' deleted.'));
                }, function (data) {
                    this.$notify(data, 'danger');
                });

            }
        }

    };

</script>
