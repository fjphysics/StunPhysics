import { World } from "../World";

export class Body {
    x: number = 0;
    velocity: number = 0;
    acceleration: number = 0;

    Integrate(dt: number) {
        this.velocity += this.acceleration * dt;
        this.x += this.velocity * dt;
    }
}   