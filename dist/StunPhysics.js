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
        this.Bodies = new Array();
        this.Gravity = new Vec2_1.Vec2(0, -50);
    }
    World.prototype.AddBody = function (body) {
        this.Bodies.push(body);
    };
    World.prototype.Step = function (dt) {
        for (var _i = 0, _a = this.Bodies; _i < _a.length; _i++) {
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
        // 计算当前速度
        // 速度的该变量即加速度与时间的乘积
        // v+=a*t        
        this.velocity.SelfAdd(this.Acceleration.MulS(dt));
        if (this.position.x < -280 || this.position.x > 280)
            this.velocity.x = -this.velocity.x;
        if (this.position.y < -180 || this.position.y > 180)
            this.velocity.y = -this.velocity.y;
        this.position.SelfAdd(this.velocity.MulS(dt));
    };
    return Body;
}());
exports.Body = Body;
},{"../math/Vec2":3}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy8uNi4wLjJAYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL1N0dW5QaHlzaWNzLnRzIiwic3JjL1dvcmxkLnRzIiwic3JjL21hdGgvVmVjMi50cyIsInNyYy9vYmplY3RzL0JvZHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQ0FBLDZCQUF3QjtBQUN4QixpQ0FBNEI7QUFDNUIsb0NBQStCOzs7O0FDRC9CLG9DQUFrQztBQUVsQztJQUtJO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxXQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELHVCQUFPLEdBQVAsVUFBUSxJQUFVO1FBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELG9CQUFJLEdBQUosVUFBSyxFQUFVO1FBQ1gsR0FBRyxDQUFDLENBQWEsVUFBVyxFQUFYLEtBQUEsSUFBSSxDQUFDLE1BQU0sRUFBWCxjQUFXLEVBQVgsSUFBVztZQUF2QixJQUFJLElBQUksU0FBQTtZQUNULElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdEI7SUFDTCxDQUFDO0lBQ0wsWUFBQztBQUFELENBbkJBLEFBbUJDLElBQUE7QUFuQlksc0JBQUs7Ozs7QUNIakIsUUFBUTtBQUNUO0lBS0ksY0FBWSxDQUFhLEVBQUUsQ0FBYTtRQUE1QixrQkFBQSxFQUFBLEtBQWE7UUFBRSxrQkFBQSxFQUFBLEtBQWE7UUFDcEMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNmLENBQUM7SUFFRCxvQkFBSyxHQUFMO1FBQ0ksTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FB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QUcsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUN4RixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3hGLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVMLFdBQUM7QUFBRCxDQTdCQSxBQTZCQyxJQUFBO0FBN0JZLG9CQUFJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCAqIGZyb20gXCIuL1dvcmxkXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL21hdGgvVmVjMlwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9vYmplY3RzL0JvZHlcIjsiLCJpbXBvcnQgeyBCb2R5IH0gZnJvbSBcIi4vb2JqZWN0cy9Cb2R5XCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi9tYXRoL1ZlYzJcIlxyXG5cclxuZXhwb3J0IGNsYXNzIFdvcmxkIHtcclxuXHJcbiAgICBHcmF2aXR5OiBWZWMyO1xyXG4gICAgQm9kaWVzOiBBcnJheTxCb2R5PjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLkJvZGllcyA9IG5ldyBBcnJheTxCb2R5PigpO1xyXG4gICAgICAgIHRoaXMuR3Jhdml0eSA9IG5ldyBWZWMyKDAsIC01MCk7XHJcbiAgICB9XHJcblxyXG4gICAgQWRkQm9keShib2R5OiBCb2R5KSB7XHJcbiAgICAgICAgdGhpcy5Cb2RpZXMucHVzaChib2R5KTtcclxuICAgIH1cclxuXHJcbiAgICBTdGVwKGR0OiBudW1iZXIpIHtcclxuICAgICAgICBmb3IgKGxldCBib2R5IG9mIHRoaXMuQm9kaWVzKSB7ICAgIFxyXG4gICAgICAgICAgICBib2R5LkludGVncmF0ZShkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Iiwi77u/Ly8vIDJE5ZCR6YePXHJcbmV4cG9ydCBjbGFzcyBWZWMyIHtcclxuICAgIFxyXG4gICAgeDogbnVtYmVyO1xyXG4gICAgeTogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciA9IDAsIHk6IG51bWJlciA9IDApIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcblxyXG4gICAgQ2xvbmUoKTogVmVjMiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHRoaXMueCwgdGhpcy55KTtcclxuICAgIH1cclxuXHJcbiAgICBTZXRaZXJvKCk6IFZlYzIge1xyXG4gICAgICAgIHRoaXMueCA9IDA7XHJcbiAgICAgICAgdGhpcy55ID0gMDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBTZXQoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBWZWMyIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgQ29weShvdGhlcjogVmVjMik6IFZlYzIge1xyXG4gICAgICAgIHRoaXMueCA9IG90aGVyLng7XHJcbiAgICAgICAgdGhpcy55ID0gb3RoZXIueTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBTZWxmQWRkKHY6IFZlYzIpOiBWZWMyIHtcclxuICAgICAgICB0aGlzLnggKz0gdi54O1xyXG4gICAgICAgIHRoaXMueSArPSB2Lnk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgQWRkVih2OiBWZWMyKTogVmVjMiB7ICAgICAgICBcclxuICAgICAgICByZXR1cm4gbmV3IFZlYzIodGhpcy54ICsgdi54LHRoaXMueSArIHYueSk7XHJcbiAgICB9XHJcblxyXG4gICAgU2VsZlN1Yih2OiBWZWMyKTogVmVjMiB7XHJcbiAgICAgICAgdGhpcy54IC09IHYueDtcclxuICAgICAgICB0aGlzLnkgLT0gdi55O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIFN1YlYodjogVmVjMik6IFZlYzIge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjMih0aGlzLnggLSB2LngsdGhpcy55IC0gdi55KTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIFNlbGZNdWxTKHM6IG51bWJlcik6IFZlYzIge1xyXG4gICAgICAgIHRoaXMueCAqPSBzO1xyXG4gICAgICAgIHRoaXMueSAqPSBzO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIE11bFMoczogbnVtYmVyKTogVmVjMiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHRoaXMueCAqIHMsIHRoaXMueSAqIHMpO1xyXG4gICAgfVxyXG5cclxuICAgIERvdCh2OiBWZWMyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy54ICogdi54ICsgdGhpcy55ICogdi55O1xyXG4gICAgfVxyXG5cclxuICAgIENyb3NzVih2OiBWZWMyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy54ICogdi55IC0gdGhpcy55ICogdi54O1xyXG4gICAgfVxyXG5cclxuICAgIExlbmd0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IHg6IG51bWJlciA9IHRoaXMueCwgeTogbnVtYmVyID0gdGhpcy55O1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSk7XHJcbiAgICB9XHJcblxyXG4gICAgTGVuZ3RoU3F1YXJlZCgpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IHg6IG51bWJlciA9IHRoaXMueCwgeTogbnVtYmVyID0gdGhpcy55O1xyXG4gICAgICAgIHJldHVybiAoeCAqIHggKyB5ICogeSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIE5vcm1hbGl6ZSgpOiBWZWMyIHtcclxuICAgICAgICAvL2NvbnN0IGxlbmd0aDogbnVtYmVyID0gdGhpcy5MZW5ndGgoKTtcclxuICAgICAgICAgICAgICAgIC8vaWYgKGxlbmd0aCA+PSAwLjAwMS8qU2V0dGluZy5FUFNJTE9OKi8pIHtcclxuICAgICAgICAgY29uc3QgaW52X2xlbmd0aDogbnVtYmVyID0gMSAvIHRoaXMuTGVuZ3RoKCk7XHJcbiAgICAgICAgIHJldHVybiBuZXcgVmVjMih0aGlzLngqaW52X2xlbmd0aCx0aGlzLnkqaW52X2xlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNlbGZOb3JtYWxpemUoKTogVmVjMiB7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoOiBudW1iZXIgPSB0aGlzLkxlbmd0aCgpO1xyXG4gICAgICAgIGlmIChsZW5ndGggPj0gMC4wMDEvKlNldHRpbmcuRVBTSUxPTiovKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGludl9sZW5ndGg6IG51bWJlciA9IDEgLyBsZW5ndGg7XHJcbiAgICAgICAgICAgIHRoaXMueCAqPSBpbnZfbGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGlzLnkgKj0gaW52X2xlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNlbGZSb3RhdGUocmFkaWFuczogbnVtYmVyKTogVmVjMiB7XHJcbiAgICAgICAgY29uc3QgYzogbnVtYmVyID0gTWF0aC5jb3MocmFkaWFucyk7XHJcbiAgICAgICAgY29uc3QgczogbnVtYmVyID0gTWF0aC5zaW4ocmFkaWFucyk7XHJcbiAgICAgICAgY29uc3QgeDogbnVtYmVyID0gdGhpcy54O1xyXG4gICAgICAgIHRoaXMueCA9IGMgKiB4IC0gcyAqIHRoaXMueTtcclxuICAgICAgICB0aGlzLnkgPSBzICogeCArIGMgKiB0aGlzLnk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgUm90YXRlKHJhZGlhbnM6IG51bWJlcik6IFZlYzIge1xyXG4gICAgICAgIGNvbnN0IHZfeDogbnVtYmVyID0gdGhpcy54LCB2X3k6IG51bWJlciA9IHRoaXMueTtcclxuICAgICAgICBjb25zdCBjOiBudW1iZXIgPSBNYXRoLmNvcyhyYWRpYW5zKTtcclxuICAgICAgICBjb25zdCBzOiBudW1iZXIgPSBNYXRoLnNpbihyYWRpYW5zKTtcclxuICAgICAgICByZXR1cm4gbmV3IFZlYzIoYyAqIHZfeCAtIHMgKiB2X3kscyAqIHZfeCArIGMgKiB2X3kpO1xyXG4gICAgfVxyXG5cclxuICAgIFNlbGZDcm9zc1ZTKHM6IG51bWJlcik6IFZlYzIge1xyXG4gICAgICAgIGNvbnN0IHg6IG51bWJlciA9IHRoaXMueDtcclxuICAgICAgICB0aGlzLnggPSBzICogdGhpcy55O1xyXG4gICAgICAgIHRoaXMueSA9IC1zICogeDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBTZWxmQ3Jvc3NTVihzOiBudW1iZXIpOiBWZWMyIHtcclxuICAgICAgICBjb25zdCB4OiBudW1iZXIgPSB0aGlzLng7XHJcbiAgICAgICAgdGhpcy54ID0gLXMgKiB0aGlzLnk7XHJcbiAgICAgICAgdGhpcy55ID0gcyAqIHg7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgU2VsZkFicygpOiBWZWMyIHtcclxuICAgICAgICB0aGlzLnggPSBNYXRoLmFicyh0aGlzLngpO1xyXG4gICAgICAgIHRoaXMueSA9IE1hdGguYWJzKHRoaXMueSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgU2VsZk5lZygpOiBWZWMyIHtcclxuICAgICAgICB0aGlzLnggPSAoLXRoaXMueCk7XHJcbiAgICAgICAgdGhpcy55ID0gKC10aGlzLnkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBOZWcoKTogVmVjMiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKC10aGlzLngsLXRoaXMueSk7XHJcbiAgICB9ICAgIFxyXG59Iiwi77u/aW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi9tYXRoL1ZlYzJcIjtcclxuaW1wb3J0IHsgV29ybGQgfSBmcm9tIFwiLi4vV29ybGRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCb2R5IHtcclxuXHJcbiAgICBwb3NpdGlvbjogVmVjMiA9IG5ldyBWZWMyKCk7XHJcbiAgICB2ZWxvY2l0eTogVmVjMiA9IG5ldyBWZWMyKCk7XHJcbiAgICBBY2NlbGVyYXRpb246IFZlYzIgPSBuZXcgVmVjMigpO1xyXG5cclxuICAgIHdvcmxkOiBXb3JsZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWImuS9k1xyXG4gICAgICogQGNsYXNzIEJvZHlcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih3b3JsZDogV29ybGQpIHtcclxuICAgICAgICB0aGlzLndvcmxkID0gd29ybGQ7XHJcbiAgICAgICAgLy90aGlzLkFjY2VsZXJhdGlvbi5TZWxmQWRkKHdvcmxkLkdyYXZpdHkpO1xyXG4gICAgfVxyXG5cclxuICAgIEludGVncmF0ZShkdDogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIC8vIOiuoeeul+W9k+WJjemAn+W6plxyXG4gICAgICAgIC8vIOmAn+W6pueahOivpeWPmOmHj+WNs+WKoOmAn+W6puS4juaXtumXtOeahOS5mOenr1xyXG4gICAgICAgIC8vIHYrPWEqdCAgICAgICAgXHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eS5TZWxmQWRkKHRoaXMuQWNjZWxlcmF0aW9uLk11bFMoZHQpKTtcclxuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbi54IDwgLTI4MCB8fCB0aGlzLnBvc2l0aW9uLnggPiAyODApIHRoaXMudmVsb2NpdHkueCA9IC10aGlzLnZlbG9jaXR5Lng7XHJcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueSA8IC0xODAgfHwgdGhpcy5wb3NpdGlvbi55ID4gMTgwKSB0aGlzLnZlbG9jaXR5LnkgPSAtdGhpcy52ZWxvY2l0eS55O1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24uU2VsZkFkZCh0aGlzLnZlbG9jaXR5Lk11bFMoZHQpKTtcclxuICAgIH1cclxuXHJcbn0gICAiXX0=