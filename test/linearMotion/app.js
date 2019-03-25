(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
__export(require("./World"));
__export(require("./math/Vec2"));
__export(require("./objects/Body"));
},{"./World":2,"./math/Vec2":3,"./objects/Body":4}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Vec2_1 = require("./math/Vec2");
var World = (function () {
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
},{"./math/Vec2":3}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
/// 2D向量
var Vec2 = (function () {
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
},{}],4:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Vec2_1 = require("../math/Vec2");
var Body = (function () {
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
},{"../math/Vec2":3}],5:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var sp = require("../../src/StunPhysics");
var test = (function () {
    function test() {
        this.isPause = false;
        this.time = 0;
        this.rectX = 0;
        this.totalTime = 0; // 用于计算变加速运动的时间
        this.btnStart = document.getElementById('btnStart');
        this.btnReset = document.getElementById('btnReset');
        this.ranV = document.getElementById("raV");
        this.ranA = document.getElementById("raA");
        this.spV = document.getElementById("spV");
        this.spA = document.getElementById("spA");
        this.spTime = document.getElementById("spTime");
        this.rect = document.getElementById("rect");
        this.a = parseFloat(this.ranA.value);
        this.v0 = parseFloat(this.ranV.value);
        this.isPause = true;
    }
    test.prototype.start = function () {
        var _this = this;
        this.btnStart.onclick = function () {
            _this.isPause = !_this.isPause;
            if (_this.isPause) {
                _this.btnStart.innerHTML = "开始";
            }
            else {
                _this.btnStart.innerHTML = "暂停";
            }
        };
        this.btnReset.onclick = function () {
            _this.resetBody();
        };
        this.ranV.oninput = function () {
            _this.spV.innerHTML = _this.ranV.value + "m/s";
        };
        this.ranA.oninput = function () {
            _this.spA.innerHTML = _this.ranA.value + "m/s<sup>2</sup>";
        };
        /*this.btnExample4.onclick = () => {
            this.totalTime = 0;
            this.circleBody.position.x = 0;
            this.circleBody.velocity.x = 0;
        }*/
        this.world = new sp.World();
        this.circleBody = new sp.Body(this.world);
        this.resetBody();
        this.world.addBody(this.circleBody);
        this.Update();
    };
    ;
    test.prototype.Update = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.Update(); });
        var time = Date.now();
        this.elapsedTime = this.previousTime ? (time - this.previousTime) / 1000 : 0;
        this.elapsedTime = Math.min(1 / 10, this.elapsedTime);
        this.previousTime = time;
        if (this.elapsedTime > 0) {
            if (this.isPause)
                return;
            this.time += this.elapsedTime;
            this.spTime.innerHTML = (this.time).toFixed(2).toString() + "s";
            this.world.step(this.elapsedTime);
            if (parseFloat(this.rect.getAttribute("x")) < 800) {
                this.rectX += this.elapsedTime * 100;
                this.rect.setAttribute("x", this.circleBody.position.x.toString());
            }
            else {
                this.isPause = true;
            }
            /*const ctx: CanvasRenderingContext2D = this.ctx;

            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.save();

            // 0,0 at center of canvas, x right, y up
            ctx.translate(0.5 * ctx.canvas.width, 0.5 * ctx.canvas.height);
            ctx.scale(1, -1);

            let body: sp.Body = this.circleBody;
            if (!this.isPause) {
                //console.log('type=' + this.motionType + ',a=' + this.AccelerationLength + ',k=' + this.k);
                if (this.motionType == 0) {
                    body.Acceleration = this.world.Gravity;
                }
                else if (this.motionType == 1) {
                    body.Acceleration = body.velocity.Normalize().Rotate(Math.PI / 2).MulS(this.AccelerationLength);// 圆周运动
                }
                else if (this.motionType == 2) {
                    body.Acceleration = body.position.Neg().MulS(this.k);// 简谐振动
                }
                else if (this.motionType == 3) {
                    body.Acceleration.x = 5 - 0.9 * body.velocity.x;
                    this.totalTime += this.elapsedTime;
                    if (body.position.x <= 1.167) {
                        this.pMessage.innerText = "时间：" + this.totalTime + "s，位移：" + body.position.x + "m，速度：" + body.velocity.x+"m/s";
                    }
                }
                this.world.step(this.elapsedTime);

            }*/
            //this.debugDraw.DrawSolidCircle(body.position.x, body.position.y, 20);
            //ctx.restore();
        }
        ;
    };
    ;
    test.prototype.resetBody = function () {
        this.circleBody.position.SetZero();
        this.circleBody.velocity.Set(this.v0, 0);
        this.circleBody.Acceleration.Set(this.a, 0);
        this.rect.setAttribute("x", "0");
        this.btnStart.innerHTML = "开始";
        this.isPause = true;
        this.spTime.innerHTML = "0.00s";
        this.time = 0;
    };
    return test;
}());
exports.test = test;
window.onload = function () {
    var main = new test();
    main.start();
};
},{"../../src/StunPhysics":1}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvU3R1blBoeXNpY3MudHMiLCJzcmMvV29ybGQudHMiLCJzcmMvbWF0aC9WZWMyLnRzIiwic3JjL29iamVjdHMvQm9keS50cyIsInRlc3QvbGluZWFyTW90aW9uL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQUEsNkJBQXdCO0FBQ3hCLGlDQUE0QjtBQUM1QixvQ0FBK0I7Ozs7QUNEL0Isb0NBQWtDO0FBRWxDO0lBS0k7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksS0FBSyxFQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFdBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsdUJBQU8sR0FBUCxVQUFRLElBQVU7UUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsb0JBQUksR0FBSixVQUFLLEVBQVU7UUFDWCxHQUFHLENBQUMsQ0FBYSxVQUFXLEVBQVgsS0FBQSxJQUFJLENBQUMsTUFBTSxFQUFYLGNBQVcsRUFBWCxJQUFXO1lBQXZCLElBQUksSUFBSSxTQUFBO1lBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFDTCxZQUFDO0FBQUQsQ0FuQkEsQUFtQkMsSUFBQTtBQW5CWSxzQkFBSzs7OztBQ0hqQixRQUFRO0FBQ1Q7SUFLSSxjQUFZLENBQWEsRUFBRSxDQUFhO1FBQTVCLGtCQUFBLEVBQUEsS0FBYTtRQUFFLGtCQUFBLEVBQUEsS0FBYTtRQUNwQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQUVELG9CQUFLLEdBQUw7UUFDSSxNQUFNLENBQUMsSUFB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Q0FBQyxNQUFNLEdBQUc7SUFDWixJQUFJLElBQUksR0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQzVCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNqQixDQUFDLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0ICogZnJvbSBcIi4vV29ybGRcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vbWF0aC9WZWMyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL29iamVjdHMvQm9keVwiOyIsImltcG9ydCB7IEJvZHkgfSBmcm9tIFwiLi9vYmplY3RzL0JvZHlcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuL21hdGgvVmVjMlwiXHJcblxyXG5leHBvcnQgY2xhc3MgV29ybGQge1xyXG5cclxuICAgIGdyYXZpdHk6IFZlYzI7XHJcbiAgICBib2RpZXM6IEFycmF5PEJvZHk+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuYm9kaWVzID0gbmV3IEFycmF5PEJvZHk+KCk7XHJcbiAgICAgICAgdGhpcy5ncmF2aXR5ID0gbmV3IFZlYzIoMCwgLTUwKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRCb2R5KGJvZHk6IEJvZHkpIHtcclxuICAgICAgICB0aGlzLmJvZGllcy5wdXNoKGJvZHkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0ZXAoZHQ6IG51bWJlcikge1xyXG4gICAgICAgIGZvciAobGV0IGJvZHkgb2YgdGhpcy5ib2RpZXMpIHsgICAgXHJcbiAgICAgICAgICAgIGJvZHkuSW50ZWdyYXRlKGR0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCLvu78vLy8gMkTlkJHph49cclxuZXhwb3J0IGNsYXNzIFZlYzIge1xyXG4gICAgXHJcbiAgICB4OiBudW1iZXI7XHJcbiAgICB5OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyID0gMCwgeTogbnVtYmVyID0gMCkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgIH1cclxuXHJcbiAgICBDbG9uZSgpOiBWZWMyIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlYzIodGhpcy54LCB0aGlzLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIFNldFplcm8oKTogVmVjMiB7XHJcbiAgICAgICAgdGhpcy54ID0gMDtcclxuICAgICAgICB0aGlzLnkgPSAwO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIFNldCh4OiBudW1iZXIsIHk6IG51bWJlcik6IFZlYzIge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBDb3B5KG90aGVyOiBWZWMyKTogVmVjMiB7XHJcbiAgICAgICAgdGhpcy54ID0gb3RoZXIueDtcclxuICAgICAgICB0aGlzLnkgPSBvdGhlci55O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIFNlbGZBZGQodjogVmVjMik6IFZlYzIge1xyXG4gICAgICAgIHRoaXMueCArPSB2Lng7XHJcbiAgICAgICAgdGhpcy55ICs9IHYueTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBBZGRWKHY6IFZlYzIpOiBWZWMyIHsgICAgICAgIFxyXG4gICAgICAgIHJldHVybiBuZXcgVmVjMih0aGlzLnggKyB2LngsdGhpcy55ICsgdi55KTtcclxuICAgIH1cclxuXHJcbiAgICBTZWxmU3ViKHY6IFZlYzIpOiBWZWMyIHtcclxuICAgICAgICB0aGlzLnggLT0gdi54O1xyXG4gICAgICAgIHRoaXMueSAtPSB2Lnk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgU3ViVih2OiBWZWMyKTogVmVjMiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHRoaXMueCAtIHYueCx0aGlzLnkgLSB2LnkpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgU2VsZk11bFMoczogbnVtYmVyKTogVmVjMiB7XHJcbiAgICAgICAgdGhpcy54ICo9IHM7XHJcbiAgICAgICAgdGhpcy55ICo9IHM7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgTXVsUyhzOiBudW1iZXIpOiBWZWMyIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlYzIodGhpcy54ICogcywgdGhpcy55ICogcyk7XHJcbiAgICB9XHJcblxyXG4gICAgRG90KHY6IFZlYzIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggKiB2LnggKyB0aGlzLnkgKiB2Lnk7XHJcbiAgICB9XHJcblxyXG4gICAgQ3Jvc3NWKHY6IFZlYzIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggKiB2LnkgLSB0aGlzLnkgKiB2Lng7XHJcbiAgICB9XHJcblxyXG4gICAgTGVuZ3RoKCk6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgeDogbnVtYmVyID0gdGhpcy54LCB5OiBudW1iZXIgPSB0aGlzLnk7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5KTtcclxuICAgIH1cclxuXHJcbiAgICBMZW5ndGhTcXVhcmVkKCk6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgeDogbnVtYmVyID0gdGhpcy54LCB5OiBudW1iZXIgPSB0aGlzLnk7XHJcbiAgICAgICAgcmV0dXJuICh4ICogeCArIHkgKiB5KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgTm9ybWFsaXplKCk6IFZlYzIge1xyXG4gICAgICAgIC8vY29uc3QgbGVuZ3RoOiBudW1iZXIgPSB0aGlzLkxlbmd0aCgpO1xyXG4gICAgICAgICAgICAgICAgLy9pZiAobGVuZ3RoID49IDAuMDAxLypTZXR0aW5nLkVQU0lMT04qLykge1xyXG4gICAgICAgICBjb25zdCBpbnZfbGVuZ3RoOiBudW1iZXIgPSAxIC8gdGhpcy5MZW5ndGgoKTtcclxuICAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHRoaXMueCppbnZfbGVuZ3RoLHRoaXMueSppbnZfbGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2VsZk5vcm1hbGl6ZSgpOiBWZWMyIHtcclxuICAgICAgICBjb25zdCBsZW5ndGg6IG51bWJlciA9IHRoaXMuTGVuZ3RoKCk7XHJcbiAgICAgICAgaWYgKGxlbmd0aCA+PSAwLjAwMS8qU2V0dGluZy5FUFNJTE9OKi8pIHtcclxuICAgICAgICAgICAgY29uc3QgaW52X2xlbmd0aDogbnVtYmVyID0gMSAvIGxlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy54ICo9IGludl9sZW5ndGg7XHJcbiAgICAgICAgICAgIHRoaXMueSAqPSBpbnZfbGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2VsZlJvdGF0ZShyYWRpYW5zOiBudW1iZXIpOiBWZWMyIHtcclxuICAgICAgICBjb25zdCBjOiBudW1iZXIgPSBNYXRoLmNvcyhyYWRpYW5zKTtcclxuICAgICAgICBjb25zdCBzOiBudW1iZXIgPSBNYXRoLnNpbihyYWRpYW5zKTtcclxuICAgICAgICBjb25zdCB4OiBudW1iZXIgPSB0aGlzLng7XHJcbiAgICAgICAgdGhpcy54ID0gYyAqIHggLSBzICogdGhpcy55O1xyXG4gICAgICAgIHRoaXMueSA9IHMgKiB4ICsgYyAqIHRoaXMueTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBSb3RhdGUocmFkaWFuczogbnVtYmVyKTogVmVjMiB7XHJcbiAgICAgICAgY29uc3Qgdl94OiBudW1iZXIgPSB0aGlzLngsIHZfeTogbnVtYmVyID0gdGhpcy55O1xyXG4gICAgICAgIGNvbnN0IGM6IG51bWJlciA9IE1hdGguY29zKHJhZGlhbnMpO1xyXG4gICAgICAgIGNvbnN0IHM6IG51bWJlciA9IE1hdGguc2luKHJhZGlhbnMpO1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjMihjICogdl94IC0gcyAqIHZfeSxzICogdl94ICsgYyAqIHZfeSk7XHJcbiAgICB9XHJcblxyXG4gICAgU2VsZkNyb3NzVlMoczogbnVtYmVyKTogVmVjMiB7XHJcbiAgICAgICAgY29uc3QgeDogbnVtYmVyID0gdGhpcy54O1xyXG4gICAgICAgIHRoaXMueCA9IHMgKiB0aGlzLnk7XHJcbiAgICAgICAgdGhpcy55ID0gLXMgKiB4O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIFNlbGZDcm9zc1NWKHM6IG51bWJlcik6IFZlYzIge1xyXG4gICAgICAgIGNvbnN0IHg6IG51bWJlciA9IHRoaXMueDtcclxuICAgICAgICB0aGlzLnggPSAtcyAqIHRoaXMueTtcclxuICAgICAgICB0aGlzLnkgPSBzICogeDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBTZWxmQWJzKCk6IFZlYzIge1xyXG4gICAgICAgIHRoaXMueCA9IE1hdGguYWJzKHRoaXMueCk7XHJcbiAgICAgICAgdGhpcy55ID0gTWF0aC5hYnModGhpcy55KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBTZWxmTmVnKCk6IFZlYzIge1xyXG4gICAgICAgIHRoaXMueCA9ICgtdGhpcy54KTtcclxuICAgICAgICB0aGlzLnkgPSAoLXRoaXMueSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIE5lZygpOiBWZWMyIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlYzIoLXRoaXMueCwtdGhpcy55KTtcclxuICAgIH0gICAgXHJcbn0iLCLvu79pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uL21hdGgvVmVjMlwiO1xyXG5pbXBvcnQgeyBXb3JsZCB9IGZyb20gXCIuLi9Xb3JsZFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJvZHkge1xyXG5cclxuICAgIHBvc2l0aW9uOiBWZWMyID0gbmV3IFZlYzIoKTtcclxuICAgIHZlbG9jaXR5OiBWZWMyID0gbmV3IFZlYzIoKTtcclxuICAgIEFjY2VsZXJhdGlvbjogVmVjMiA9IG5ldyBWZWMyKCk7XHJcblxyXG4gICAgd29ybGQ6IFdvcmxkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yia5L2TXHJcbiAgICAgKiBAY2xhc3MgQm9keVxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHdvcmxkOiBXb3JsZCkge1xyXG4gICAgICAgIHRoaXMud29ybGQgPSB3b3JsZDtcclxuICAgICAgICAvL3RoaXMuQWNjZWxlcmF0aW9uLlNlbGZBZGQod29ybGQuR3Jhdml0eSk7XHJcbiAgICB9XHJcblxyXG4gICAgSW50ZWdyYXRlKGR0OiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgLy8g5Zyo6L6555WM5aSE5Y+N5by5XHJcbiAgICAgICAgLyppZiAodGhpcy5wb3NpdGlvbi54IDwgLTI4MCkge1xyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnggPSAtMjgwO1xyXG4gICAgICAgICAgICB0aGlzLnZlbG9jaXR5LnggPSAtdGhpcy52ZWxvY2l0eS54O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnBvc2l0aW9uLnggPiAyODApIHtcclxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54ID0gMjgwO1xyXG4gICAgICAgICAgICB0aGlzLnZlbG9jaXR5LnggPSAtdGhpcy52ZWxvY2l0eS54O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbi55IDwgLTE4MCkge1xyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSAtMTgwO1xyXG4gICAgICAgICAgICB0aGlzLnZlbG9jaXR5LnkgPSAtdGhpcy52ZWxvY2l0eS55O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnBvc2l0aW9uLnkgPiAxODApIHtcclxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gMTgwO1xyXG4gICAgICAgICAgICB0aGlzLnZlbG9jaXR5LnkgPSAtdGhpcy52ZWxvY2l0eS55O1xyXG4gICAgICAgIH0qL1xyXG5cclxuICAgICAgICAvLyDorqHnrpflvZPliY3pgJ/luqZcclxuICAgICAgICAvLyDpgJ/luqbnmoTor6Xlj5jph4/ljbPliqDpgJ/luqbkuI7ml7bpl7TnmoTkuZjnp69cclxuICAgICAgICAvLyB2Kz1hKnQgICAgICAgIFxyXG4gICAgICAgIHRoaXMudmVsb2NpdHkuU2VsZkFkZCh0aGlzLkFjY2VsZXJhdGlvbi5NdWxTKGR0KSk7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbi5TZWxmQWRkKHRoaXMudmVsb2NpdHkuTXVsUyhkdCkpO1xyXG4gICAgfVxyXG5cclxufSAgICIsIu+7v1xyXG5pbXBvcnQgKiBhcyBzcCBmcm9tIFwiLi4vLi4vc3JjL1N0dW5QaHlzaWNzXCJcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgdGVzdCB7XHJcblxyXG4gICAgd29ybGQ6IHNwLldvcmxkO1xyXG4gICAgY2lyY2xlQm9keTogc3AuQm9keTtcclxuXHJcbiAgICBpc1BhdXNlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBidG5TdGFydDogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICBidG5SZXNldDogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICByYW5WOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgc3BWOiBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICByYW5BOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgc3BBOiBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICBzcFRpbWU6IEhUTUxTcGFuRWxlbWVudDtcclxuICAgIHRpbWU6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcmVjdDogSFRNTEVsZW1lbnQ7XHJcbiAgICByZWN0WDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBhOiBudW1iZXI7XHJcbiAgICB2MDogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuYnRuU3RhcnQgPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0blN0YXJ0Jyk7XHJcbiAgICAgICAgdGhpcy5idG5SZXNldCA9IDxIVE1MQnV0dG9uRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuUmVzZXQnKTtcclxuICAgICAgICB0aGlzLnJhblYgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhVlwiKTtcclxuICAgICAgICB0aGlzLnJhbkEgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhQVwiKTtcclxuICAgICAgICB0aGlzLnNwViA9IDxIVE1MU3BhbkVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzcFZcIik7XHJcbiAgICAgICAgdGhpcy5zcEEgPSA8SFRNTFNwYW5FbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3BBXCIpO1xyXG4gICAgICAgIHRoaXMuc3BUaW1lID0gPEhUTUxTcGFuRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNwVGltZVwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZWN0XCIpO1xyXG5cclxuICAgICAgICB0aGlzLmEgPSBwYXJzZUZsb2F0KHRoaXMucmFuQS52YWx1ZSk7XHJcbiAgICAgICAgdGhpcy52MCA9IHBhcnNlRmxvYXQodGhpcy5yYW5WLnZhbHVlKTtcclxuXHJcbiAgICAgICAgdGhpcy5pc1BhdXNlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5idG5TdGFydC5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzUGF1c2UgPSAhdGhpcy5pc1BhdXNlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1BhdXNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0blN0YXJ0LmlubmVySFRNTCA9IFwi5byA5aeLXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0blN0YXJ0LmlubmVySFRNTCA9IFwi5pqC5YGcXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYnRuUmVzZXQub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldEJvZHkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucmFuVi5vbmlucHV0ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNwVi5pbm5lckhUTUwgPSB0aGlzLnJhblYudmFsdWUgKyBcIm0vc1wiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yYW5BLm9uaW5wdXQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3BBLmlubmVySFRNTCA9IHRoaXMucmFuQS52YWx1ZSArIFwibS9zPHN1cD4yPC9zdXA+XCI7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIC8qdGhpcy5idG5FeGFtcGxlNC5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnRvdGFsVGltZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuY2lyY2xlQm9keS5wb3NpdGlvbi54ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5jaXJjbGVCb2R5LnZlbG9jaXR5LnggPSAwO1xyXG4gICAgICAgIH0qL1xyXG5cclxuICAgICAgICB0aGlzLndvcmxkID0gbmV3IHNwLldvcmxkKCk7XHJcbiAgICAgICAgdGhpcy5jaXJjbGVCb2R5ID0gbmV3IHNwLkJvZHkodGhpcy53b3JsZCk7XHJcbiAgICAgICAgdGhpcy5yZXNldEJvZHkoKTtcclxuICAgICAgICB0aGlzLndvcmxkLmFkZEJvZHkodGhpcy5jaXJjbGVCb2R5KTtcclxuXHJcbiAgICAgICAgdGhpcy5VcGRhdGUoKTtcclxuICAgIH07XHJcblxyXG4gICAgcHJldmlvdXNUaW1lOiBudW1iZXI7ICAgICAgICAgLy8g5LiK5LiA5bin55qE5byA5aeL5pe25Yi7XHJcbiAgICBlbGFwc2VkVGltZTogbnVtYmVyOyAgICAgICAgICAvLyDmr4/luKfmtYHpgJ3nmoTml7bpl7TvvIjmr6vnp5LvvIlcclxuICAgIHRvdGFsVGltZTogbnVtYmVyID0gMDsgICAgICAgIC8vIOeUqOS6juiuoeeul+WPmOWKoOmAn+i/kOWKqOeahOaXtumXtFxyXG5cclxuICAgIFVwZGF0ZSgpIHtcclxuXHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuVXBkYXRlKCkpO1xyXG5cclxuICAgICAgICBjb25zdCB0aW1lOiBudW1iZXIgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIHRoaXMuZWxhcHNlZFRpbWUgPSB0aGlzLnByZXZpb3VzVGltZSA/ICh0aW1lIC0gdGhpcy5wcmV2aW91c1RpbWUpIC8gMTAwMCA6IDA7XHJcbiAgICAgICAgdGhpcy5lbGFwc2VkVGltZSA9IE1hdGgubWluKDEgLyAxMCwgdGhpcy5lbGFwc2VkVGltZSk7XHJcbiAgICAgICAgdGhpcy5wcmV2aW91c1RpbWUgPSB0aW1lO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5lbGFwc2VkVGltZSA+IDApIHtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzUGF1c2UpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRpbWUgKz0gdGhpcy5lbGFwc2VkVGltZTtcclxuICAgICAgICAgICAgdGhpcy5zcFRpbWUuaW5uZXJIVE1MID0gKHRoaXMudGltZSkudG9GaXhlZCgyKS50b1N0cmluZygpICsgXCJzXCI7XHJcblxyXG4gICAgICAgICAgICB0aGlzLndvcmxkLnN0ZXAodGhpcy5lbGFwc2VkVGltZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAocGFyc2VGbG9hdCh0aGlzLnJlY3QuZ2V0QXR0cmlidXRlKFwieFwiKSkgPCA4MDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVjdFggKz0gdGhpcy5lbGFwc2VkVGltZSAqIDEwMDtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVjdC5zZXRBdHRyaWJ1dGUoXCJ4XCIsIHRoaXMuY2lyY2xlQm9keS5wb3NpdGlvbi54LnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1BhdXNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvKmNvbnN0IGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gdGhpcy5jdHg7XHJcblxyXG4gICAgICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGN0eC5jYW52YXMud2lkdGgsIGN0eC5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICAgICAgY3R4LnNhdmUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIDAsMCBhdCBjZW50ZXIgb2YgY2FudmFzLCB4IHJpZ2h0LCB5IHVwXHJcbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoMC41ICogY3R4LmNhbnZhcy53aWR0aCwgMC41ICogY3R4LmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgICAgICBjdHguc2NhbGUoMSwgLTEpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGJvZHk6IHNwLkJvZHkgPSB0aGlzLmNpcmNsZUJvZHk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1BhdXNlKSB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCd0eXBlPScgKyB0aGlzLm1vdGlvblR5cGUgKyAnLGE9JyArIHRoaXMuQWNjZWxlcmF0aW9uTGVuZ3RoICsgJyxrPScgKyB0aGlzLmspO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubW90aW9uVHlwZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9keS5BY2NlbGVyYXRpb24gPSB0aGlzLndvcmxkLkdyYXZpdHk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLm1vdGlvblR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvZHkuQWNjZWxlcmF0aW9uID0gYm9keS52ZWxvY2l0eS5Ob3JtYWxpemUoKS5Sb3RhdGUoTWF0aC5QSSAvIDIpLk11bFModGhpcy5BY2NlbGVyYXRpb25MZW5ndGgpOy8vIOWchuWRqOi/kOWKqFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5tb3Rpb25UeXBlID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBib2R5LkFjY2VsZXJhdGlvbiA9IGJvZHkucG9zaXRpb24uTmVnKCkuTXVsUyh0aGlzLmspOy8vIOeugOiwkOaMr+WKqFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5tb3Rpb25UeXBlID09IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICBib2R5LkFjY2VsZXJhdGlvbi54ID0gNSAtIDAuOSAqIGJvZHkudmVsb2NpdHkueDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsVGltZSArPSB0aGlzLmVsYXBzZWRUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChib2R5LnBvc2l0aW9uLnggPD0gMS4xNjcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wTWVzc2FnZS5pbm5lclRleHQgPSBcIuaXtumXtO+8mlwiICsgdGhpcy50b3RhbFRpbWUgKyBcInPvvIzkvY3np7vvvJpcIiArIGJvZHkucG9zaXRpb24ueCArIFwibe+8jOmAn+W6pu+8mlwiICsgYm9keS52ZWxvY2l0eS54K1wibS9zXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5zdGVwKHRoaXMuZWxhcHNlZFRpbWUpO1xyXG5cclxuICAgICAgICAgICAgfSovXHJcblxyXG4gICAgICAgICAgICAvL3RoaXMuZGVidWdEcmF3LkRyYXdTb2xpZENpcmNsZShib2R5LnBvc2l0aW9uLngsIGJvZHkucG9zaXRpb24ueSwgMjApO1xyXG4gICAgICAgICAgICAvL2N0eC5yZXN0b3JlKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgcmVzZXRCb2R5KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2lyY2xlQm9keS5wb3NpdGlvbi5TZXRaZXJvKCk7XHJcbiAgICAgICAgdGhpcy5jaXJjbGVCb2R5LnZlbG9jaXR5LlNldCh0aGlzLnYwLCAwKTtcclxuICAgICAgICB0aGlzLmNpcmNsZUJvZHkuQWNjZWxlcmF0aW9uLlNldCh0aGlzLmEsIDApO1xyXG4gICAgICAgIHRoaXMucmVjdC5zZXRBdHRyaWJ1dGUoXCJ4XCIsIFwiMFwiKTtcclxuICAgICAgICB0aGlzLmJ0blN0YXJ0LmlubmVySFRNTCA9IFwi5byA5aeLXCI7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNwVGltZS5pbm5lckhUTUwgPSBcIjAuMDBzXCI7XHJcbiAgICAgICAgdGhpcy50aW1lID0gMDtcclxuICAgIH1cclxufVxyXG5cclxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcclxuICAgIHZhciBtYWluOiB0ZXN0ID0gbmV3IHRlc3QoKTtcclxuICAgIG1haW4uc3RhcnQoKTtcclxufSJdfQ==
