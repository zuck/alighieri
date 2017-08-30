webpackJsonp([7],{

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(64)
}
var Component = __webpack_require__(4)(
  /* script */
  __webpack_require__(66),
  /* template */
  __webpack_require__(67),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(65);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(29)("2422dc3a", content, true);

/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(28)(undefined);
// imports


// module
exports.push([module.i, ".error-page .error-code{height:50vh;width:100%;padding-top:15vh;font-size:30vmax;color:hsla(0,0%,100%,.2);overflow:hidden}.error-page .error-card{border-radius:2px;margin-top:-50px;width:80vw;max-width:600px;padding:25px}.error-page .error-card>i{font-size:5rem}", ""]);

// exports


/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_quasar__ = __webpack_require__(3);




/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    QBtn: __WEBPACK_IMPORTED_MODULE_0_quasar__["c" /* QBtn */],
    QIcon: __WEBPACK_IMPORTED_MODULE_0_quasar__["d" /* QIcon */]
  },
  data: function data() {
    return {
      canGoBack: window.history.length > 1
    };
  },

  methods: {
    goBack: function goBack() {
      window.history.go(-1);
    }
  }
});

/***/ }),

/***/ 67:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "error-page window-height window-width bg-light column items-center no-wrap"
  }, [_c('div', {
    staticClass: "error-code bg-primary flex items-center justify-center"
  }, [_vm._v("\n    404\n  ")]), _vm._v(" "), _c('div', [_c('div', {
    staticClass: "error-card shadow-4 bg-white column items-center justify-center no-wrap"
  }, [_c('q-icon', {
    attrs: {
      "name": "error_outline",
      "color": "grey-5"
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "caption text-center"
  }, [_vm._v("Oops. Nothing here...")]), _vm._v(" "), _c('p', {
    staticClass: "text-center group"
  }, [(_vm.canGoBack) ? _c('q-btn', {
    attrs: {
      "color": "primary",
      "push": "",
      "icon": "keyboard_arrow_left"
    },
    on: {
      "click": _vm.goBack
    }
  }, [_vm._v("\n          Go back\n        ")]) : _vm._e(), _vm._v(" "), _c('q-btn', {
    attrs: {
      "color": "primary",
      "push": "",
      "icon-right": "home"
    },
    on: {
      "click": function($event) {
        _vm.$router.replace('/')
      }
    }
  }, [_vm._v("\n          Go home\n        ")])], 1)], 1)])])
},staticRenderFns: []}

/***/ })

});