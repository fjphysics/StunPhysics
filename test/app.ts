
import * as sp from "../src/StunPhysics"
import { rejects } from "assert";


export class test {

    world: sp.World;
    circleBody: sp.Body;

    isPause: boolean;
    btnStart: HTMLButtonElement;
    btnExample4: HTMLButtonElement;
    rect:HTMLElement;
    pMessage: HTMLParagraphElement;

    AccelerationLength: number;
    k: number;

    public constructor() {
        

        this.btnStart = <HTMLButtonElement>document.getElementById('btnStart');
        this.rect=<HTMLElement>document.getElementById('rect');
        this.btnExample4 = <HTMLButtonElement>document.getElementById('btnExample4');
        this.pMessage = <HTMLParagraphElement>document.getElementById('messageExample4');

        this.isPause = true;
        this.k = 50;
    }

    start() {

        this.btnStart.onclick = () => {
            this.isPause = !this.isPause;
            if (this.isPause) {
                this.btnStart.innerHTML = "开始";
                this.btnExample4.disabled = true;
            }
            else {
                this.btnStart.innerHTML = "暂停";
                this.btnExample4.disabled = false;
            }
        }

        this.btnExample4.onclick = () => {
            this.totalTime = 0;
            this.circleBody.position.x = 0;
            this.circleBody.velocity.x = 0;
        }

        this.world = new sp.World();
        this.circleBody = new sp.Body(this.world);
        this.ResetBody();
        this.world.addBody(this.circleBody);

        this.Update();
    };

    previousTime: number;         // 上一帧的开始时刻
    elapsedTime: number;          // 每帧流逝的时间（毫秒）
    totalTime: number = 0;        // 用于计算变加速运动的时间

    Update() {

        requestAnimationFrame(() => this.Update());

        const time: number = Date.now();
        this.elapsedTime = this.previousTime ? (time - this.previousTime) / 1000 : 0;
        this.elapsedTime = Math.min(1 / 10, this.elapsedTime);
        this.previousTime = time;

        if (this.elapsedTime > 0) {

            let body: sp.Body = this.circleBody;
            if (!this.isPause) {
                //console.log('type=' + this.motionType + ',a=' + this.AccelerationLength + ',k=' + this.k);
                /*if (this.motionType == 0) {
                    body.Acceleration = this.world.Gravity;
                }
                else if (this.motionType == 1) {
                    body.Acceleration = body.velocity.Normalize().Rotate(Math.PI / 2).MulS(this.AccelerationLength);// 圆周运动
                }
                else if (this.motionType == 2) {
                    body.Acceleration = body.position.Neg().MulS(this.k);// 简谐振动
                }
                /*else if (this.motionType == 3) {
                    body.Acceleration.x = 5 - 0.9 * body.velocity.x;
                    this.totalTime += this.elapsedTime;
                    if (body.position.x <= 1.167) {
                        this.pMessage.innerText = "时间：" + this.totalTime + "s，位移：" + body.position.x + "m，速度：" + body.velocity.x+"m/s";
                    }
                }*/
                this.world.step(this.elapsedTime);
                this.rect.setAttribute("x","30");

            }
        };
    };

    ResetBody(): void {
        this.circleBody.position.SetZero();
        this.circleBody.velocity.Set(100, 0);
    }
}

window.onload = () => {
    var main: test = new test();
    main.start();
}