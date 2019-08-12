declare namespace Stunphysics {
    class Render {
        ctx: CanvasRenderingContext2D;
        constructor(ctx: CanvasRenderingContext2D);
        draw(world: World): void;
        private drawSolidCircle;
    }
}
