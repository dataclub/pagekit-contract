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
	  var id = "/Users/dataclub/public_html/pagekit/packages/pagekit/contract/app/components/contract-edit.vue"
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
	//                     <input id="form-name" class="uk-width-1-2" type="text" name="name" v-model="contract.name" v-validate:required>
	//                     <a href="#" v-show="!editingName" class="fa fa-random fa-2x uk-width-1-4" :title="'Random' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="getRandom()"></a>

	//                     <p class="uk-form-help-block uk-text-danger" v-show="form.name.invalid">{{ 'Name cannot be blank.' | trans }}</p>
	//                 </div>
	//             </div>

	//             <div class="uk-form-row">
	//                 <label for="form-status" class="uk-form-label">{{ 'Status' | trans }}</label>
	//                 <div class="uk-form-controls">
	//                     <select id="form-status" class="uk-width-1-2" v-model="contract.status_id">
	//                         <option v-for="(id, name) in data.statuses" :value="id">{{name}}</option>
	//                     </select>
	//                 </div>
	//             </div>

	//             <div class="uk-form-row">
	//                 <label for="form-place" class="uk-form-label">{{ 'Place' | trans }}</label>
	//                 <div class="uk-form-controls">
	//                     <input id="form-place" class="uk-form-width-large" type="text" name="place" v-model="contract.place" v-validate:required>
	//                     <p class="uk-form-help-block uk-text-danger" v-show="form.place.invalid">{{ 'Place cannot be blank.' | trans }}</p>
	//                 </div>
	//             </div>

	//             <div class="uk-form-row" v-if='contract.date'>
	//                 <span class="uk-form-label">{{ 'Date' | trans }}</span>
	//                 <div class="uk-form-controls uk-form-controls-text">
	//                     <p>{{ $trans('%date%', { date: contract.date ? $date(contract.date) : $trans('Never') }) }}</p>
	//                 </div>
	//             </div>

	//             <div class="uk-form-row">
	//                 <label for="form-participated" class="uk-form-label">{{ 'Participated?' | trans }}</label>
	//                 <div class="uk-form-controls">
	//                     <select id="form-participated" class="uk-width-1-2" v-model="contract.participated">
	//                         <option v-for="(id, participated) in data.participations" :value="id">{{participated}}</option>
	//                     </select>
	//                 </div>
	//             </div>

	//             <div class="uk-form-row">
	//                 <label for="form-visitedMultiple" class="uk-form-label">{{ 'Visited multiple?' | trans }}</label>
	//                 <div class="uk-form-controls">
	//                     <select id="form-visitedMultiple" class="uk-width-1-2" v-model="contract.visitedMultiple">
	//                         <option v-for="(id, visitedMultiple) in data.multipleVisits" :value="id">{{visitedMultiple}}</option>
	//                     </select>
	//                 </div>
	//             </div>

	//             <div class="uk-form-row">
	//                 <label for="form-start" class="uk-form-label">
	//                     {{ 'Start' | trans }}
	//                     <a href="#" v-show="!editingStartdate" class="pk-icon-edit pk-icon-hover" :title="'Edit Startdate' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="statusStartdate(1)"></a>
	//                     <a href="#" :class="{'uk-hidden' : (!editingStartdate)}" class="pk-icon-block pk-icon-hover" :title="'Hide Startdate' | trans" data-uk-tooltip="{delay: 500}" @click="statusStartdate(0)"></a>
	//                 </label>

	//                 <div class="uk-form-controls uk-form-controls-text" v-show="!editingStartdate">
	//                     {{ startDate ? $trans('%date%', { date: $date(startDate) }) : '-' }}
	//                 </div>
	//                 <div class="uk-form-controls" :class="{'uk-hidden' : (!editingStartdate)}">
	//                     <div class="uk-form-start">
	//                         <input-date :datetime.sync="contract.startDate" id="form-date" class="uk-form-width-large" ></input-date>
	//                         <input type="hidden" name="startDate" :value=contract.startDate @blur="status(0);">
	//                     </div>
	//                 </div>
	//             </div>

	//             <div class="uk-form-row">
	//                 <label for="form-cancellation" class="uk-form-label">
	//                     {{ 'Cancellation' | trans }}
	//                     <a href="#" v-show="!editingCancellationdate" class="pk-icon-edit pk-icon-hover" :title="'Edit Cancellationdate' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="statusCancellationdate(1)"></a>
	//                     <a href="#" :class="{'uk-hidden' : (!editingCancellationdate)}" class="pk-icon-block pk-icon-hover" :title="'Hide Cancellationdate' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="statusCancellationdate(0)"></a>
	//                 </label>

	//                 <div class="uk-form-controls uk-form-controls-text" v-show="!editingCancellationdate">
	//                     {{ cancellationDate ? $trans('%date%', { date: $date(cancellationDate) }) : '-' }}
	//                 </div>
	//                 <div class="uk-form-controls" :class="{'uk-hidden' : (!editingCancellationdate)}">
	//                     <div class="uk-form-cancellation">
	//                         <input-date :datetime.sync="contract.cancellationDate" id="form-date" class="uk-form-width-large" ></input-date>
	//                     </div>
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

	    props: ['contract', 'data', 'config', 'form'],

	    data: function data() {
	        var data = window.$data.contract;

	        var startDate = data.startDate;
	        var cancellationDate = data.cancellationDate;

	        data.startDate = data.startDate == null ? new Date() : data.startDate;
	        data.cancellationDate = data.cancellationDate == null ? new Date() : data.cancellationDate;

	        return {
	            data: window.$data,
	            contract: data,
	            sections: [],
	            editingStartdate: false,
	            editingCancellationdate: false,
	            startDate: startDate,
	            cancellationDate: cancellationDate,
	            saved: false,
	            newStartDateValue: data.startDate,
	            oldStartDateValue: startDate,
	            newCancellationDateValue: data.cancellationDate,
	            oldCancellationDateValue: cancellationDate,
	            editingName: data.name ? true : false
	        };
	    },

	    ready: function ready() {
	        UIkit.init(this.$el);
	    },
	    methods: {
	        statusStartdate: function statusStartdate(value) {
	            this.$data.editingStartdate = value;

	            if (value) {
	                this.contract.startDate = this.$data.newStartDateValue == null ? new Date() : this.$data.newStartDateValue;
	            } else {
	                this.$data.newStartDateValue = this.contract.startDate;
	            }
	        },
	        statusCancellationdate: function statusCancellationdate(value) {
	            this.$data.editingCancellationdate = value;

	            if (value) {
	                this.contract.cancellationDate = this.$data.newCancellationDateValue == null ? new Date() : this.$data.newCancellationDateValue;;
	            } else {
	                this.$data.newCancellationDateValue = this.contract.cancellationDate;
	            }
	        },
	        getRandom: function getRandom() {
	            this.contract.name = "a";
	            this.$data.editingName = true;
	        }

	    },

	    computed: {},

	    events: {
	        save: function save(data) {
	            this.$data.oldStartDateValue = this.$data.editingStartdate && this.$data.oldStartDateValue == null ? data.contract.startDate : this.$data.oldStartDateValue;
	            this.$data.newStartDateValue = data.contract.startDate;
	            data.contract.startDate = this.$data.editingStartdate ? this.$data.newStartDateValue : this.$data.oldStartDateValue;

	            this.$data.oldCancellationDateValue = this.$data.editingCancellationdate && this.$data.oldCancellationDateValue == null ? data.contract.cancellationDate : this.$data.oldCancellationDateValue;
	            this.$data.newCancellationDateValue = data.contract.cancellationDate;
	            data.contract.cancellationDate = this.$data.editingCancellationdate ? this.$data.newCancellationDateValue : this.$data.oldCancellationDateValue;

	            this.$data.saved = true;
	        }
	    }

	};

	// </script>

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-grid\" data-uk-grid-margin>\n        <div class=\"uk-width-medium-2-3 uk-width-large-3-4\">\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-name\" class=\"uk-form-label\">{{ 'Name' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <input id=\"form-name\" class=\"uk-width-1-2\" type=\"text\" name=\"name\" v-model=\"contract.name\" v-validate:required>\n                    <a href=\"#\" v-show=\"!editingName\" class=\"fa fa-random fa-2x uk-width-1-4\" :title=\"'Random' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"getRandom()\"></a>\n\n                    <p class=\"uk-form-help-block uk-text-danger\" v-show=\"form.name.invalid\">{{ 'Name cannot be blank.' | trans }}</p>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-status\" class=\"uk-form-label\">{{ 'Status' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <select id=\"form-status\" class=\"uk-width-1-2\" v-model=\"contract.status_id\">\n                        <option v-for=\"(id, name) in data.statuses\" :value=\"id\">{{name}}</option>\n                    </select>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-place\" class=\"uk-form-label\">{{ 'Place' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <input id=\"form-place\" class=\"uk-form-width-large\" type=\"text\" name=\"place\" v-model=\"contract.place\" v-validate:required>\n                    <p class=\"uk-form-help-block uk-text-danger\" v-show=\"form.place.invalid\">{{ 'Place cannot be blank.' | trans }}</p>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\" v-if='contract.date'>\n                <span class=\"uk-form-label\">{{ 'Date' | trans }}</span>\n                <div class=\"uk-form-controls uk-form-controls-text\">\n                    <p>{{ $trans('%date%', { date: contract.date ? $date(contract.date) : $trans('Never') }) }}</p>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-participated\" class=\"uk-form-label\">{{ 'Participated?' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <select id=\"form-participated\" class=\"uk-width-1-2\" v-model=\"contract.participated\">\n                        <option v-for=\"(id, participated) in data.participations\" :value=\"id\">{{participated}}</option>\n                    </select>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-visitedMultiple\" class=\"uk-form-label\">{{ 'Visited multiple?' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <select id=\"form-visitedMultiple\" class=\"uk-width-1-2\" v-model=\"contract.visitedMultiple\">\n                        <option v-for=\"(id, visitedMultiple) in data.multipleVisits\" :value=\"id\">{{visitedMultiple}}</option>\n                    </select>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-start\" class=\"uk-form-label\">\n                    {{ 'Start' | trans }}\n                    <a href=\"#\" v-show=\"!editingStartdate\" class=\"pk-icon-edit pk-icon-hover\" :title=\"'Edit Startdate' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"statusStartdate(1)\"></a>\n                    <a href=\"#\" :class=\"{'uk-hidden' : (!editingStartdate)}\" class=\"pk-icon-block pk-icon-hover\" :title=\"'Hide Startdate' | trans\" data-uk-tooltip=\"{delay: 500}\" @click=\"statusStartdate(0)\"></a>\n                </label>\n\n                <div class=\"uk-form-controls uk-form-controls-text\" v-show=\"!editingStartdate\">\n                    {{ startDate ? $trans('%date%', { date: $date(startDate) }) : '-' }}\n                </div>\n                <div class=\"uk-form-controls\" :class=\"{'uk-hidden' : (!editingStartdate)}\">\n                    <div class=\"uk-form-start\">\n                        <input-date :datetime.sync=\"contract.startDate\" id=\"form-date\" class=\"uk-form-width-large\" ></input-date>\n                        <input type=\"hidden\" name=\"startDate\" :value=contract.startDate @blur=\"status(0);\">\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-cancellation\" class=\"uk-form-label\">\n                    {{ 'Cancellation' | trans }}\n                    <a href=\"#\" v-show=\"!editingCancellationdate\" class=\"pk-icon-edit pk-icon-hover\" :title=\"'Edit Cancellationdate' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"statusCancellationdate(1)\"></a>\n                    <a href=\"#\" :class=\"{'uk-hidden' : (!editingCancellationdate)}\" class=\"pk-icon-block pk-icon-hover\" :title=\"'Hide Cancellationdate' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"statusCancellationdate(0)\"></a>\n                </label>\n\n                <div class=\"uk-form-controls uk-form-controls-text\" v-show=\"!editingCancellationdate\">\n                    {{ cancellationDate ? $trans('%date%', { date: $date(cancellationDate) }) : '-' }}\n                </div>\n                <div class=\"uk-form-controls\" :class=\"{'uk-hidden' : (!editingCancellationdate)}\">\n                    <div class=\"uk-form-cancellation\">\n                        <input-date :datetime.sync=\"contract.cancellationDate\" id=\"form-date\" class=\"uk-form-width-large\" ></input-date>\n                    </div>\n                </div>\n            </div>\n\n\n        </div>\n\n    </div>";

/***/ }
/******/ ]);