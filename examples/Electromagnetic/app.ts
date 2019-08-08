import { World } from "../../src/World";
import { Body } from "../../src/objects/Body";

export class test {
    world: World;
    circleBody: Body;
    isStart: boolean = false;

    canvas: HTMLCanvasElement;
    btnStart: HTMLButtonElement;
    spV: HTMLSpanElement;
    spTime: HTMLSpanElement;

    public constructor() {

        this.btnStart = <HTMLButtonElement>document.getElementById('btnStart');
        this.spV = <HTMLSpanElement>document.getElementById("spV");
        this.spTime = <HTMLSpanElement>document.getElementById("spTime");
    }

    start() {
        this.btnStart.onclick = () => {
            this.isStart = true;
            this.btnStart.disabled = true;
        }

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
        this.previousTime = time;

        if (this.circleBody.x >= 1.15) {
            this.isStart = false;
            this.btnStart.disabled = false;
            this.circleBody.x = 0;
            this.circleBody.velocity = 0;
            this.totalTime = 0;
            return;
        }

        if (this.elapsedTime > 0 && this.isStart) {

            this.totalTime += this.elapsedTime;
            this.spTime.innerHTML = this.totalTime.toString() + "s";
            this.spV.innerHTML = this.circleBody.velocity.toString() + "m/s";
            
            this.circleBody.acceleration = 5 - 0.9 * this.circleBody.velocity;

            this.world.step(this.elapsedTime);
            console.log(this.circleBody.x);
        };
    };
}

window.onload = () => {
    var main: test = new test();
    main.start();
}