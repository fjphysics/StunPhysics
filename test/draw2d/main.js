(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
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
var math2d_1 = require("./math2d");
var EInputEventType;
(function (EInputEventType) {
    EInputEventType[EInputEventType["MOUSEEVENT"] = 0] = "MOUSEEVENT";
    EInputEventType[EInputEventType["MOUSEDOWN"] = 1] = "MOUSEDOWN";
    EInputEventType[EInputEventType["MOUSEUP"] = 2] = "MOUSEUP";
    EInputEventType[EInputEventType["MOUSEMOVE"] = 3] = "MOUSEMOVE";
    EInputEventType[EInputEventType["MOUSEDRAG"] = 4] = "MOUSEDRAG";
    EInputEventType[EInputEventType["KEYBOARDEVENT"] = 5] = "KEYBOARDEVENT";
    EInputEventType[EInputEventType["KEYUP"] = 6] = "KEYUP";
    EInputEventType[EInputEventType["KEYDOWN"] = 7] = "KEYDOWN";
    EInputEventType[EInputEventType["KEYPRESS"] = 8] = "KEYPRESS";
})(EInputEventType = exports.EInputEventType || (exports.EInputEventType = {}));
;
var CanvasInputEvent = /** @class */ (function () {
    function CanvasInputEvent(type, altKey, ctrlKey, shiftKey) {
        if (altKey === void 0) { altKey = false; }
        if (ctrlKey === void 0) { ctrlKey = false; }
        if (shiftKey === void 0) { shiftKey = false; }
        this.altKey = altKey;
        this.ctrlKey = ctrlKey;
        this.shiftKey = shiftKey;
        this.type = type;
    }
    return CanvasInputEvent;
}());
exports.CanvasInputEvent = CanvasInputEvent;
var Timer = /** @class */ (function () {
    function Timer(callback) {
        this.id = -1;
        this.enabled = false;
        this.callbackData = undefined;
        this.countdown = 0;
        this.timeout = 0;
        this.onlyOnce = false;
        this.callback = callback;
    }
    return Timer;
}());
var CanvasMouseEvent = /** @class */ (function (_super) {
    __extends(CanvasMouseEvent, _super);
    function CanvasMouseEvent(type, canvasPos, button, altKey, ctrlKey, shiftKey) {
        if (altKey === void 0) { altKey = false; }
        if (ctrlKey === void 0) { ctrlKey = false; }
        if (shiftKey === void 0) { shiftKey = false; }
        var _this = _super.call(this, type, altKey, ctrlKey, shiftKey) || this;
        _this.canvasPosition = canvasPos;
        _this.button = button;
        _this.hasLocalPosition = false;
        _this.localPosition = math2d_1.vec2.create();
        return _this;
    }
    return CanvasMouseEvent;
}(CanvasInputEvent));
exports.CanvasMouseEvent = CanvasMouseEvent;
var CanvasKeyBoardEvent = /** @class */ (function (_super) {
    __extends(CanvasKeyBoardEvent, _super);
    function CanvasKeyBoardEvent(type, key, keyCode, repeat, altKey, ctrlKey, shiftKey) {
        if (altKey === void 0) { altKey = false; }
        if (ctrlKey === void 0) { ctrlKey = false; }
        if (shiftKey === void 0) { shiftKey = false; }
        var _this = _super.call(this, type, altKey, ctrlKey, shiftKey) || this;
        _this.key = key;
        _this.keyCode = keyCode;
        _this.repeat = repeat;
        return _this;
    }
    return CanvasKeyBoardEvent;
}(CanvasInputEvent));
exports.CanvasKeyBoardEvent = CanvasKeyBoardEvent;
var Application = /** @class */ (function () {
    function Application(canvas) {
        this.timers = [];
        this._timeId = -1;
        this._fps = 0;
        this._start = false;
        this._requestId = -1;
        this.canvas = canvas;
        this.canvas.addEventListener("mousedown", this, false);
        this.canvas.addEventListener("mouseup", this, false);
        this.canvas.addEventListener("mousemove", this, false);
        window.addEventListener("keydown", this, false);
        window.addEventListener("keyup", this, false);
        window.addEventListener("keypress", this, false);
        this._isMouseDown = false;
        this.isSupportMouseMove = false;
    }
    Application.prototype.isRunning = function () {
        return this._start;
    };
    Object.defineProperty(Application.prototype, "fps", {
        get: function () {
            return this._fps;
        },
        enumerable: true,
        configurable: true
    });
    Application.prototype.start = function () {
        var _this = this;
        if (!this._start) {
            this._start = true;
            this._lastTime = -1;
            this._startTime = -1;
            this._requestId = requestAnimationFrame(function (msec) {
                _this.step(msec);
            });
        }
    };
    Application.prototype.step = function (timeStamp) {
        if (this._startTime === -1)
            this._startTime = timeStamp;
        if (this._lastTime === -1)
            this._lastTime = timeStamp;
        var elapsedMsec = timeStamp - this._startTime;
        var intervalSec = (timeStamp - this._lastTime);
        if (intervalSec !== 0) {
            this._fps = 1000.0 / intervalSec;
        }
        intervalSec /= 1000.0;
        this._lastTime = timeStamp;
        this._handleTimers(intervalSec);
        this.update(elapsedMsec, intervalSec);
        this.render();
        requestAnimationFrame(this.step.bind(this));
    };
    Application.prototype.stop = function () {
        if (this._start) {
            window.cancelAnimationFrame(this._requestId);
            this._requestId = -1;
            this._lastTime = -1;
            this._startTime = -1;
            this._start = false;
        }
    };
    Application.prototype.update = function (elapsedMsec, intervalSec) { };
    Application.prototype.render = function () { };
    Application.prototype.handleEvent = function (evt) {
        switch (evt.type) {
            case "mousedown":
                this._isMouseDown = true;
                this.dispatchMouseDown(this._toCanvasMouseEvent(evt, EInputEventType.MOUSEDOWN));
                break;
            case "mouseup":
                this._isMouseDown = false;
                this.dispatchMouseUp(this._toCanvasMouseEvent(evt, EInputEventType.MOUSEUP));
                break;
            case "mousemove":
                if (this.isSupportMouseMove) {
                    this.dispatchMouseMove(this._toCanvasMouseEvent(evt, EInputEventType.MOUSEMOVE));
                }
                if (this._isMouseDown) {
                    this.dispatchMouseDrag(this._toCanvasMouseEvent(evt, EInputEventType.MOUSEDRAG));
                }
                break;
            case "keypress":
                this.dispatchKeyPress(this._toCanvasKeyBoardEvent(evt, EInputEventType.KEYPRESS));
                break;
            case "keydown":
                this.dispatchKeyDown(this._toCanvasKeyBoardEvent(evt, EInputEventType.KEYDOWN));
                break;
            case "keyup":
                this.dispatchKeyUp(this._toCanvasKeyBoardEvent(evt, EInputEventType.KEYUP));
                break;
        }
    };
    Application.prototype.dispatchMouseDown = function (evt) {
        return;
    };
    Application.prototype.dispatchMouseUp = function (evt) {
        return;
    };
    Application.prototype.dispatchMouseMove = function (evt) {
        return;
    };
    Application.prototype.dispatchMouseDrag = function (evt) {
        return;
    };
    Application.prototype.dispatchKeyDown = function (evt) {
        return;
    };
    Application.prototype.dispatchKeyUp = function (evt) {
        return;
    };
    Application.prototype.dispatchKeyPress = function (evt) {
        return;
    };
    Application.prototype._viewportToCanvasCoordinate = function (evt) {
        if (this.canvas) {
            var rect = this.canvas.getBoundingClientRect();
            if (evt.type === "mousedown") {
                console.log(" boundingClientRect : " + JSON.stringify(rect));
                console.log(" clientX : " + evt.clientX + " clientY : " + evt.clientY);
            }
            if (evt.target) {
                var borderLeftWidth = 0;
                var borderTopWidth = 0;
                var paddingLeft = 0;
                var paddingTop = 0;
                var decl = window.getComputedStyle(evt.target);
                var strNumber = decl.borderLeftWidth;
                if (strNumber !== null) {
                    borderLeftWidth = parseInt(strNumber, 10);
                }
                if (strNumber !== null) {
                    borderTopWidth = parseInt(strNumber, 10);
                }
                strNumber = decl.paddingLeft;
                if (strNumber !== null) {
                    paddingLeft = parseInt(strNumber, 10);
                }
                strNumber = decl.paddingTop;
                if (strNumber !== null) {
                    paddingTop = parseInt(strNumber, 10);
                }
                var x = evt.clientX - rect.left - borderLeftWidth - paddingLeft;
                var y = evt.clientY - rect.top - borderTopWidth - paddingTop;
                var pos = math2d_1.vec2.create(x, y);
                if (evt.type === "mousedown") {
                    console.log(" borderLeftWidth : " + borderLeftWidth + " borderTopWidth : " + borderTopWidth);
                    console.log(" paddingLeft : " + paddingLeft + " paddingTop : " + paddingTop);
                    console.log(" 变换后的canvasPosition : " + pos.toString());
                }
                return pos;
            }
            alert("canvas为null");
            throw new Error("canvas为null");
        }
        alert("evt . target为null");
        throw new Error("evt . target为null");
    };
    Application.prototype._toCanvasMouseEvent = function (evt, type) {
        var event = evt;
        var mousePosition = this._viewportToCanvasCoordinate(event);
        var canvasMouseEvent = new CanvasMouseEvent(type, mousePosition, event.button, event.altKey, event.ctrlKey, event.shiftKey);
        return canvasMouseEvent;
    };
    Application.prototype._toCanvasKeyBoardEvent = function (evt, type) {
        var event = evt;
        var canvasKeyboardEvent = new CanvasKeyBoardEvent(type, event.key, event.keyCode, event.repeat, event.altKey, event.ctrlKey, event.shiftKey);
        return canvasKeyboardEvent;
    };
    Application.prototype.addTimer = function (callback, timeout, onlyOnce, data) {
        if (timeout === void 0) { timeout = 1.0; }
        if (onlyOnce === void 0) { onlyOnce = false; }
        if (data === void 0) { data = undefined; }
        var timer;
        var found = false;
        for (var i = 0; i < this.timers.length; i++) {
            var timer_1 = this.timers[i];
            if (timer_1.enabled === false) {
                timer_1.callback = callback;
                timer_1.callbackData = data;
                timer_1.timeout = timeout;
                timer_1.countdown = timeout;
                timer_1.enabled = true;
                timer_1.onlyOnce = onlyOnce;
                return timer_1.id;
            }
        }
        timer = new Timer(callback);
        timer.callbackData = data;
        timer.timeout = timeout;
        timer.countdown = timeout;
        timer.enabled = true;
        timer.id = ++this._timeId;
        timer.onlyOnce = onlyOnce;
        this.timers.push(timer);
        return timer.id;
    };
    Application.prototype.removeTimer = function (id) {
        var found = false;
        for (var i = 0; i < this.timers.length; i++) {
            if (this.timers[i].id === id) {
                var timer = this.timers[i];
                timer.enabled = false;
                found = true;
                break;
            }
        }
        return found;
    };
    Application.prototype._handleTimers = function (intervalSec) {
        for (var i = 0; i < this.timers.length; i++) {
            var timer = this.timers[i];
            if (timer.enabled === false) {
                continue;
            }
            timer.countdown -= intervalSec;
            if (timer.countdown < 0.0) {
                timer.callback(timer.id, timer.callbackData);
                if (timer.onlyOnce === false) {
                    timer.countdown = timer.timeout;
                }
                else {
                    this.removeTimer(timer.id);
                }
            }
        }
    };
    return Application;
}());
exports.Application = Application;
var Canvas2DApplication = /** @class */ (function (_super) {
    __extends(Canvas2DApplication, _super);
    function Canvas2DApplication(canvas) {
        var _this = _super.call(this, canvas) || this;
        _this.context2D = _this.canvas.getContext("2d");
        return _this;
    }
    return Canvas2DApplication;
}(Application));
exports.Canvas2DApplication = Canvas2DApplication;
var WebGLApplication = /** @class */ (function (_super) {
    __extends(WebGLApplication, _super);
    function WebGLApplication(canvas, contextAttributes) {
        var _this = _super.call(this, canvas) || this;
        _this.context3D = _this.canvas.getContext("webgl", contextAttributes);
        if (_this.context3D === null) {
            _this.context3D = _this.canvas.getContext("experimental-webgl", contextAttributes);
            if (_this.context3D === null) {
                alert(" 无法创建WebGLRenderingContext上下文对象 ");
                throw new Error(" 无法创建WebGLRenderingContext上下文对象 ");
            }
        }
        return _this;
    }
    return WebGLApplication;
}(Application));
exports.WebGLApplication = WebGLApplication;
},{"./math2d":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vec2 = /** @class */ (function () {
    function vec2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.values = new Float32Array([x, y]);
    }
    vec2.prototype.toString = function () {
        return " [ " + this.values[0] + " , " + this.values[1] + " ] ";
    };
    Object.defineProperty(vec2.prototype, "x", {
        get: function () { return this.values[0]; },
        set: function (x) { this.values[0] = x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(vec2.prototype, "y", {
        get: function () { return this.values[1]; },
        set: function (y) { this.values[1] = y; },
        enumerable: true,
        configurable: true
    });
    vec2.prototype.reset = function (x, y) {
        if (x === void 0) { x = 0; }
        this.values[0] = x;
        this.values[1] = y;
        return this;
    };
    vec2.create = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        return new vec2(x, y);
    };
    return vec2;
}());
exports.vec2 = vec2;
},{}],3:[function(require,module,exports){
"use strict";
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
var Application_1 = require("../../src/draw2d/Application");
var ApplicationTest = /** @class */ (function (_super) {
    __extends(ApplicationTest, _super);
    function ApplicationTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ApplicationTest.prototype.dispatchKeyDown = function (evt) {
        console.log(" key : " + evt.key + " is down ");
    };
    ApplicationTest.prototype.dispatchMouseDown = function (evt) {
        console.log(" canvasPosition : " + evt.canvasPosition);
    };
    ApplicationTest.prototype.update = function (elapsedMsec, intervalSec) {
        console.log(" elapsedMsec : " + elapsedMsec + " intervalSec : " + intervalSec);
    };
    ApplicationTest.prototype.render = function () {
        console.log(" 调用render方法 ");
    };
    return ApplicationTest;
}(Application_1.Application));
var canvas = document.getElementById('canvas');
var app = new ApplicationTest(canvas);
app.update(0, 0);
app.render();
var startButton = document.getElementById('start');
var stopButton = document.getElementById('stop');
startButton.onclick = function (ev) {
    app.start();
};
stopButton.onclick = function (ev) {
    app.stop();
};
},{"../../src/draw2d/Application":1}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZHJhdzJkL0FwcGxpY2F0aW9uLnRzIiwic3JjL2RyYXcyZC9tYXRoMmQudHMiLCJ0ZXN0L2RyYXcyZC9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7O0FDQUEsbUNBQWlDO0FBQ2pDLElBQVksZUFVWDtBQVZELFdBQVksZUFBZTtJQUN2QixpRUFBVSxDQUFBO0lBQ1YsK0RBQVMsQ0FBQTtJQUNULDJEQUFPLENBQUE7SUFDUCwrREFBUyxDQUFBO0lBQ1QsK0RBQVMsQ0FBQTtJQUNULHVFQUFhLENBQUE7SUFDYix1REFBSyxDQUFBO0lBQ0wsMkRBQU8sQ0FBQTtJQUNQLDZEQUFRLENBQUE7QUFDWixDQUFDLEVBVlcsZUFBZSxHQUFmLHVCQUFlLEtBQWYsdUJBQWUsUUFVMUI7QUFBQyxDQUFDO0FBRUg7SUFLSSwwQkFBcUIsSUFBc0IsRUFBRyxNQUF3QixFQUFHLE9BQXlCLEVBQUcsUUFBMEI7UUFBakYsdUJBQUEsRUFBQSxjQUF3QjtRQUFHLHdCQUFBLEVBQUEsZUFBeUI7UUFBRyx5QkFBQSxFQUFBLGdCQUEwQjtRQUMzSCxJQUFJLENBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBRTtRQUN4QixJQUFJLENBQUcsT0FBTyxHQUFHLE9BQU8sQ0FBRTtRQUMxQixJQUFJLENBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBRTtRQUM1QixJQUFJLENBQUcsSUFBSSxHQUFHLElBQUksQ0FBRTtJQUN4QixDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQVhBLEFBV0MsSUFBQTtBQVhZLDRDQUFnQjtBQWdCN0I7SUFXSSxlQUFjLFFBQXdCO1FBVi9CLE9BQUUsR0FBWSxDQUFDLENBQUMsQ0FBRTtRQUNsQixZQUFPLEdBQVksS0FBSyxDQUFFO1FBRzFCLGlCQUFZLEdBQVEsU0FBUyxDQUFDO1FBRTlCLGNBQVMsR0FBWSxDQUFDLENBQUU7UUFDeEIsWUFBTyxHQUFZLENBQUMs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UUFDdkQsT0FBTyxDQUFHLEdBQUcsQ0FBRyxpQkFBaUIsR0FBRyxXQUFXLEdBQUcsaUJBQWlCLEdBQUcsV0FBVyxDQUFFLENBQUU7SUFDekYsQ0FBQztJQUVNLGdDQUFNLEdBQWI7UUFDSSxPQUFPLENBQUcsR0FBRyxDQUFHLGNBQWMsQ0FBRSxDQUFFO0lBQ3RDLENBQUM7SUFDTCxzQkFBQztBQUFELENBaEJBLEFBZ0JDLENBaEI2Qix5QkFBVyxHQWdCeEM7QUFFRCxJQUFJLE1BQU0sR0FBOEIsUUFBUSxDQUFHLGNBQWMsQ0FBRyxRQUFRLENBQXVCLENBQUU7QUFFckcsSUFBSSxHQUFHLEdBQWlCLElBQUksZUFBZSxDQUFHLE1BQU0sQ0FBRSxDQUFFO0FBRXhELEdBQUcsQ0FBRyxNQUFNLENBQUcsQ0FBQyxFQUFHLENBQUMsQ0FBRSxDQUFFO0FBQ3hCLEdBQUcsQ0FBRyxNQUFNLEVBQUksQ0FBRTtBQUVsQixJQUFJLFdBQVcsR0FBOEIsUUFBUSxDQUFHLGNBQWMsQ0FBRyxPQUFPLENBQXVCLENBQUU7QUFDekcsSUFBSSxVQUFVLEdBQThCLFFBQVEsQ0FBRyxjQUFjLENBQUcsTUFBTSxDQUF1QixDQUFFO0FBRXZHLFdBQVcsQ0FBRyxPQUFPLEdBQUcsVUFBRSxFQUFlO0lBQ3JDLEdBQUcsQ0FBRyxLQUFLLEVBQUksQ0FBRTtBQUNyQixDQUFDLENBQUE7QUFFRCxVQUFVLENBQUcsT0FBTyxHQUFHLFVBQUUsRUFBZTtJQUNwQyxHQUFHLENBQUcsSUFBSSxFQUFJLENBQUU7QUFDcEIsQ0FBQyxDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgdmVjMiB9IGZyb20gXCIuL21hdGgyZFwiIDtcclxuZXhwb3J0IGVudW0gRUlucHV0RXZlbnRUeXBlIHtcclxuICAgIE1PVVNFRVZFTlQgLCAgICBcclxuICAgIE1PVVNFRE9XTiAsICAgICBcclxuICAgIE1PVVNFVVAgLCAgICAgIFxyXG4gICAgTU9VU0VNT1ZFICwgICAgIFxyXG4gICAgTU9VU0VEUkFHICwgICAgXHJcbiAgICBLRVlCT0FSREVWRU5UICwgXHJcbiAgICBLRVlVUCAsICAgICAgICAgXHJcbiAgICBLRVlET1dOICwgICAgICAgXHJcbiAgICBLRVlQUkVTUyAgICBcclxufSA7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FudmFzSW5wdXRFdmVudCB7XHJcbiAgICBwdWJsaWMgYWx0S2V5IDogYm9vbGVhbiA7XHJcbiAgICBwdWJsaWMgY3RybEtleSA6IGJvb2xlYW4gO1xyXG4gICAgcHVibGljIHNoaWZ0S2V5IDogYm9vbGVhbiA7XHJcbiAgICBwdWJsaWMgdHlwZSA6IEVJbnB1dEV2ZW50VHlwZSA7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKCB0eXBlIDogRUlucHV0RXZlbnRUeXBlICwgYWx0S2V5IDogYm9vbGVhbiA9IGZhbHNlICwgY3RybEtleSA6IGJvb2xlYW4gPSBmYWxzZSAsIHNoaWZ0S2V5IDogYm9vbGVhbiA9IGZhbHNlICApIHtcclxuICAgICAgICB0aGlzIC4gYWx0S2V5ID0gYWx0S2V5IDtcclxuICAgICAgICB0aGlzIC4gY3RybEtleSA9IGN0cmxLZXkgO1xyXG4gICAgICAgIHRoaXMgLiBzaGlmdEtleSA9IHNoaWZ0S2V5IDtcclxuICAgICAgICB0aGlzIC4gdHlwZSA9IHR5cGUgO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBUaW1lckNhbGxiYWNrID0gKCBpZCA6IG51bWJlciAsIGRhdGEgOiBhbnkgKSA9PiB2b2lkIDtcclxuXHJcblxyXG5jbGFzcyBUaW1lciB7XHJcbiAgICBwdWJsaWMgaWQgOiBudW1iZXIgPSAtMSA7ICBcclxuICAgIHB1YmxpYyBlbmFibGVkOiBib29sZWFuID0gZmFsc2UgOyAgXHJcblxyXG4gICAgcHVibGljIGNhbGxiYWNrIDogVGltZXJDYWxsYmFjazsgIFxyXG4gICAgcHVibGljIGNhbGxiYWNrRGF0YTogYW55ID0gdW5kZWZpbmVkOyBcclxuXHJcbiAgICBwdWJsaWMgY291bnRkb3duIDogbnVtYmVyID0gMCA7IFxyXG4gICAgcHVibGljIHRpbWVvdXQgOiBudW1iZXIgPSAwOyBcclxuICAgIHB1YmxpYyBvbmx5T25jZSA6IGJvb2xlYW4gPSBmYWxzZSA7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKCBjYWxsYmFjayA6IFRpbWVyQ2FsbGJhY2sgKSB7XHJcbiAgICAgICAgdGhpcyAuY2FsbGJhY2sgPSBjYWxsYmFjayA7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDYW52YXNNb3VzZUV2ZW50IGV4dGVuZHMgQ2FudmFzSW5wdXRFdmVudCB7XHJcbiAgICBwdWJsaWMgYnV0dG9uICA6IG51bWJlciAgO1xyXG4gICAgcHVibGljIGNhbnZhc1Bvc2l0aW9uICA6IHZlYzIgIDtcclxuICAgIFxyXG4gICAgcHVibGljIGxvY2FsUG9zaXRpb24gIDogdmVjMiAgOyBcclxuICAgIHB1YmxpYyBoYXNMb2NhbFBvc2l0aW9uIDogYm9vbGVhbiA7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yICggdHlwZSA6IEVJbnB1dEV2ZW50VHlwZSAsIGNhbnZhc1BvcyA6IHZlYzIgLCBidXR0b24gOiBudW1iZXIgLCBhbHRLZXkgIDogYm9vbGVhbiA9IGZhbHNlICwgY3RybEtleSA6IGJvb2xlYW4gPSBmYWxzZSAsIHNoaWZ0S2V5IDogYm9vbGVhbiA9IGZhbHNlICkge1xyXG4gICAgICAgIHN1cGVyICggdHlwZSAsIGFsdEtleSAsIGN0cmxLZXkgLCBzaGlmdEtleSApIDtcclxuICAgICAgICB0aGlzIC4gY2FudmFzUG9zaXRpb24gPSBjYW52YXNQb3MgO1xyXG4gICAgICAgIHRoaXMgLiBidXR0b24gPSBidXR0b24gO1xyXG4gICAgICAgIHRoaXMgLiBoYXNMb2NhbFBvc2l0aW9uID0gZmFsc2UgO1xyXG4gICAgICAgIHRoaXMgLiBsb2NhbFBvc2l0aW9uID0gdmVjMiAuIGNyZWF0ZSAoICkgO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FudmFzS2V5Qm9hcmRFdmVudCBleHRlbmRzIENhbnZhc0lucHV0RXZlbnQge1xyXG4gICAgcHVibGljIGtleSA6IHN0cmluZyA7XHJcbiAgICBwdWJsaWMga2V5Q29kZSA6IG51bWJlciA7XHJcbiAgICBwdWJsaWMgcmVwZWF0IDogYm9vbGVhbiA7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yICggdHlwZSA6IEVJbnB1dEV2ZW50VHlwZSAsIGtleSA6IHN0cmluZyAsIGtleUNvZGUgOiBudW1iZXIgLCByZXBlYXQgOiBib29sZWFuICwgYWx0S2V5IDogYm9vbGVhbiA9IGZhbHNlICwgY3RybEtleSA6IGJvb2xlYW4gPSBmYWxzZSAsIHNoaWZ0S2V5IDogYm9vbGVhbiA9IGZhbHNlICkge1xyXG4gICAgICAgIHN1cGVyICggdHlwZSAsIGFsdEtleSAsIGN0cmxLZXkgLCBzaGlmdEtleSAgKSA7XHJcbiAgICAgICAgdGhpcyAuIGtleSA9IGtleSA7XHJcbiAgICAgICAgdGhpcyAuIGtleUNvZGUgPSBrZXlDb2RlIDtcclxuICAgICAgICB0aGlzIC4gcmVwZWF0ID0gcmVwZWF0IDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFwcGxpY2F0aW9uIGltcGxlbWVudHMgRXZlbnRMaXN0ZW5lck9iamVjdCB7XHJcblxyXG4gICAgcHVibGljIHRpbWVycyA6IFRpbWVyWyBdID0gWyBdIDtcclxuXHJcbiAgICBwcml2YXRlIF90aW1lSWQgOiBudW1iZXIgPSAtMSA7XHJcblxyXG4gICAgcHJpdmF0ZSBfZnBzIDogbnVtYmVyID0gMCA7XHJcblxyXG4gICAgcHVibGljIGNhbnZhcyA6IEhUTUxDYW52YXNFbGVtZW50ICA7XHJcblxyXG4gICAgcHVibGljIGlzU3VwcG9ydE1vdXNlTW92ZSA6IGJvb2xlYW4gO1xyXG4gICAgcHJvdGVjdGVkIF9pc01vdXNlRG93biA6IGJvb2xlYW4gO1xyXG5cclxuICAgIHByb3RlY3RlZCBfc3RhcnQgOiBib29sZWFuID0gZmFsc2UgO1xyXG4gICAgcHJvdGVjdGVkIF9yZXF1ZXN0SWQgOiBudW1iZXIgPSAtMSA7XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBfbGFzdFRpbWUgISA6IG51bWJlciA7XHJcbiAgICBwcm90ZWN0ZWQgX3N0YXJ0VGltZSAhIDogbnVtYmVyIDtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKCBjYW52YXMgOiBIVE1MQ2FudmFzRWxlbWVudCAgKSB7XHJcbiAgICAgICAgdGhpcyAuIGNhbnZhcyA9IGNhbnZhcyA7XHJcbiAgICAgICAgdGhpcyAuIGNhbnZhcyAuIGFkZEV2ZW50TGlzdGVuZXIgKCBcIm1vdXNlZG93blwiICwgdGhpcyAsIGZhbHNlICkgO1xyXG4gICAgICAgIHRoaXMgLiBjYW52YXMgLiBhZGRFdmVudExpc3RlbmVyICggXCJtb3VzZXVwXCIgLCB0aGlzICwgZmFsc2UgKSA7XHJcbiAgICAgICAgdGhpcyAuIGNhbnZhcyAuIGFkZEV2ZW50TGlzdGVuZXIgKCBcIm1vdXNlbW92ZVwiICwgdGhpcyAsIGZhbHNlICkgO1xyXG4gICAgICAgIHdpbmRvdyAuIGFkZEV2ZW50TGlzdGVuZXIgKCBcImtleWRvd25cIiAsIHRoaXMgLCBmYWxzZSApIDtcclxuICAgICAgICB3aW5kb3cgLiBhZGRFdmVudExpc3RlbmVyICggXCJrZXl1cFwiICwgdGhpcyAsIGZhbHNlICkgO1xyXG4gICAgICAgIHdpbmRvdyAuIGFkZEV2ZW50TGlzdGVuZXIgKCBcImtleXByZXNzXCIgLCB0aGlzICwgZmFsc2UgKSA7XHJcbiAgICAgICAgdGhpcyAuIF9pc01vdXNlRG93biA9IGZhbHNlIDtcclxuICAgICAgICB0aGlzIC4gaXNTdXBwb3J0TW91c2VNb3ZlID0gZmFsc2UgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc1J1bm5pbmcgKCApIDogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMgLiBfc3RhcnQgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZnBzICggKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMgLiBfZnBzIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnQgICggKSA6IHZvaWQge1xyXG4gICAgICAgIGlmICggISB0aGlzIC4gX3N0YXJ0ICkge1xyXG4gICAgICAgICAgICB0aGlzIC4gX3N0YXJ0ID0gdHJ1ZSA7XHJcbiAgICAgICAgICAgIHRoaXMgLiBfbGFzdFRpbWUgPSAtMSA7XHJcbiAgICAgICAgICAgIHRoaXMgLiBfc3RhcnRUaW1lID0gLTEgO1xyXG4gICAgICAgICAgICB0aGlzIC4gX3JlcXVlc3RJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSAoICggbXNlYyA6IG51bWJlciApIDogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzIC4gc3RlcCAoIG1zZWMgKSBcclxuICAgICAgICAgICAgfSApIDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0ZXAgKCB0aW1lU3RhbXAgOiBudW1iZXIgKSA6IHZvaWQge1xyXG4gICAgICAgaWYgKCB0aGlzIC4gX3N0YXJ0VGltZSA9PT0gLTEgKSB0aGlzIC4gX3N0YXJ0VGltZSA9IHRpbWVTdGFtcCA7XHJcbiAgICAgICBpZiggIHRoaXMgLiBfbGFzdFRpbWUgPT09IC0xICkgdGhpcyAuIF9sYXN0VGltZSA9IHRpbWVTdGFtcCA7XHJcbiAgICAgICBsZXQgZWxhcHNlZE1zZWMgPSB0aW1lU3RhbXAgLSB0aGlzIC4gX3N0YXJ0VGltZSA7XHJcbiAgICAgICBsZXQgaW50ZXJ2YWxTZWMgPSAoIHRpbWVTdGFtcCAtIHRoaXMgLiBfbGFzdFRpbWUgKSA7XHJcbiAgICAgICBpZiAoIGludGVydmFsU2VjICE9PSAwICkge1xyXG4gICAgICAgICAgIHRoaXMgLiBfZnBzID0gMTAwMC4wIC8gaW50ZXJ2YWxTZWMgO1xyXG4gICAgICAgfVxyXG4gICAgICAgaW50ZXJ2YWxTZWMgLz0gMTAwMC4wIDtcclxuICAgICAgIHRoaXMgLl9sYXN0VGltZSA9IHRpbWVTdGFtcCA7XHJcbiAgICAgICB0aGlzIC4gX2hhbmRsZVRpbWVycyAoIGludGVydmFsU2VjICkgO1xyXG4gICAgICAgdGhpcyAuIHVwZGF0ZSAoIGVsYXBzZWRNc2VjICwgaW50ZXJ2YWxTZWMgKSA7XHJcbiAgICAgICB0aGlzIC4gcmVuZGVyICggKSA7XHJcbiAgICAgICBcclxuICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSAoIHRoaXMgLiBzdGVwIC4gYmluZCAoIHRoaXMgKSApIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RvcCAgKCApIDogdm9pZCB7XHJcbiAgICAgICAgaWYgKCB0aGlzIC4gX3N0YXJ0ICkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3aW5kb3cgLiBjYW5jZWxBbmltYXRpb25GcmFtZSAoIHRoaXMgLiBfcmVxdWVzdElkICkgO1xyXG4gICAgICAgICAgICB0aGlzIC4gX3JlcXVlc3RJZCA9IC0xIDtcclxuICAgICAgICAgICAgdGhpcyAuIF9sYXN0VGltZSA9IC0xIDsgXHJcbiAgICAgICAgICAgIHRoaXMgLiBfc3RhcnRUaW1lID0gLTEgO1xyXG4gICAgICAgICAgICB0aGlzIC4gX3N0YXJ0ID0gZmFsc2UgOyAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlICggZWxhcHNlZE1zZWMgOiBudW1iZXIgLCBpbnRlcnZhbFNlYyA6IG51bWJlciApIDogdm9pZCB7IH1cclxuICAgIHB1YmxpYyByZW5kZXIgICggKSA6IHZvaWQgeyB9XHJcbiAgICBwdWJsaWMgaGFuZGxlRXZlbnQgKCBldnQgIDogRXZlbnQgKSAgOiB2b2lkIHtcclxuICAgICAgICBzd2l0Y2ggKCBldnQgLiB0eXBlICkge1xyXG4gICAgICAgICAgICBjYXNlIFwibW91c2Vkb3duXCIgOlxyXG4gICAgICAgICAgICAgICAgdGhpcyAuIF9pc01vdXNlRG93biA9IHRydWUgO1xyXG4gICAgICAgICAgICAgICAgdGhpcyAuIGRpc3BhdGNoTW91c2VEb3duICggdGhpcyAuIF90b0NhbnZhc01vdXNlRXZlbnQgKCBldnQgLCBFSW5wdXRFdmVudFR5cGUgLiBNT1VTRURPV04gKSApIDtcclxuICAgICAgICAgICAgICAgIGJyZWFrIDtcclxuICAgICAgICAgICAgY2FzZSBcIm1vdXNldXBcIiA6XHJcbiAgICAgICAgICAgICAgICB0aGlzIC4gX2lzTW91c2VEb3duID0gZmFsc2UgO1xyXG4gICAgICAgICAgICAgICAgdGhpcyAuIGRpc3BhdGNoTW91c2VVcCAoIHRoaXMgLiBfdG9DYW52YXNNb3VzZUV2ZW50ICggZXZ0ICwgRUlucHV0RXZlbnRUeXBlIC4gTU9VU0VVUCApICkgO1xyXG4gICAgICAgICAgICAgICAgYnJlYWsgO1xyXG4gICAgICAgICAgICBjYXNlIFwibW91c2Vtb3ZlXCIgOlxyXG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzIC4gaXNTdXBwb3J0TW91c2VNb3ZlICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMgLiBkaXNwYXRjaE1vdXNlTW92ZSAoIHRoaXMgLiBfdG9DYW52YXNNb3VzZUV2ZW50ICggZXZ0ICwgRUlucHV0RXZlbnRUeXBlIC4gTU9VU0VNT1ZFICkgKSA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMgLiBfaXNNb3VzZURvd24gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcyAuIGRpc3BhdGNoTW91c2VEcmFnICggdGhpcyAuIF90b0NhbnZhc01vdXNlRXZlbnQgKCBldnQgLCBFSW5wdXRFdmVudFR5cGUgLiBNT1VTRURSQUcgKSApIDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrIDtcclxuICAgICAgICAgICAgY2FzZSBcImtleXByZXNzXCIgOlxyXG4gICAgICAgICAgICAgICAgdGhpcyAuIGRpc3BhdGNoS2V5UHJlc3MgKCB0aGlzIC4gX3RvQ2FudmFzS2V5Qm9hcmRFdmVudCAoIGV2dCAsIEVJbnB1dEV2ZW50VHlwZSAuIEtFWVBSRVNTICkgKSA7XHJcbiAgICAgICAgICAgICAgICBicmVhayA7XHJcbiAgICAgICAgICAgIGNhc2UgXCJrZXlkb3duXCIgOlxyXG4gICAgICAgICAgICAgICAgdGhpcyAuIGRpc3BhdGNoS2V5RG93biAoIHRoaXMgLiBfdG9DYW52YXNLZXlCb2FyZEV2ZW50ICggZXZ0ICwgRUlucHV0RXZlbnRUeXBlIC4gS0VZRE9XTiApICkgO1xyXG4gICAgICAgICAgICAgICAgYnJlYWsgO1xyXG4gICAgICAgICAgICBjYXNlIFwia2V5dXBcIiA6XHJcbiAgICAgICAgICAgICAgICB0aGlzIC4gZGlzcGF0Y2hLZXlVcCAoIHRoaXMgLiBfdG9DYW52YXNLZXlCb2FyZEV2ZW50ICggZXZ0ICwgRUlucHV0RXZlbnRUeXBlIC4gS0VZVVAgKSApIDtcclxuICAgICAgICAgICAgICAgIGJyZWFrIDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGRpc3BhdGNoTW91c2VEb3duICggZXZ0IDogQ2FudmFzTW91c2VFdmVudCApIDogdm9pZCB7XHJcbiAgICAgICAgcmV0dXJuIDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZGlzcGF0Y2hNb3VzZVVwICggZXZ0IDogQ2FudmFzTW91c2VFdmVudCApIDogdm9pZCB7XHJcbiAgICAgICAgcmV0dXJuIDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZGlzcGF0Y2hNb3VzZU1vdmUgKCBldnQgOiBDYW52YXNNb3VzZUV2ZW50ICkgOiB2b2lkIHtcclxuICAgICAgICByZXR1cm4gO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBkaXNwYXRjaE1vdXNlRHJhZyAoIGV2dCA6IENhbnZhc01vdXNlRXZlbnQgKSA6IHZvaWQge1xyXG4gICAgICAgIHJldHVybiA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGRpc3BhdGNoS2V5RG93biAoIGV2dCA6IENhbnZhc0tleUJvYXJkRXZlbnQgKSA6IHZvaWQge1xyXG4gICAgICAgIHJldHVybiA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGRpc3BhdGNoS2V5VXAgKCBldnQgOiBDYW52YXNLZXlCb2FyZEV2ZW50ICkgOiB2b2lkIHtcclxuICAgICAgICByZXR1cm4gO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBkaXNwYXRjaEtleVByZXNzICggZXZ0IDogQ2FudmFzS2V5Qm9hcmRFdmVudCApIDogdm9pZCB7XHJcbiAgICAgICAgcmV0dXJuIDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF92aWV3cG9ydFRvQ2FudmFzQ29vcmRpbmF0ZSAoIGV2dCA6IE1vdXNlRXZlbnQgKSA6IHZlYzIge1xyXG4gICAgICAgIGlmICggdGhpcyAuIGNhbnZhcyApIHtcclxuICAgICAgICAgICAgbGV0IHJlY3QgOiBDbGllbnRSZWN0ID0gdGhpcyAuIGNhbnZhcyAuIGdldEJvdW5kaW5nQ2xpZW50UmVjdCAoICkgO1xyXG4gICAgICAgICAgICBpZiAoIGV2dCAuIHR5cGUgPT09IFwibW91c2Vkb3duXCIgKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlIC4gbG9nIChcIiBib3VuZGluZ0NsaWVudFJlY3QgOiBcIiArIEpTT04gLiBzdHJpbmdpZnkgKCByZWN0ICkgKSA7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlIC4gbG9nICggXCIgY2xpZW50WCA6IFwiICsgZXZ0IC4gY2xpZW50WCArIFwiIGNsaWVudFkgOiBcIiArIGV2dC5jbGllbnRZICkgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICggZXZ0IC4gdGFyZ2V0ICkgXHJcbiAgICAgICAgICAgIHsgXHJcbiAgICAgICAgICAgICAgICBsZXQgYm9yZGVyTGVmdFdpZHRoIDogbnVtYmVyID0gMCA7ICBcclxuICAgICAgICAgICAgICAgIGxldCBib3JkZXJUb3BXaWR0aCA6IG51bWJlciA9IDAgOyAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IHBhZGRpbmdMZWZ0IDogbnVtYmVyID0gMCA7ICAgICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgcGFkZGluZ1RvcCA6IG51bWJlciA9IDAgOyAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBkZWNsIDogQ1NTU3R5bGVEZWNsYXJhdGlvbiAgPSB3aW5kb3cgLiBnZXRDb21wdXRlZFN0eWxlICggZXZ0IC4gdGFyZ2V0IGFzIEhUTUxFbGVtZW50ICkgO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0ck51bWJlciA6IHN0cmluZyB8IG51bGwgPSAgZGVjbCAuIGJvcmRlckxlZnRXaWR0aCA7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCBzdHJOdW1iZXIgIT09IG51bGwgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyTGVmdFdpZHRoICA9IHBhcnNlSW50ICggc3RyTnVtYmVyICwgMTAgKSA7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCBzdHJOdW1iZXIgIT09IG51bGwgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyVG9wV2lkdGggPSBwYXJzZUludCAoIHN0ck51bWJlciAsIDEwICkgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHN0ck51bWJlciA9IGRlY2wgLiBwYWRkaW5nTGVmdCA7XHJcbiAgICAgICAgICAgICAgICBpZiAoIHN0ck51bWJlciAhPT0gbnVsbCApIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nTGVmdCA9IHBhcnNlSW50KHN0ck51bWJlciwxMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc3RyTnVtYmVyID0gZGVjbCAuIHBhZGRpbmdUb3AgO1xyXG4gICAgICAgICAgICAgICAgaWYgKCBzdHJOdW1iZXIgIT09IG51bGwgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZ1RvcCA9IHBhcnNlSW50ICggc3RyTnVtYmVyICwgMTApIDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgeCA6IG51bWJlciAgPSBldnQgLiBjbGllbnRYIC0gcmVjdCAuIGxlZnQgLSBib3JkZXJMZWZ0V2lkdGggLSBwYWRkaW5nTGVmdCA7XHJcbiAgICAgICAgICAgICAgICBsZXQgeSA6IG51bWJlciAgPSBldnQgLiBjbGllbnRZIC0gcmVjdCAuIHRvcCAtIGJvcmRlclRvcFdpZHRoIC0gcGFkZGluZ1RvcCA7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHBvcyA6IHZlYzIgPSB2ZWMyIC4gY3JlYXRlICggeCAsIHkgKSA7ICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICggZXZ0IC4gdHlwZSA9PT0gXCJtb3VzZWRvd25cIiApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlIC4gbG9nICggXCIgYm9yZGVyTGVmdFdpZHRoIDogXCIgKyBib3JkZXJMZWZ0V2lkdGggKyBcIiBib3JkZXJUb3BXaWR0aCA6IFwiICsgYm9yZGVyVG9wV2lkdGggKSA7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZSAuIGxvZyAoIFwiIHBhZGRpbmdMZWZ0IDogXCIgKyBwYWRkaW5nTGVmdCArIFwiIHBhZGRpbmdUb3AgOiBcIiArIHBhZGRpbmdUb3AgKSA7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZSAuIGxvZyAoIFwiIOWPmOaNouWQjueahGNhbnZhc1Bvc2l0aW9uIDogXCIgKyBwb3MgLiB0b1N0cmluZyggKSApIDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zIDtcclxuICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICBhbGVydChcImNhbnZhc+S4um51bGxcIik7XHJcbiAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYW52YXPkuLpudWxsXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBhbGVydChcImV2dCAuIHRhcmdldOS4um51bGxcIik7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZXZ0IC4gdGFyZ2V05Li6bnVsbFwiKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfdG9DYW52YXNNb3VzZUV2ZW50ICggZXZ0IDogRXZlbnQgLCB0eXBlIDogRUlucHV0RXZlbnRUeXBlICkgOiBDYW52YXNNb3VzZUV2ZW50IHtcclxuICAgICAgICBsZXQgZXZlbnQgOiBNb3VzZUV2ZW50ID0gZXZ0IGFzIE1vdXNlRXZlbnQgO1xyXG4gICAgICAgIGxldCBtb3VzZVBvc2l0aW9uIDogdmVjMiA9IHRoaXMgLiBfdmlld3BvcnRUb0NhbnZhc0Nvb3JkaW5hdGUgKCBldmVudCApIDtcclxuICAgICAgICBsZXQgY2FudmFzTW91c2VFdmVudCA6IENhbnZhc01vdXNlRXZlbnQgPSBuZXcgQ2FudmFzTW91c2VFdmVudCAoIHR5cGUgLCBtb3VzZVBvc2l0aW9uICwgZXZlbnQgLiBidXR0b24gLCBldmVudCAuIGFsdEtleSAsIGV2ZW50IC4gY3RybEtleSAsIGV2ZW50IC4gc2hpZnRLZXkgKSA7XHJcbiAgICAgICAgcmV0dXJuIGNhbnZhc01vdXNlRXZlbnQgO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3RvQ2FudmFzS2V5Qm9hcmRFdmVudCAoIGV2dCA6IEV2ZW50ICwgdHlwZSA6IEVJbnB1dEV2ZW50VHlwZSAgKSA6IENhbnZhc0tleUJvYXJkRXZlbnQge1xyXG4gICAgICAgIGxldCBldmVudCA6IEtleWJvYXJkRXZlbnQgPSBldnQgYXMgS2V5Ym9hcmRFdmVudCA7XHJcbiAgICAgICAgbGV0IGNhbnZhc0tleWJvYXJkRXZlbnQgOiBDYW52YXNLZXlCb2FyZEV2ZW50ID0gbmV3IENhbnZhc0tleUJvYXJkRXZlbnQgKCB0eXBlICwgZXZlbnQgLiBrZXkgLCBldmVudCAuIGtleUNvZGUgLCBldmVudCAuIHJlcGVhdCAsIGV2ZW50IC4gYWx0S2V5ICwgZXZlbnQgLiBjdHJsS2V5ICwgZXZlbnQgLiBzaGlmdEtleSApIDtcclxuICAgICAgICByZXR1cm4gY2FudmFzS2V5Ym9hcmRFdmVudCA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFRpbWVyICggY2FsbGJhY2sgOiBUaW1lckNhbGxiYWNrICwgdGltZW91dCA6IG51bWJlciA9IDEuMCAsIG9ubHlPbmNlIDogYm9vbGVhbiA9IGZhbHNlICxkYXRhIDogYW55ID0gdW5kZWZpbmVkICkgOiBudW1iZXIge1xyXG4gICAgICAgIGxldCB0aW1lciA6IFRpbWVyXHJcbiAgICAgICAgbGV0IGZvdW5kIDogYm9vbGVhbiA9IGZhbHNlIDtcclxuICAgICAgICBmb3IgKCBsZXQgaSA9IDAgOyBpIDwgdGhpcyAuIHRpbWVycyAuIGxlbmd0aCA7IGkgKysgKSB7XHJcbiAgICAgICAgICAgIGxldCB0aW1lciA6IFRpbWVyID0gdGhpcyAuIHRpbWVycyBbIGkgXSA7XHJcbiAgICAgICAgICAgIGlmICggdGltZXIgLiBlbmFibGVkID09PSBmYWxzZSApIHtcclxuICAgICAgICAgICAgICAgIHRpbWVyIC4gY2FsbGJhY2sgPSBjYWxsYmFjayA7XHJcbiAgICAgICAgICAgICAgICB0aW1lciAuIGNhbGxiYWNrRGF0YSA9IGRhdGEgO1xyXG4gICAgICAgICAgICAgICAgdGltZXIgLiB0aW1lb3V0ID0gdGltZW91dCA7XHJcbiAgICAgICAgICAgICAgICB0aW1lciAuIGNvdW50ZG93biA9IHRpbWVvdXQgO1xyXG4gICAgICAgICAgICAgICAgdGltZXIgLiBlbmFibGVkID0gdHJ1ZSA7XHJcbiAgICAgICAgICAgICAgICB0aW1lciAuIG9ubHlPbmNlID0gb25seU9uY2UgO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWVyIC4gaWQgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aW1lciA9IG5ldyBUaW1lciAoIGNhbGxiYWNrICkgO1xyXG4gICAgICAgIHRpbWVyIC4gY2FsbGJhY2tEYXRhID0gZGF0YSA7XHJcbiAgICAgICAgdGltZXIgLiB0aW1lb3V0ID0gdGltZW91dCA7XHJcbiAgICAgICAgdGltZXIgLiBjb3VudGRvd24gPSB0aW1lb3V0IDtcclxuICAgICAgICB0aW1lciAuIGVuYWJsZWQgPSB0cnVlIDtcclxuICAgICAgICB0aW1lciAuIGlkID0gKysgdGhpcyAuIF90aW1lSWQgOyBcclxuICAgICAgICB0aW1lciAuIG9ubHlPbmNlID0gb25seU9uY2UgOyBcclxuICAgICAgXHJcbiAgICAgICAgdGhpcyAuIHRpbWVycyAuIHB1c2ggKCB0aW1lciApIDtcclxuICAgICAgICByZXR1cm4gdGltZXIgLiBpZCA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZVRpbWVyICggaWQgOiBudW1iZXIgKSA6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBmb3VuZCA6IGJvb2xlYW4gPSBmYWxzZSA7XHJcbiAgICAgICAgZm9yICggbGV0IGkgPSAwIDsgaSA8IHRoaXMgLiB0aW1lcnMgLiBsZW5ndGggOyBpICsrICkge1xyXG4gICAgICAgICAgICBpZiAoIHRoaXMgLiB0aW1lcnMgWyBpIF0gLiBpZCA9PT0gaWQgKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGltZXIgOiBUaW1lciA9IHRoaXMgLiB0aW1lcnMgWyBpIF0gO1xyXG4gICAgICAgICAgICAgICAgdGltZXIgLiBlbmFibGVkID0gZmFsc2UgOyBcclxuICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZSA7XHJcbiAgICAgICAgICAgICAgICBicmVhayA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZvdW5kIDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9oYW5kbGVUaW1lcnMgKCBpbnRlcnZhbFNlYyA6IG51bWJlciApIDogIHZvaWQge1xyXG4gICAgICAgIGZvciAoIGxldCBpID0gMCA7IGkgPCB0aGlzIC4gdGltZXJzIC4gbGVuZ3RoIDsgaSArKyApIHtcclxuICAgICAgICAgICAgbGV0IHRpbWVyIDogVGltZXIgPSB0aGlzIC4gdGltZXJzIFsgaSBdIDtcclxuICAgICAgICAgICAgaWYoIHRpbWVyIC4gZW5hYmxlZCA9PT0gZmFsc2UgKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZSA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGltZXIgLiBjb3VudGRvd24gLT0gaW50ZXJ2YWxTZWMgO1xyXG4gICAgICAgICAgICBpZiAoIHRpbWVyIC4gY291bnRkb3duIDwgMC4wICkge1xyXG4gICAgICAgICAgICAgICAgdGltZXIgLiBjYWxsYmFjayAoIHRpbWVyIC4gaWQgLCB0aW1lciAuIGNhbGxiYWNrRGF0YSApIDtcclxuICAgICAgICAgICAgICAgIGlmICggdGltZXIgLiBvbmx5T25jZSA9PT0gZmFsc2UgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGltZXIgLiBjb3VudGRvd24gPSB0aW1lciAuIHRpbWVvdXQgOyBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7ICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzIC4gcmVtb3ZlVGltZXIgKCB0aW1lciAuIGlkICkgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FudmFzMkRBcHBsaWNhdGlvbiBleHRlbmRzIEFwcGxpY2F0aW9uIHtcclxuICAgIHB1YmxpYyBjb250ZXh0MkQgOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgfCBudWxsIDtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAoIGNhbnZhcyA6IEhUTUxDYW52YXNFbGVtZW50ICApIHtcclxuICAgICAgICBzdXBlciggY2FudmFzICkgO1xyXG4gICAgICAgIHRoaXMgLiBjb250ZXh0MkQgPSB0aGlzIC4gY2FudmFzIC4gZ2V0Q29udGV4dCggXCIyZFwiICkgO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgV2ViR0xBcHBsaWNhdGlvbiBleHRlbmRzIEFwcGxpY2F0aW9uIHtcclxuICAgIHB1YmxpYyBjb250ZXh0M0QgOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQgfCBudWxsIDtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAoIGNhbnZhcyA6IEhUTUxDYW52YXNFbGVtZW50ICwgY29udGV4dEF0dHJpYnV0ZXMgPyA6IFdlYkdMQ29udGV4dEF0dHJpYnV0ZXMgKSB7XHJcbiAgICAgICAgc3VwZXIoIGNhbnZhcyApIDtcclxuICAgICAgICB0aGlzIC4gY29udGV4dDNEID0gdGhpcyAuIGNhbnZhcyAuIGdldENvbnRleHQoIFwid2ViZ2xcIiAsIGNvbnRleHRBdHRyaWJ1dGVzICkgO1xyXG4gICAgICAgIGlmICggdGhpcyAuIGNvbnRleHQzRCA9PT0gbnVsbCApIHtcclxuICAgICAgICAgICAgdGhpcyAuIGNvbnRleHQzRCA9IHRoaXMgLiBjYW52YXMgLiBnZXRDb250ZXh0KCBcImV4cGVyaW1lbnRhbC13ZWJnbFwiICwgY29udGV4dEF0dHJpYnV0ZXMgKSA7XHJcbiAgICAgICAgICAgIGlmICggdGhpcyAuIGNvbnRleHQzRCA9PT0gbnVsbCApIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0ICggXCIg5peg5rOV5Yib5bu6V2ViR0xSZW5kZXJpbmdDb250ZXh05LiK5LiL5paH5a+56LGhIFwiICkgO1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yICggXCIg5peg5rOV5Yib5bu6V2ViR0xSZW5kZXJpbmdDb250ZXh05LiK5LiL5paH5a+56LGhIFwiICkgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIlxyXG5leHBvcnQgY2xhc3MgdmVjMiB7XHJcbiAgICBwdWJsaWMgdmFsdWVzIDogRmxvYXQzMkFycmF5IDtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKCB4IDogbnVtYmVyID0gMCAsIHkgOiBudW1iZXIgPSAwICkge1xyXG4gICAgICAgIHRoaXMgLiB2YWx1ZXMgPSBuZXcgRmxvYXQzMkFycmF5ICggWyB4ICwgeSBdICkgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b1N0cmluZyAoICkgOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIiBbIFwiICsgdGhpcyAuIHZhbHVlcyBbIDAgXSArIFwiICwgXCIgKyB0aGlzIC4gdmFsdWVzIFsgMSBdICsgXCIgXSBcIiA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHggKCkgOiBudW1iZXIgeyByZXR1cm4gdGhpcy52YWx1ZXNbIDAgXSA7IH1cclxuICAgIHNldCB4ICggeCA6IG51bWJlciApIHsgdGhpcy52YWx1ZXNbIDAgXSA9IHggOyB9XHJcblxyXG4gICAgZ2V0IHkgKCkgOiBudW1iZXIgeyByZXR1cm4gdGhpcy52YWx1ZXNbIDEgXSA7IH1cclxuICAgIHNldCB5ICggeSA6IG51bWJlciApIHsgdGhpcy52YWx1ZXNbIDEgXSA9IHkgOyB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0ICggeCA6IG51bWJlciA9IDAgLCB5IDogbnVtYmVyICkgOiB2ZWMyIHtcclxuICAgICAgICB0aGlzLnZhbHVlc1sgMCBdID0geCA7XHJcbiAgICAgICAgdGhpcy52YWx1ZXNbIDEgXSA9IHkgO1xyXG4gICAgICAgIHJldHVybiB0aGlzIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSAoIHggOiBudW1iZXIgPSAwICwgeSA6IG51bWJlciA9IDAgKSA6IHZlYzIge1xyXG4gICAgICAgIHJldHVybiBuZXcgdmVjMiggeCAsIHkgKSA7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBBcHBsaWNhdGlvbiB9IGZyb20gXCIuLi8uLi9zcmMvZHJhdzJkL0FwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCB7IENhbnZhc0tleUJvYXJkRXZlbnQsIENhbnZhc01vdXNlRXZlbnQgfSBmcm9tIFwiLi4vLi4vc3JjL2RyYXcyZC9hcHBsaWNhdGlvblwiO1xyXG5jbGFzcyBBcHBsaWNhdGlvblRlc3QgZXh0ZW5kcyBBcHBsaWNhdGlvbiB7XHJcbiAgICBwcm90ZWN0ZWQgZGlzcGF0Y2hLZXlEb3duICggZXZ0IDogQ2FudmFzS2V5Qm9hcmRFdmVudCkgOiB2b2lkIHtcclxuICAgICAgIGNvbnNvbGUgLiBsb2cgKCBcIiBrZXkgOiBcIiArIGV2dC5rZXkgKyBcIiBpcyBkb3duIFwiICkgO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBkaXNwYXRjaE1vdXNlRG93biAoIGV2dCA6IENhbnZhc01vdXNlRXZlbnQgKSA6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUgLiBsb2cgKCBcIiBjYW52YXNQb3NpdGlvbiA6IFwiICsgZXZ0IC4gY2FudmFzUG9zaXRpb24gKSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSAoIGVsYXBzZWRNc2VjIDogbnVtYmVyICwgaW50ZXJ2YWxTZWMgOiBudW1iZXIgKSA6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUgLiBsb2cgKCBcIiBlbGFwc2VkTXNlYyA6IFwiICsgZWxhcHNlZE1zZWMgKyBcIiBpbnRlcnZhbFNlYyA6IFwiICsgaW50ZXJ2YWxTZWMgKSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbmRlciAoICkgOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlIC4gbG9nICggXCIg6LCD55SocmVuZGVy5pa55rOVIFwiICkgO1xyXG4gICAgfVxyXG59XHJcblxyXG5sZXQgY2FudmFzIDogSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQgLiBnZXRFbGVtZW50QnlJZCAoICdjYW52YXMnICkgYXMgSFRNTENhbnZhc0VsZW1lbnQgO1xyXG5cclxubGV0IGFwcCA6IEFwcGxpY2F0aW9uID0gbmV3IEFwcGxpY2F0aW9uVGVzdCAoIGNhbnZhcyApIDtcclxuXHJcbmFwcCAuIHVwZGF0ZSAoIDAgLCAwICkgO1xyXG5hcHAgLiByZW5kZXIgKCApIDtcclxuXHJcbmxldCBzdGFydEJ1dHRvbiA6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50IC4gZ2V0RWxlbWVudEJ5SWQgKCAnc3RhcnQnICkgYXMgSFRNTEJ1dHRvbkVsZW1lbnQgO1xyXG5sZXQgc3RvcEJ1dHRvbiA6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50IC4gZ2V0RWxlbWVudEJ5SWQgKCAnc3RvcCcgKSBhcyBIVE1MQnV0dG9uRWxlbWVudCA7XHJcblxyXG5zdGFydEJ1dHRvbiAuIG9uY2xpY2sgPSAoIGV2IDogTW91c2VFdmVudCApIDogdm9pZCA9PiB7XHJcbiAgICBhcHAgLiBzdGFydCAoICkgO1xyXG59XHJcblxyXG5zdG9wQnV0dG9uIC4gb25jbGljayA9ICggZXYgOiBNb3VzZUV2ZW50ICkgOiB2b2lkID0+IHtcclxuICAgIGFwcCAuIHN0b3AgKCApIDtcclxufSJdfQ==
