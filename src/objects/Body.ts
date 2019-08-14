import { Vec2 } from "../math/Vec2";
import { World } from "../World";

export class Body {
    position: Vec2 = Vec2.ZERO;
    velocity: Vec2 = Vec2.ZERO;
    acceleration: Vec2 = Vec2.ZERO;

    private world: World;

    constructor(world: World) {
        this.world = world;
        this.acceleration.SelfAdd(world.gravity);
    }

    Integrate(dt: number) {
        this.velocity.x+=this.acceleration.x*dt;
        this.velocity.y+=this.acceleration.y*dt;        
        // 相当于前两行代码
        // this.velocity.SelfAdd(this.acceleration.MulS(dt));

        this.position.x+=this.velocity.x*dt;
        this.position.y+=this.velocity.y*dt;  
        // 相当于前两行代码
        //this.position.SelfAdd(this.velocity.MulS(dt));
    }
}