module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var default_worker_object_factory_1 = __webpack_require__(1);
var MockClass = /** @class */ (function () {
    function MockClass(prop) {
        this.prop = prop;
    }
    return MockClass;
}());
var DefaultWorkerObjectFactoryTask = /** @class */ (function (_super) {
    __extends(DefaultWorkerObjectFactoryTask, _super);
    function DefaultWorkerObjectFactoryTask() {
        return _super.call(this) || this;
    }
    DefaultWorkerObjectFactoryTask.getInstance = function () {
        if (!this._instance) {
            this._instance = new DefaultWorkerObjectFactoryTask();
        }
        return this._instance;
    };
    DefaultWorkerObjectFactoryTask.prototype.init = function () {
        // Add config here
        this.buildObjects(this._buildConfig());
    };
    DefaultWorkerObjectFactoryTask.prototype._buildConfig = function () {
        return {
            containerKey: 'test',
            objects: [{
                    key: 1,
                    config: {
                        constructor: MockClass,
                        args: []
                    }
                }]
        };
    };
    return DefaultWorkerObjectFactoryTask;
}(default_worker_object_factory_1.DefaultWorkerObjectFactory));
var task = DefaultWorkerObjectFactoryTask.getInstance();
module.exports = function (input, done) {
    done(task[input.task + ''].apply(task, input.args));
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var DefaultWorkerObjectFactory = /** @class */ (function () {
    function DefaultWorkerObjectFactory() {
        this._obContainer = {};
    }
    DefaultWorkerObjectFactory.prototype.buildObjects = function (config) {
        var _a;
        if (config) {
            var obCons = config.objects;
            if (obCons) {
                for (var _i = 0, obCons_1 = obCons; _i < obCons_1.length; _i++) {
                    var obCon = obCons_1[_i];
                    if (!this._obContainer[config.containerKey]) {
                        this._obContainer[config.containerKey] = {};
                    }
                    this._obContainer[config.containerKey][obCon.key]
                        = new ((_a = obCon.config.constructor).bind.apply(_a, [void 0].concat(obCon.config.args)))();
                }
            }
        }
    };
    DefaultWorkerObjectFactory.prototype.getObjects = function (containerKey, range) {
        var res = [];
        if (this._obContainer.hasOwnProperty(containerKey)) {
            if (range.length === 2) {
                range = this._getExpandedRange(range);
            }
            for (var _i = 0, range_1 = range; _i < range_1.length; _i++) {
                var index = range_1[_i];
                res.push(this._obContainer[containerKey][index]);
            }
        }
        return res;
    };
    DefaultWorkerObjectFactory.prototype.removeObjects = function (containerKey, keys) {
        var res = [];
        if (this._obContainer.hasOwnProperty(containerKey)) {
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var index = keys_1[_i];
                res.push(this._obContainer[containerKey][index]);
                delete this._obContainer[containerKey][index];
            }
        }
        else {
            return res;
        }
    };
    DefaultWorkerObjectFactory.prototype.clear = function () {
        this._obContainer = {};
    };
    DefaultWorkerObjectFactory.prototype._getExpandedRange = function (range) {
        var start = range[0], end = range[1];
        for (var i = start + 1; i < end; i++) {
            range.push(i);
        }
        range.push.apply(range, range.splice(1, 1));
        return range;
    };
    return DefaultWorkerObjectFactory;
}());
exports.DefaultWorkerObjectFactory = DefaultWorkerObjectFactory;


/***/ })
/******/ ]);