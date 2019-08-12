var Stunphysics;
(function (Stunphysics) {
    var Body = /** @class */ (function () {
        function Body() {
            this.x = 0;
            this.velocity = 0;
            this.acceleration = 0;
        }
        Body.prototype.Integrate = function (dt) {
            this.velocity += this.acceleration * dt;
            this.x += this.velocity * dt;
        };
        return Body;
    }());
    Stunphysics.Body = Body;
})(Stunphysics || (Stunphysics = {}));
