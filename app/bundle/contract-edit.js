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

	window.Post = module.exports = {

	    data: function() {
	        return {
	            data: window.$data,
	            post: window.$data.post
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

	        this.resource = this.$resource('api/blog/post/:id');
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

	            this.resource.save({ id: this.post.id }, { post: this.post, id: this.post.id }, function (data) {

	                if (!this.post.id) {
	                    window.history.replaceState({}, '', this.$url.route('admin/blog/post/edit', {id: data.post.id}))
	                }

	                this.$set('post', data.post);

	                this.$notify('Post saved.');

	            }, function (data) {
	                this.$notify(data, 'danger');
	            });
	        }

	    },

	    components: {

	        'settings': __webpack_require__(1)

	    }

	};

	$(function () {

	    new Vue(module.exports).$mount('#post');

	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2)
	module.exports.template = __webpack_require__(3)


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {

	        inherit: true,

	        section: {
	            label: 'Post'
	        }

	    };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"uk-grid pk-grid-large\" data-uk-grid-margin>\n        <div class=\"uk-flex-item-1\">\n\n            <div class=\"uk-form-row\">\n                <input class=\"uk-width-1-1 uk-form-large\" type=\"text\" name=\"title\" placeholder=\"{{ 'Enter Title' | trans }}\" v-model=\"post.title\" v-validate=\"required\">\n                <p class=\"uk-form-help-block uk-text-danger\" v-show=\"form.title.invalid\">{{ 'Title cannot be blank.' | trans }}</p>\n            </div>\n            <div class=\"uk-form-row\">\n                <v-editor id=\"post-content\" value=\"{{@ post.content }}\" options=\"{{ {markdown : post.data.markdown} }}\"></v-editor>\n            </div>\n            <div class=\"uk-form-row\">\n                <label class=\"uk-form-label\">{{ 'Excerpt' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <v-editor id=\"post-content\" value=\"{{@ post.excerpt }}\" options=\"{{ {markdown : post.data.markdown, height: 250} }}\"></v-editor>\n                </div>\n            </div>\n\n        </div>\n        <div class=\"pk-width-sidebar pk-width-sidebar-large\">\n\n            <div class=\"uk-panel\">\n\n                <div class=\"uk-form-row\">\n                    <label for=\"form-image\" class=\"uk-form-label\">{{ 'Image' | trans }}</label>\n                    <div class=\"uk-form-controls\">\n                        <input-image-meta image=\"{{@ post.data.image }}\" class=\"pk-image-max-height\"></input-image-meta>\n                    </div>\n                </div>\n\n                <div class=\"uk-form-row\">\n                    <label for=\"form-slug\" class=\"uk-form-label\">{{ 'Slug' | trans }}</label>\n                    <div class=\"uk-form-controls\">\n                        <input id=\"form-slug\" class=\"uk-width-1-1\" type=\"text\" v-model=\"post.slug\">\n                    </div>\n                </div>\n                <div class=\"uk-form-row\">\n                    <label for=\"form-status\" class=\"uk-form-label\">{{ 'Status' | trans }}</label>\n                    <div class=\"uk-form-controls\">\n                        <select id=\"form-status\" class=\"uk-width-1-1\" v-model=\"post.status\" options=\"statuses\"></select>\n                    </div>\n                </div>\n                <div class=\"uk-form-row\" v-if=\"data.canEditAll\">\n                    <label for=\"form-author\" class=\"uk-form-label\">{{ 'Author' | trans }}</label>\n                    <div class=\"uk-form-controls\">\n                        <select id=\"form-author\" class=\"uk-width-1-1\" v-model=\"post.user_id\" options=\"authors\"></select>\n                    </div>\n                </div>\n                <div class=\"uk-form-row\">\n                    <span class=\"uk-form-label\">{{ 'Publish on' | trans }}</span>\n                    <div class=\"uk-form-controls\">\n                        <input-date datetime=\"{{@ post.date}}\"></input-date>\n                    </div>\n                </div>\n\n                <div class=\"uk-form-row\">\n                    <span class=\"uk-form-label\">{{ 'Restrict Access' | trans }}</span>\n                    <div class=\"uk-form-controls uk-form-controls-text\">\n                        <p v-repeat=\"role: data.roles\" class=\"uk-form-controls-condensed\">\n                            <label><input type=\"checkbox\" value=\"{{ role.id }}\" v-checkbox=\"post.roles\" number> {{ role.name }}</label>\n                        </p>\n                    </div>\n                </div>\n                <div class=\"uk-form-row\">\n                    <span class=\"uk-form-label\">{{ 'Options' | trans }}</span>\n                    <div class=\"uk-form-controls\">\n                        <label><input type=\"checkbox\" v-model=\"post.data.markdown\" value=\"1\"> {{ 'Enable Markdown' | trans }}</label>\n                    </div>\n                    <div class=\"uk-form-controls\">\n                        <label><input type=\"checkbox\" v-model=\"post.comment_status\" value=\"1\"> {{ 'Enable Comments' | trans }}</label>\n                    </div>\n                </div>\n\n            </div>\n\n        </div>\n    </div>";

/***/ }
/******/ ]);