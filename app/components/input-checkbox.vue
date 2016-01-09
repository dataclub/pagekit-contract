<template>
   <ul class="uk-sortable uk-nav uk-nav-side" data-uk-sortable="{dragCustomClass:'pk-sortable-dragged-list'}">
       <li class="uk-visible-hover" v-for="requirement in options | orderBy 'priority'" :class="{'uk-active': current.id === role.id}">
           <ul class="uk-subnav pk-subnav-icon uk-hidden" v-if="!requirement.locked">
               <li><a class="pk-icon-edit pk-icon-hover" :title="'Edit' | trans" data-uk-tooltip="{delay: 500}" @click="edit(requirement)"></a></li>
               <li><a class="pk-icon-delete pk-icon-hover" :title="'Delete' | trans" data-uk-tooltip="{delay: 500}" @click="remove(requirement)" v-confirm="'Delete Requirement?'"></a></li>
           </ul>

           <p class="uk-form-controls-condensed">
               <input type="checkbox" :value="requirement.id" v-model="data.requirements" number>
               <a @click.prevent="config.requirement = requirement.id">{{ requirement.name }}</a>
           </p>

       </li>
   </ul>

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

        props: ['title', 'options', 'id', 'name', 'status', 'data'],

        created: function () {
            if (this.value === undefined) {
                this.value = '';
            }

            this.resource = this.$resource('api/contract/:id');
        },
        ready: function(){
            String.prototype.capitalize = function() {
                return this.charAt(0).toUpperCase() + this.slice(1);
            }

            $(this.$el).on('change.uk.sortable', this.reorder);
        },

        computed: {},
        methods: {
            edit: function (requirement) {
                this.$set('requirement', $.extend({}, requirement || {}));
                this.$refs.modal.open();
            },

            remove: function (requirement) {
                if(!this.deleteRemovableOptions(value)){
                    return;
                }

                this.resource.remove({ id: 'requirement'}, {id: requirement.id }, function (data) {
                    this.data.requirements.splice(_.findIndex(this.data.requirements, { id: requirement.id }), 1);
                    this.options.splice(_.findIndex(this.options, { id: requirement.id }), 1);

                });
            },

            reorder: function (e, sortable) {

                if (!sortable) {
                    return;
                }

                sortable.element.children().each(function(i) {
                    this.__vfrag__.scope.$set('requirement.priority', i);
                });

                this.resource.save({ id: 'requirement' }, { requirements: this.data.requirements }, function (data) {
                    this.$notify('Requirements reordered.');
                }, function (data) {
                    this.$notify(data, 'danger');
                });
            },

            setField: function (value) {
                this.status = value;
            },
            saveOption: function (elementID) {
                var value = $(elementID) ? $(elementID)[0].value : '';
                if(value == ''){
                    return;
                }
                var data = {data: this.data, id: this.data.id};
                data[this.name] = value;

                this.$broadcast(this.name+'Save', data);

                this.resource.save({id: this.name}, data, function (data) {
                    if (!this.data.id) {
                        window.history.replaceState({}, '', this.$url.route('admin/data/edit', {id: data.data.id}))
                    }

                    this.options = data.options;
                    this.$set('data', data.data);

                    this.$notify(this.$trans(this.title + ' saved.'));
                }, function (data) {
                    this.$notify(data, 'danger');
                });
            },
            deleteOption: function(value){
                if(!this.deleteRemovableOptions(value)){
                    return;
                }

                var keys = Object.keys(this.options);
                if(keys.length <= 1){
                    this.$notify(this.$trans('It must be set one value at least.'));
                    return;
                }
                var data = {data: this.data, id: this.data.id};
                data[this.name+'ID'] = value;

                this.resource.delete({id: this.name}, data, function (data) {
                    this.options = data.options;
                    this.$set('data', data.data);

                    this.$notify(this.$trans(this.title + ' deleted.'));
                }, function (data) {
                    this.$notify(data, 'danger');
                });

            },
            deleteRemovableOptions: function(value){
                var mappedOptions = _.map(this.options, function (e) {
                    if(!parseInt(e.can_be_removed)){
                     return parseInt(e.id);
                    }
                });

                if(mappedOptions.indexOf(parseInt(value)) != -1){
                    this.$notify('This value can´t be deleted.');
                    return false;
                }

                return true;
            }
        }

    };

</script>
