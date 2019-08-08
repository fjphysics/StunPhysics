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
    ranK: HTMLInputElement;
    spK: HTMLSpanElement;
    ranM: HTMLInputElement;
    spM: HTMLSpanElement;
    spTime: HTMLSpanElement;

    k: number;
    m: number;
    flag4T:boolean=false;

    public constructor() {

        this.btnStart = <HTMLButtonElement>document.getElementById('btnStart');
        this.btnReset = <HTMLButtonElement>document.getElementById('btnReset');
        this.ranK = <HTMLInputElement>document.getElementById("ranK");
        this.ranM = <HTMLInputElement>document.getElementById("ranM");
        this.spK = <HTMLSpanElement>document.getElementById("spK");
        this.spM = <HTMLSpanElement>document.getElementById("spM");
        this.spTime = <HTMLSpanElement>document.getElementById("spTime");

        this.k = Number(this.ranK.value);
        this.m = Number(this.ranM.value);

        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.render = new Render(this.canvas.getContext("2d"));

        this.isPause = true;
    }

    start() {
        this.btnStart.onclick = () => {
            this.isPause = !this.isPause;
            this.ranK.disabled = this.ranM.disabled = true;
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

        this.ranK.oninput = () => {
            this.spK.innerHTML = this.ranK.value + "N/m";
            this.k = Number(this.ranK.value);
        }
        this.ranM.oninput = () => {
            this.spM.innerHTML = this.ranM.value + "kg";
            this.m = Number(this.ranM.value);
        }
        this.resetBody();

        this.world = new World();
        this.circleBody = new Body();
        this.world.addBody(this.circleBody);

        this.Update();
    };

    private previousTime: number;         // 上一帧的开始时刻
    private elapsedTime: number;          // 每帧流逝的时间（毫秒）
    private totalTime: number = 0;        // 用于计算变加速运动的时间

    Update() {
        requestAnimationFrame(() => this.Update());

        const time: number = performance.now();
        this.elapsedTime = this.previousTime ? (time - this.previousTime) / 1000 : 0;
        //this.elapsedTime = Math.min(1 / 10, this.elapsedTime);
        this.previousTime = time;

        if (this.elapsedTime > 0) {

            if (this.isPause)
                return;

            this.spTime.innerHTML = (this.totalTime).toFixed(2).toString() + "s";

            this.circleBody.acceleration = -(this.k / this.m) * (this.circleBody.x - 400);

            this.world.step(this.elapsedTime);

            //console.log(this.circleBody.x);
        };
        this.render.draw(this.world);
    };

    resetBody(): void {
        this.circleBody.x = 400;
        this.circleBody.velocity = 200;
        this.ranK.disabled = this.ranM.disabled = false;
        this.btnStart.innerHTML = "开始";
        this.btnStart.disabled = false;
        this.isPause = true;
        this.totalTime = 0;
        this.render.draw(this.world);
    }
}

window.onload = () => {
    var main: test = new test();
    main.start();
}