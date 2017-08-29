webpackJsonp([9],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_electron__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_is_electron__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_is_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_is_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_quasar__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__router__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_quasar_extras_material_icons__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_quasar_extras_material_icons___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_quasar_extras_material_icons__);

__webpack_require__(6);








__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;

__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_3_quasar__["q" /* default */]);

if (__WEBPACK_IMPORTED_MODULE_2_is_electron___default()()) {
  __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_electron___default.a);
}

if (true) {
  __webpack_require__(16);
}



__WEBPACK_IMPORTED_MODULE_3_quasar__["q" /* default */].start(function () {
  new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
    el: '#q-app',
    router: __WEBPACK_IMPORTED_MODULE_4__router__["a" /* default */],
    render: function render(h) {
      return h(__webpack_require__(20));
    }
  });
});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(14);



__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

function load(component) {
  return function () {
    return __webpack_require__(15)("./" + component + '.vue');
  };
}

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({

  routes: [{ path: '/', component: load('Writer') }, { path: '*', component: load('Error404') }]
}));

/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./AboutModal.vue": [
		26,
		1
	],
	"./Error404.vue": [
		32,
		7
	],
	"./ExportModal.vue": [
		27,
		6
	],
	"./LeftMenu.vue": [
		28,
		5
	],
	"./SaveAsModal.vue": [
		29,
		4
	],
	"./SettingsModal.vue": [
		30,
		3
	],
	"./Toolbar.vue": [
		31,
		2
	],
	"./Writer.vue": [
		33,
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
webpackAsyncContext.id = 15;
module.exports = webpackAsyncContext;

/***/ }),
/* 16 */,
/* 17 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 18 */,
/* 19 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(21)
}
var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(22),
  /* template */
  __webpack_require__(23),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 21 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "q-app"
    }
  }, [_c('router-view')], 1)
},staticRenderFns: []}

/***/ })
],[5]);