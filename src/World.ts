import { Body } from "./objects/Body";

export class World {

    gravity: number;
    bodies: Array<Body>;

    constructor() {
        this.bodies = new Array<Body>();
    }

    addBody(body: Body) {
        this.bodies.push(body);
    }

    step(dt: number) {
        for (let i: number=0; i < this.bodies.length; i++){        
            this.bodies[i].Integrate(dt);
        }
    }
}