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

	    computed: {},
	    methods: {
	        save: function () {
	            var data = {contract: this.contract, id: this.contract.id};

	            this.$broadcast('save', data);

	            this.resource.save({id: this.contract.id}, data, function (data) {
	                if(data.message == 'error'){
	                    this.$notify(this.$trans(data.content));
	                    return;
	                }

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
	        }
	    },

	    components: {
	        settings: __webpack_require__(1)

	    }

	};

	Vue.component('select-option', __webpack_require__(4));
	Vue.ready(window.Contract);




/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(2)
	__vue_template__ = __webpack_require__(3)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/dataclub/public_html/pagekit/packages/pagekit/pagekit-contract/app/components/contract-edit.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	// <template>

	//     <div class="uk-grid" data-uk-grid-margin>
	//         <div class="uk-width-medium-2-3 uk-width-large-3-4">

	//             <div class="uk-form-row">
	//                 <label for="form-name" class="uk-form-label">{{ 'Name' | trans }}</label>
	//                 <div class="uk-form-controls">
	//                     <input id="form-name" class="uk-width-1-2" type="text" name="name" v-model="contract.name" v-validate:required >
	//                     <a href="#" v-show="editingName || form.name.invalid" class="fa fa-refresh fa-2x uk-width-1-4" :title="'Refresh random' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="getRandom('form-name', 'name', form.name)"></a>
	//                     <a href="#" v-show="!editingName && !form.name.invalid" class="fa fa-remove fa-2x uk-width-1-4" :title="'Remove random' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="clearRandom('form-name', 'name', form.name)"></a>

	//                     <p class="uk-form-help-block uk-text-danger" v-show="form.name.invalid">{{ 'Name cannot be blank.' | trans }}</p>
	//                 </div>
	//             </div>

	//             <div class="uk-form-row">
	//                 <label for="form-status" class="uk-form-label">{{ 'Status' | trans }}</label>
	//                 <select-option :contract.sync="contract" :title="'Status'" :id="'form-status'" :status="false" :name="'status'" :options="data.statuses" :value="contract.status_id"></select-option>
	//             </div>

	//             <div class="uk-form-row">
	//                 <label for="form-version" class="uk-form-label">{{ 'Version' | trans }}</label>
	//                 <select-option :contract.sync="contract" :title="'Version'" :id="'form-version'" :status="false" :name="'version'" :options="data.versions" :value="contract.version_id"></select-option>
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
	            editingName: data.name == null
	        };
	    },
	    created: function created() {
	        this.resource = this.$resource('api/contract/:id');
	    },
	    ready: function ready() {
	        UIkit.init(this.$el);

	        String.prototype.capitalize = function () {
	            return this.charAt(0).toUpperCase() + this.slice(1);
	        };
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
	        getRandom: function getRandom(elementID, elementName, formElement) {
	            if ($('#' + elementID)) {
	                var data = { contract: this.contract, id: this.contract.id };
	                this.$broadcast('getRandom', data);
	                this.resource.save({ id: 'random' }, data, function (data) {
	                    var editingField = 'editing' + elementName.capitalize();
	                    this.$data[editingField] = false;
	                    formElement.valid = true;
	                    formElement.invalid = false;

	                    this.$set('contract', data.contract);
	                    this.$notify(this.$trans('Random-value set.'));
	                }, function (data) {
	                    this.$notify(data, 'danger');
	                });
	            }
	        },
	        clearRandom: function clearRandom(elementID, elementName, formElement) {
	            if ($('#' + elementID)) {
	                var editingField = 'editing' + elementName.capitalize();
	                this.$data[editingField] = true;
	                formElement.valid = false;
	                formElement.invalid = true;
	                this.contract.name = "";
	            }
	        }
	    },

	    computed: {
	        statusOptions: function statusOptions() {
	            var options = _.map(this.data.statuses, function (name, id) {
	                return { text: name, value: id };
	            });

	            return options;
	        },
	        versionOptions: function versionOptions() {
	            var options = _.map(this.data.versions, function (name, id) {
	                return { text: name, value: id };
	            });

	            return options;
	        }
	    },

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

	/* generated by vue-loader */

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "\n\n    <div class=\"uk-grid\" data-uk-grid-margin>\n        <div class=\"uk-width-medium-2-3 uk-width-large-3-4\">\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-name\" class=\"uk-form-label\">{{ 'Name' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <input id=\"form-name\" class=\"uk-width-1-2\" type=\"text\" name=\"name\" v-model=\"contract.name\" v-validate:required >\n                    <a href=\"#\" v-show=\"editingName || form.name.invalid\" class=\"fa fa-refresh fa-2x uk-width-1-4\" :title=\"'Refresh random' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"getRandom('form-name', 'name', form.name)\"></a>\n                    <a href=\"#\" v-show=\"!editingName && !form.name.invalid\" class=\"fa fa-remove fa-2x uk-width-1-4\" :title=\"'Remove random' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"clearRandom('form-name', 'name', form.name)\"></a>\n\n                    <p class=\"uk-form-help-block uk-text-danger\" v-show=\"form.name.invalid\">{{ 'Name cannot be blank.' | trans }}</p>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-status\" class=\"uk-form-label\">{{ 'Status' | trans }}</label>\n                <select-option :contract.sync=\"contract\" :title=\"'Status'\" :id=\"'form-status'\" :status=\"false\" :name=\"'status'\" :options=\"data.statuses\" :value=\"contract.status_id\"></select-option>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-version\" class=\"uk-form-label\">{{ 'Version' | trans }}</label>\n                <select-option :contract.sync=\"contract\" :title=\"'Version'\" :id=\"'form-version'\" :status=\"false\" :name=\"'version'\" :options=\"data.versions\" :value=\"contract.version_id\"></select-option>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-place\" class=\"uk-form-label\">{{ 'Place' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <input id=\"form-place\" class=\"uk-form-width-large\" type=\"text\" name=\"place\" v-model=\"contract.place\" v-validate:required>\n                    <p class=\"uk-form-help-block uk-text-danger\" v-show=\"form.place.invalid\">{{ 'Place cannot be blank.' | trans }}</p>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\" v-if='contract.date'>\n                <span class=\"uk-form-label\">{{ 'Date' | trans }}</span>\n                <div class=\"uk-form-controls uk-form-controls-text\">\n                    <p>{{ $trans('%date%', { date: contract.date ? $date(contract.date) : $trans('Never') }) }}</p>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-participated\" class=\"uk-form-label\">{{ 'Participated?' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <select id=\"form-participated\" class=\"uk-width-1-2\" v-model=\"contract.participated\">\n                        <option v-for=\"(id, participated) in data.participations\" :value=\"id\">{{participated}}</option>\n                    </select>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-visitedMultiple\" class=\"uk-form-label\">{{ 'Visited multiple?' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <select id=\"form-visitedMultiple\" class=\"uk-width-1-2\" v-model=\"contract.visitedMultiple\">\n                        <option v-for=\"(id, visitedMultiple) in data.multipleVisits\" :value=\"id\">{{visitedMultiple}}</option>\n                    </select>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-start\" class=\"uk-form-label\">\n                    {{ 'Start' | trans }}\n                    <a href=\"#\" v-show=\"!editingStartdate\" class=\"pk-icon-edit pk-icon-hover\" :title=\"'Edit Startdate' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"statusStartdate(1)\"></a>\n                    <a href=\"#\" :class=\"{'uk-hidden' : (!editingStartdate)}\" class=\"pk-icon-block pk-icon-hover\" :title=\"'Hide Startdate' | trans\" data-uk-tooltip=\"{delay: 500}\" @click=\"statusStartdate(0)\"></a>\n                </label>\n\n                <div class=\"uk-form-controls uk-form-controls-text\" v-show=\"!editingStartdate\">\n                    {{ startDate ? $trans('%date%', { date: $date(startDate) }) : '-' }}\n                </div>\n                <div class=\"uk-form-controls\" :class=\"{'uk-hidden' : (!editingStartdate)}\">\n                    <div class=\"uk-form-start\">\n                        <input-date :datetime.sync=\"contract.startDate\" id=\"form-date\" class=\"uk-form-width-large\" ></input-date>\n                        <input type=\"hidden\" name=\"startDate\" :value=contract.startDate @blur=\"status(0);\">\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"uk-form-row\">\n                <label for=\"form-cancellation\" class=\"uk-form-label\">\n                    {{ 'Cancellation' | trans }}\n                    <a href=\"#\" v-show=\"!editingCancellationdate\" class=\"pk-icon-edit pk-icon-hover\" :title=\"'Edit Cancellationdate' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"statusCancellationdate(1)\"></a>\n                    <a href=\"#\" :class=\"{'uk-hidden' : (!editingCancellationdate)}\" class=\"pk-icon-block pk-icon-hover\" :title=\"'Hide Cancellationdate' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"statusCancellationdate(0)\"></a>\n                </label>\n\n                <div class=\"uk-form-controls uk-form-controls-text\" v-show=\"!editingCancellationdate\">\n                    {{ cancellationDate ? $trans('%date%', { date: $date(cancellationDate) }) : '-' }}\n                </div>\n                <div class=\"uk-form-controls\" :class=\"{'uk-hidden' : (!editingCancellationdate)}\">\n                    <div class=\"uk-form-cancellation\">\n                        <input-date :datetime.sync=\"contract.cancellationDate\" id=\"form-date\" class=\"uk-form-width-large\" ></input-date>\n                    </div>\n                </div>\n            </div>\n\n\n        </div>\n\n    </div>\n\n";

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(5)
	__vue_template__ = __webpack_require__(18)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/dataclub/public_html/pagekit/packages/pagekit/pagekit-contract/app/components/select-option.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _keys = __webpack_require__(6);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	//     <div class="uk-form-controls">
	//         <select :id="id" :name="name" class="uk-width-1-2" v-model="contract[name+'_id']">
	//                 <option v-for="(id, name) in options" :value="id">{{name}}</option>
	//         </select>
	//         <a href="#" class="fa fa-minus fa-2x uk-width-1-4" :title="'Remove value' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="deleteOption(value)"></a>
	//         <p class="uk-form-help-block uk-text-danger" v-show="!contract[name+'_id']">{{ $trans(name.capitalize() +' cannot be blank.') }}</p>

	//     </div>
	//     <div class="uk-form-controls uk-form-controls-text" v-show="!status">
	//          <a href="#" class="fa fa-plus fa-2x uk-width-1-4" :title="'Add field' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="setField(1)"></a>
	//     </div>
	//     <div class="uk-form-controls" :class="{'uk-hidden' : (!status)}">
	//         <div :class="'uk-'+id">
	//             <input :id="id+'-add'" type="text" :name="name+'-add'">
	//             <a href="#" class="fa fa-check fa-2x uk-width-1-4" :title="'Add value' | trans" data-uk-tooltip="{delay: 500}" @click.prevent="saveOption('#'+id+'-add')"></a>
	//         </div>
	//     </div>
	// </template>

	// <script>

	module.exports = {

	    props: ['title', 'value', 'options', 'id', 'name', 'status', 'contract'],

	    created: function created() {
	        if (this.value === undefined) {
	            this.value = '';
	        }

	        String.prototype.capitalize = function () {
	            return this.charAt(0).toUpperCase() + this.slice(1);
	        };

	        this.resource = this.$resource('api/contract/:id');
	    },

	    computed: {},
	    methods: {
	        setField: function setField(value) {
	            this.status = value;
	        },
	        saveOption: function saveOption(elementID) {
	            var value = $(elementID) ? $(elementID)[0].value : '';
	            if (value == '') {
	                return;
	            }
	            var data = { contract: this.contract, id: this.contract.id };
	            data[this.name] = value;

	            this.$broadcast(this.name + 'Save', data);

	            this.resource.save({ id: this.name }, data, function (data) {
	                if (!this.contract.id) {
	                    window.history.replaceState({}, '', this.$url.route('admin/contract/edit', { id: data.contract.id }));
	                }

	                this.options = data.options;
	                this.$set('contract', data.contract);

	                this.$notify(this.$trans(this.title + ' saved.'));
	            }, function (data) {
	                this.$notify(data, 'danger');
	            });
	        },
	        deleteOption: function deleteOption(value) {
	            var keys = (0, _keys2.default)(this.options);
	            if (keys.length <= 1) {
	                this.$notify(this.$trans('It must be set one value at least.'));
	                return;
	            }
	            var data = { contract: this.contract, id: this.contract.id };
	            data[this.name + 'ID'] = value;

	            this.resource.delete({ id: this.name }, data, function (data) {

	                this.options = data.options;
	                this.$set('contract', data.contract);

	                this.$notify(this.$trans(this.title + ' deleted.'));
	            }, function (data) {
	                this.$notify(data, 'danger');
	            });
	        }
	    }

	};

	// </script>

	/* generated by vue-loader */

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(7), __esModule: true };

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(8);
	module.exports = __webpack_require__(14).Object.keys;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(9);

	__webpack_require__(11)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(10);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(12)
	  , core    = __webpack_require__(14)
	  , fails   = __webpack_require__(17);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(13)
	  , core      = __webpack_require__(14)
	  , ctx       = __webpack_require__(15)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 13 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 14 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(16);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "\n    <div class=\"uk-form-controls\">\n        <select :id=\"id\" :name=\"name\" class=\"uk-width-1-2\" v-model=\"contract[name+'_id']\">\n                <option v-for=\"(id, name) in options\" :value=\"id\">{{name}}</option>\n        </select>\n        <a href=\"#\" class=\"fa fa-minus fa-2x uk-width-1-4\" :title=\"'Remove value' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"deleteOption(value)\"></a>\n        <p class=\"uk-form-help-block uk-text-danger\" v-show=\"!contract[name+'_id']\">{{ $trans(name.capitalize() +' cannot be blank.') }}</p>\n\n    </div>\n    <div class=\"uk-form-controls uk-form-controls-text\" v-show=\"!status\">\n         <a href=\"#\" class=\"fa fa-plus fa-2x uk-width-1-4\" :title=\"'Add field' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"setField(1)\"></a>\n    </div>\n    <div class=\"uk-form-controls\" :class=\"{'uk-hidden' : (!status)}\">\n        <div :class=\"'uk-'+id\">\n            <input :id=\"id+'-add'\" type=\"text\" :name=\"name+'-add'\">\n            <a href=\"#\" class=\"fa fa-check fa-2x uk-width-1-4\" :title=\"'Add value' | trans\" data-uk-tooltip=\"{delay: 500}\" @click.prevent=\"saveOption('#'+id+'-add')\"></a>\n        </div>\n    </div>\n";

/***/ }
/******/ ]);