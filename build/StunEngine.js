System.register("math/Vec2", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Vec2;
    return {
        setters: [],
        execute: function () {
            /// 2D向量
            Vec2 = (function () {
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
            exports_1("Vec2", Vec2);
        }
    };
});
System.register("objects/Body", ["math/Vec2"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Vec2_1, Body;
    return {
        setters: [
            function (Vec2_1_1) {
                Vec2_1 = Vec2_1_1;
            }
        ],
        execute: function () {
            Body = (function () {
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
            exports_2("Body", Body);
        }
    };
});
System.register("World", ["math/Vec2"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var Vec2_2, World;
    return {
        setters: [
            function (Vec2_2_1) {
                Vec2_2 = Vec2_2_1;
            }
        ],
        execute: function () {
            World = (function () {
                function World() {
                    this.Bodies = new Array();
                    this.Gravity = new Vec2_2.Vec2(0, -50);
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
            exports_3("World", World);
        }
    };
});
System.register("StunPhysics", ["World", "math/Vec2", "objects/Body"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_4(exports);
    }
    return {
        setters: [
            function (World_1_1) {
                exportStar_1(World_1_1);
            },
            function (Vec2_3_1) {
                exportStar_1(Vec2_3_1);
            },
            function (Body_1_1) {
                exportStar_1(Body_1_1);
            }
        ],
        execute: function () {
        }
    };
});
