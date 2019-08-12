
    class World {
        bodies: Array<Body>;
        constructor();
        addBody(body: Body): void;
        step(dt: number): void;
    }
