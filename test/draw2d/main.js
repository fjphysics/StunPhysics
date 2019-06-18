(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./World"));
__export(require("./math/Vec2"));
__export(require("./objects/Body"));
},{"./World":2,"./math/Vec2":5,"./objects/Body":6}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vec2_1 = require("./math/Vec2");
var World = /** @class */ (function () {
    function World() {
        this.bodies = new Array();
        this.gravity = new Vec2_1.Vec2(0, -50);
    }
    World.prototype.addBody = function (body) {
        this.bodies.push(body);
    };
    World.prototype.step = function (dt) {
        for (var _i = 0, _a = this.bodies; _i < _a.length; _i++) {
            var body = _a[_i];
            body.Integrate(dt);
        }
    };
    return World;
}());
exports.World = World;
},{"./math/Vec2":5}],3:[function(require,module,exports){
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
},{"./math2d":4}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// 2D向量
var Vec2 = /** @class */ (function () {
    function Vec2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Vec2.prototype.Clone = function () {
        return new Vec2(this.x, this.y);
    };
    Vec2.prototype.SetZero = function () {
        this.x = 0;
        this.y = 0;
        return this;
    };
    Vec2.prototype.Set = function (x, y) {
        this.x = x;
        this.y = y;
        return this;
    };
    Vec2.prototype.Copy = function (other) {
        this.x = other.x;
        this.y = other.y;
        return this;
    };
    Vec2.prototype.SelfAdd = function (v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    };
    Vec2.prototype.AddV = function (v) {
        return new Vec2(this.x + v.x, this.y + v.y);
    };
    Vec2.prototype.SelfSub = function (v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    };
    Vec2.prototype.SubV = function (v) {
        return new Vec2(this.x - v.x, this.y - v.y);
    };
    Vec2.prototype.SelfMulS = function (s) {
        this.x *= s;
        this.y *= s;
        return this;
    };
    Vec2.prototype.MulS = function (s) {
        return new Vec2(this.x * s, this.y * s);
    };
    Vec2.prototype.Dot = function (v) {
        return this.x * v.x + this.y * v.y;
    };
    Vec2.prototype.CrossV = function (v) {
        return this.x * v.y - this.y * v.x;
    };
    Vec2.prototype.Length = function () {
        var x = this.x, y = this.y;
        return Math.sqrt(x * x + y * y);
    };
    Vec2.prototype.LengthSquared = function () {
        var x = this.x, y = this.y;
        return (x * x + y * y);
    };
    Vec2.prototype.Normalize = function () {
        //const length: number = this.Length();
        //if (length >= 0.001/*Setting.EPSILON*/) {
        var inv_length = 1 / this.Length();
        return new Vec2(this.x * inv_length, this.y * inv_length);
    };
    Vec2.prototype.SelfNormalize = function () {
        var length = this.Length();
        if (length >= 0.001 /*Setting.EPSILON*/) {
            var inv_length = 1 / length;
            this.x *= inv_length;
            this.y *= inv_length;
        }
        return this;
    };
    Vec2.prototype.SelfRotate = function (radians) {
        var c = Math.cos(radians);
        var s = Math.sin(radians);
        var x = this.x;
        this.x = c * x - s * this.y;
        this.y = s * x + c * this.y;
        return this;
    };
    Vec2.prototype.Rotate = function (radians) {
        var v_x = this.x, v_y = this.y;
        var c = Math.cos(radians);
        var s = Math.sin(radians);
        return new Vec2(c * v_x - s * v_y, s * v_x + c * v_y);
    };
    Vec2.prototype.SelfCrossVS = function (s) {
        var x = this.x;
        this.x = s * this.y;
        this.y = -s * x;
        return this;
    };
    Vec2.prototype.SelfCrossSV = function (s) {
        var x = this.x;
        this.x = -s * this.y;
        this.y = s * x;
        return this;
    };
    Vec2.prototype.SelfAbs = function () {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        return this;
    };
    Vec2.prototype.SelfNeg = function () {
        this.x = (-this.x);
        this.y = (-this.y);
        return this;
    };
    Vec2.prototype.Neg = function () {
        return new Vec2(-this.x, -this.y);
    };
    return Vec2;
}());
exports.Vec2 = Vec2;
},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vec2_1 = require("../math/Vec2");
var Body = /** @class */ (function () {
    /**
     * 刚体
     * @class Body
     * @constructor
     */
    function Body(world) {
        this.position = new Vec2_1.Vec2();
        this.velocity = new Vec2_1.Vec2();
        this.Acceleration = new Vec2_1.Vec2();
        this.world = world;
        //this.Acceleration.SelfAdd(world.Gravity);
    }
    Body.prototype.Integrate = function (dt) {
        // 在边界处反弹
        /*if (this.position.x < -280) {
            this.position.x = -280;
            this.velocity.x = -this.velocity.x;
        }
        else if (this.position.x > 280) {
            this.position.x = 280;
            this.velocity.x = -this.velocity.x;
        }
        if (this.position.y < -180) {
            this.position.y = -180;
            this.velocity.y = -this.velocity.y;
        }
        else if (this.position.y > 180) {
            this.position.y = 180;
            this.velocity.y = -this.velocity.y;
        }*/
        // 计算当前速度
        // 速度的该变量即加速度与时间的乘积
        // v+=a*t        
        this.velocity.SelfAdd(this.Acceleration.MulS(dt));
        this.position.SelfAdd(this.velocity.MulS(dt));
    };
    return Body;
}());
exports.Body = Body;
},{"../math/Vec2":5}],7:[function(require,module,exports){
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
var sp = require("../../src/StunPhysics");
var ApplicationTest = /** @class */ (function (_super) {
    __extends(ApplicationTest, _super);
    function ApplicationTest(canvas) {
        var _this = _super.call(this, canvas) || this;
        _this.world = new sp.World();
        var circleBody = new sp.Body(_this.world);
        circleBody.position.SetZero();
        circleBody.velocity.Set(10, 0);
        circleBody.Acceleration.Set(10, 0);
        _this.world.addBody(circleBody);
        return _this;
    }
    ApplicationTest.prototype.dispatchKeyDown = function (evt) {
        console.log(" key : " + evt.key + " is down ");
    };
    ApplicationTest.prototype.dispatchMouseDown = function (evt) {
        console.log(" canvasPosition : " + evt.canvasPosition);
    };
    ApplicationTest.prototype.update = function (elapsedMsec, intervalSec) {
        //console . log ( " elapsedMsec : " + elapsedMsec + " intervalSec : " + intervalSec ) ;
        this.world.step(intervalSec);
    };
    ApplicationTest.prototype.render = function () {
        //console . log ( " 调用render方法 " ) ;
        // clear the canvas with a transparent fill, to allow the canvas background to show
        this.context2D.globalCompositeOperation = 'source-in';
        this.context2D.fillStyle = "transparent";
        this.context2D.fillRect(0, 0, canvas.width, canvas.height);
        this.context2D.globalCompositeOperation = 'source-over';
        for (var i = 0; i < this.world.bodies.length; i++) {
            var body = this.world.bodies[i];
            this.context2D.beginPath();
            this.context2D.arc(body.position.x, body.position.y, 20, 0, Math.PI * 2, false);
            this.context2D.strokeStyle = "rgb(255,0,0)";
            this.context2D.stroke();
        }
    };
    return ApplicationTest;
}(Application_1.Canvas2DApplication));
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
},{"../../src/StunPhysics":1,"../../src/draw2d/Application":3}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvU3R1blBoeXNpY3MudHMiLCJzcmMvV29ybGQudHMiLCJzcmMvZHJhdzJkL0FwcGxpY2F0aW9uLnRzIiwic3JjL2RyYXcyZC9tYXRoMmQudHMiLCJzcmMvbWF0aC9WZWMyLnRzIiwic3JjL29iamVjdHMvQm9keS50cyIsInRlc3QvZHJhdzJkL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQ0FBLDZCQUF3QjtBQUN4QixpQ0FBNEI7QUFDNUIsb0NBQStCOzs7O0FDRC9CLG9DQUFtQztBQUVuQztJQUtJO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxXQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELHVCQUFPLEdBQVAsVUFBUSxJQUFVO1FBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELG9CQUFJLEdBQUosVUFBSyxFQUFVO1FBQ1gsS0FBaUIsVUFBVyxFQUFYLEtBQUEsSUFBSSxDQUFDLE1BQU0sRUFBWCxjQUFXLEVBQVgsSUFBVyxFQUFFO1lBQXpCLElBQUksSUFBSSxTQUFBO1lBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFDTCxZQUFDO0FBQUQsQ0FuQkEsQUFtQkMsSUFBQTtBQW5CWSxzQkFBSzs7Ozs7Ozs7Ozs7Ozs7QUNIbEIsbUNBQWlDO0FBQ2pDLElBQVksZUFVWDtBQVZELFdBQVksZUFBZTtJQUN2QixpRUFBVSxDQUFBO0lBQ1YsK0RBQVMsQ0FBQTtJQUNULDJEQUFPLENBQUE7SUFDUCwrREFBUyxDQUFBO0lBQ1QsK0RBQVMsQ0FBQTtJQUNULHVFQUFhLENBQUE7SUFDYix1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USxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2hGLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQztZQUM1QyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2hCO0lBQ1osQ0FBQztJQUNULHNCQUFDO0FBQUQsQ0ExQ0EsQUEwQ0MsQ0ExQzZCLGlDQUFtQixHQTBDaEQ7QUFFRCxJQUFJLE1BQU0sR0FBOEIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQXNCLENBQUU7QUFDaEcsSUFBSSxHQUFHLEdBQWlCLElBQUksZUFBZSxDQUFHLE1BQU0sQ0FBRSxDQUFFO0FBRXhELEdBQUcsQ0FBRyxNQUFNLENBQUcsQ0FBQyxFQUFHLENBQUMsQ0FBRSxDQUFFO0FBQ3hCLEdBQUcsQ0FBRyxNQUFNLEVBQUksQ0FBRTtBQUdsQixJQUFJLFdBQVcsR0FBOEIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQXNCLENBQUU7QUFDcEcsSUFBSSxVQUFVLEdBQThCLFFBQVEsQ0FBQyxjQUFjLENBQUUsTUFBTSxDQUFzQixDQUFFO0FBRW5HLFdBQVcsQ0FBRyxPQUFPLEdBQUcsVUFBRSxFQUFlO0lBQ3JDLEdBQUcsQ0FBRyxLQUFLLEVBQUksQ0FBRTtBQUNyQixDQUFDLENBQUE7QUFFRCxVQUFVLENBQUcsT0FBTyxHQUFHLFVBQUUsRUFBZTtJQUNwQyxHQUFHLENBQUcsSUFBSSxFQUFJLENBQUU7QUFDcEIsQ0FBQyxDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZXhwb3J0ICogZnJvbSBcIi4vV29ybGRcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vbWF0aC9WZWMyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL29iamVjdHMvQm9keVwiOyIsImltcG9ydCB7IEJvZHkgfSBmcm9tIFwiLi9vYmplY3RzL0JvZHlcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuL21hdGgvVmVjMlwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdvcmxkIHtcclxuXHJcbiAgICBncmF2aXR5OiBWZWMyO1xyXG4gICAgYm9kaWVzOiBBcnJheTxCb2R5PjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmJvZGllcyA9IG5ldyBBcnJheTxCb2R5PigpO1xyXG4gICAgICAgIHRoaXMuZ3Jhdml0eSA9IG5ldyBWZWMyKDAsIC01MCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkQm9keShib2R5OiBCb2R5KSB7XHJcbiAgICAgICAgdGhpcy5ib2RpZXMucHVzaChib2R5KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGVwKGR0OiBudW1iZXIpIHtcclxuICAgICAgICBmb3IgKGxldCBib2R5IG9mIHRoaXMuYm9kaWVzKSB7ICAgIFxyXG4gICAgICAgICAgICBib2R5LkludGVncmF0ZShkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgdmVjMiB9IGZyb20gXCIuL21hdGgyZFwiIDtcclxuZXhwb3J0IGVudW0gRUlucHV0RXZlbnRUeXBlIHtcclxuICAgIE1PVVNFRVZFTlQgLCAgICBcclxuICAgIE1PVVNFRE9XTiAsICAgICBcclxuICAgIE1PVVNFVVAgLCAgICAgIFxyXG4gICAgTU9VU0VNT1ZFICwgICAgIFxyXG4gICAgTU9VU0VEUkFHICwgICAgXHJcbiAgICBLRVlCT0FSREVWRU5UICwgXHJcbiAgICBLRVlVUCAsICAgICAgICAgXHJcbiAgICBLRVlET1dOICwgICAgICAgXHJcbiAgICBLRVlQUkVTUyAgICBcclxufSA7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FudmFzSW5wdXRFdmVudCB7XHJcbiAgICBwdWJsaWMgYWx0S2V5IDogYm9vbGVhbiA7XHJcbiAgICBwdWJsaWMgY3RybEtleSA6IGJvb2xlYW4gO1xyXG4gICAgcHVibGljIHNoaWZ0S2V5IDogYm9vbGVhbiA7XHJcbiAgICBwdWJsaWMgdHlwZSA6IEVJbnB1dEV2ZW50VHlwZSA7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKCB0eXBlIDogRUlucHV0RXZlbnRUeXBlICwgYWx0S2V5IDogYm9vbGVhbiA9IGZhbHNlICwgY3RybEtleSA6IGJvb2xlYW4gPSBmYWxzZSAsIHNoaWZ0S2V5IDogYm9vbGVhbiA9IGZhbHNlICApIHtcclxuICAgICAgICB0aGlzIC4gYWx0S2V5ID0gYWx0S2V5IDtcclxuICAgICAgICB0aGlzIC4gY3RybEtleSA9IGN0cmxLZXkgO1xyXG4gICAgICAgIHRoaXMgLiBzaGlmdEtleSA9IHNoaWZ0S2V5IDtcclxuICAgICAgICB0aGlzIC4gdHlwZSA9IHR5cGUgO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBUaW1lckNhbGxiYWNrID0gKCBpZCA6IG51bWJlciAsIGRhdGEgOiBhbnkgKSA9PiB2b2lkIDtcclxuXHJcbmNsYXNzIFRpbWVyIHtcclxuICAgIHB1YmxpYyBpZCA6IG51bWJlciA9IC0xIDsgIFxyXG4gICAgcHVibGljIGVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZSA7ICBcclxuXHJcbiAgICBwdWJsaWMgY2FsbGJhY2sgOiBUaW1lckNhbGxiYWNrOyAgXHJcbiAgICBwdWJsaWMgY2FsbGJhY2tEYXRhOiBhbnkgPSB1bmRlZmluZWQ7IFxyXG5cclxuICAgIHB1YmxpYyBjb3VudGRvd24gOiBudW1iZXIgPSAwIDsgXHJcbiAgICBwdWJsaWMgdGltZW91dCA6IG51bWJlciA9IDA7IFxyXG4gICAgcHVibGljIG9ubHlPbmNlIDogYm9vbGVhbiA9IGZhbHNlIDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoIGNhbGxiYWNrIDogVGltZXJDYWxsYmFjayApIHtcclxuICAgICAgICB0aGlzIC5jYWxsYmFjayA9IGNhbGxiYWNrIDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENhbnZhc01vdXNlRXZlbnQgZXh0ZW5kcyBDYW52YXNJbnB1dEV2ZW50IHtcclxuICAgIHB1YmxpYyBidXR0b24gIDogbnVtYmVyICA7XHJcbiAgICBwdWJsaWMgY2FudmFzUG9zaXRpb24gIDogdmVjMiAgO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgbG9jYWxQb3NpdGlvbiAgOiB2ZWMyICA7IFxyXG4gICAgcHVibGljIGhhc0xvY2FsUG9zaXRpb24gOiBib29sZWFuIDtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKCB0eXBlIDogRUlucHV0RXZlbnRUeXBlICwgY2FudmFzUG9zIDogdmVjMiAsIGJ1dHRvbiA6IG51bWJlciAsIGFsdEtleSAgOiBib29sZWFuID0gZmFsc2UgLCBjdHJsS2V5IDogYm9vbGVhbiA9IGZhbHNlICwgc2hpZnRLZXkgOiBib29sZWFuID0gZmFsc2UgKSB7XHJcbiAgICAgICAgc3VwZXIgKCB0eXBlICwgYWx0S2V5ICwgY3RybEtleSAsIHNoaWZ0S2V5ICkgO1xyXG4gICAgICAgIHRoaXMgLiBjYW52YXNQb3NpdGlvbiA9IGNhbnZhc1BvcyA7XHJcbiAgICAgICAgdGhpcyAuIGJ1dHRvbiA9IGJ1dHRvbiA7XHJcbiAgICAgICAgdGhpcyAuIGhhc0xvY2FsUG9zaXRpb24gPSBmYWxzZSA7XHJcbiAgICAgICAgdGhpcyAuIGxvY2FsUG9zaXRpb24gPSB2ZWMyIC4gY3JlYXRlICggKSA7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDYW52YXNLZXlCb2FyZEV2ZW50IGV4dGVuZHMgQ2FudmFzSW5wdXRFdmVudCB7XHJcbiAgICBwdWJsaWMga2V5IDogc3RyaW5nIDtcclxuICAgIHB1YmxpYyBrZXlDb2RlIDogbnVtYmVyIDtcclxuICAgIHB1YmxpYyByZXBlYXQgOiBib29sZWFuIDtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKCB0eXBlIDogRUlucHV0RXZlbnRUeXBlICwga2V5IDogc3RyaW5nICwga2V5Q29kZSA6IG51bWJlciAsIHJlcGVhdCA6IGJvb2xlYW4gLCBhbHRLZXkgOiBib29sZWFuID0gZmFsc2UgLCBjdHJsS2V5IDogYm9vbGVhbiA9IGZhbHNlICwgc2hpZnRLZXkgOiBib29sZWFuID0gZmFsc2UgKSB7XHJcbiAgICAgICAgc3VwZXIgKCB0eXBlICwgYWx0S2V5ICwgY3RybEtleSAsIHNoaWZ0S2V5ICApIDtcclxuICAgICAgICB0aGlzIC4ga2V5ID0ga2V5IDtcclxuICAgICAgICB0aGlzIC4ga2V5Q29kZSA9IGtleUNvZGUgO1xyXG4gICAgICAgIHRoaXMgLiByZXBlYXQgPSByZXBlYXQgO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQXBwbGljYXRpb24gaW1wbGVtZW50cyBFdmVudExpc3RlbmVyT2JqZWN0IHtcclxuXHJcbiAgICBwdWJsaWMgdGltZXJzIDogVGltZXJbIF0gPSBbIF0gO1xyXG5cclxuICAgIHByaXZhdGUgX3RpbWVJZCA6IG51bWJlciA9IC0xIDtcclxuXHJcbiAgICBwcml2YXRlIF9mcHMgOiBudW1iZXIgPSAwIDtcclxuXHJcbiAgICBwdWJsaWMgY2FudmFzIDogSFRNTENhbnZhc0VsZW1lbnQgIDtcclxuXHJcbiAgICBwdWJsaWMgaXNTdXBwb3J0TW91c2VNb3ZlIDogYm9vbGVhbiA7XHJcbiAgICBwcm90ZWN0ZWQgX2lzTW91c2VEb3duIDogYm9vbGVhbiA7XHJcblxyXG4gICAgcHJvdGVjdGVkIF9zdGFydCA6IGJvb2xlYW4gPSBmYWxzZSA7XHJcbiAgICBwcm90ZWN0ZWQgX3JlcXVlc3RJZCA6IG51bWJlciA9IC0xIDtcclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIF9sYXN0VGltZSAhIDogbnVtYmVyIDtcclxuICAgIHByb3RlY3RlZCBfc3RhcnRUaW1lICEgOiBudW1iZXIgO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAoIGNhbnZhcyA6IEhUTUxDYW52YXNFbGVtZW50ICApIHtcclxuICAgICAgICB0aGlzIC4gY2FudmFzID0gY2FudmFzIDtcclxuICAgICAgICB0aGlzIC4gY2FudmFzIC4gYWRkRXZlbnRMaXN0ZW5lciAoIFwibW91c2Vkb3duXCIgLCB0aGlzICwgZmFsc2UgKSA7XHJcbiAgICAgICAgdGhpcyAuIGNhbnZhcyAuIGFkZEV2ZW50TGlzdGVuZXIgKCBcIm1vdXNldXBcIiAsIHRoaXMgLCBmYWxzZSApIDtcclxuICAgICAgICB0aGlzIC4gY2FudmFzIC4gYWRkRXZlbnRMaXN0ZW5lciAoIFwibW91c2Vtb3ZlXCIgLCB0aGlzICwgZmFsc2UgKSA7XHJcbiAgICAgICAgd2luZG93IC4gYWRkRXZlbnRMaXN0ZW5lciAoIFwia2V5ZG93blwiICwgdGhpcyAsIGZhbHNlICkgO1xyXG4gICAgICAgIHdpbmRvdyAuIGFkZEV2ZW50TGlzdGVuZXIgKCBcImtleXVwXCIgLCB0aGlzICwgZmFsc2UgKSA7XHJcbiAgICAgICAgd2luZG93IC4gYWRkRXZlbnRMaXN0ZW5lciAoIFwia2V5cHJlc3NcIiAsIHRoaXMgLCBmYWxzZSApIDtcclxuICAgICAgICB0aGlzIC4gX2lzTW91c2VEb3duID0gZmFsc2UgO1xyXG4gICAgICAgIHRoaXMgLiBpc1N1cHBvcnRNb3VzZU1vdmUgPSBmYWxzZSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzUnVubmluZyAoICkgOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcyAuIF9zdGFydCA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBmcHMgKCApIHtcclxuICAgICAgICByZXR1cm4gdGhpcyAuIF9mcHMgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGFydCAgKCApIDogdm9pZCB7XHJcbiAgICAgICAgaWYgKCAhIHRoaXMgLiBfc3RhcnQgKSB7XHJcbiAgICAgICAgICAgIHRoaXMgLiBfc3RhcnQgPSB0cnVlIDtcclxuICAgICAgICAgICAgdGhpcyAuIF9sYXN0VGltZSA9IC0xIDtcclxuICAgICAgICAgICAgdGhpcyAuIF9zdGFydFRpbWUgPSAtMSA7XHJcbiAgICAgICAgICAgIHRoaXMgLiBfcmVxdWVzdElkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lICggKCBtc2VjIDogbnVtYmVyICkgOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMgLiBzdGVwICggbXNlYyApIFxyXG4gICAgICAgICAgICB9ICkgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RlcCAoIHRpbWVTdGFtcCA6IG51bWJlciApIDogdm9pZCB7XHJcbiAgICAgICBpZiAoIHRoaXMgLiBfc3RhcnRUaW1lID09PSAtMSApIHRoaXMgLiBfc3RhcnRUaW1lID0gdGltZVN0YW1wIDtcclxuICAgICAgIGlmKCAgdGhpcyAuIF9sYXN0VGltZSA9PT0gLTEgKSB0aGlzIC4gX2xhc3RUaW1lID0gdGltZVN0YW1wIDtcclxuICAgICAgIGxldCBlbGFwc2VkTXNlYyA9IHRpbWVTdGFtcCAtIHRoaXMgLiBfc3RhcnRUaW1lIDtcclxuICAgICAgIGxldCBpbnRlcnZhbFNlYyA9ICggdGltZVN0YW1wIC0gdGhpcyAuIF9sYXN0VGltZSApIDtcclxuICAgICAgIGlmICggaW50ZXJ2YWxTZWMgIT09IDAgKSB7XHJcbiAgICAgICAgICAgdGhpcyAuIF9mcHMgPSAxMDAwLjAgLyBpbnRlcnZhbFNlYyA7XHJcbiAgICAgICB9XHJcbiAgICAgICBpbnRlcnZhbFNlYyAvPSAxMDAwLjAgO1xyXG4gICAgICAgdGhpcyAuX2xhc3RUaW1lID0gdGltZVN0YW1wIDtcclxuICAgICAgIHRoaXMgLiBfaGFuZGxlVGltZXJzICggaW50ZXJ2YWxTZWMgKSA7XHJcbiAgICAgICB0aGlzIC4gdXBkYXRlICggZWxhcHNlZE1zZWMgLCBpbnRlcnZhbFNlYyApIDtcclxuICAgICAgIHRoaXMgLiByZW5kZXIgKCApIDtcclxuICAgICAgIFxyXG4gICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lICggdGhpcyAuIHN0ZXAgLiBiaW5kICggdGhpcyApICkgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9wICAoICkgOiB2b2lkIHtcclxuICAgICAgICBpZiAoIHRoaXMgLiBfc3RhcnQgKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdpbmRvdyAuIGNhbmNlbEFuaW1hdGlvbkZyYW1lICggdGhpcyAuIF9yZXF1ZXN0SWQgKSA7XHJcbiAgICAgICAgICAgIHRoaXMgLiBfcmVxdWVzdElkID0gLTEgO1xyXG4gICAgICAgICAgICB0aGlzIC4gX2xhc3RUaW1lID0gLTEgOyBcclxuICAgICAgICAgICAgdGhpcyAuIF9zdGFydFRpbWUgPSAtMSA7XHJcbiAgICAgICAgICAgIHRoaXMgLiBfc3RhcnQgPSBmYWxzZSA7ICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUgKCBlbGFwc2VkTXNlYyA6IG51bWJlciAsIGludGVydmFsU2VjIDogbnVtYmVyICkgOiB2b2lkIHsgfVxyXG4gICAgcHVibGljIHJlbmRlciAgKCApIDogdm9pZCB7IH1cclxuICAgIHB1YmxpYyBoYW5kbGVFdmVudCAoIGV2dCAgOiBFdmVudCApICA6IHZvaWQge1xyXG4gICAgICAgIHN3aXRjaCAoIGV2dCAuIHR5cGUgKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJtb3VzZWRvd25cIiA6XHJcbiAgICAgICAgICAgICAgICB0aGlzIC4gX2lzTW91c2VEb3duID0gdHJ1ZSA7XHJcbiAgICAgICAgICAgICAgICB0aGlzIC4gZGlzcGF0Y2hNb3VzZURvd24gKCB0aGlzIC4gX3RvQ2FudmFzTW91c2VFdmVudCAoIGV2dCAsIEVJbnB1dEV2ZW50VHlwZSAuIE1PVVNFRE9XTiApICkgO1xyXG4gICAgICAgICAgICAgICAgYnJlYWsgO1xyXG4gICAgICAgICAgICBjYXNlIFwibW91c2V1cFwiIDpcclxuICAgICAgICAgICAgICAgIHRoaXMgLiBfaXNNb3VzZURvd24gPSBmYWxzZSA7XHJcbiAgICAgICAgICAgICAgICB0aGlzIC4gZGlzcGF0Y2hNb3VzZVVwICggdGhpcyAuIF90b0NhbnZhc01vdXNlRXZlbnQgKCBldnQgLCBFSW5wdXRFdmVudFR5cGUgLiBNT1VTRVVQICkgKSA7XHJcbiAgICAgICAgICAgICAgICBicmVhayA7XHJcbiAgICAgICAgICAgIGNhc2UgXCJtb3VzZW1vdmVcIiA6XHJcbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMgLiBpc1N1cHBvcnRNb3VzZU1vdmUgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcyAuIGRpc3BhdGNoTW91c2VNb3ZlICggdGhpcyAuIF90b0NhbnZhc01vdXNlRXZlbnQgKCBldnQgLCBFSW5wdXRFdmVudFR5cGUgLiBNT1VTRU1PVkUgKSApIDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICggdGhpcyAuIF9pc01vdXNlRG93biApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzIC4gZGlzcGF0Y2hNb3VzZURyYWcgKCB0aGlzIC4gX3RvQ2FudmFzTW91c2VFdmVudCAoIGV2dCAsIEVJbnB1dEV2ZW50VHlwZSAuIE1PVVNFRFJBRyApICkgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWsgO1xyXG4gICAgICAgICAgICBjYXNlIFwia2V5cHJlc3NcIiA6XHJcbiAgICAgICAgICAgICAgICB0aGlzIC4gZGlzcGF0Y2hLZXlQcmVzcyAoIHRoaXMgLiBfdG9DYW52YXNLZXlCb2FyZEV2ZW50ICggZXZ0ICwgRUlucHV0RXZlbnRUeXBlIC4gS0VZUFJFU1MgKSApIDtcclxuICAgICAgICAgICAgICAgIGJyZWFrIDtcclxuICAgICAgICAgICAgY2FzZSBcImtleWRvd25cIiA6XHJcbiAgICAgICAgICAgICAgICB0aGlzIC4gZGlzcGF0Y2hLZXlEb3duICggdGhpcyAuIF90b0NhbnZhc0tleUJvYXJkRXZlbnQgKCBldnQgLCBFSW5wdXRFdmVudFR5cGUgLiBLRVlET1dOICkgKSA7XHJcbiAgICAgICAgICAgICAgICBicmVhayA7XHJcbiAgICAgICAgICAgIGNhc2UgXCJrZXl1cFwiIDpcclxuICAgICAgICAgICAgICAgIHRoaXMgLiBkaXNwYXRjaEtleVVwICggdGhpcyAuIF90b0NhbnZhc0tleUJvYXJkRXZlbnQgKCBldnQgLCBFSW5wdXRFdmVudFR5cGUgLiBLRVlVUCApICkgO1xyXG4gICAgICAgICAgICAgICAgYnJlYWsgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZGlzcGF0Y2hNb3VzZURvd24gKCBldnQgOiBDYW52YXNNb3VzZUV2ZW50ICkgOiB2b2lkIHtcclxuICAgICAgICByZXR1cm4gO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBkaXNwYXRjaE1vdXNlVXAgKCBldnQgOiBDYW52YXNNb3VzZUV2ZW50ICkgOiB2b2lkIHtcclxuICAgICAgICByZXR1cm4gO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBkaXNwYXRjaE1vdXNlTW92ZSAoIGV2dCA6IENhbnZhc01vdXNlRXZlbnQgKSA6IHZvaWQge1xyXG4gICAgICAgIHJldHVybiA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGRpc3BhdGNoTW91c2VEcmFnICggZXZ0IDogQ2FudmFzTW91c2VFdmVudCApIDogdm9pZCB7XHJcbiAgICAgICAgcmV0dXJuIDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZGlzcGF0Y2hLZXlEb3duICggZXZ0IDogQ2FudmFzS2V5Qm9hcmRFdmVudCApIDogdm9pZCB7XHJcbiAgICAgICAgcmV0dXJuIDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZGlzcGF0Y2hLZXlVcCAoIGV2dCA6IENhbnZhc0tleUJvYXJkRXZlbnQgKSA6IHZvaWQge1xyXG4gICAgICAgIHJldHVybiA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGRpc3BhdGNoS2V5UHJlc3MgKCBldnQgOiBDYW52YXNLZXlCb2FyZEV2ZW50ICkgOiB2b2lkIHtcclxuICAgICAgICByZXR1cm4gO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3ZpZXdwb3J0VG9DYW52YXNDb29yZGluYXRlICggZXZ0IDogTW91c2VFdmVudCApIDogdmVjMiB7XHJcbiAgICAgICAgaWYgKCB0aGlzIC4gY2FudmFzICkge1xyXG4gICAgICAgICAgICBsZXQgcmVjdCA6IENsaWVudFJlY3QgPSB0aGlzIC4gY2FudmFzIC4gZ2V0Qm91bmRpbmdDbGllbnRSZWN0ICggKSA7XHJcbiAgICAgICAgICAgIGlmICggZXZ0IC4gdHlwZSA9PT0gXCJtb3VzZWRvd25cIiApIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUgLiBsb2cgKFwiIGJvdW5kaW5nQ2xpZW50UmVjdCA6IFwiICsgSlNPTiAuIHN0cmluZ2lmeSAoIHJlY3QgKSApIDtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUgLiBsb2cgKCBcIiBjbGllbnRYIDogXCIgKyBldnQgLiBjbGllbnRYICsgXCIgY2xpZW50WSA6IFwiICsgZXZ0LmNsaWVudFkgKSA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCBldnQgLiB0YXJnZXQgKSBcclxuICAgICAgICAgICAgeyBcclxuICAgICAgICAgICAgICAgIGxldCBib3JkZXJMZWZ0V2lkdGggOiBudW1iZXIgPSAwIDsgIFxyXG4gICAgICAgICAgICAgICAgbGV0IGJvcmRlclRvcFdpZHRoIDogbnVtYmVyID0gMCA7ICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgcGFkZGluZ0xlZnQgOiBudW1iZXIgPSAwIDsgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBwYWRkaW5nVG9wIDogbnVtYmVyID0gMCA7ICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IGRlY2wgOiBDU1NTdHlsZURlY2xhcmF0aW9uICA9IHdpbmRvdyAuIGdldENvbXB1dGVkU3R5bGUgKCBldnQgLiB0YXJnZXQgYXMgSFRNTEVsZW1lbnQgKSA7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RyTnVtYmVyIDogc3RyaW5nIHwgbnVsbCA9ICBkZWNsIC4gYm9yZGVyTGVmdFdpZHRoIDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIHN0ck51bWJlciAhPT0gbnVsbCApIHtcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXJMZWZ0V2lkdGggID0gcGFyc2VJbnQgKCBzdHJOdW1iZXIgLCAxMCApIDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIHN0ck51bWJlciAhPT0gbnVsbCApIHtcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXJUb3BXaWR0aCA9IHBhcnNlSW50ICggc3RyTnVtYmVyICwgMTAgKSA7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc3RyTnVtYmVyID0gZGVjbCAuIHBhZGRpbmdMZWZ0IDtcclxuICAgICAgICAgICAgICAgIGlmICggc3RyTnVtYmVyICE9PSBudWxsICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmdMZWZ0ID0gcGFyc2VJbnQoc3RyTnVtYmVyLDEwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzdHJOdW1iZXIgPSBkZWNsIC4gcGFkZGluZ1RvcCA7XHJcbiAgICAgICAgICAgICAgICBpZiAoIHN0ck51bWJlciAhPT0gbnVsbCApIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nVG9wID0gcGFyc2VJbnQgKCBzdHJOdW1iZXIgLCAxMCkgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCB4IDogbnVtYmVyICA9IGV2dCAuIGNsaWVudFggLSByZWN0IC4gbGVmdCAtIGJvcmRlckxlZnRXaWR0aCAtIHBhZGRpbmdMZWZ0IDtcclxuICAgICAgICAgICAgICAgIGxldCB5IDogbnVtYmVyICA9IGV2dCAuIGNsaWVudFkgLSByZWN0IC4gdG9wIC0gYm9yZGVyVG9wV2lkdGggLSBwYWRkaW5nVG9wIDtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zIDogdmVjMiA9IHZlYzIgLiBjcmVhdGUgKCB4ICwgeSApIDsgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKCBldnQgLiB0eXBlID09PSBcIm1vdXNlZG93blwiICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUgLiBsb2cgKCBcIiBib3JkZXJMZWZ0V2lkdGggOiBcIiArIGJvcmRlckxlZnRXaWR0aCArIFwiIGJvcmRlclRvcFdpZHRoIDogXCIgKyBib3JkZXJUb3BXaWR0aCApIDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlIC4gbG9nICggXCIgcGFkZGluZ0xlZnQgOiBcIiArIHBhZGRpbmdMZWZ0ICsgXCIgcGFkZGluZ1RvcCA6IFwiICsgcGFkZGluZ1RvcCApIDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlIC4gbG9nICggXCIg5Y+Y5o2i5ZCO55qEY2FudmFzUG9zaXRpb24gOiBcIiArIHBvcyAuIHRvU3RyaW5nKCApICkgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBwb3MgO1xyXG4gICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgIGFsZXJ0KFwiY2FudmFz5Li6bnVsbFwiKTtcclxuICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbnZhc+S4um51bGxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGFsZXJ0KFwiZXZ0IC4gdGFyZ2V05Li6bnVsbFwiKTtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJldnQgLiB0YXJnZXTkuLpudWxsXCIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIF90b0NhbnZhc01vdXNlRXZlbnQgKCBldnQgOiBFdmVudCAsIHR5cGUgOiBFSW5wdXRFdmVudFR5cGUgKSA6IENhbnZhc01vdXNlRXZlbnQge1xyXG4gICAgICAgIGxldCBldmVudCA6IE1vdXNlRXZlbnQgPSBldnQgYXMgTW91c2VFdmVudCA7XHJcbiAgICAgICAgbGV0IG1vdXNlUG9zaXRpb24gOiB2ZWMyID0gdGhpcyAuIF92aWV3cG9ydFRvQ2FudmFzQ29vcmRpbmF0ZSAoIGV2ZW50ICkgO1xyXG4gICAgICAgIGxldCBjYW52YXNNb3VzZUV2ZW50IDogQ2FudmFzTW91c2VFdmVudCA9IG5ldyBDYW52YXNNb3VzZUV2ZW50ICggdHlwZSAsIG1vdXNlUG9zaXRpb24gLCBldmVudCAuIGJ1dHRvbiAsIGV2ZW50IC4gYWx0S2V5ICwgZXZlbnQgLiBjdHJsS2V5ICwgZXZlbnQgLiBzaGlmdEtleSApIDtcclxuICAgICAgICByZXR1cm4gY2FudmFzTW91c2VFdmVudCA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfdG9DYW52YXNLZXlCb2FyZEV2ZW50ICggZXZ0IDogRXZlbnQgLCB0eXBlIDogRUlucHV0RXZlbnRUeXBlICApIDogQ2FudmFzS2V5Qm9hcmRFdmVudCB7XHJcbiAgICAgICAgbGV0IGV2ZW50IDogS2V5Ym9hcmRFdmVudCA9IGV2dCBhcyBLZXlib2FyZEV2ZW50IDtcclxuICAgICAgICBsZXQgY2FudmFzS2V5Ym9hcmRFdmVudCA6IENhbnZhc0tleUJvYXJkRXZlbnQgPSBuZXcgQ2FudmFzS2V5Qm9hcmRFdmVudCAoIHR5cGUgLCBldmVudCAuIGtleSAsIGV2ZW50IC4ga2V5Q29kZSAsIGV2ZW50IC4gcmVwZWF0ICwgZXZlbnQgLiBhbHRLZXkgLCBldmVudCAuIGN0cmxLZXkgLCBldmVudCAuIHNoaWZ0S2V5ICkgO1xyXG4gICAgICAgIHJldHVybiBjYW52YXNLZXlib2FyZEV2ZW50IDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkVGltZXIgKCBjYWxsYmFjayA6IFRpbWVyQ2FsbGJhY2sgLCB0aW1lb3V0IDogbnVtYmVyID0gMS4wICwgb25seU9uY2UgOiBib29sZWFuID0gZmFsc2UgLGRhdGEgOiBhbnkgPSB1bmRlZmluZWQgKSA6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IHRpbWVyIDogVGltZXJcclxuICAgICAgICBsZXQgZm91bmQgOiBib29sZWFuID0gZmFsc2UgO1xyXG4gICAgICAgIGZvciAoIGxldCBpID0gMCA7IGkgPCB0aGlzIC4gdGltZXJzIC4gbGVuZ3RoIDsgaSArKyApIHtcclxuICAgICAgICAgICAgbGV0IHRpbWVyIDogVGltZXIgPSB0aGlzIC4gdGltZXJzIFsgaSBdIDtcclxuICAgICAgICAgICAgaWYgKCB0aW1lciAuIGVuYWJsZWQgPT09IGZhbHNlICkge1xyXG4gICAgICAgICAgICAgICAgdGltZXIgLiBjYWxsYmFjayA9IGNhbGxiYWNrIDtcclxuICAgICAgICAgICAgICAgIHRpbWVyIC4gY2FsbGJhY2tEYXRhID0gZGF0YSA7XHJcbiAgICAgICAgICAgICAgICB0aW1lciAuIHRpbWVvdXQgPSB0aW1lb3V0IDtcclxuICAgICAgICAgICAgICAgIHRpbWVyIC4gY291bnRkb3duID0gdGltZW91dCA7XHJcbiAgICAgICAgICAgICAgICB0aW1lciAuIGVuYWJsZWQgPSB0cnVlIDtcclxuICAgICAgICAgICAgICAgIHRpbWVyIC4gb25seU9uY2UgPSBvbmx5T25jZSA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZXIgLiBpZCA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRpbWVyID0gbmV3IFRpbWVyICggY2FsbGJhY2sgKSA7XHJcbiAgICAgICAgdGltZXIgLiBjYWxsYmFja0RhdGEgPSBkYXRhIDtcclxuICAgICAgICB0aW1lciAuIHRpbWVvdXQgPSB0aW1lb3V0IDtcclxuICAgICAgICB0aW1lciAuIGNvdW50ZG93biA9IHRpbWVvdXQgO1xyXG4gICAgICAgIHRpbWVyIC4gZW5hYmxlZCA9IHRydWUgO1xyXG4gICAgICAgIHRpbWVyIC4gaWQgPSArKyB0aGlzIC4gX3RpbWVJZCA7IFxyXG4gICAgICAgIHRpbWVyIC4gb25seU9uY2UgPSBvbmx5T25jZSA7IFxyXG4gICAgICBcclxuICAgICAgICB0aGlzIC4gdGltZXJzIC4gcHVzaCAoIHRpbWVyICkgO1xyXG4gICAgICAgIHJldHVybiB0aW1lciAuIGlkIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlVGltZXIgKCBpZCA6IG51bWJlciApIDogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGZvdW5kIDogYm9vbGVhbiA9IGZhbHNlIDtcclxuICAgICAgICBmb3IgKCBsZXQgaSA9IDAgOyBpIDwgdGhpcyAuIHRpbWVycyAuIGxlbmd0aCA7IGkgKysgKSB7XHJcbiAgICAgICAgICAgIGlmICggdGhpcyAuIHRpbWVycyBbIGkgXSAuIGlkID09PSBpZCApIHtcclxuICAgICAgICAgICAgICAgIGxldCB0aW1lciA6IFRpbWVyID0gdGhpcyAuIHRpbWVycyBbIGkgXSA7XHJcbiAgICAgICAgICAgICAgICB0aW1lciAuIGVuYWJsZWQgPSBmYWxzZSA7IFxyXG4gICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlIDtcclxuICAgICAgICAgICAgICAgIGJyZWFrIDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZm91bmQgO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2hhbmRsZVRpbWVycyAoIGludGVydmFsU2VjIDogbnVtYmVyICkgOiAgdm9pZCB7XHJcbiAgICAgICAgZm9yICggbGV0IGkgPSAwIDsgaSA8IHRoaXMgLiB0aW1lcnMgLiBsZW5ndGggOyBpICsrICkge1xyXG4gICAgICAgICAgICBsZXQgdGltZXIgOiBUaW1lciA9IHRoaXMgLiB0aW1lcnMgWyBpIF0gO1xyXG4gICAgICAgICAgICBpZiggdGltZXIgLiBlbmFibGVkID09PSBmYWxzZSApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlIDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aW1lciAuIGNvdW50ZG93biAtPSBpbnRlcnZhbFNlYyA7XHJcbiAgICAgICAgICAgIGlmICggdGltZXIgLiBjb3VudGRvd24gPCAwLjAgKSB7XHJcbiAgICAgICAgICAgICAgICB0aW1lciAuIGNhbGxiYWNrICggdGltZXIgLiBpZCAsIHRpbWVyIC4gY2FsbGJhY2tEYXRhICkgO1xyXG4gICAgICAgICAgICAgICAgaWYgKCB0aW1lciAuIG9ubHlPbmNlID09PSBmYWxzZSApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aW1lciAuIGNvdW50ZG93biA9IHRpbWVyIC4gdGltZW91dCA7IFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMgLiByZW1vdmVUaW1lciAoIHRpbWVyIC4gaWQgKSA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDYW52YXMyREFwcGxpY2F0aW9uIGV4dGVuZHMgQXBwbGljYXRpb24ge1xyXG4gICAgcHVibGljIGNvbnRleHQyRCA6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCB8IG51bGwgO1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yICggY2FudmFzIDogSFRNTENhbnZhc0VsZW1lbnQgICkge1xyXG4gICAgICAgIHN1cGVyKCBjYW52YXMgKSA7XHJcbiAgICAgICAgdGhpcyAuIGNvbnRleHQyRCA9IHRoaXMgLiBjYW52YXMgLiBnZXRDb250ZXh0KCBcIjJkXCIgKSA7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBXZWJHTEFwcGxpY2F0aW9uIGV4dGVuZHMgQXBwbGljYXRpb24ge1xyXG4gICAgcHVibGljIGNvbnRleHQzRCA6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCB8IG51bGwgO1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yICggY2FudmFzIDogSFRNTENhbnZhc0VsZW1lbnQgLCBjb250ZXh0QXR0cmlidXRlcyA/IDogV2ViR0xDb250ZXh0QXR0cmlidXRlcyApIHtcclxuICAgICAgICBzdXBlciggY2FudmFzICkgO1xyXG4gICAgICAgIHRoaXMgLiBjb250ZXh0M0QgPSB0aGlzIC4gY2FudmFzIC4gZ2V0Q29udGV4dCggXCJ3ZWJnbFwiICwgY29udGV4dEF0dHJpYnV0ZXMgKSA7XHJcbiAgICAgICAgaWYgKCB0aGlzIC4gY29udGV4dDNEID09PSBudWxsICkge1xyXG4gICAgICAgICAgICB0aGlzIC4gY29udGV4dDNEID0gdGhpcyAuIGNhbnZhcyAuIGdldENvbnRleHQoIFwiZXhwZXJpbWVudGFsLXdlYmdsXCIgLCBjb250ZXh0QXR0cmlidXRlcyApIDtcclxuICAgICAgICAgICAgaWYgKCB0aGlzIC4gY29udGV4dDNEID09PSBudWxsICkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQgKCBcIiDml6Dms5XliJvlu7pXZWJHTFJlbmRlcmluZ0NvbnRleHTkuIrkuIvmloflr7nosaEgXCIgKSA7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IgKCBcIiDml6Dms5XliJvlu7pXZWJHTFJlbmRlcmluZ0NvbnRleHTkuIrkuIvmloflr7nosaEgXCIgKSA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiXHJcbmV4cG9ydCBjbGFzcyB2ZWMyIHtcclxuICAgIHB1YmxpYyB2YWx1ZXMgOiBGbG9hdDMyQXJyYXkgO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAoIHggOiBudW1iZXIgPSAwICwgeSA6IG51bWJlciA9IDAgKSB7XHJcbiAgICAgICAgdGhpcyAuIHZhbHVlcyA9IG5ldyBGbG9hdDMyQXJyYXkgKCBbIHggLCB5IF0gKSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvU3RyaW5nICggKSA6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiIFsgXCIgKyB0aGlzIC4gdmFsdWVzIFsgMCBdICsgXCIgLCBcIiArIHRoaXMgLiB2YWx1ZXMgWyAxIF0gKyBcIiBdIFwiIDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgeCAoKSA6IG51bWJlciB7IHJldHVybiB0aGlzLnZhbHVlc1sgMCBdIDsgfVxyXG4gICAgc2V0IHggKCB4IDogbnVtYmVyICkgeyB0aGlzLnZhbHVlc1sgMCBdID0geCA7IH1cclxuXHJcbiAgICBnZXQgeSAoKSA6IG51bWJlciB7IHJldHVybiB0aGlzLnZhbHVlc1sgMSBdIDsgfVxyXG4gICAgc2V0IHkgKCB5IDogbnVtYmVyICkgeyB0aGlzLnZhbHVlc1sgMSBdID0geSA7IH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQgKCB4IDogbnVtYmVyID0gMCAsIHkgOiBudW1iZXIgKSA6IHZlYzIge1xyXG4gICAgICAgIHRoaXMudmFsdWVzWyAwIF0gPSB4IDtcclxuICAgICAgICB0aGlzLnZhbHVlc1sgMSBdID0geSA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlICggeCA6IG51bWJlciA9IDAgLCB5IDogbnVtYmVyID0gMCApIDogdmVjMiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyB2ZWMyKCB4ICwgeSApIDtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiIsIu+7vy8vLyAyROWQkemHj1xyXG5leHBvcnQgY2xhc3MgVmVjMiB7XHJcbiAgICBcclxuICAgIHg6IG51bWJlcjtcclxuICAgIHk6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIENsb25lKCk6IFZlYzIge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjMih0aGlzLngsIHRoaXMueSk7XHJcbiAgICB9XHJcblxyXG4gICAgU2V0WmVybygpOiBWZWMyIHtcclxuICAgICAgICB0aGlzLnggPSAwO1xyXG4gICAgICAgIHRoaXMueSA9IDA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgU2V0KHg6IG51bWJlciwgeTogbnVtYmVyKTogVmVjMiB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIENvcHkob3RoZXI6IFZlYzIpOiBWZWMyIHtcclxuICAgICAgICB0aGlzLnggPSBvdGhlci54O1xyXG4gICAgICAgIHRoaXMueSA9IG90aGVyLnk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgU2VsZkFkZCh2OiBWZWMyKTogVmVjMiB7XHJcbiAgICAgICAgdGhpcy54ICs9IHYueDtcclxuICAgICAgICB0aGlzLnkgKz0gdi55O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIEFkZFYodjogVmVjMik6IFZlYzIgeyAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHRoaXMueCArIHYueCx0aGlzLnkgKyB2LnkpO1xyXG4gICAgfVxyXG5cclxuICAgIFNlbGZTdWIodjogVmVjMik6IFZlYzIge1xyXG4gICAgICAgIHRoaXMueCAtPSB2Lng7XHJcbiAgICAgICAgdGhpcy55IC09IHYueTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBTdWJWKHY6IFZlYzIpOiBWZWMyIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlYzIodGhpcy54IC0gdi54LHRoaXMueSAtIHYueSk7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBTZWxmTXVsUyhzOiBudW1iZXIpOiBWZWMyIHtcclxuICAgICAgICB0aGlzLnggKj0gcztcclxuICAgICAgICB0aGlzLnkgKj0gcztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBNdWxTKHM6IG51bWJlcik6IFZlYzIge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjMih0aGlzLnggKiBzLCB0aGlzLnkgKiBzKTtcclxuICAgIH1cclxuXHJcbiAgICBEb3QodjogVmVjMik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqIHYueCArIHRoaXMueSAqIHYueTtcclxuICAgIH1cclxuXHJcbiAgICBDcm9zc1YodjogVmVjMik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqIHYueSAtIHRoaXMueSAqIHYueDtcclxuICAgIH1cclxuXHJcbiAgICBMZW5ndGgoKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zdCB4OiBudW1iZXIgPSB0aGlzLngsIHk6IG51bWJlciA9IHRoaXMueTtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpO1xyXG4gICAgfVxyXG5cclxuICAgIExlbmd0aFNxdWFyZWQoKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zdCB4OiBudW1iZXIgPSB0aGlzLngsIHk6IG51bWJlciA9IHRoaXMueTtcclxuICAgICAgICByZXR1cm4gKHggKiB4ICsgeSAqIHkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBOb3JtYWxpemUoKTogVmVjMiB7XHJcbiAgICAgICAgLy9jb25zdCBsZW5ndGg6IG51bWJlciA9IHRoaXMuTGVuZ3RoKCk7XHJcbiAgICAgICAgICAgICAgICAvL2lmIChsZW5ndGggPj0gMC4wMDEvKlNldHRpbmcuRVBTSUxPTiovKSB7XHJcbiAgICAgICAgIGNvbnN0IGludl9sZW5ndGg6IG51bWJlciA9IDEgLyB0aGlzLkxlbmd0aCgpO1xyXG4gICAgICAgICByZXR1cm4gbmV3IFZlYzIodGhpcy54Kmludl9sZW5ndGgsdGhpcy55Kmludl9sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTZWxmTm9ybWFsaXplKCk6IFZlYzIge1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aDogbnVtYmVyID0gdGhpcy5MZW5ndGgoKTtcclxuICAgICAgICBpZiAobGVuZ3RoID49IDAuMDAxLypTZXR0aW5nLkVQU0lMT04qLykge1xyXG4gICAgICAgICAgICBjb25zdCBpbnZfbGVuZ3RoOiBudW1iZXIgPSAxIC8gbGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGlzLnggKj0gaW52X2xlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy55ICo9IGludl9sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTZWxmUm90YXRlKHJhZGlhbnM6IG51bWJlcik6IFZlYzIge1xyXG4gICAgICAgIGNvbnN0IGM6IG51bWJlciA9IE1hdGguY29zKHJhZGlhbnMpO1xyXG4gICAgICAgIGNvbnN0IHM6IG51bWJlciA9IE1hdGguc2luKHJhZGlhbnMpO1xyXG4gICAgICAgIGNvbnN0IHg6IG51bWJlciA9IHRoaXMueDtcclxuICAgICAgICB0aGlzLnggPSBjICogeCAtIHMgKiB0aGlzLnk7XHJcbiAgICAgICAgdGhpcy55ID0gcyAqIHggKyBjICogdGhpcy55O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIFJvdGF0ZShyYWRpYW5zOiBudW1iZXIpOiBWZWMyIHtcclxuICAgICAgICBjb25zdCB2X3g6IG51bWJlciA9IHRoaXMueCwgdl95OiBudW1iZXIgPSB0aGlzLnk7XHJcbiAgICAgICAgY29uc3QgYzogbnVtYmVyID0gTWF0aC5jb3MocmFkaWFucyk7XHJcbiAgICAgICAgY29uc3QgczogbnVtYmVyID0gTWF0aC5zaW4ocmFkaWFucyk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKGMgKiB2X3ggLSBzICogdl95LHMgKiB2X3ggKyBjICogdl95KTtcclxuICAgIH1cclxuXHJcbiAgICBTZWxmQ3Jvc3NWUyhzOiBudW1iZXIpOiBWZWMyIHtcclxuICAgICAgICBjb25zdCB4OiBudW1iZXIgPSB0aGlzLng7XHJcbiAgICAgICAgdGhpcy54ID0gcyAqIHRoaXMueTtcclxuICAgICAgICB0aGlzLnkgPSAtcyAqIHg7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgU2VsZkNyb3NzU1YoczogbnVtYmVyKTogVmVjMiB7XHJcbiAgICAgICAgY29uc3QgeDogbnVtYmVyID0gdGhpcy54O1xyXG4gICAgICAgIHRoaXMueCA9IC1zICogdGhpcy55O1xyXG4gICAgICAgIHRoaXMueSA9IHMgKiB4O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIFNlbGZBYnMoKTogVmVjMiB7XHJcbiAgICAgICAgdGhpcy54ID0gTWF0aC5hYnModGhpcy54KTtcclxuICAgICAgICB0aGlzLnkgPSBNYXRoLmFicyh0aGlzLnkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIFNlbGZOZWcoKTogVmVjMiB7XHJcbiAgICAgICAgdGhpcy54ID0gKC10aGlzLngpO1xyXG4gICAgICAgIHRoaXMueSA9ICgtdGhpcy55KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgTmVnKCk6IFZlYzIge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjMigtdGhpcy54LC10aGlzLnkpO1xyXG4gICAgfSAgICBcclxufSIsIu+7v2ltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vbWF0aC9WZWMyXCI7XHJcbmltcG9ydCB7IFdvcmxkIH0gZnJvbSBcIi4uL1dvcmxkXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQm9keSB7XHJcblxyXG4gICAgcG9zaXRpb246IFZlYzIgPSBuZXcgVmVjMigpO1xyXG4gICAgdmVsb2NpdHk6IFZlYzIgPSBuZXcgVmVjMigpO1xyXG4gICAgQWNjZWxlcmF0aW9uOiBWZWMyID0gbmV3IFZlYzIoKTtcclxuXHJcbiAgICB3b3JsZDogV29ybGQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJrkvZNcclxuICAgICAqIEBjbGFzcyBCb2R5XHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Iod29ybGQ6IFdvcmxkKSB7XHJcbiAgICAgICAgdGhpcy53b3JsZCA9IHdvcmxkO1xyXG4gICAgICAgIC8vdGhpcy5BY2NlbGVyYXRpb24uU2VsZkFkZCh3b3JsZC5HcmF2aXR5KTtcclxuICAgIH1cclxuXHJcbiAgICBJbnRlZ3JhdGUoZHQ6IG51bWJlcikge1xyXG5cclxuICAgICAgICAvLyDlnKjovrnnlYzlpITlj43lvLlcclxuICAgICAgICAvKmlmICh0aGlzLnBvc2l0aW9uLnggPCAtMjgwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueCA9IC0yODA7XHJcbiAgICAgICAgICAgIHRoaXMudmVsb2NpdHkueCA9IC10aGlzLnZlbG9jaXR5Lng7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucG9zaXRpb24ueCA+IDI4MCkge1xyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnggPSAyODA7XHJcbiAgICAgICAgICAgIHRoaXMudmVsb2NpdHkueCA9IC10aGlzLnZlbG9jaXR5Lng7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLnkgPCAtMTgwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSA9IC0xODA7XHJcbiAgICAgICAgICAgIHRoaXMudmVsb2NpdHkueSA9IC10aGlzLnZlbG9jaXR5Lnk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucG9zaXRpb24ueSA+IDE4MCkge1xyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSAxODA7XHJcbiAgICAgICAgICAgIHRoaXMudmVsb2NpdHkueSA9IC10aGlzLnZlbG9jaXR5Lnk7XHJcbiAgICAgICAgfSovXHJcblxyXG4gICAgICAgIC8vIOiuoeeul+W9k+WJjemAn+W6plxyXG4gICAgICAgIC8vIOmAn+W6pueahOivpeWPmOmHj+WNs+WKoOmAn+W6puS4juaXtumXtOeahOS5mOenr1xyXG4gICAgICAgIC8vIHYrPWEqdCAgICAgICAgXHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eS5TZWxmQWRkKHRoaXMuQWNjZWxlcmF0aW9uLk11bFMoZHQpKTtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uLlNlbGZBZGQodGhpcy52ZWxvY2l0eS5NdWxTKGR0KSk7XHJcbiAgICB9XHJcblxyXG59ICAgIiwiaW1wb3J0IHsgQXBwbGljYXRpb24sIENhbnZhczJEQXBwbGljYXRpb24gfSBmcm9tIFwiLi4vLi4vc3JjL2RyYXcyZC9BcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBDYW52YXNLZXlCb2FyZEV2ZW50LCBDYW52YXNNb3VzZUV2ZW50IH0gZnJvbSBcIi4uLy4uL3NyYy9kcmF3MmQvYXBwbGljYXRpb25cIjtcclxuaW1wb3J0ICogYXMgc3AgZnJvbSBcIi4uLy4uL3NyYy9TdHVuUGh5c2ljc1wiXHJcblxyXG5jbGFzcyBBcHBsaWNhdGlvblRlc3QgZXh0ZW5kcyBDYW52YXMyREFwcGxpY2F0aW9uIHtcclxuICAgIHB1YmxpYyB3b3JsZDpzcC5Xb3JsZDtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKCBjYW52YXMgOiBIVE1MQ2FudmFzRWxlbWVudCAgKSB7XHJcbiAgICAgICAgc3VwZXIoIGNhbnZhcyApIDtcclxuICAgICAgICB0aGlzLndvcmxkID0gbmV3IHNwLldvcmxkKCk7XHJcblxyXG4gICAgICAgIGxldCBjaXJjbGVCb2R5ID0gbmV3IHNwLkJvZHkodGhpcy53b3JsZCk7XHJcbiAgICAgICAgY2lyY2xlQm9keS5wb3NpdGlvbi5TZXRaZXJvKCk7XHJcbiAgICAgICAgY2lyY2xlQm9keS52ZWxvY2l0eS5TZXQoMTAsIDApO1xyXG4gICAgICAgIGNpcmNsZUJvZHkuQWNjZWxlcmF0aW9uLlNldCgxMCwgMCk7XHJcbiAgICAgICAgdGhpcy53b3JsZC5hZGRCb2R5KGNpcmNsZUJvZHkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgZGlzcGF0Y2hLZXlEb3duICggZXZ0IDogQ2FudmFzS2V5Qm9hcmRFdmVudCkgOiB2b2lkIHtcclxuICAgICAgIGNvbnNvbGUgLiBsb2cgKCBcIiBrZXkgOiBcIiArIGV2dC5rZXkgKyBcIiBpcyBkb3duIFwiICkgO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBkaXNwYXRjaE1vdXNlRG93biAoIGV2dCA6IENhbnZhc01vdXNlRXZlbnQgKSA6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUgLiBsb2cgKCBcIiBjYW52YXNQb3NpdGlvbiA6IFwiICsgZXZ0IC4gY2FudmFzUG9zaXRpb24gKSA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSAoIGVsYXBzZWRNc2VjIDogbnVtYmVyICwgaW50ZXJ2YWxTZWMgOiBudW1iZXIgKSA6IHZvaWQge1xyXG4gICAgICAgIC8vY29uc29sZSAuIGxvZyAoIFwiIGVsYXBzZWRNc2VjIDogXCIgKyBlbGFwc2VkTXNlYyArIFwiIGludGVydmFsU2VjIDogXCIgKyBpbnRlcnZhbFNlYyApIDtcclxuICAgICAgICB0aGlzLndvcmxkLnN0ZXAoaW50ZXJ2YWxTZWMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW5kZXIgKCApIDogdm9pZCB7XHJcbiAgICAgICAgLy9jb25zb2xlIC4gbG9nICggXCIg6LCD55SocmVuZGVy5pa55rOVIFwiICkgO1xyXG4gICAgICAgIC8vIGNsZWFyIHRoZSBjYW52YXMgd2l0aCBhIHRyYW5zcGFyZW50IGZpbGwsIHRvIGFsbG93IHRoZSBjYW52YXMgYmFja2dyb3VuZCB0byBzaG93XHJcbiAgICAgICAgdGhpcy5jb250ZXh0MkQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ3NvdXJjZS1pbic7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0MkQuZmlsbFN0eWxlID0gXCJ0cmFuc3BhcmVudFwiO1xyXG4gICAgICAgIHRoaXMuY29udGV4dDJELmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0MkQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ3NvdXJjZS1vdmVyJztcclxuICAgICAgICBmb3IgKGxldCBpOm51bWJlciAgPSAwOyBpIDwgdGhpcy53b3JsZC5ib2RpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGJvZHk6c3AuQm9keT10aGlzLndvcmxkLmJvZGllc1tpXTtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0MkQuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dDJELmFyYyhib2R5LnBvc2l0aW9uLngsIGJvZHkucG9zaXRpb24ueSwgMjAsIDAsIE1hdGguUEkgKiAyLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dDJELnN0cm9rZVN0eWxlID0gXCJyZ2IoMjU1LDAsMClcIjtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0MkQuc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG59XHJcblxyXG5sZXQgY2FudmFzIDogSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50IDtcclxubGV0IGFwcCA6IEFwcGxpY2F0aW9uID0gbmV3IEFwcGxpY2F0aW9uVGVzdCAoIGNhbnZhcyApIDtcclxuXHJcbmFwcCAuIHVwZGF0ZSAoIDAgLCAwICkgO1xyXG5hcHAgLiByZW5kZXIgKCApIDtcclxuXHJcblxyXG5sZXQgc3RhcnRCdXR0b24gOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQnKSBhcyBIVE1MQnV0dG9uRWxlbWVudCA7XHJcbmxldCBzdG9wQnV0dG9uIDogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgKCdzdG9wJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQgO1xyXG5cclxuc3RhcnRCdXR0b24gLiBvbmNsaWNrID0gKCBldiA6IE1vdXNlRXZlbnQgKSA6IHZvaWQgPT4ge1xyXG4gICAgYXBwIC4gc3RhcnQgKCApIDtcclxufVxyXG5cclxuc3RvcEJ1dHRvbiAuIG9uY2xpY2sgPSAoIGV2IDogTW91c2VFdmVudCApIDogdm9pZCA9PiB7XHJcbiAgICBhcHAgLiBzdG9wICggKSA7XHJcbn0iXX0=
