webpackJsonp([5],{

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(57)
}
var Component = __webpack_require__(4)(
  /* script */
  __webpack_require__(59),
  /* template */
  __webpack_require__(60),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(58);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(29)("1bbe3f77", content, true);

/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(28)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_quasar__ = __webpack_require__(3);




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'save-as-modal',
  components: {
    QModal: __WEBPACK_IMPORTED_MODULE_0_quasar__["m" /* QModal */],
    QInput: __WEBPACK_IMPORTED_MODULE_0_quasar__["e" /* QInput */],
    QBtn: __WEBPACK_IMPORTED_MODULE_0_quasar__["c" /* QBtn */]
  },
  props: ['filename'],
  data: function data() {
    return {
      filenameValue: null
    };
  },
  mounted: function mounted() {
    this.filenameValue = this.filename;
  },

  methods: {
    open: function open() {
      this.$refs.modal.open();
    },
    close: function close() {
      this.$refs.modal.close();
    },
    toggle: function toggle() {
      this.$refs.modal.toggle();
    },
    confirmFilename: function confirmFilename() {
      this.$emit('save', this.filenameValue || this.filename);
      this.close();
    }
  }
});

/***/ }),

/***/ 60:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('q-modal', {
    ref: "modal",
    on: {
      "escape-key": function($event) {
        _vm.close()
      }
    }
  }, [_c('div', {
    staticClass: "modal-header"
  }, [_vm._v("Choose a name")]), _vm._v(" "), _c('div', {
    staticClass: "modal-body"
  }, [_c('q-input', {
    attrs: {
      "placeholder": "Type a filename..."
    },
    model: {
      value: (_vm.filename),
      callback: function($$v) {
        _vm.filename = $$v
      },
      expression: "filename"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "modal-buttons row"
  }, [_c('q-btn', {
    attrs: {
      "flat": ""
    },
    on: {
      "click": function($event) {
        _vm.close()
      }
    }
  }, [_vm._v("Cancel")]), _vm._v(" "), _c('q-btn', {
    attrs: {
      "flat": ""
    },
    on: {
      "click": function($event) {
        _vm.confirmFilename()
      }
    }
  }, [_vm._v("Confirm")])], 1)])
},staticRenderFns: []}

/***/ })

});