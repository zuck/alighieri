webpackJsonp([1],{

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(34)
}
var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(36),
  /* template */
  __webpack_require__(39),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-7778915a",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(35);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(25)("2aaccaa0", content, true);

/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(24)(undefined);
// imports


// module
exports.push([module.i, "#logo[data-v-7778915a]{display:block;margin:16px auto}#logo+h4[data-v-7778915a]:first-letter{text-transform:capitalize}#logo+h4+h6[data-v-7778915a]{color:#888;margin-bottom:1rem}h4[data-v-7778915a],h5[data-v-7778915a],h6[data-v-7778915a],p[data-v-7778915a]{text-align:center}#version[data-v-7778915a]{margin-top:16px}", ""]);

// exports


/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__package_json__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__package_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__package_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__LICENSE_txt__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__LICENSE_txt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__LICENSE_txt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_quasar__ = __webpack_require__(2);






/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'about-modal',
  components: {
    QModal: __WEBPACK_IMPORTED_MODULE_2_quasar__["l" /* QModal */],
    QBtn: __WEBPACK_IMPORTED_MODULE_2_quasar__["c" /* QBtn */]
  },
  data: function data() {
    return {
      name: __WEBPACK_IMPORTED_MODULE_0__package_json__["name"],
      description: __WEBPACK_IMPORTED_MODULE_0__package_json__["description"],
      version: __WEBPACK_IMPORTED_MODULE_0__package_json__["version"],
      license: __WEBPACK_IMPORTED_MODULE_0__package_json__["license"],
      author: __WEBPACK_IMPORTED_MODULE_0__package_json__["author"],
      licenseContent: __WEBPACK_IMPORTED_MODULE_1__LICENSE_txt__,
      github: __WEBPACK_IMPORTED_MODULE_0__package_json__["repository"].url.replace(':', '/').replace('.git', '').replace('git@', 'https://')
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

/***/ 37:
/***/ (function(module, exports) {

module.exports = {"name":"alighieri","version":"0.2.0","description":"A distraction-free tool for novelists and writers","author":{"name":"Emanuele Bertoldi","email":"emanuele.bertoldi@gmail.com"},"license":"MIT","repository":{"type":"git","url":"git@github.com:zuck/alighieri.git"},"scripts":{"clean":"node build/script.clean.js","dev":"node build/script.dev.js","build":"node build/script.build.js","build-electron":"npm run build --target=electron-renderer && cd electron && npm run build","lint":"eslint --ext .js,.vue src","deploy":"npm run build && gh-pages -d dist"},"dependencies":{"babel-runtime":"^6.25.0","quasar-extras":"0.x","quasar-framework":"^0.14.1","vue":"~2.3.4","vue-router":"^2.7.0","font-awesome":"^4.7.0","vue2-medium-editor":"^1.1.1","medium-editor-autolist":"^1.0.1","showdown":"^1.7.3","to-markdown":"^3.0.1","file-saver":"^1.3.3","is-electron":"^2.1.0","vue-electron":"^1.0.6"},"devDependencies":{"autoprefixer":"^6.4.0","babel-core":"^6.0.0","babel-eslint":"^7.0.0","babel-loader":"^7.0.0","babel-plugin-transform-runtime":"^6.0.0","babel-preset-es2015":"^6.0.0","babel-preset-stage-2":"^6.0.0","colors":"^1.1.2","connect-history-api-fallback":"^1.1.0","css-loader":"^0.28.0","es6-promise":"^4.1.1","eslint":"^4.4.1","eslint-config-standard":"^10.2.1","eslint-friendly-formatter":"^3.0.0","eslint-loader":"^1.9.0","eslint-plugin-html":"^3.1.1","eslint-plugin-import":"^2.7.0","eslint-plugin-node":"^5.1.1","eslint-plugin-promise":"^3.5.0","eslint-plugin-standard":"^3.0.1","eventsource-polyfill":"^0.9.6","express":"^4.15.4","extract-text-webpack-plugin":"^3.0.0","file-loader":"^0.11.1","friendly-errors-webpack-plugin":"^1.1.3","glob":"^7.1.2","html-webpack-plugin":"^2.30.1","http-proxy-middleware":"^0.17.0","json-loader":"^0.5.7","opn":"^5.0.0","optimize-css-assets-webpack-plugin":"^3.0.0","postcss-loader":"^1.0.0","progress-bar-webpack-plugin":"^1.10.0","purify-css":"^1.2.6","shelljs":"^0.7.0","stylus":"^0.54.5","stylus-loader":"^3.0.1","url-loader":"^0.5.7","vue-loader":"~12.2.2","vue-style-loader":"^3.0.1","vue-template-compiler":"~2.3.4","webpack":"^3.5.2","webpack-dev-middleware":"^1.12.0","webpack-hot-middleware":"^2.18.2","webpack-merge":"^4.1.0","gh-pages":"^1.0.0","raw-loader":"^0.5.1","electron":"^1.7.5"}}

/***/ }),

/***/ 38:
/***/ (function(module, exports) {

module.exports = "MIT License\n\nCopyright (c) 2017 Emanuele Bertoldi\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n"

/***/ }),

/***/ 39:
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
    staticClass: "layout-padding"
  }, [_c('img', {
    attrs: {
      "id": "logo",
      "src": "statics/icon.png"
    }
  }), _vm._v(" "), _c('h4', [_vm._v(_vm._s(_vm.name))]), _vm._v(" "), _c('h6', [_vm._v(_vm._s(_vm.description))]), _vm._v(" "), _c('p', [_vm._v("Built on "), _c('a', {
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