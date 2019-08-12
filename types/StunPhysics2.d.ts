
declare namespace stun {
    class World {
        bodies: Array<Body>;
        constructor();
        addBody(body: Body): void;
        step(dt: number): void;
    }

    class Body {
        x: number;
        velocity: number;
        acceleration: number;
        Integrate(dt: number): void;
    }

    class Render {
        ctx: CanvasRenderingContext2D;
        constructor(ctx: CanvasRenderingContext2D);
        draw(world: World): void;
        private drawSolidCircle;
    }
}