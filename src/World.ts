import { Body } from "./objects/Body";
import { Vec2 } from "./math/Vec2";

export class World {

    bodies: Array<Body>;
    gravity: Vec2;

    constructor() {
        this.bodies = new Array<Body>();
        this.gravity = new Vec2(0, 10);
    }

    addBody(body: Body) {
        this.bodies.push(body);
    }

    step(dt: number) {
        for (let i: number = 0; i < this.bodies.length; i++) {
            this.bodies[i].Integrate(dt);
        }
    }
}