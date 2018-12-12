export class DebugDraw {
    ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    DrawCircle(x: number, y: number, radius: number) {
        const ctx: CanvasRenderingContext2D = this.ctx;
        if (ctx) {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2, false);
            ctx.strokeStyle = "rgb(255,0,0)";
            ctx.stroke();
        }
    }

    DrawSolidCircle(x: number, y: number, radius: number) {
        const ctx: CanvasRenderingContext2D = this.ctx;
        if (ctx) {
            const cx: number = x;
            const cy: number = y;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            ctx.moveTo(cx, cy);
            ctx.lineTo((cx + radius), cy);
            ctx.fillStyle = "rgba(255,0,0,0.5)";
            ctx.fill();
            ctx.strokeStyle = "rgb(255,0,0)";
            ctx.stroke();
        }
    };
}