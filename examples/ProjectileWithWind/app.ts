import { World } from "../../src/World";
import { Render } from "../../src/render/Render";
import { Body } from "../../src/objects/Body";
import { Vec2 } from "../../src/math/Vec2"

export class test {
    world: World;
    circleBody: Body
    render: Render;

    isPause: boolean = true;
    
    canvas: HTMLCanvasElement;
    btnStart: HTMLButtonElement;
    btnReset: HTMLButtonElement;

    flag: number = 0;

    public constructor() {

        this.btnStart = <HTMLButtonElement>document.getElementById('btnStart');
        this.btnReset = <HTMLButtonElement>document.getElementById('btnReset');

        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.render = new Render(this.canvas.getContext("2d"));

        this.btnStart.onclick = () => {
            this.isPause = !this.isPause;
            if (this.isPause) {
                this.btnStart.innerHTML = "开始";
            }
            else {
                this.btnStart.innerHTML = "暂停";
            }
        }
        this.btnReset.onclick = () => {
            this.reset();
        }

        window.onkeyup = (event) => {
            // 监听键盘所触发的事件，同时传递参数event
            switch (event.keyCode) {
                case 48:
                case 96:  // 0
                    this.flag = 0;
                    break;
                case 37:  // 左键
                    this.flag = 1;
                    break;
                case 38:  // 上键
                    this.flag = 2;
                    break;
                case 39:  // 右键
                    this.flag = 3;
                    break;
                case 40:  //下键
                    this.flag = 4;
                    break;
                case 73:  //i 键
                    this.circleBody.ApplyImpulse(new Vec2(0, -200))
                    break;
            }
        }

        this.world = new World();
        this.world.gravity = new Vec2(0, 100);
        this.circleBody = new Body(this.world);
        this.circleBody.position = new Vec2(100, 300);
        this.circleBody.velocity = new Vec2(200, 0);
        this.circleBody.damping = 0;
        this.world.addBody(this.circleBody);

        this.Update();
    }

    private previousTime: number;         // 上一帧的开始时刻
    private elapsedTime: number;          // 每帧流逝的时间（毫秒）

    Update() {

        requestAnimationFrame(() => this.Update());

        const time: number = performance.now();
        this.elapsedTime = this.previousTime ? (time - this.previousTime) / 1000 : 0;
        this.previousTime = time;

        if (this.elapsedTime > 0) {
            if (this.isPause)
                return;

            // 在边界处反弹
            if (this.circleBody.position.x < 20) {
                this.circleBody.position.x = 20;
                this.circleBody.velocity.x = -this.circleBody.velocity.x;
            }
            else if (this.circleBody.position.x > 780) {
                this.circleBody.position.x = 780;
                this.circleBody.velocity.x = -this.circleBody.velocity.x;
            }
            if (this.circleBody.position.y < 20) {
                this.circleBody.position.y = 20;
                this.circleBody.velocity.y = -this.circleBody.velocity.y;
            }
            else if (this.circleBody.position.y > 580) {
                this.circleBody.position.y = 580;
                this.circleBody.velocity.y = -this.circleBody.velocity.y;
            }
            
            // 根据按键施加力或冲量
            switch (this.flag) {
                case 0:  // 数字0
                    this.circleBody.ApplyForce(Vec2.ZERO);
                    break;
                case 1:
                    this.circleBody.ApplyForce(new Vec2(-100, 0))
                    break;
                case 2:  // 上键
                    this.circleBody.ApplyForce(new Vec2(0, -100))
                    break;
                case 3:  // 右键
                    this.circleBody.ApplyForce(new Vec2(100, 0))
                    break;
                case 4:  //下键
                    this.circleBody.ApplyForce(new Vec2(0, 100))
                    break;
            }
            this.world.step(this.elapsedTime);
        };
        this.render.draw(this.world);
    };

    reset(): void {
        this.circleBody.position = new Vec2(100, 300);
        this.circleBody.velocity = new Vec2(200, 0);
        this.btnStart.innerHTML = "开始";
        this.isPause = true;
        this.render.draw(this.world);
    }
}

window.onload = () => {
    var main: test = new test();
}