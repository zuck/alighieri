webpackJsonp([2],{

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(56)
}
var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(58),
  /* template */
  __webpack_require__(59),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-7554e8d8",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(57);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(25)("67725b2a", content, true);

/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(24)(undefined);
// imports


// module
exports.push([module.i, ".q-btn .q-icon[data-v-7554e8d8]{opacity:.3;transition:opacity .2s,color .2s}.q-btn:hover .q-icon[data-v-7554e8d8]{opacity:1;color:#c83737}.q-toolbar-title[data-v-7554e8d8]{color:#333;opacity:.3;text-align:center}.q-toolbar-title abbr[data-v-7554e8d8]{cursor:help}.q-tooltip[data-v-7554e8d8]{width:100%;max-width:320px}.q-tooltip dd[data-v-7554e8d8],.q-tooltip dt[data-v-7554e8d8]{float:left}.q-tooltip dt[data-v-7554e8d8]{clear:both;width:9em}", ""]);

// exports


/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_quasar__ = __webpack_require__(2);




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'toolbar',
  components: {
    QToolbar: __WEBPACK_IMPORTED_MODULE_0_quasar__["m" /* QToolbar */],
    QToolbarTitle: __WEBPACK_IMPORTED_MODULE_0_quasar__["n" /* QToolbarTitle */],
    QBtn: __WEBPACK_IMPORTED_MODULE_0_quasar__["c" /* QBtn */],
    QIcon: __WEBPACK_IMPORTED_MODULE_0_quasar__["d" /* QIcon */],
    QTooltip: __WEBPACK_IMPORTED_MODULE_0_quasar__["o" /* QTooltip */]
  },
  props: ['wordCount', 'sentenceCount'],
  data: function data() {
    return {};
  },
  mounted: function mounted() {},

  methods: {}
});

/***/ }),

/***/ 59:
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
  })], 1), _vm._v(" "), _c('q-toolbar-title', [_vm._v(_vm._s(_vm.wordCount) + " "), _c('abbr', {
    attrs: {
      "title": "Words"
    }
  }, [_vm._v("ws")]), _vm._v(" | " + _vm._s(_vm.sentenceCount) + " "), _c('abbr', {
    attrs: {
      "title": "Sentences"
    }
  }, [_vm._v("ss")])]), _vm._v(" "), _c('q-btn', {
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
  }, [_c('dl', [_c('dt', [_c('kbd', [_vm._v("Enter")])]), _c('dd', [_vm._v("New paragraph")]), _vm._v(" "), _c('dt', [_c('kbd', [_vm._v("Shift + Enter")])]), _c('dd', [_vm._v("New line")]), _vm._v(" "), _c('dt', [_c('kbd', [_vm._v("'1.' + Space")])]), _c('dd', [_vm._v("New numbered list")]), _vm._v(" "), _c('dt', [_c('kbd', [_vm._v("'*' + Space")])]), _c('dd', [_vm._v("New bullet list")]), _vm._v(" "), _c('dt', [_c('kbd', [_vm._v("Ctrl + O")])]), _c('dd', [_vm._v("Open")]), _vm._v(" "), _c('dt', [_c('kbd', [_vm._v("Ctrl + S")])]), _c('dd', [_vm._v("Save")]), _vm._v(" "), _c('dt', [_c('kbd', [_vm._v("F11")])]), _c('dd', [_vm._v("Toggle \"Zen Mode\"")])])])], 1)], 1)
},staticRenderFns: []}

/***/ })

});