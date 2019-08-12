//import { Body } from "./objects/Body";
var Stunphysics;
(function (Stunphysics) {
    var World = /** @class */ (function () {
        function World() {
            this.bodies = new Array();
        }
        World.prototype.addBody = function (body) {
            this.bodies.push(body);
        };
        World.prototype.step = function (dt) {
            for (var i = 0; i < this.bodies.length; i++) {
                this.bodies[i].Integrate(dt);
            }
        };
        return World;
    }());
    Stunphysics.World = World;
})(Stunphysics || (Stunphysics = {}));
