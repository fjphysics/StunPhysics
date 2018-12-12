declare module "Setting" {
    export class Setting {
        static EPSILON: number;
        static BIAS_RELATIVE: number;
        static BIAS_ABSOLUTE: number;
        static DT: number;
        static PENETRATION_ALLOWANCE: number;
        static PENETRATION_CORRECTION: number;
        static EPSILON_SQ: number;
        static clamp(min: number, max: number, a: number): number;
        static random(min: any, max: any): any;
        static equal(a: any, b: any): void;
        static gt(a: any, b: any): void;
    }
}
declare module "Vec2" {
    export class Vec2 {
        static ZERO: Vec2;
        static UNITX: Vec2;
        static UNITY: Vec2;
        x: number;
        y: number;
        constructor(x?: number, y?: number);
        Clone(): Vec2;
        SetZero(): Vec2;
        Set(x: number, y: number): Vec2;
        Copy(other: Vec2): Vec2;
        SelfAdd(v: Vec2): Vec2;
        SelfAddXY(x: number, y: number): Vec2;
        SelfSub(v: Vec2): Vec2;
        SelfSubXY(x: number, y: number): Vec2;
        SelfMul(s: number): Vec2;
        SelfMulAdd(s: number, v: Vec2): Vec2;
        SelfMulSub(s: number, v: Vec2): Vec2;
        Dot(v: Vec2): number;
        SelfCross(v: Vec2): number;
        Length(): number;
        LengthSquared(): number;
        Normalize(): number;
        SelfNormalize(): Vec2;
        SelfRotate(radians: number): Vec2;
        IsValid(): boolean;
        SelfCrossVS(s: number): Vec2;
        SelfCrossSV(s: number): Vec2;
        SelfMinV(v: Vec2): Vec2;
        SelfMaxV(v: Vec2): Vec2;
        SelfAbs(): Vec2;
        SelfNeg(): Vec2;
        SelfSkew(): Vec2;
        static CrossVV(a: Vec2, b: Vec2): number;
        static CrossVS(v: Vec2, s: number): Vec2;
        static CrossSV(s: number, v: Vec2): Vec2;
        static AddVV(a: Vec2, b: Vec2): Vec2;
        static SubVV(a: Vec2, b: Vec2): Vec2;
        static MulSV(s: number, v: Vec2): Vec2;
        static NegV(v: Vec2): Vec2;
    }
}
declare module "stunPhysics" {
    export * from "Vec2";
    export * from "Setting";
}
