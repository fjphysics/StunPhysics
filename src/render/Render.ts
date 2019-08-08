import { World } from "../World";
import { Body } from "../objects/Body";

export class Render {
    ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    draw(world: World) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.save();

        for (let i: number=0; i < world.bodies.length; i++) {
            const body: Body = world.bodies[i];
            this.drawSolidCircle(body.x, 40, 20);            
        }

        this.ctx.restore();
    }

    private drawSolidCircle(x: number, y: number, radius: number) {
        const ctx: CanvasRenderingContext2D = this.ctx;
        if (ctx) {
            const cx: number = x;
            const cy: number = y;
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2, true);
            ctx.moveTo(cx, cy);
            ctx.lineTo((cx + radius), cy);
            ctx.fillStyle = "rgba(255,0,0,0.5)";
            ctx.fill();
            ctx.strokeStyle = "rgb(255,0,0)";
            ctx.stroke();
        }
    };
}