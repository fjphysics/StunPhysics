import { Body } from "./objects/Body";
import { Vec2 } from "./math/Vec2"

export class World {

    Gravity: Vec2;
    Bodies: Array<Body>;

    constructor() {
        this.Bodies = new Array<Body>();
        this.Gravity = new Vec2(0, -50);
    }

    AddBody(body: Body) {
        this.Bodies.push(body);
    }

    Step(dt: number) {
        for (let body of this.Bodies) {    
            body.Integrate(dt);
        }
    }
}