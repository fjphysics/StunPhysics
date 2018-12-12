/// <reference path="../typings/dat-gui/dat-gui.d.ts" />
/// <reference path="../typings/stats/stats.d.ts" />
//// <reference path="../build/StunEngine.d.ts" />

import { DebugDraw } from "./DebugDraw";
import * as sp from "../src/StunPhysics"


export class test {

    ctx: CanvasRenderingContext2D;
    debugDraw: DebugDraw;

    world: sp.World;
    circleBody: sp.Body;

    stats: Stats;
    gui: dat.GUI;

    isPause: boolean;
    btnStart: HTMLButtonElement;
    btnExample4: HTMLButtonElement;
    pMessage: HTMLParagraphElement;

    motionType: number;
    AccelerationLength: number;
    k: number;

    public constructor() {
        this.ctx = (<HTMLCanvasElement>document.getElementById('canvas')).getContext("2d");

        this.btnStart = <HTMLButtonElement>document.getElementById('btnStart');
        this.btnExample4 = <HTMLButtonElement>document.getElementById('btnExample4');
        this.pMessage = <HTMLParagraphElement>document.getElementById('messageExample4');

        this.isPause = true;
        this.AccelerationLength = 50;
        this.motionType = 0;
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
            this.motionType = 3;
            this.totalTime = 0;
            this.circleBody.position.x = 0;
            this.circleBody.velocity.x = 0;
        }

        // 初始化FPS控件
        this.stats = new Stats();
        this.stats.showPanel(0);
        this.stats.dom.style.position = 'absolute';
        document.getElementById("Stats-output").appendChild(this.stats.dom);

        // 设置UI控件
        var obj = {
            运动类型: 0,
            向心加速度: 100,
            劲度系数: 50
        };

        this.gui = new dat.GUI;

        this.gui.add(obj, '运动类型', { '抛体运动': 0, '圆周运动': 1, '简谐振动': 2 }).onChange((e) => {
            this.motionType = e;
            this.ResetBody();
        });
        this.gui.add(obj, '向心加速度').min(50).max(150).step(10).onChange((e) => {
            this.AccelerationLength = e;
        });
        this.gui.add(obj, '劲度系数').min(20).max(200).step(20).onChange((e) => {
            this.k = e;
        });

        this.debugDraw = new DebugDraw(this.ctx);

        this.world = new sp.World();
        this.circleBody = new sp.Body(this.world);
        this.ResetBody();
        this.world.AddBody(this.circleBody);

        this.Update();
    };

    previousTime: number;         // 上一帧的开始时刻
    elapsedTime: number;          // 每帧流逝的时间（毫秒）
    totalTime: number = 0;        // 用于计算变加速运动的时间

    Update() {

        requestAnimationFrame(() => this.Update());

        this.stats.update();

        const time: number = Date.now();
        this.elapsedTime = this.previousTime ? (time - this.previousTime) / 1000 : 0;
        this.elapsedTime = Math.min(1 / 10, this.elapsedTime);
        this.previousTime = time;

        if (this.elapsedTime > 0) {

            const ctx: CanvasRenderingContext2D = this.ctx;

            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.save();

            // 0,0 at center of canvas, x right, y up
            ctx.translate(0.5 * ctx.canvas.width, 0.5 * ctx.canvas.height);
            ctx.scale(1, -1);

            let body: sp.Body = this.circleBody;
            if (!this.isPause) {
                //console.log('type=' + this.motionType + ',a=' + this.AccelerationLength + ',k=' + this.k);
                if (this.motionType == 0) {
                    body.Acceleration = this.world.Gravity;
                }
                else if (this.motionType == 1) {
                    body.Acceleration = body.velocity.Normalize().Rotate(Math.PI / 2).MulS(this.AccelerationLength);// 圆周运动
                }
                else if (this.motionType == 2) {
                    body.Acceleration = body.position.Neg().MulS(this.k);// 简谐振动
                }
                else if (this.motionType == 3) {
                    body.Acceleration.x = 5 - 0.9 * body.velocity.x;
                    this.totalTime += this.elapsedTime;
                    if (body.position.x <= 1.167) {
                        this.pMessage.innerText = "时间：" + this.totalTime + "s，位移：" + body.position.x + "m，速度：" + body.velocity.x+"m/s";
                    }
                }
                /*switch (this.motionType) {
                    case 0:
                        body.Acceleration = this.world.Gravity;
                        console.log(this.motionType);
                        break;
                    case 1:
                        body.Acceleration = body.velocity.Normalize().Rotate(Math.PI / 2).MulS(this.AccelerationLength);// 圆周运动                    
                        console.log(this.motionType);
                        break;
                    case 2:
                        body.Acceleration = body.position.Neg().MulS(this.k);// 简谐振动
                        console.log(this.motionType);
                        break;
                }*/
                this.world.Step(this.elapsedTime);

            }

            this.debugDraw.DrawSolidCircle(body.position.x, body.position.y, 20);
            ctx.restore();
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