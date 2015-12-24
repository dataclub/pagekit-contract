!function (s) {
    function e(a) {
        if (r[a])return r[a].exports;
        var t = r[a] = {exports: {}, id: a, loaded: !1};
        return s[a].call(t.exports, t, t.exports, e), t.loaded = !0, t.exports
    }

    var r = {};
    return e.m = s, e.c = r, e.p = "", e(0)
}({
    0: function (s, e, r) {
        window.Contract = {
            el: "#contract", data: function () {
                return _.extend({sections: [], form: {}}, window.$data)
            }, created: function () {
                var s = [];
                _.forIn(this.$options.components, function (e, r) {
                    var a = e.options || {};
                    a.section && s.push(_.extend({name: r, priority: 0}, a.section))
                }), this.$set("sections", _.sortBy(s, "priority"))
            }, ready: function () {
                this.tab = UIkit.tab(this.$els.tab, {connect: this.$els.content})
            }, methods: {
                save: function () {
                    var s = {contract: this.contract};
                    this.$broadcast("save", s), this.$resource("api/contract/:id").save({id: this.contract.id}, s).then(function (s) {
                        this.contract.id || window.history.replaceState({}, "", this.$url.route("admin/contract/edit", {id: s.data.contract.id})), this.$set("contract", s.data.contract), this.$notify("Contract saved.")
                    }, function (s) {
                        this.$notify(s.data, "danger")
                    })
                }
            }, components: {settings: r(14)}
        }, Vue.ready(window.Contract)
    }, 7: function (s, e) {
        "use strict";
        s.exports = {
            section: {label: "Contract"}, props: ["contract", "config", "form"], data: function () {
                return {password: "", hidePassword: !0, editingPassword: !1}
            }, ready: function () {
                UIkit.init(this.$el)
            }, computed: {
                isNew: function () {
                    return !this.contract.date && this.contract.status
                }
            }, events: {
                save: function (s) {
                    s.password = this.password
                }
            }
        }
    }, 11: function (s, e) {
        s.exports =
        "<div class=uk-grid data-uk-grid-margin><div class=\"uk-width-medium-2-3 uk-width-large-3-4\">" +
        "<div class=uk-form-row><label for=form-name class=uk-form-label>{{ 'Name' | trans }}</label><div class=uk-form-controls><input id=form-name class=uk-form-width-large name=name v-model=contract.name v-validate:required><p class=\"uk-form-help-block uk-text-danger\" v-show=form.name.invalid>{{ 'Name cannot be blank.' | trans }}</p></div></div>" +
        "<div class=uk-form-row><span class=uk-form-label>{{ 'Status' | trans }}</span><div class=\"uk-form-controls uk-form-controls-text\"><p class=uk-form-controls-condensed v-for=\"status in config.statuses\"><label><input type=radio v-model=contract.status :value=parseInt($key) :disabled=\"config.currentUser == contract.id\"> {{ status }}</label></p></div></div>" +
        "<div class=uk-form-row><label for=form-place class=uk-form-label>{{ 'Place' | trans }}</label><div class=uk-form-controls><input id=form-place class=uk-form-width-large name=place v-model=contract.place v-validate:required><p class=\"uk-form-help-block uk-text-danger\" v-show=form.name.invalid>{{ 'Place cannot be blank.' | trans }}</p></div></div>" +
        "<div class=uk-form-row v-if='contract.date'><span class=uk-form-label>{{ 'Date' | trans }}</span><div class=\"uk-form-controls uk-form-controls-text\"><p>{{ $trans('%date%', { date: contract.date ? $date(contract.date) : $trans('Never') }) }}</p></div></div>" +
        "<div class=uk-form-row v-if='contract.startDate'><span class=uk-form-label>{{ 'Start' | trans }}</span><div class=\"uk-form-controls uk-form-controls-text\">{{ contract.startDate ? $trans('%date%', { date: $date(contract.startDate) }) : '-' }}</div></div>" +
        "<div class=uk-form-row v-if='contract.cancellationDate'><span class=uk-form-label>{{ 'Cancellation' | trans }}</span><div class=\"uk-form-controls uk-form-controls-text\">{{ contract.cancellationDate ? $trans('%date%', { date: $date(contract.cancellationDate) }) : '-' }}</div></div>" +

        "</div></div>"
    }, 14: function (s, e, r) {
        s.exports = r(7), s.exports.__esModule && (s.exports = s.exports["default"]), ("function" == typeof s.exports ? s.exports.options : s.exports).template = r(11)
    }
});