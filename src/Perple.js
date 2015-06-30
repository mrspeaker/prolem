
const STATES = {
  idle: 0,
  wander: 1
};

class Perple {
  constructor (x = 0, y = 0) {
    this.pos = [x, y];
    this.tags = [];
    this.state = STATES.idle;
  }

  update (dt) {
    switch (this.state) {
    case STATES.idle:
      break;
    case STATES.wander:
      this.pos[0] += Math.round(Math.random() * 2 - 1) * dt * 0.01;
      this.pos[1] += Math.round(Math.random() * 2 - 1) * dt * 0.01;
      break;
    }
  }
}

export default Perple;