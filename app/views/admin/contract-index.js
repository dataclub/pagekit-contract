module.exports = {

    data: function () {
        return _.merge({
            contracts: false,
            pages: 0,
            count: '',
            selected: []
        }, window.$data);
    },

    created: function () {

        this.resource = this.$resource('api/contract/:id');
        this.config.filter = _.extend({search: '', status: '', role: '', order: 'name asc'}, this.config.filter);

    },

    watch: {

        'config.page': 'load',

        'config.filter': {
            handler: function () {
                this.load(0);
            },
            deep: true
        }

    },

    computed: {

        statuses: function () {

            var options = [{text: this.$trans('New'), value: 'new'}].concat(_.map(this.$data.statuses, function (status, id) {
                return {text: status, value: id};
            }));

            return [{label: this.$trans('Filter by'), options: options}];
        },

        roles: function () {

            var options = this.$data.roles.map(function (role) {
                return {text: role.name, value: role.id};
            });

            return [{label: this.$trans('Filter by'), options: options}];
        }

    },

    methods: {

        active: function (contract) {
            return this.selected.indexOf(contract.id) != -1;
        },

        save: function (contract) {
            this.resource.save({id: contract.id}, {contract: contract}, function (data) {
                this.load();
                this.$notify('Contract saved.');
            });
        },

        status: function (status) {

            var contracts = this.getSelected();

            contracts.forEach(function (contract) {
                contract.status = status;
            });

            this.resource.save({id: 'bulk'}, {contracts: contracts}, function (data) {
                this.load();
                this.$notify('Contracts saved.');
            });
        },

        remove: function () {
            this.resource.delete({id: 'bulk'}, {ids: this.selected}, function (data) {
                this.load();
                this.$notify('Contracts deleted.');
            });
        },

        toggleStatus: function (contract) {
            contract.status = !!contract.status ? 0 : 1;
            this.save(contract);
        },

        showVerified: function (contract) {
            return this.config.emailVerification && contract.data.verified;
        },

        showVersion: function (contract) {
            /*
            return _.reduce(contract.versions, function (versions, id) {
                var role = _.find(this.$data.roles, 'id', id);
                if (id !== 2 && role) {
                    roles.push(role.name);
                }
                return roles;
            }, [], this).join(', ');
            */
            return "testVersion";
        },

        showVersion: function (contract) {
          return "testStatus";
        },

        load: function (page) {

            page = page !== undefined ? page : this.config.page;

            this.resource.query({filter: this.config.filter, page: page}, function (data) {
                this.$set('contracts', data.contracts);
                this.$set('pages', data.pages);
                this.$set('count', data.count);
                this.$set('config.page', page);
                this.$set('selected', []);
            });
        },

        getSelected: function () {
            return this.contracts.filter(function (contract) {
                return this.selected.indexOf(contract.id) !== -1;
            }, this);
        }

    }

};

$(function () {
    new Vue(module.exports).$mount('#contracts');
});
