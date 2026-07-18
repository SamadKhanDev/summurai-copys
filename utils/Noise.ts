class Grad {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  dot2(x: number, y: number): number {
    return this.x * x + this.y * y;
  }

  dot3(x: number, y: number, z: number): number {
    return this.x * x + this.y * y + this.z * z;
  }
}

export default class Noise {
  private p: Uint8Array;
  private perm: Uint8Array;
  private permMod12: Uint8Array;

  private grad3: Grad[] = [
    new Grad(1, 1, 0), new Grad(-1, 1, 0), new Grad(1, -1, 0), new Grad(-1, -1, 0),
    new Grad(1, 0, 1), new Grad(-1, 0, 1), new Grad(1, 0, -1), new Grad(-1, 0, -1),
    new Grad(0, 1, 1), new Grad(0, -1, 1), new Grad(0, 1, -1), new Grad(0, -1, -1)
  ];

  constructor(seed: number = Math.random()) {
    this.p = new Uint8Array(256);
    this.perm = new Uint8Array(512);
    this.permMod12 = new Uint8Array(512);
    this.seed(seed);
  }

  public seed(seed: number) {
    if (seed > 0 && seed < 1) {
      seed *= 65536;
    }
    seed = Math.floor(seed);
    if (seed < 256) {
      seed |= seed << 8;
    }

    for (let i = 0; i < 256; i++) {
      let v;
      if (i & 1) {
        v = i ^ (seed & 255);
      } else {
        v = i ^ ((seed >> 8) & 255);
      }
      this.p[i] = v & 255;
    }

    for (let i = 0; i < 512; i++) {
      this.perm[i] = this.p[i & 255];
      this.permMod12[i] = this.perm[i] % 12;
    }
  }

  private fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  private lerp(a: number, b: number, t: number): number {
    return (1 - t) * a + t * b;
  }

  public perlin2(x: number, y: number): number {
    // Find unit grid cell containing point
    let X = Math.floor(x) & 255;
    let Y = Math.floor(y) & 255;

    // Get relative xy coordinates of point within that cell
    x -= Math.floor(x);
    y -= Math.floor(y);

    // Fade curves for x, y
    let u = this.fade(x);
    let v = this.fade(y);

    // Add blended results from 4 corners of cell
    let n00 = this.grad3[this.permMod12[X + this.perm[Y]]].dot2(x, y);
    let n01 = this.grad3[this.permMod12[X + this.perm[Y + 1]]].dot2(x, y - 1);
    let n10 = this.grad3[this.permMod12[X + 1 + this.perm[Y]]].dot2(x - 1, y);
    let n11 = this.grad3[this.permMod12[X + 1 + this.perm[Y + 1]]].dot2(x - 1, y - 1);

    return this.lerp(
      this.lerp(n00, n10, u),
      this.lerp(n01, n11, u),
      v
    );
  }
}
