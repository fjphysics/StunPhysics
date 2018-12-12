import { Vec2 } from "../math/Vec2";
import { World } from "../World";

export class Body {

    position: Vec2 = new Vec2();
    velocity: Vec2 = new Vec2();
    Acceleration: Vec2 = new Vec2();

    world: World;

    /**
     * 刚体
     * @class Body
     * @constructor
     */
    constructor(world: World) {
        this.world = world;
        //this.Acceleration.SelfAdd(world.Gravity);
    }

    Integrate(dt: number) {

        // 在边界处反弹
        if (this.position.x < -280) {
            this.position.x = -280;
            this.velocity.x = -this.velocity.x;
        }
        else if (this.position.x > 280) {
            this.position.x = 280;
            this.velocity.x = -this.velocity.x;
        }
        if (this.position.y < -180) {
            this.position.y = -180;
            this.velocity.y = -this.velocity.y;
        }
        else if (this.position.y > 180) {
            this.position.y = 180;
            this.velocity.y = -this.velocity.y;
        }

        // 计算当前速度
        // 速度的该变量即加速度与时间的乘积
        // v+=a*t        
        this.velocity.SelfAdd(this.Acceleration.MulS(dt));
        this.position.SelfAdd(this.velocity.MulS(dt));
    }

}   