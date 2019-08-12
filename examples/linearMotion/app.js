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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./examples/linearMotion/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/linearMotion/app.ts":
/*!**************************************!*\
  !*** ./examples/linearMotion/app.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n//import { World } from \"../../src/World\";\r\n//import { Render } from \"../../src/render/Render\";\r\n//import { Body } from \"../../src/objects/Body\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n//import { Render, World,Body } from \"../../src/StunPhysics\";\r\n//import { World,Body,Render } from \"../../types/StunPhysics\";\r\nvar test = /** @class */ (function () {\r\n    function test() {\r\n        this.isPause = true;\r\n        this.totalTime = 0; // 程序运行的总时间\r\n        this.btnStart = document.getElementById('btnStart');\r\n        this.btnReset = document.getElementById('btnReset');\r\n        this.ranV = document.getElementById(\"ranV\");\r\n        this.ranA = document.getElementById(\"ranA\");\r\n        this.spV = document.getElementById(\"spV\");\r\n        this.spA = document.getElementById(\"spA\");\r\n        this.spTime = document.getElementById(\"spTime\");\r\n        this.canvas = document.getElementById('canvas');\r\n        this.render = new Render(this.canvas.getContext(\"2d\"));\r\n    }\r\n    test.prototype.start = function () {\r\n        var _this = this;\r\n        this.btnStart.onclick = function () {\r\n            _this.isPause = !_this.isPause;\r\n            if (_this.isPause) {\r\n                _this.btnStart.innerHTML = \"开始\";\r\n            }\r\n            else {\r\n                _this.btnStart.innerHTML = \"暂停\";\r\n            }\r\n            _this.ranA.disabled = _this.ranV.disabled = true;\r\n        };\r\n        this.btnReset.onclick = function () {\r\n            _this.resetBody();\r\n        };\r\n        this.ranV.oninput = function () {\r\n            _this.spV.innerHTML = _this.ranV.value + \"m/s\";\r\n            _this.circleBody.velocity = Number(_this.ranV.value);\r\n        };\r\n        this.ranA.oninput = function () {\r\n            _this.spA.innerHTML = _this.ranA.value + \"m/s<sup>2</sup>\";\r\n            _this.circleBody.acceleration = Number(_this.ranA.value);\r\n        };\r\n        this.world = new World();\r\n        this.circleBody = new Body();\r\n        this.circleBody.x = 100;\r\n        this.circleBody.velocity = 25;\r\n        this.circleBody.acceleration = 25;\r\n        this.resetBody();\r\n        this.world.addBody(this.circleBody);\r\n        this.Update();\r\n    };\r\n    ;\r\n    test.prototype.Update = function () {\r\n        var _this = this;\r\n        requestAnimationFrame(function () { return _this.Update(); });\r\n        var time = performance.now();\r\n        this.elapsedTime = this.previousTime ? (time - this.previousTime) / 1000 : 0;\r\n        this.previousTime = time;\r\n        if (this.circleBody.x > 700) {\r\n            this.btnStart.disabled = true;\r\n            return;\r\n        }\r\n        if (this.elapsedTime > 0) {\r\n            if (this.isPause)\r\n                return;\r\n            this.totalTime += this.elapsedTime;\r\n            this.spTime.innerHTML = (this.totalTime).toFixed(2).toString() + \"s\";\r\n            this.world.step(this.elapsedTime);\r\n        }\r\n        ;\r\n        this.render.draw(this.world);\r\n    };\r\n    ;\r\n    test.prototype.resetBody = function () {\r\n        this.circleBody.x = 100;\r\n        this.circleBody.velocity = Number(this.ranV.value);\r\n        this.circleBody.acceleration = Number(this.ranA.value);\r\n        this.ranA.disabled = this.ranV.disabled = false;\r\n        this.btnStart.innerHTML = \"开始\";\r\n        this.btnStart.disabled = false;\r\n        this.isPause = true;\r\n        this.spTime.innerHTML = \"0.00s\";\r\n        this.totalTime = 0;\r\n        this.render.draw(this.world);\r\n    };\r\n    return test;\r\n}());\r\nexports.test = test;\r\nwindow.onload = function () {\r\n    var main = new test();\r\n    main.start();\r\n};\r\n\n\n//# sourceURL=webpack:///./examples/linearMotion/app.ts?");

/***/ })

/******/ });