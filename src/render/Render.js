//import { Body } from "../objects/Body";
//import { World } from "../World";
var Stunphysics;
(function (Stunphysics) {
    var Render = /** @class */ (function () {
        function Render(ctx) {
            this.ctx = ctx;
        }
        Render.prototype.draw = function (world) {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.save();
            for (var i = 0; i < world.bodies.length; i++) {
                var body = world.bodies[i];
                this.drawSolidCircle(body.x, 40, 20);
            }
            this.ctx.restore();
        };
        Render.prototype.drawSolidCircle = function (x, y, radius) {
            var ctx = this.ctx;
            if (ctx) {
                var cx = x;
                var cy = y;
                ctx.beginPath();
                ctx.arc(cx, cy, radius, 0, Math.PI * 2, true);
                ctx.moveTo(cx, cy);
                ctx.lineTo((cx + radius), cy);
                ctx.fillStyle = "rgba(255,0,0,0.5)";
                ctx.fill();
                ctx.strokeStyle = "rgb(255,0,0)";
                ctx.stroke();
            }
        };
        ;
        return Render;
    }());
    Stunphysics.Render = Render;
})(Stunphysics || (Stunphysics = {}));
