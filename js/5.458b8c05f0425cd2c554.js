webpackJsonp([5],{

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(44)
}
var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(46),
  /* template */
  __webpack_require__(47),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(45);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(25)("a9e457dc", content, true);

/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(24)(undefined);
// imports


// module
exports.push([module.i, ".q-item:hover .q-icon{color:#c83737}", ""]);

// exports


/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_quasar__ = __webpack_require__(2);




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'left-menu',
  components: {
    QList: __WEBPACK_IMPORTED_MODULE_0_quasar__["j" /* QList */],
    QListHeader: __WEBPACK_IMPORTED_MODULE_0_quasar__["k" /* QListHeader */],
    QItem: __WEBPACK_IMPORTED_MODULE_0_quasar__["e" /* QItem */],
    QItemSeparator: __WEBPACK_IMPORTED_MODULE_0_quasar__["g" /* QItemSeparator */],
    QItemSide: __WEBPACK_IMPORTED_MODULE_0_quasar__["h" /* QItemSide */],
    QItemMain: __WEBPACK_IMPORTED_MODULE_0_quasar__["f" /* QItemMain */]
  },
  data: function data() {
    return {
      isElectron: this.$electron
    };
  }
});

/***/ }),

/***/ 47:
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