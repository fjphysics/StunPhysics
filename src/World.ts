import { Body } from "./objects/Body";
import { Vec2 } from "./math/Vec2";

export class World {

    gravity: Vec2;
    bodies: Array<Body>;

    constructor() {
        this.bodies = new Array<Body>();
        this.gravity = new Vec2(0, -50);
    }

    addBody(body: Body) {
        this.bodies.push(body);
    }

    step(dt: number) {
        for (let body of this.bodies) {    
            body.Integrate(dt);
        }
    }
}