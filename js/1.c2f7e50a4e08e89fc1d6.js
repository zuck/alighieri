webpackJsonp([1,4],{

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(39)
}
var Component = __webpack_require__(4)(
  /* script */
  __webpack_require__(41),
  /* template */
  __webpack_require__(42),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-7a755c82",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(65)
}
var Component = __webpack_require__(4)(
  /* script */
  __webpack_require__(67),
  /* template */
  __webpack_require__(68),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-7554e8d8",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(40);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(29)("8eb92ba8", content, true);

/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(28)(undefined);
// imports


// module
exports.push([module.i, ".q-icon[data-v-7a755c82]{cursor:pointer}", ""]);

// exports


/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_quasar__ = __webpack_require__(3);




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'save-status',
  components: {
    QIcon: __WEBPACK_IMPORTED_MODULE_0_quasar__["d" /* QIcon */],
    QTooltip: __WEBPACK_IMPORTED_MODULE_0_quasar__["p" /* QTooltip */]
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

/***/ 42:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('q-icon', {
    attrs: {
      "name": "lens",
      "color": _vm.color
    }
  }, [_c('q-tooltip', [_vm._v(_vm._s(_vm.tooltipMsg))])], 1)
},staticRenderFns: []}

/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(66);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(29)("67725b2a", content, true);

/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(28)(undefined);
// imports


// module
exports.push([module.i, ".q-btn .q-icon[data-v-7554e8d8]{color:#e1e2e3}.q-btn:hover .q-icon[data-v-7554e8d8]{color:#d84747}.q-toolbar-title[data-v-7554e8d8]{color:#e1e2e3;text-align:left}.q-toolbar-title abbr[data-v-7554e8d8]{cursor:help}.q-tooltip[data-v-7554e8d8]{width:100%;max-width:320px}.q-tooltip dd[data-v-7554e8d8],.q-tooltip dt[data-v-7554e8d8]{float:left}.q-tooltip dd .q-icon[data-v-7554e8d8],.q-tooltip dt .q-icon[data-v-7554e8d8]{margin-top:-.25rem}.q-tooltip dt[data-v-7554e8d8]{clear:both;width:9em}", ""]);

// exports


/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_quasar__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_components_SaveStatus__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_components_SaveStatus___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_components_SaveStatus__);






/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'toolbar',
  components: {
    QToolbar: __WEBPACK_IMPORTED_MODULE_0_quasar__["n" /* QToolbar */],
    QToolbarTitle: __WEBPACK_IMPORTED_MODULE_0_quasar__["o" /* QToolbarTitle */],
    QBtn: __WEBPACK_IMPORTED_MODULE_0_quasar__["c" /* QBtn */],
    QIcon: __WEBPACK_IMPORTED_MODULE_0_quasar__["d" /* QIcon */],
    QTooltip: __WEBPACK_IMPORTED_MODULE_0_quasar__["p" /* QTooltip */],
    SaveStatus: __WEBPACK_IMPORTED_MODULE_1_components_SaveStatus___default.a
  },
  props: ['isSaved', 'wordCount', 'sentenceCount']
});

/***/ }),

/***/ 68:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('q-toolbar', {
    attrs: {
      "color": "white"
    }
  }, [_c('q-btn', {
    attrs: {
      "flat": "",
      "round": "",
      "color": "grey-13"
    },
    on: {
      "click": function($event) {
        _vm.$emit('menuToggle')
      }
    }
  }, [_c('q-icon', {
    attrs: {
      "name": "menu"
    }
  })], 1), _vm._v(" "), _c('q-toolbar-title', [_c('save-status', {
    attrs: {
      "status": _vm.isSaved
    }
  }), _vm._v(" " + _vm._s(_vm.wordCount) + " / " + _vm._s(_vm.sentenceCount) + "\n  ")], 1), _vm._v(" "), _c('q-btn', {
    attrs: {
      "flat": "",
      "round": "",
      "color": "grey-13"
    }
  }, [_c('q-icon', {
    attrs: {
      "name": "help_outline"
    }
  }), _vm._v(" "), _c('q-tooltip', {
    attrs: {
      "anchor": "bottom right",
      "self": "top right",
      "offset": [0, 16]
    }
  }, [_c('dl', [_c('dt', [_c('q-icon', {
    attrs: {
      "name": "lens"
    }
  }), _vm._v(" X / Y")], 1), _c('dd', [_c('q-icon', {
    attrs: {
      "name": "lens"
    }
  }), _vm._v(" Words / Sents")], 1), _vm._v(" "), _c('dt', [_vm._v("Select something")]), _c('dd', [_vm._v("Open toolbar")]), _vm._v(" "), _c('dt', [_c('kbd', [_vm._v("Enter")])]), _c('dd', [_vm._v("New paragraph")]), _vm._v(" "), _c('dt', [_c('kbd', [_vm._v("Shift + Enter")])]), _c('dd', [_vm._v("New line")]), _vm._v(" "), _c('dt', [_c('kbd', [_vm._v("'1.' + Space")])]), _c('dd', [_vm._v("New numbered list")]), _vm._v(" "), _c('dt', [_c('kbd', [_vm._v("'*' + Space")])]), _c('dd', [_vm._v("New bullet list")]), _vm._v(" "), _c('dt', [_c('kbd', [_vm._v("Ctrl + O")])]), _c('dd', [_vm._v("Open")]), _vm._v(" "), _c('dt', [_c('kbd', [_vm._v("Ctrl + S")])]), _c('dd', [_vm._v("Save")]), _vm._v(" "), _c('dt', [_c('kbd', [_vm._v("Ctrl + F11")])]), _c('dd', [_vm._v("Toggle \"Zen Mode\"")])])])], 1)], 1)
},staticRenderFns: []}

/***/ })

});