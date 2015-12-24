window.Contract = module.exports = {

    data: function() {
        return {
            data: window.$data,
            contract: window.$data.contract
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
        this.tab = UIkit.tab(this.$$.tab, {connect: this.$$.content});
    },

    computed: {

        statuses: function() {
            return _.map(this.data.statuses, function(status, id) { return { text: status, value: id }; } );
        },

        authors: function() {
            return this.data.authors.map(function(user) { return { text: user.username, value: user.id }; });
        }

    },

    methods: {

        save: function (e) {
            e.preventDefault();

            this.resource.save({ id: this.contract.id }, { contract: this.contract, id: this.contract.id }, function (data) {

                if (!this.contract.id) {
                    window.history.replaceState({}, '', this.$url.route('admin/contract/edit', {id: data.contract.id}))
                }

                this.$set('contract', data.contract);

                this.$notify('Contract saved.');

            }, function (data) {
                this.$notify(data, 'danger');
            });
        }

    },

    components: {

        'settings': require('../../components/contract-settings.vue')

    }

};

$(function () {

    new Vue(module.exports).$mount('#contract');

});
