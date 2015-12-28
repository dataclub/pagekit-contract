/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

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

	            this.$resource('api/contracts/:id').save({id: this.contract.id}, data).then(function (res) {
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

	        settings: __webpack_require__(5)

	    }

	};

	Vue.ready(window.Contract);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(6)
	__vue_template__ = __webpack_require__(7)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/dataclub/public_html/pagekit/packages/pagekit/contract/app/components/user-settings.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	// <template>

	//     <div class="uk-grid" data-uk-grid-margin>
	//         <div class="uk-width-medium-2-3 uk-width-large-3-4">

	//             <div class="uk-form-row">
	//                 <label for="form-name" class="uk-form-label">{{ 'Name' | trans }}</label>
	//                 <div class="uk-form-controls">
	//                     <input id="form-name" class="uk-form-width-large" type="text" name="name" v-model="contract.name" v-validate:required>
	//                     <p class="uk-form-help-block uk-text-danger" v-show="form.name.invalid">{{ 'Name cannot be blank.' | trans }}</p>
	//                 </div>
	//             </div>

	//             <div class="uk-form-row">
	//                 <label for="form-place" class="uk-form-label">{{ 'Place' | trans }}</label>
	//                 <div class="uk-form-controls">
	//                     <input id="form-place" class="uk-form-width-large" type="text" name="place" v-model="contract.place" v-validate:required>
	//                     <p class="uk-form-help-block uk-text-danger" v-show="form.place.invalid">{{ 'Place cannot be blank.' | trans }}</p>
	//                 </div>
	//             </div>

	//             <div class="uk-form-row">
	//                 <span class="uk-form-label">{{ 'Status' | trans }}</span>
	//                 <div class="uk-form-controls uk-form-controls-text">
	//                     <p class="uk-form-controls-condensed" v-for="status in config.statuses">
	//                         <label><input type="radio" v-model="contract.status" :value="parseInt($key)" :disabled="config.currentUser == contract.id"> {{ status }}</label>
	//                     </p>
	//                 </div>
	//             </div>

	//             <div class="uk-form-row" v-if='contract.date'>
	//                 <span class="uk-form-label">{{ 'Date' | trans }}</span>
	//                 <div class="uk-form-controls uk-form-controls-text">
	//                     <p>{{ $trans('%date%', { date: contract.date ? $date(contract.date) : $trans('Never') }) }}</p>
	//                 </div>
	//             </div>

	//             <div class="uk-form-row" v-if='contract.startDate'>
	//                 <span class="uk-form-label">{{ 'Start' | trans }}</span>
	//                 <div class="uk-form-controls uk-form-controls-text">
	//                     {{ contract.startDate ? $trans('%date%', { date: $date(contract.startDate) }) : '-' }}
	//                 </div>
	//             </div>

	//             <div class="uk-form-row" v-if='contract.cancellationDate'>
	//                 <span class="uk-form-label">{{ 'Cancellation' | trans }}</span>
	//                 <div class="uk-form-controls uk-form-controls-text">
	//                     {{ contract.cancellationDate ? $trans('%date%', { date: $date(contract.cancellationDate) }) : '-' }}
	//                 </div>
	//             </div>

	//         </div>

	//     </div>

	// </template>

	// <script>

	module.exports = {

	    section: {
	        label: 'Contract'
	    },

	    props: ['contract', 'config', 'form'],

	    data: function data() {
	        return { password: '', hidePassword: true, editingPassword: false };
	    },

	    ready: function ready() {
	        UIkit.init(this.$el);
	    },

	    computed: {

	        isNew: function isNew() {
	            return !this.contract.date && this.contract.status;
	        }

	    },

	    events: {

	        save: function save(data) {}

	    }

	};

	// </script>

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-grid\" data-uk-grid-margin>\n        <div class=\"uk-width-medium-2-3 uk-width-large-3-4\">\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-name\" class=\"uk-form-label\">{{ 'Name' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <input id=\"form-name\" class=\"uk-form-width-large\" type=\"text\" name=\"name\" v-model=\"contract.name\" v-validate:required>\n                    <p class=\"uk-form-help-block uk-text-danger\" v-show=\"form.name.invalid\">{{ 'Name cannot be blank.' | trans }}</p>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-place\" class=\"uk-form-label\">{{ 'Place' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <input id=\"form-place\" class=\"uk-form-width-large\" type=\"text\" name=\"place\" v-model=\"contract.place\" v-validate:required>\n                    <p class=\"uk-form-help-block uk-text-danger\" v-show=\"form.place.invalid\">{{ 'Place cannot be blank.' | trans }}</p>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <span class=\"uk-form-label\">{{ 'Status' | trans }}</span>\n                <div class=\"uk-form-controls uk-form-controls-text\">\n                    <p class=\"uk-form-controls-condensed\" v-for=\"status in config.statuses\">\n                        <label><input type=\"radio\" v-model=\"contract.status\" :value=\"parseInt($key)\" :disabled=\"config.currentUser == contract.id\"> {{ status }}</label>\n                    </p>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\" v-if='contract.date'>\n                <span class=\"uk-form-label\">{{ 'Date' | trans }}</span>\n                <div class=\"uk-form-controls uk-form-controls-text\">\n                    <p>{{ $trans('%date%', { date: contract.date ? $date(contract.date) : $trans('Never') }) }}</p>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\" v-if='contract.startDate'>\n                <span class=\"uk-form-label\">{{ 'Start' | trans }}</span>\n                <div class=\"uk-form-controls uk-form-controls-text\">\n                    {{ contract.startDate ? $trans('%date%', { date: $date(contract.startDate) }) : '-' }}\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\" v-if='contract.cancellationDate'>\n                <span class=\"uk-form-label\">{{ 'Cancellation' | trans }}</span>\n                <div class=\"uk-form-controls uk-form-controls-text\">\n                    {{ contract.cancellationDate ? $trans('%date%', { date: $date(contract.cancellationDate) }) : '-' }}\n                </div>\n            </div>\n\n        </div>\n\n    </div>";

/***/ }
/******/ ]);