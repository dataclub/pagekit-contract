!function (t) {
    function e(s) {
        if (i[s])return i[s].exports;
        var n = i[s] = {exports: {}, id: s, loaded: !1};
        return t[s].call(n.exports, n, n.exports, e), n.loaded = !0, n.exports
    }

    var i = {};
    return e.m = t, e.c = i, e.p = "", e(0)
}([function (t, e) {
    t.exports = {
        el: "#contracts", data: function () {
            return _.merge({contracts: !1, pages: 0, count: "", selected: []}, window.$data)
        }, created: function () {
            this.resource = this.$resource("api/contract/:id"), this.config.filter = _.extend({order: "name asc"}, this.config.filter)
        }, watch: {
            "config.page": "load", "config.filter": {
                handler: function () {
                    this.load(0)
                }, deep: !0
            }
        }, computed: {
            statuses: function () {
                var t = [{text: this.$trans("New"), value: "new"}].concat(_.map(this.config.statuses, function (t, e) {
                    return {text: t, value: e}
                }));
                return [{label: this.$trans("Filter by"), options: t}]
            }, roles: function () {
                var t = this.config.roles.map(function (t) {
                    return {text: t.name, value: t.id}
                });
                return [{label: this.$trans("Filter by"), options: t}]
            }
        }, methods: {
            active: function (t) {
                return -1 != this.selected.indexOf(t.id)
            }, save: function (t) {
                this.resource.save({id: t.id}, {contract: t}).then(function () {
                    this.load(), this.$notify("User saved.")
                }, function (t) {
                    this.load(), this.$notify(t.data, "danger")
                })
            }, status: function (t) {
                var e = this.getSelected();
                e.forEach(function (e) {
                    e.status = t
                }), this.resource.save({id: "bulk"}, {contracts: e}).then(function () {
                    this.load(), this.$notify("Users saved.")
                }, function (t) {
                    this.load(), this.$notify(t.data, "danger")
                })
            }, remove: function () {
                this.resource["delete"]({id: "bulk"}, {ids: this.selected}).then(function () {
                    this.load(), this.$notify("Users deleted.")
                }, function (t) {
                    this.load(), this.$notify(t.data, "danger")
                })
            }, toggleStatus: function (t) {
                t.status = t.status ? 0 : 1, this.save(t)
            }, showVerified: function (t) {
                return this.config.emailVerification && t.data.verified
            }, showRoles: function (t) {
                return _.reduce(t.roles, function (t, e) {
                    var i = _.find(this.config.roles, "id", e);
                    return 2 !== e && i && t.push(i.name), t
                }, [], this).join(", ")
            }, load: function (t) {
                t = void 0 !== t ? t : this.config.page, this.resource.query({
                    filter: this.config.filter,
                    page: t
                }).then(function (e) {
                    var i = e.data;
                    this.$set("contracts", i.contracts), this.$set("pages", i.pages), this.$set("count", i.count), this.$set("config.page", t), this.$set("selected", [])
                }, function () {
                    this.$notify("Loading failed.", "danger")
                })
            }, getSelected: function () {
                return this.contracts.filter(function (t) {
                    return -1 !== this.selected.indexOf(t.id)
                }, this)
            }
        }
    }, Vue.ready(t.exports)
}]);