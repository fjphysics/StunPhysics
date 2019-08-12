//import { World } from "../../src/World";
//import { Render } from "../../src/render/Render";
//import { Body } from "../../src/objects/Body";


//import { Render, World,Body } from "../../src/StunPhysics";

//import { World,Body,Render } from "../../types/StunPhysics";

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
    spTime: HTMLSpanElement;

    public constructor() {

        this.btnStart = <HTMLButtonElement>document.getElementById('btnStart');
        this.btnReset = <HTMLButtonElement>document.getElementById('btnReset');
        this.ranV = <HTMLInputElement>document.getElementById("ranV");
        this.ranA = <HTMLInputElement>document.getElementById("ranA");
        this.spV = <HTMLSpanElement>document.getElementById("spV");
        this.spA = <HTMLSpanElement>document.getElementById("spA");
        this.spTime = <HTMLSpanElement>document.getElementById("spTime");

        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.render = new Render(this.canvas.getContext("2d"));
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
            this.ranA.disabled = this.ranV.disabled = true;
        }
        this.btnReset.onclick = () => {
            this.resetBody();
        }
        this.ranV.oninput = () => {
            this.spV.innerHTML = this.ranV.value + "m/s";
            this.circleBody.velocity = Number(this.ranV.value);
        }
        this.ranA.oninput = () => {
            this.spA.innerHTML = this.ranA.value + "m/s<sup>2</sup>";
            this.circleBody.acceleration = Number(this.ranA.value);
        }

        this.world = new World();
        this.circleBody = new Body();
        this.circleBody.x = 100;
        this.circleBody.velocity = 25;
        this.circleBody.acceleration = 25;
        this.resetBody();
        this.world.addBody(this.circleBody);

        this.Update();
    };

    private previousTime: number;         // 上一帧的开始时刻
    private elapsedTime: number;          // 每帧流逝的时间（毫秒）
    private totalTime: number = 0;        // 程序运行的总时间

    Update() {

        requestAnimationFrame(() => this.Update());

        const time: number = performance.now();
        this.elapsedTime = this.previousTime ? (time - this.previousTime) / 1000 : 0;
        this.previousTime = time;

        if (this.circleBody.x > 700) {
            this.btnStart.disabled = true;
            return;
        }

        if (this.elapsedTime > 0) {
            if (this.isPause)
                return;

            this.totalTime += this.elapsedTime;
            this.spTime.innerHTML = (this.totalTime).toFixed(2).toString() + "s";

            this.world.step(this.elapsedTime);
        };
        this.render.draw(this.world);
    };

    resetBody(): void {
        this.circleBody.x = 100;
        this.circleBody.velocity = Number(this.ranV.value);
        this.circleBody.acceleration = Number(this.ranA.value);
        this.ranA.disabled = this.ranV.disabled = false;
        this.btnStart.innerHTML = "开始";
        this.btnStart.disabled = false;
        this.isPause = true;
        this.spTime.innerHTML = "0.00s";
        this.totalTime = 0;
        this.render.draw(this.world);
    }
}

window.onload = () => {
    var main: test = new test();
    main.start();
}