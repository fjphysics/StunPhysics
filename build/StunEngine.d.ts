
    export class Vec2 {
        x: number;
        y: number;
        constructor(x?: number, y?: number);
        Clone(): Vec2;
        SetZero(): Vec2;
        Set(x: number, y: number): Vec2;
        Copy(other: Vec2): Vec2;
        SelfAdd(v: Vec2): Vec2;
        AddV(v: Vec2): Vec2;
        SelfSub(v: Vec2): Vec2;
        SubV(v: Vec2): Vec2;
        SelfMulS(s: number): Vec2;
        MulS(s: number): Vec2;
        Dot(v: Vec2): number;
        CrossV(v: Vec2): number;
        Length(): number;
        LengthSquared(): number;
        Normalize(): Vec2;
        SelfNormalize(): Vec2;
        SelfRotate(radians: number): Vec2;
        Rotate(radians: number): Vec2;
        SelfCrossVS(s: number): Vec2;
        SelfCrossSV(s: number): Vec2;
        SelfAbs(): Vec2;
        SelfNeg(): Vec2;
        Neg(): Vec2;
    }
    

    export class Body {
        position: Vec2;
        velocity: Vec2;
        Acceleration: Vec2;
        world: World;
        /**
         * 刚体
         * @class Body
         * @constructor
         */
        constructor(world: World);
        Integrate(dt: number): void;
    }

    export class World {
        Gravity: Vec2;
        Bodies: Array<Body>;
        constructor();
        AddBody(body: Body): void;
        Step(dt: number): void;
    }