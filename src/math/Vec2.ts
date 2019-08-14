/// 2D向量
export interface XY {
    x: number;
    y: number;
}

export const epsilon: number = 1E-5; // FLT_EPSILON instead of Number.MIN_VALUE;

export class Vec2 implements XY {
    public static readonly ZERO: Readonly<Vec2> = new Vec2(0, 0);
    public static readonly UNITX: Readonly<Vec2> = new Vec2(1, 0);
    public static readonly UNITY: Readonly<Vec2> = new Vec2(0, 1);

    public static readonly s_t0: Vec2 = new Vec2();
    public static readonly s_t1: Vec2 = new Vec2();
    public static readonly s_t2: Vec2 = new Vec2();
    public static readonly s_t3: Vec2 = new Vec2();

    public readonly data: Float32Array;
    public get x(): number { return this.data[0]; } public set x(value: number) { this.data[0] = value; }
    public get y(): number { return this.data[1]; } public set y(value: number) { this.data[1] = value; }

    constructor();
    constructor(data: Float32Array);
    constructor(x: number, y: number);
    constructor(...args: any[]) {
        if (args[0] instanceof Float32Array) {
            if (args[0].length !== 2) { throw new Error(); }
            this.data = args[0];
        } else {
            const x: number = typeof args[0] === "number" ? args[0] : 0;
            const y: number = typeof args[1] === "number" ? args[1] : 0;
            this.data = new Float32Array([x, y]);
        }
    }

    public Clone(): Vec2 {
        return new Vec2(this.x, this.y);
    }

    public SetZero(): this {
        this.x = 0;
        this.y = 0;
        return this;
    }

    public Set(x: number, y: number): this {
        this.x = x;
        this.y = y;
        return this;
    }

    public Copy(other: XY): this {
        this.x = other.x;
        this.y = other.y;
        return this;
    }

    public SelfAdd(v: XY): this {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    public SelfAddXY(x: number, y: number): this {
        this.x += x;
        this.y += y;
        return this;
    }

    public SelfSub(v: XY): this {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    public SelfSubXY(x: number, y: number): this {
        this.x -= x;
        this.y -= y;
        return this;
    }

    public SelfMul(s: number): this {
        this.x *= s;
        this.y *= s;
        return this;
    }

    public SelfMulAdd(s: number, v: XY): this {
        this.x += s * v.x;
        this.y += s * v.y;
        return this;
    }

    public SelfMulSub(s: number, v: XY): this {
        this.x -= s * v.x;
        this.y -= s * v.y;
        return this;
    }

    public Dot(v: XY): number {
        return this.x * v.x + this.y * v.y;
    }

    public Cross(v: XY): number {
        return this.x * v.y - this.y * v.x;
    }

    public Length(): number {
        const x: number = this.x, y: number = this.y;
        return Math.sqrt(x * x + y * y);
    }

    public LengthSquared(): number {
        const x: number = this.x, y: number = this.y;
        return (x * x + y * y);
    }

    public Normalize(): number {
        const length: number = this.Length();
        if (length >= epsilon) {
            const inv_length: number = 1 / length;
            this.x *= inv_length;
            this.y *= inv_length;
        }
        return length;
    }

    public SelfNormalize(): this {
        const length: number = this.Length();
        if (length >= epsilon) {
            const inv_length: number = 1 / length;
            this.x *= inv_length;
            this.y *= inv_length;
        }
        return this;
    }

    public SelfRotate(radians: number): this {
        const c: number = Math.cos(radians);
        const s: number = Math.sin(radians);
        const x: number = this.x;
        this.x = c * x - s * this.y;
        this.y = s * x + c * this.y;
        return this;
    }

    public SelfRotateCosSin(c: number, s: number): this {
        const x: number = this.x;
        this.x = c * x - s * this.y;
        this.y = s * x + c * this.y;
        return this;
    }

    public IsValid(): boolean {
        return isFinite(this.x) && isFinite(this.y);
    }

    public SelfCrossVS(s: number): this {
        const x: number = this.x;
        this.x = s * this.y;
        this.y = -s * x;
        return this;
    }

    public SelfCrossSV(s: number): this {
        const x: number = this.x;
        this.x = -s * this.y;
        this.y = s * x;
        return this;
    }

    /*public SelfMinV(v: XY): this {
        this.x = b2Min(this.x, v.x);
        this.y = b2Min(this.y, v.y);
        return this;
    }

    public SelfMaxV(v: XY): this {
        this.x = b2Max(this.x, v.x);
        this.y = b2Max(this.y, v.y);
        return this;
    }

    public SelfAbs(): this {
        this.x = b2Abs(this.x);
        this.y = b2Abs(this.y);
        return this;
    }*/

    public SelfNeg(): this {
        this.x = (-this.x);
        this.y = (-this.y);
        return this;
    }

    public SelfSkew(): this {
        const x: number = this.x;
        this.x = -this.y;
        this.y = x;
        return this;
    }

    /*public static MakeArray(length: number): Vec2[] {
        return b2MakeArray(length, (i: number): Vec2 => new Vec2());
    }

    public static AbsV<T extends XY>(v: XY, out: T): T {
        out.x = b2Abs(v.x);
        out.y = b2Abs(v.y);
        return out;
    }

    public static MinV<T extends XY>(a: XY, b: XY, out: T): T {
        out.x = b2Min(a.x, b.x);
        out.y = b2Min(a.y, b.y);
        return out;
    }

    public static MaxV<T extends XY>(a: XY, b: XY, out: T): T {
        out.x = b2Max(a.x, b.x);
        out.y = b2Max(a.y, b.y);
        return out;
    }

    public static ClampV<T extends XY>(v: XY, lo: XY, hi: XY, out: T): T {
        out.x = b2Clamp(v.x, lo.x, hi.x);
        out.y = b2Clamp(v.y, lo.y, hi.y);
        return out;
    }*/

    public static RotateV<T extends XY>(v: XY, radians: number, out: T): T {
        const v_x: number = v.x, v_y: number = v.y;
        const c: number = Math.cos(radians);
        const s: number = Math.sin(radians);
        out.x = c * v_x - s * v_y;
        out.y = s * v_x + c * v_y;
        return out;
    }

    public static DotVV(a: XY, b: XY): number {
        return a.x * b.x + a.y * b.y;
    }

    public static CrossVV(a: XY, b: XY): number {
        return a.x * b.y - a.y * b.x;
    }

    public static CrossVS<T extends XY>(v: XY, s: number, out: T): T {
        const v_x: number = v.x;
        out.x = s * v.y;
        out.y = -s * v_x;
        return out;
    }

    public static CrossVOne<T extends XY>(v: XY, out: T): T {
        const v_x: number = v.x;
        out.x = v.y;
        out.y = -v_x;
        return out;
    }

    public static CrossSV<T extends XY>(s: number, v: XY, out: T): T {
        const v_x: number = v.x;
        out.x = -s * v.y;
        out.y = s * v_x;
        return out;
    }

    public static CrossOneV<T extends XY>(v: XY, out: T): T {
        const v_x: number = v.x;
        out.x = -v.y;
        out.y = v_x;
        return out;
    }

    public static AddVV<T extends XY>(a: XY, b: XY, out: T): T { out.x = a.x + b.x; out.y = a.y + b.y; return out; }

    public static SubVV<T extends XY>(a: XY, b: XY, out: T): T { out.x = a.x - b.x; out.y = a.y - b.y; return out; }

    public static MulSV<T extends XY>(s: number, v: XY, out: T): T { out.x = v.x * s; out.y = v.y * s; return out; }
    public static MulVS<T extends XY>(v: XY, s: number, out: T): T { out.x = v.x * s; out.y = v.y * s; return out; }

    public static AddVMulSV<T extends XY>(a: XY, s: number, b: XY, out: T): T { out.x = a.x + (s * b.x); out.y = a.y + (s * b.y); return out; }
    public static SubVMulSV<T extends XY>(a: XY, s: number, b: XY, out: T): T { out.x = a.x - (s * b.x); out.y = a.y - (s * b.y); return out; }

    public static AddVCrossSV<T extends XY>(a: XY, s: number, v: XY, out: T): T {
        const v_x: number = v.x;
        out.x = a.x - (s * v.y);
        out.y = a.y + (s * v_x);
        return out;
    }

    public static MidVV<T extends XY>(a: XY, b: XY, out: T): T { out.x = (a.x + b.x) * 0.5; out.y = (a.y + b.y) * 0.5; return out; }

    public static ExtVV<T extends XY>(a: XY, b: XY, out: T): T { out.x = (b.x - a.x) * 0.5; out.y = (b.y - a.y) * 0.5; return out; }

    public static IsEqualToV(a: XY, b: XY): boolean {
        return a.x === b.x && a.y === b.y;
    }

    public static DistanceVV(a: XY, b: XY): number {
        const c_x: number = a.x - b.x;
        const c_y: number = a.y - b.y;
        return Math.sqrt(c_x * c_x + c_y * c_y);
    }

    public static DistanceSquaredVV(a: XY, b: XY): number {
        const c_x: number = a.x - b.x;
        const c_y: number = a.y - b.y;
        return (c_x * c_x + c_y * c_y);
    }

    public static NegV<T extends XY>(v: XY, out: T): T { out.x = -v.x; out.y = -v.y; return out; }

}