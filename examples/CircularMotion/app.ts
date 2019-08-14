import { World } from "../../src/World";
import { Render } from "../../src/render/Render";
import { Body } from "../../src/objects/Body";
import { Vec2 } from "../../src/math/Vec2";

export class test {
    world: World;
    circleBody: Body
    render: Render;
    canvas: HTMLCanvasElement;

    isPause: boolean = true;

    btnStart: HTMLButtonElement;
    ranV: HTMLInputElement;
    spV: HTMLSpanElement;
    ranR: HTMLInputElement;
    spR: HTMLSpanElement;
    spTime: HTMLSpanElement;

    R: number = 200;
    v: number = 200;
    flag: boolean = false;

    public constructor() {

        this.btnStart = <HTMLButtonElement>document.getElementById('btnStart');
        this.ranV = <HTMLInputElement>document.getElementById("ranV");
        this.ranR = <HTMLInputElement>document.getElementById("ranR");
        this.spV = <HTMLSpanElement>document.getElementById("spV");
        this.spR = <HTMLSpanElement>document.getElementById("spR");
        this.spTime = <HTMLSpanElement>document.getElementById("spTime");

        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.render = new Render(this.canvas.getContext("2d"));

        this.btnStart.onclick = () => {
            this.isPause = false;
            this.btnStart.disabled = this.ranR.disabled = this.ranV.disabled = true;
        }
        this.ranV.oninput = () => {
            this.spV.innerHTML = this.ranV.value + "m/s";
            this.v = Number(this.ranV.value);
            this.circleBody.velocity = new Vec2(this.v, 0);

        }
        this.ranR.oninput = () => {
            this.spR.innerHTML = this.ranR.value + "m";
            this.R = Number(this.ranR.value);
        }

        this.world = new World();
        this.world.gravity = Vec2.ZERO;
        this.circleBody = new Body(this.world);
        this.circleBody.position = new Vec2(400, 100);
        this.circleBody.velocity = new Vec2(200, 0);
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

            var tempV:Vec2=new Vec2();
            //Vec2.RotateV(this.circleBody.velocity,Math.PI / 2,tempV);            

            this.circleBody.acceleration = Vec2.RotateV(this.circleBody.velocity,Math.PI / 2,tempV).SelfNormalize().SelfMul(this.v * this.v / this.R);

            this.world.step(this.elapsedTime);
        };
        this.render.draw(this.world);
    };

    reset(): void {
        this.circleBody.position = new Vec2(400, 100);
        this.circleBody.velocity = new Vec2(Number(this.ranV.value), 0);
        this.btnStart.disabled = this.ranR.disabled = this.ranV.disabled = false;
        this.isPause = true;
        this.totalTime = 0;
        this.render.draw(this.world);
        this.flag = false;
    }
}

window.onload = () => {
    var main: test = new test();
}