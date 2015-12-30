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
/***/ function(module, exports) {

	module.exports = {

	    el: '#contracts',

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
	        this.config.filter = _.extend({order: 'name asc'}, this.config.filter);

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
	        statusOptions: function () {

	            var options = _.map(this.$data.statuses, function (status, id) {
	                return {text: status, value: id};
	            });

	            return [{label: this.$trans('Filter by'), options: options}];
	        },

	        authors: function() {
	            var options = _.map(this.$data.authors, function (author) {

	                return { text: author.username, value: author.user_id };
	            });

	            return [{ label: this.$trans('Filter by'), options: options }];
	        },
	    },

	    methods: {

	        active: function (contract) {
	            return this.selected.indexOf(contract.id) != -1;
	        },

	        save: function (contract) {
	            this.resource.save({id: contract.id}, {contract: contract}).then(function () {
	                this.load();
	                this.$notify('Contracts saved.');
	            }, function (res) {
	                this.load();
	                this.$notify(res.data, 'danger');
	            });
	        },

	        status: function (status) {

	            var contracts = this.getSelected();

	            contracts.forEach(function (contract) {
	                contract.status = status;
	            });

	            this.resource.save({id: 'bulk'}, {contracts: contracts}).then(function () {
	                this.load();
	                this.$notify('Contracts saved.');
	            }, function (res) {
	                this.load();
	                this.$notify(res.data, 'danger');
	            });
	        },

	        remove: function () {
	            this.resource.delete({id: 'bulk'}, {ids: this.selected}).then(function () {
	                this.load();
	                this.$notify('Contracts deleted.');
	            }, function (res) {
	                this.load();
	                this.$notify(res.data, 'danger');
	            });
	        },

	        toggleStatus: function (contract) {
	            contract.status = !!contract.status ? 0 : 1;
	            this.save(contract);
	        },

	        showVerified: function (contract) {
	            return this.config.emailVerification && contract.data.verified;
	        },

	        showRoles: function (contract) {
	            return _.reduce(contract.roles, function (roles, id) {
	                var role = _.find(this.config.roles, 'id', id);
	                if (id !== 2 && role) {
	                    roles.push(role.name);
	                }
	                return roles;
	            }, [], this).join(', ');
	        },

	        load: function (page) {

	            page = page !== undefined ? page : this.config.page;

	            this.resource.query({filter: this.config.filter, page: page}).then( function (res) {
	                console.log(res.data);
	                var data = res.data;

	                this.$set('contracts', data.contracts);
	                this.$set('pages', data.pages);
	                this.$set('count', data.count);
	                this.$set('config.page', page);
	                this.$set('selected', []);
	            }, function () {
	                this.$notify('Loading failed.', 'danger');
	            });
	        },

	        getSelected: function () {
	            return this.contracts.filter(function (contract) {
	                return this.selected.indexOf(contract.id) !== -1;
	            }, this);
	        }

	    }

	};

	Vue.ready(module.exports);

/***/ }
/******/ ]);