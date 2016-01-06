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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(25)
	__vue_template__ = __webpack_require__(26)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/dataclub/public_html/pagekit/packages/pagekit/pagekit-contract/app/components/link.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 25:
/***/ function(module, exports) {

	'use strict';

	// <template>

	//     <div class="uk-form-row">
	//         <label for="form-name" class="uk-form-label">{{ 'Name' | trans }}</label>
	//         <div class="uk-form-controls">
	//             <input id="form-name" type="text" class="uk-form-width-large" v-model="name"></input>
	//         </div>
	//     </div>

	// </template>

	// <script>

	module.exports = {

	    link: {
	        label: 'Contract'
	    },

	    props: ['link'],

	    data: function data() {
	        return {
	            name: []
	        };
	    },

	    watch: {

	        name: function name(_name) {
	            this.link = '@contract/name?name=' + _name;
	        }

	    }

	};

	window.Links.components['contract'] = module.exports;

	// </script>

/***/ },

/***/ 26:
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-form-row\">\n        <label for=\"form-name\" class=\"uk-form-label\">{{ 'Name' | trans }}</label>\n        <div class=\"uk-form-controls\">\n            <input id=\"form-name\" type=\"text\" class=\"uk-form-width-large\" v-model=\"name\"></input>\n        </div>\n    </div>";

/***/ }

/******/ });