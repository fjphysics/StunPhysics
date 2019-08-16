import { Body } from "./objects/Body";
import { Vec2 } from "./math/Vec2";

export class World {

    bodies: Array<Body>;
    gravity: Vec2=new Vec2(0,10);  // 默认重力加速度为10m/s^2，方向向下

    constructor() {
        this.bodies = new Array<Body>();
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