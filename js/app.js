webpackJsonp([10],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

module.exports = {"name":"alighieri","productName":"Alighieri","version":"0.4.2","description":"A distraction-free tool for novelists and writers","author":{"name":"Emanuele Bertoldi","email":"emanuele.bertoldi@gmail.com"},"license":"MIT","repository":{"type":"git","url":"git@github.com:zuck/alighieri.git"},"scripts":{"clean":"node build/script.clean.js","dev":"node build/script.dev.js","build":"node build/script.build.js","build-electron":"node build/script.build.js target=electron-renderer","package-electron":"npm run build-electron && cd electron && quasar build","lint":"eslint --ext .js,.vue src","deploy":"npm run build && gh-pages -d dist"},"dependencies":{"babel-runtime":"^6.25.0","quasar-extras":"0.x","quasar-framework":"^0.14.1","vue":"~2.3.4","vue-router":"^2.7.0","font-awesome":"^4.7.0","vue2-medium-editor":"^1.1.1","medium-editor-autolist":"^1.0.1","medium-editor-autohr":"^0.2.0","showdown":"^1.7.3","to-markdown":"^3.0.1","file-saver":"^1.3.3","is-electron":"^2.1.0","vue-electron":"^1.0.6","screenfull":"^3.3.1"},"devDependencies":{"autoprefixer":"^6.4.0","babel-core":"^6.0.0","babel-eslint":"^7.0.0","babel-loader":"^7.0.0","babel-plugin-transform-runtime":"^6.0.0","babel-preset-es2015":"^6.0.0","babel-preset-stage-2":"^6.0.0","colors":"^1.1.2","connect-history-api-fallback":"^1.1.0","css-loader":"^0.28.0","es6-promise":"^4.1.1","eslint":"^4.4.1","eslint-config-standard":"^10.2.1","eslint-friendly-formatter":"^3.0.0","eslint-loader":"^1.9.0","eslint-plugin-html":"^3.1.1","eslint-plugin-import":"^2.7.0","eslint-plugin-node":"^5.1.1","eslint-plugin-promise":"^3.5.0","eslint-plugin-standard":"^3.0.1","eventsource-polyfill":"^0.9.6","express":"^4.15.4","extract-text-webpack-plugin":"^3.0.0","file-loader":"^0.11.1","friendly-errors-webpack-plugin":"^1.1.3","glob":"^7.1.2","html-webpack-plugin":"^2.30.1","http-proxy-middleware":"^0.17.0","json-loader":"^0.5.7","opn":"^5.0.0","optimize-css-assets-webpack-plugin":"^3.0.0","postcss-loader":"^1.0.0","progress-bar-webpack-plugin":"^1.10.0","purify-css":"^1.2.6","shelljs":"^0.7.0","stylus":"^0.54.5","stylus-loader":"^3.0.1","url-loader":"^0.5.7","vue-loader":"~12.2.2","vue-style-loader":"^3.0.1","vue-template-compiler":"~2.3.4","webpack":"^3.5.2","webpack-dev-middleware":"^1.12.0","webpack-hot-middleware":"^2.18.2","webpack-merge":"^4.1.0","gh-pages":"^1.0.0","raw-loader":"^0.5.1","electron":"^1.7.5"}}

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_electron__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_is_electron__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_is_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_is_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_quasar__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_quasar_extras_material_icons__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_quasar_extras_material_icons___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_quasar_extras_material_icons__);
__webpack_require__(8);
__webpack_require__(10);
__webpack_require__(13);







__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;

__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_3_quasar__["s" /* default */]);

if (__WEBPACK_IMPORTED_MODULE_2_is_electron___default()()) {
  __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_electron___default.a);
}

if (true) {
  __webpack_require__(21);
}



__WEBPACK_IMPORTED_MODULE_3_quasar__["s" /* default */].start(function () {
  new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
    el: '#q-app',
    router: __WEBPACK_IMPORTED_MODULE_4__router__["a" /* default */],
    render: function render(h) {
      return h(__webpack_require__(25));
    }
  });
});

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(19);



__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

function load(component) {
  return function () {
    return __webpack_require__(20)("./" + component + '.vue');
  };
}

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({

  routes: [{ path: '/', component: load('Writer') }, { path: '*', component: load('Error404') }]
}));

/***/ }),
/* 19 */,
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./AboutModal.vue": [
		32,
		3
	],
	"./Error404.vue": [
		38,
		8
	],
	"./ExportModal.vue": [
		33,
		7
	],
	"./LeftMenu.vue": [
		34,
		6
	],
	"./SaveAsModal.vue": [
		35,
		5
	],
	"./SaveStatus.vue": [
		31,
		4
	],
	"./SettingsModal.vue": [
		36,
		1
	],
	"./Toolbar.vue": [
		37,
		2
	],
	"./Writer.vue": [
		39,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 20;
module.exports = webpackAsyncContext;

/***/ }),
/* 21 */,
/* 22 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 23 */,
/* 24 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(26)
}
var Component = __webpack_require__(4)(
  /* script */
  __webpack_require__(27),
  /* template */
  __webpack_require__(28),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 26 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__package_json__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__package_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__package_json__);




/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function mounted() {
    document.title = __WEBPACK_IMPORTED_MODULE_0__package_json__["productName"] || __WEBPACK_IMPORTED_MODULE_0__package_json__["name"] || 'Quasar App';
  }
});

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "q-app"
    }
  }, [_c('router-view')], 1)
},staticRenderFns: []}

/***/ })
],[7]);