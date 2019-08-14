import { World } from "../../src/World";
import { Render } from "../../src/render/Render";
import { Body } from "../../src/objects/Body";
import { Vec2 } from "../../src/math/Vec2";

export class test {
    world: World;
    circleBody: Body
    render: Render;

    isPause: boolean = true;

    canvas: HTMLCanvasElement;
    btnStart: HTMLButtonElement;
    ranV: HTMLInputElement;
    spV: HTMLSpanElement;
    spTime: HTMLSpanElement;

    theta: number = 0;
    a_T: number = 0;
    readonly l: number = 400;
    readonly grivaty: number = 100;
    flag: boolean = false;

    public constructor() {

        this.btnStart = <HTMLButtonElement>document.getElementById('btnStart');
        this.btnStart.onclick = () => {
            this.isPause = false;
            this.btnStart.disabled = true;
            this.ranV.disabled = true;
            this.spTime.innerHTML = "0.00s";
        }

        this.ranV = <HTMLInputElement>document.getElementById("ranV");
        this.spV = <HTMLSpanElement>document.getElementById("spV");
        this.ranV.oninput = () => {
            this.spV.innerHTML = this.ranV.value + "m/s";
        }
        this.spTime = <HTMLSpanElement>document.getElementById("spTime");

        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.render = new Render(this.canvas.getContext("2d"));

        this.world = new World();
        this.circleBody = new Body(this.world);
        this.circleBody.position = new Vec2(400, 250);
        this.circleBody.velocity = new Vec2(Number(this.ranV.value), 0);
        this.world.addBody(this.circleBody);

        this.Update();
    }

    private previousTime: number;         // 上一帧的开始时刻
    private elapsedTime: number;          // 每帧流逝的时间（毫秒）
    private totalTime: number = 0;        // 程序运行的总时间

    Update() {

        requestAnimationFrame(() => this.Update());

        const time: number = performance.now();
        this.elapsedTime = this.previousTime ? (time - this.previousTime) / 1000 : 0;
        this.previousTime = time;

        if (this.circleBody.position.x < 400) {
            this.flag = true;
        }

        if (this.circleBody.position.x > 400 && this.flag) {
            this.reset();
            return;
        }

        if (this.elapsedTime > 0) {
            if (this.isPause)
                return;

            this.totalTime += this.elapsedTime;
            this.spTime.innerHTML = (this.totalTime).toFixed(2).toString() + "s";

            this.theta = Math.asin((this.circleBody.position.x - 400) / this.l);
            this.a_T = this.grivaty * Math.cos(this.theta) + this.circleBody.velocity.LengthSquared() / this.l;
            this.circleBody.acceleration = new Vec2(-this.a_T * Math.sin(this.theta), this.grivaty - this.a_T * Math.cos(this.theta));
            this.world.step(this.elapsedTime);
        };
        this.render.draw(this.world);
    };

    reset(): void {
        this.circleBody.position = new Vec2(400, 250);
        this.circleBody.velocity = new Vec2(Number(this.ranV.value), 0);
        this.btnStart.disabled = this.ranV.disabled = false;
        this.isPause = true;
        this.totalTime = 0;
        this.flag = false;
        this.render.draw(this.world);
    }
}

window.onload = () => {
    var main: test = new test();
}