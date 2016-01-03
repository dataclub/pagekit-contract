window.Contract = {

    el: '#contract-edit',

    data: function () {
        return {
            data: window.$data,
            contract: window.$data.contract,
            sections: []
        }
    },

    created: function () {

        var sections = [];

        _.forIn(this.$options.components, function (component, name) {

            var options = component.options || {};

            if (options.section) {
                sections.push(_.extend({name: name, priority: 0}, options.section));
            }

        });

        this.$set('sections', _.sortBy(sections, 'priority'));

        this.resource = this.$resource('api/contract/:id');

    },

    ready: function () {
        this.tab = UIkit.tab(this.$els.tab, {connect: this.$els.content});
    },

    computed: {

        statusOptions: function () {
            console.log(this.$data);
            var options = _.map(this.$data.statuses, function (name, id) {
                return {text: name, value: id};
            });

            return [{label: this.$trans('Filter by'), options: options}];
        },
    },
    methods: {

        save: function () {
            var data = {contract: this.contract, id: this.contract.id};

            this.$broadcast('save', data);

            this.resource.save({id: this.contract.id}, data, function (data) {
                if (!this.contract.id) {
                    window.history.replaceState({}, '', this.$url.route('admin/contract/edit', {id: data.contract.id}))
                }

                this.$data.oldStartDateValue = data.contract.startDate;
                this.$data.newStartDateValue = this.$data.oldStartDateValue == null ? new Date() : this.$data.oldStartDateValue;

                this.$data.oldCancellationDateValue = data.contract.cancellationDate;
                this.$data.newCancellationDateValue = this.$data.oldCancellationDateValue == null ? new Date() : this.$data.oldCancellationDateValue;

                this.$set('contract', data.contract);
                this.$notify(this.$trans('Contract saved.'));
            }, function (data) {
                this.$notify(data, 'danger');
            });
        },
    },

    components: {

        settings: require('../../components/contract-edit.vue')

    }

};

Vue.ready(window.Contract);


