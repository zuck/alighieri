webpackJsonp([6],{

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(53)
}
var Component = __webpack_require__(4)(
  /* script */
  __webpack_require__(55),
  /* template */
  __webpack_require__(56),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
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
var update = __webpack_require__(29)("a9e457dc", content, true);

/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(28)(undefined);
// imports


// module
exports.push([module.i, ".q-item:hover .q-icon{color:#d84747}", ""]);

// exports


/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_quasar__ = __webpack_require__(3);




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'left-menu',
  components: {
    QList: __WEBPACK_IMPORTED_MODULE_0_quasar__["k" /* QList */],
    QListHeader: __WEBPACK_IMPORTED_MODULE_0_quasar__["l" /* QListHeader */],
    QItem: __WEBPACK_IMPORTED_MODULE_0_quasar__["f" /* QItem */],
    QItemSeparator: __WEBPACK_IMPORTED_MODULE_0_quasar__["h" /* QItemSeparator */],
    QItemSide: __WEBPACK_IMPORTED_MODULE_0_quasar__["i" /* QItemSide */],
    QItemMain: __WEBPACK_IMPORTED_MODULE_0_quasar__["g" /* QItemMain */]
  },
  data: function data() {
    return {
      isElectron: this.$electron
    };
  }
});

/***/ }),

/***/ 56:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('q-list', {
    attrs: {
      "no-border": "",
      "link": ""
    }
  }, [_c('q-item', {
    on: {
      "click": function($event) {
        _vm.$emit('new')
      }
    }
  }, [_c('q-item-side', {
    attrs: {
      "icon": "add"
    }
  }), _vm._v(" "), _c('q-item-main', {
    attrs: {
      "label": "New...",
      "sublabel": "Create a new file"
    }
  })], 1), _vm._v(" "), _c('q-item-separator'), _vm._v(" "), _c('q-item', {
    on: {
      "click": function($event) {
        _vm.$emit('open')
      }
    }
  }, [_c('q-item-side', {
    attrs: {
      "icon": "folder open"
    }
  }), _vm._v(" "), _c('q-item-main', {
    attrs: {
      "label": "Open",
      "sublabel": "Open an existing file"
    }
  })], 1), _vm._v(" "), _c('q-item', {
    on: {
      "click": function($event) {
        _vm.$emit('import')
      }
    }
  }, [_c('q-item-side', {
    attrs: {
      "icon": "file upload"
    }
  }), _vm._v(" "), _c('q-item-main', {
    attrs: {
      "label": "Import",
      "sublabel": "Import from other formats"
    }
  })], 1), _vm._v(" "), _c('q-item-separator'), _vm._v(" "), _c('q-item', {
    on: {
      "click": function($event) {
        _vm.$emit('save')
      }
    }
  }, [_c('q-item-side', {
    attrs: {
      "icon": "save"
    }
  }), _vm._v(" "), _c('q-item-main', {
    attrs: {
      "label": "Save",
      "sublabel": "Save your work"
    }
  })], 1), _vm._v(" "), _c('q-item', {
    on: {
      "click": function($event) {
        _vm.$emit('saveAs')
      }
    }
  }, [_c('q-item-side', {
    attrs: {
      "icon": "save"
    }
  }), _vm._v(" "), _c('q-item-main', {
    attrs: {
      "label": "Save as",
      "sublabel": "Save to destination"
    }
  })], 1), _vm._v(" "), _c('q-item', {
    on: {
      "click": function($event) {
        _vm.$emit('export')
      }
    }
  }, [_c('q-item-side', {
    attrs: {
      "icon": "file download"
    }
  }), _vm._v(" "), _c('q-item-main', {
    attrs: {
      "label": "Export",
      "sublabel": "Export to another format"
    }
  })], 1), _vm._v(" "), _c('q-item-separator'), _vm._v(" "), _c('q-item', {
    on: {
      "click": function($event) {
        _vm.$emit('print')
      }
    }
  }, [_c('q-item-side', {
    attrs: {
      "icon": "print"
    }
  }), _vm._v(" "), _c('q-item-main', {
    attrs: {
      "label": "Print",
      "sublabel": "Print your work"
    }
  })], 1), _vm._v(" "), _c('q-item-separator'), _vm._v(" "), _c('q-item', {
    on: {
      "click": function($event) {
        _vm.$emit('settings')
      }
    }
  }, [_c('q-item-side', {
    attrs: {
      "icon": "settings"
    }
  }), _vm._v(" "), _c('q-item-main', {
    attrs: {
      "label": "Settings",
      "sublabel": "Adjust to your taste"
    }
  })], 1), _vm._v(" "), _c('q-item', {
    on: {
      "click": function($event) {
        _vm.$emit('about')
      }
    }
  }, [_c('q-item-side', {
    attrs: {
      "icon": "school"
    }
  }), _vm._v(" "), _c('q-item-main', {
    attrs: {
      "label": "About",
      "sublabel": "What's this?"
    }
  })], 1), _vm._v(" "), (_vm.isElectron) ? _c('q-item-separator') : _vm._e(), _vm._v(" "), (_vm.isElectron) ? _c('q-item', {
    on: {
      "click": function($event) {
        _vm.$emit('exit')
      }
    }
  }, [_c('q-item-side', {
    attrs: {
      "icon": "exit to app"
    }
  }), _vm._v(" "), _c('q-item-main', {
    attrs: {
      "label": "Exit",
      "sublabel": "Close the application"
    }
  })], 1) : _vm._e()], 1)
},staticRenderFns: []}

/***/ })

});