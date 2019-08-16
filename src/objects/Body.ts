import { Vec2 } from "../math/Vec2";
import { World } from "../World";

export class Body {
    position: Vec2 = Vec2.ZERO;
    velocity: Vec2 = Vec2.ZERO;
    gravity: Vec2 = Vec2.ZERO;

    private force: Vec2 = Vec2.ZERO;
    private _mass: number = 1;
    private _invMass: number = 1;
    private _damping: number = 0.1;

    get mass(): number {
        return this._mass
    }
    set mass(value) {
        if (value <= 0) {
            this._mass = 1;
        }
        this._invMass = 1 / this._mass;
    }
    
    get damping(): number {
        return this._damping;
    }
    set damping(value) {
        if (value <= 0) {
            this._damping = 0;
        }
    }

    constructor(world: World) {
        this.gravity = world.gravity;
    }

    ApplyForce(force: Vec2): void {
        this.force.x += force.x;
        this.force.y += force.y;
    }

    ApplyImpulse(impulse: Vec2): void {
        this.velocity.x += this._invMass * impulse.x;
        this.velocity.y += this._invMass * impulse.y;
    }

    Integrate(dt: number) {
        this.velocity.x += (this.force.x * this._invMass + this.gravity.x) * dt;
        this.velocity.y += (this.force.y * this._invMass + this.gravity.y) * dt;
        this.velocity.SelfMul(1.0 / (1.0 + dt * this.damping));  // 空气阻力

        this.position.x += this.velocity.x * dt;
        this.position.y += this.velocity.y * dt;

        this.clearForce();
    }

    private clearForce(): void {
        this.force.x = this.force.y = 0;
    }
}