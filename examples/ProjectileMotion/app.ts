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
    ranV: HTMLInputElement;
    spV: HTMLSpanElement;
    ranA: HTMLInputElement;
    spA: HTMLSpanElement;

    v: number = 200;
    alpha: number = 0;

    public constructor() {

        this.btnStart = <HTMLButtonElement>document.getElementById('btnStart');
        this.btnReset = <HTMLButtonElement>document.getElementById('btnReset');
        this.ranV = <HTMLInputElement>document.getElementById("ranV");
        this.ranA = <HTMLInputElement>document.getElementById("ranA");
        this.spV = <HTMLSpanElement>document.getElementById("spV");
        this.spA = <HTMLSpanElement>document.getElementById("spA");

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
            this.ranA.disabled = this.ranV.disabled = true;
        }
        this.btnReset.onclick = () => {
            this.resetBody();
        }

        this.ranV.oninput = () => {
            this.v = Number(this.ranV.value);
            this.spV.innerHTML = this.v.toString() + "m/s";
            this.circleBody.velocity = new Vec2(this.v*Math.cos(this.alpha*Math.PI/180.0), -this.v*Math.sin(this.alpha*Math.PI/180.0));
        }
        this.ranA.oninput = () => {
            this.alpha=Number(this.ranA.value);
            this.spA.innerHTML = this.ranA.value + "°";
            this.circleBody.velocity = new Vec2(this.v*Math.cos(this.alpha*Math.PI/180.0), -this.v*Math.sin(this.alpha*Math.PI/180.0));
        }

        this.world = new World();
        this.world.gravity = new Vec2(0,100);
        this.circleBody = new Body(this.world);
        this.circleBody.position = new Vec2(100, 300);
        this.circleBody.velocity = new Vec2(this.v, 0);
        this.resetBody();
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

            this.world.step(this.elapsedTime);

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
        };
        this.render.draw(this.world);
    };

    resetBody(): void {
        this.circleBody.position = new Vec2(100, 300);
        this.circleBody.velocity = new Vec2(this.v * Math.cos(this.alpha * Math.PI / 180), -this.v * Math.sin(this.alpha * Math.PI / 180));
        this.btnStart.disabled = this.ranA.disabled = this.ranV.disabled = false;
        this.btnStart.innerHTML = "开始";
        this.isPause = true;
        this.render.draw(this.world);
    }
}

window.onload = () => {
    var main: test = new test();
}