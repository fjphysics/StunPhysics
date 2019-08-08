import { Render } from "../../src/render/Render";
import { World } from "../../src/World";
import { Body } from "../../src/objects/Body";

export class test {
    world: World;
    circleBody: Body
    render: Render;

    isPause: boolean = false;

    canvas: HTMLCanvasElement;
    btnStart: HTMLButtonElement;
    btnReset: HTMLButtonElement;
    ranV: HTMLInputElement;
    spV: HTMLSpanElement;
    ranA: HTMLInputElement;
    spA: HTMLSpanElement;
    spTime: HTMLSpanElement;

    a: number;
    v0: number;

    public constructor() {

        this.btnStart = <HTMLButtonElement>document.getElementById('btnStart');
        this.btnReset = <HTMLButtonElement>document.getElementById('btnReset');
        this.ranV = <HTMLInputElement>document.getElementById("ranV");
        this.ranA = <HTMLInputElement>document.getElementById("ranA");
        this.spV = <HTMLSpanElement>document.getElementById("spV");
        this.spA = <HTMLSpanElement>document.getElementById("spA");
        this.spTime = <HTMLSpanElement>document.getElementById("spTime");

        this.a = Number(this.ranA.value);
        this.v0 = Number(this.ranV.value);

        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.render = new Render(this.canvas.getContext("2d"));

        this.isPause = true;
    }

    start() {
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
            this.resetBody();
        }
        this.ranV.oninput = () => {
            this.spV.innerHTML = this.ranV.value + "m/s";
        }
        this.ranA.oninput = () => {
            this.spA.innerHTML = this.ranA.value + "m/s<sup>2</sup>";
        }

        this.world = new World();
        this.circleBody = new Body();
        this.resetBody();
        this.world.addBody(this.circleBody);

        this.Update();
    };

    private time: number = 0;
    private previousTime: number;         // 上一帧的开始时刻
    private elapsedTime: number;          // 每帧流逝的时间（毫秒）
    //private totalTime: number = 0;        // 用于计算变加速运动的时间

    Update() {

        requestAnimationFrame(() => this.Update());

        const time: number = Date.now();
        this.elapsedTime = this.previousTime ? (time - this.previousTime) / 1000 : 0;
        this.elapsedTime = Math.min(1 / 10, this.elapsedTime);
        this.previousTime = time;

        if (this.circleBody.x > 700) {
            this.btnStart.disabled = true;
            return;
        }

        if (this.elapsedTime > 0) {

            if (this.isPause)
                return;

            this.time += this.elapsedTime;
            this.spTime.innerHTML = (this.time).toFixed(2).toString() + "s";

            this.world.step(this.elapsedTime);
        };
        this.render.draw(this.world);
    };

    resetBody(): void {
        this.circleBody.x = 100;
        this.circleBody.velocity = Number(this.ranV.value);
        this.circleBody.acceleration = Number(this.ranA.value);
        this.btnStart.innerHTML = "开始";
        this.btnStart.disabled = false;
        this.isPause = true;
        this.spTime.innerHTML = "0.00s";
        this.time = 0;
        this.render.draw(this.world);
    }
}

window.onload = () => {
    var main: test = new test();
    main.start();
}