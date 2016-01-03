module.exports = {

    el: '#accounts-index',

    data: function () {
        return _.merge({
            accounts: false,
            pages: 0,
            count: '',
            selected: []
        }, window.$data);
    },

    created: function () {

        this.resource = this.$resource('api/contract/accounts/:id');
        this.config.filter = _.extend({order: 'customer_number asc'}, this.config.filter);

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
    },

    methods: {

        active: function (account) {
            return this.selected.indexOf(account.id) != -1;
        },

        save: function (account) {
            this.resource.save({id: account.id}, {account: account}).then(function () {
                this.load();
                this.$notify(this.$trans('Accounts saved.'));
            }, function (res) {
                this.load();
                this.$notify(res.data, 'danger');
            });
        },

        status: function (name) {

            var accounts = this.getSelected();

            accounts.forEach(function (account) {
                account.status_id = name;
            });

            this.resource.save({id: 'bulk'}, {accounts: accounts}).then(function () {
                this.load();
                this.$notify(this.$trans('Accounts saved.'));
            }, function (res) {
                this.load();
                this.$notify(res.data, 'danger');
            });
        },

        remove: function () {
            this.resource.delete({id: 'bulk'}, {ids: this.selected}).then(function () {
                this.load();
                this.$notify(this.$trans('Accounts deleted.'));
            }, function (res) {
                this.load();
                this.$notify(res.data, 'danger');
            });
        },

        toggleParticipation: function (account) {
            account.participated = !!account.participated ? 0 : 1;
            this.save(account);
        },
        toggleMultipleVisit: function (account) {
            account.visitedMultiple = !!account.visitedMultiple ? 0 : 1;
            this.save(account);
        },

        load: function (page) {

            page = page !== undefined ? page : this.config.page;

            this.resource.query({filter: this.config.filter, page: page}).then( function (res) {
                console.log(res.data);
                var data = res.data;

                this.$set('accounts', data.accounts);
                this.$set('pages', data.pages);
                this.$set('count', data.count);
                this.$set('config.page', page);
                this.$set('selected', []);
            }, function () {
                this.$notify('Loading failed.', 'danger');
            });
        },

        getSelected: function () {
            return this.accounts.filter(function (account) {
                return this.selected.indexOf(account.id) !== -1;
            }, this);
        }

    }

};

Vue.ready(module.exports);