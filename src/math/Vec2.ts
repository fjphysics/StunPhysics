/// 2D向量
export class Vec2 {
    
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    Clone(): Vec2 {
        return new Vec2(this.x, this.y);
    }

    SetZero(): Vec2 {
        this.x = 0;
        this.y = 0;
        return this;
    }

    Set(x: number, y: number): Vec2 {
        this.x = x;
        this.y = y;
        return this;
    }

    Copy(other: Vec2): Vec2 {
        this.x = other.x;
        this.y = other.y;
        return this;
    }

    SelfAdd(v: Vec2): Vec2 {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    AddV(v: Vec2): Vec2 {        
        return new Vec2(this.x + v.x,this.y + v.y);
    }

    SelfSub(v: Vec2): Vec2 {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    SubV(v: Vec2): Vec2 {
        return new Vec2(this.x - v.x,this.y - v.y);        
    }

    SelfMulS(s: number): Vec2 {
        this.x *= s;
        this.y *= s;
        return this;
    }

    MulS(s: number): Vec2 {
        return new Vec2(this.x * s, this.y * s);
    }

    Dot(v: Vec2): number {
        return this.x * v.x + this.y * v.y;
    }

    CrossV(v: Vec2): number {
        return this.x * v.y - this.y * v.x;
    }

    Length(): number {
        const x: number = this.x, y: number = this.y;
        return Math.sqrt(x * x + y * y);
    }

    LengthSquared(): number {
        const x: number = this.x, y: number = this.y;
        return (x * x + y * y);
    }

    public Normalize(): Vec2 {
        //const length: number = this.Length();
                //if (length >= 0.001/*Setting.EPSILON*/) {
         const inv_length: number = 1 / this.Length();
         return new Vec2(this.x*inv_length,this.y*inv_length);
    }

    public SelfNormalize(): Vec2 {
        const length: number = this.Length();
        if (length >= 0.001/*Setting.EPSILON*/) {
            const inv_length: number = 1 / length;
            this.x *= inv_length;
            this.y *= inv_length;
        }
        return this;
    }

    public SelfRotate(radians: number): Vec2 {
        const c: number = Math.cos(radians);
        const s: number = Math.sin(radians);
        const x: number = this.x;
        this.x = c * x - s * this.y;
        this.y = s * x + c * this.y;
        return this;
    }

    Rotate(radians: number): Vec2 {
        const v_x: number = this.x, v_y: number = this.y;
        const c: number = Math.cos(radians);
        const s: number = Math.sin(radians);
        return new Vec2(c * v_x - s * v_y,s * v_x + c * v_y);
    }

    SelfCrossVS(s: number): Vec2 {
        const x: number = this.x;
        this.x = s * this.y;
        this.y = -s * x;
        return this;
    }

    SelfCrossSV(s: number): Vec2 {
        const x: number = this.x;
        this.x = -s * this.y;
        this.y = s * x;
        return this;
    }

    SelfAbs(): Vec2 {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        return this;
    }

    SelfNeg(): Vec2 {
        this.x = (-this.x);
        this.y = (-this.y);
        return this;
    }
    
    Neg(): Vec2 {
        return new Vec2(-this.x,-this.y);
    }    
}