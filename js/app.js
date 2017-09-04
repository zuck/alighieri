webpackJsonp([10],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_electron__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_is_electron__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_is_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_is_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_quasar__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__router__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_quasar_extras_material_icons__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_quasar_extras_material_icons___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_quasar_extras_material_icons__);
__webpack_require__(7);
__webpack_require__(9);
__webpack_require__(12);







__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;

__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_3_quasar__["s" /* default */]);

if (__WEBPACK_IMPORTED_MODULE_2_is_electron___default()()) {
  __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_electron___default.a);
}

if (true) {
  __webpack_require__(20);
}



__WEBPACK_IMPORTED_MODULE_3_quasar__["s" /* default */].start(function () {
  new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
    el: '#q-app',
    router: __WEBPACK_IMPORTED_MODULE_4__router__["a" /* default */],
    render: function render(h) {
      return h(__webpack_require__(24));
    }
  });
});

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(18);



__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

function load(component) {
  return function () {
    return __webpack_require__(19)("./" + component + '.vue');
  };
}

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({

  routes: [{ path: '/', component: load('Writer') }, { path: '*', component: load('Error404') }]
}));

/***/ }),
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./AboutModal.vue": [
		31,
		3
	],
	"./Error404.vue": [
		37,
		8
	],
	"./ExportModal.vue": [
		32,
		7
	],
	"./LeftMenu.vue": [
		33,
		6
	],
	"./SaveAsModal.vue": [
		34,
		5
	],
	"./SaveStatus.vue": [
		30,
		4
	],
	"./SettingsModal.vue": [
		35,
		1
	],
	"./Toolbar.vue": [
		36,
		2
	],
	"./Writer.vue": [
		38,
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
webpackAsyncContext.id = 19;
module.exports = webpackAsyncContext;

/***/ }),
/* 20 */,
/* 21 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 22 */,
/* 23 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(25)
}
var Component = __webpack_require__(4)(
  /* script */
  __webpack_require__(26),
  /* template */
  __webpack_require__(27),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 25 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "q-app"
    }
  }, [_c('router-view')], 1)
},staticRenderFns: []}

/***/ })
],[6]);