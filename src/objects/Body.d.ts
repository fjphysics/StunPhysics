declare namespace Stunphysics {
    class Body {
        x: number;
        velocity: number;
        acceleration: number;
        Integrate(dt: number): void;
    }
}
