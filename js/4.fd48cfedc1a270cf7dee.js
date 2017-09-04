webpackJsonp([4],{

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(43)
}
var Component = __webpack_require__(4)(
  /* script */
  __webpack_require__(45),
  /* template */
  __webpack_require__(46),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-7a755c82",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(44);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(29)("8eb92ba8", content, true);

/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(28)(undefined);
// imports


// module
exports.push([module.i, ".q-icon[data-v-7a755c82]{cursor:pointer}", ""]);

// exports


/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_quasar__ = __webpack_require__(3);




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'save-status',
  components: {
    QIcon: __WEBPACK_IMPORTED_MODULE_0_quasar__["e" /* QIcon */],
    QTooltip: __WEBPACK_IMPORTED_MODULE_0_quasar__["q" /* QTooltip */]
  },
  props: ['status'],
  computed: {
    color: function color() {
      return this.status ? 'positive' : 'negative';
    },
    tooltipMsg: function tooltipMsg() {
      return this.status ? 'Saved' : 'Not saved';
    }
  }
});

/***/ }),

/***/ 46:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('q-icon', {
    attrs: {
      "name": "lens",
      "color": _vm.color
    }
  }, [_c('q-tooltip', [_vm._v(_vm._s(_vm.tooltipMsg))])], 1)
},staticRenderFns: []}

/***/ })

});