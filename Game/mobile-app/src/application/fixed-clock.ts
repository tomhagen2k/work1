/** Application owns the only simulation scheduler; renderer has no running ticker. */
export class FixedClock {
  private previous: number | null = null;
  private accumulator = 0;
  reset(): void {
    this.previous = null;
    this.accumulator = 0;
  }
  frame(now: number, step: () => void): void {
    if (this.previous === null) {
      this.previous = now;
      return;
    }
    const delta = Math.max(0, Math.min((now - this.previous) / 1000, 0.25));
    this.previous = now;
    this.accumulator += delta;
    while (this.accumulator + 1e-9 >= 1 / 60) {
      step();
      this.accumulator -= 1 / 60;
    }
  }
}
