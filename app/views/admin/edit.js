window.Contract = {

    el: '#contract',

    data: function () {
        return _.extend({sections: [], form: {}}, window.$data);
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

    },

    ready: function () {
        this.tab = UIkit.tab(this.$els.tab, {connect: this.$els.content});
    },

    methods: {

        save: function () {

            var data = {contract: this.contract};

            this.$broadcast('save', data);

            this.$resource('api/contract/:id').save({id: this.contract.id}, data).then(function (res) {
                    if (!this.contract.id) {
                        window.history.replaceState({}, '', this.$url.route('/admin/contract/edit', {id: res.data.contract.id}))
                    }

                    this.$set('contract', res.data.contract);

                    this.$notify('Contract saved.');
                }, function (res) {
                    this.$notify(res.data, 'danger');
                }
            );

        }

    },

    components: {

        settings: require('../../components/user-settings.vue')

    }

};

Vue.ready(window.Contract);
