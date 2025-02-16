class Point {
  x; // x coord
  y; // y coord

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * @param {number} steps
   */
  moveXTo(coord) {
    this.x = coord;
  }

  /**
   * @param {number} steps
   */
  moveYTo(coord) {
    this.y = coord;
  }

  get x() {
    return this.x;
  }

  get y() {
    return this.y;
  }

  toString() {
    return `${this.x}:${this.y}`;
  }
}

class Grid2D {
  h; // head
  t; // tail
  history;

  constructor() {
    this.h = new Point();
    this.t = new Point();
    this.history = [];
  }

  /**
   * @param {string} input
   * @returns
   */
  build(input) {
    const steps = input.split("\n");
    steps.forEach((step) => {
      const [direction, steps] = step.split(/\s+/);
      let stepNum = parseInt(steps);

      // head movement
      for (let i = 0; i < stepNum; i++) {
        switch (direction) {
          case "U": {
            this.h.moveYTo(this.h.y + 1);
            break;
          }

          case "D": {
            this.h.moveYTo(this.h.y - 1);
            break;
          }

          case "R": {
            this.h.moveXTo(this.h.x + 1);
            break;
          }

          case "L": {
            this.h.moveXTo(this.h.x - 1);
            break;
          }
        }

        // tail movement
        switch (direction) {
          case "U": {
            if (Math.abs(this.h.y - this.t.y) > 1) {
              this.t.moveYTo(this.t.y + 1);
              this.t.moveXTo(this.h.x);
            }
            break;
          }

          case "D": {
            if (Math.abs(this.t.y - this.h.y) > 1) {
              this.t.moveYTo(this.t.y - 1);
              this.t.moveXTo(this.h.x);
            }
            break;
          }

          case "R": {
            if (Math.abs(this.h.x - this.t.x) > 1) {
              this.t.moveXTo(this.t.x + 1);
              this.t.moveYTo(this.h.y);
            }
            break;
          }

          case "L": {
            if (Math.abs(this.t.x - this.h.x) > 1) {
              this.t.moveXTo(this.t.x - 1);
              this.t.moveYTo(this.h.y);
            }
            break;
          }
        }
        this.history.push({ h: [this.h.x, this.h.y], t: [this.t.x, this.t.y] });
      }
    });

    return this;
  }

  get history() {
    return this.history;
  }
}

export { Point, Grid2D };
