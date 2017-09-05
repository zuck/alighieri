webpackJsonp([3],{

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(53)
}
var Component = __webpack_require__(4)(
  /* script */
  __webpack_require__(55),
  /* template */
  __webpack_require__(57),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-7778915a",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(54);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(30)("2aaccaa0", content, true);

/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(29)(undefined);
// imports


// module
exports.push([module.i, "#logo[data-v-7778915a]{display:block;margin:16px auto}#logo+h4[data-v-7778915a]{font-family:LibreBaskerville,serif!important}#logo+h4[data-v-7778915a]:first-letter{text-transform:capitalize}#logo+h4+h6[data-v-7778915a]{color:#888;margin-bottom:1rem}.modal-body[data-v-7778915a],.modal-header[data-v-7778915a]{text-align:center}", ""]);

// exports


/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_quasar__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__package_json__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__package_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__package_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__LICENSE_txt__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__LICENSE_txt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__LICENSE_txt__);






/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'about-modal',
  components: {
    QModal: __WEBPACK_IMPORTED_MODULE_0_quasar__["n" /* QModal */],
    QBtn: __WEBPACK_IMPORTED_MODULE_0_quasar__["c" /* QBtn */]
  },
  data: function data() {
    return {
      name: __WEBPACK_IMPORTED_MODULE_1__package_json__["name"],
      description: __WEBPACK_IMPORTED_MODULE_1__package_json__["description"],
      version: __WEBPACK_IMPORTED_MODULE_1__package_json__["version"],
      license: __WEBPACK_IMPORTED_MODULE_1__package_json__["license"],
      author: __WEBPACK_IMPORTED_MODULE_1__package_json__["author"],
      licenseContent: __WEBPACK_IMPORTED_MODULE_2__LICENSE_txt__,
      github: __WEBPACK_IMPORTED_MODULE_1__package_json__["repository"].url.replace(':', '/').replace('.git', '').replace('git@', 'https://')
    };
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
    goToGitHub: function goToGitHub() {
      window.open(this.github);
    }
  }
});

/***/ }),

/***/ 56:
/***/ (function(module, exports) {

module.exports = "MIT License\n\nCopyright (c) 2017 Emanuele Bertoldi\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n"

/***/ }),

/***/ 57:
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
  }, [_c('img', {
    attrs: {
      "id": "logo",
      "src": "statics/icon.png"
    }
  }), _vm._v(" "), _c('h4', [_vm._v(_vm._s(_vm.name))]), _vm._v(" "), _c('h6', [_vm._v(_vm._s(_vm.description))])]), _vm._v(" "), _c('div', {
    staticClass: "modal-body"
  }, [_c('p', [_vm._v("Built on "), _c('a', {
    attrs: {
      "href": "https://quasar-framework.org"
    }
  }, [_vm._v("Quasar Framework")]), _vm._v(" by "), _c('a', {
    attrs: {
      "href": 'mailto:' + _vm.author.email
    }
  }, [_vm._v(_vm._s(_vm.author.name))])]), _vm._v(" "), _c('p', {
    attrs: {
      "id": "version"
    }
  }, [_vm._v("v" + _vm._s(_vm.version) + " - "), _c('a', {
    attrs: {
      "href": 'http://en.wikipedia.org/wiki/' + _vm.license + '_License'
    }
  }, [_vm._v(_vm._s(_vm.license))])])]), _vm._v(" "), _c('div', {
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
        _vm.goToGitHub()
      }
    }
  }, [_vm._v("Contribute")])], 1)])
},staticRenderFns: []}

/***/ })

});