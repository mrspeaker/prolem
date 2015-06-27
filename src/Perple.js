
const STATES = {
  idle: 0,
  wander: 1
};

class Perple {
  constructor (x = 0, y = 0) {
    this.pos = [x, y];
    this.tags = [];
    this.state = STATES.wander;
  }

  update (dt) {
    switch (this.state) {
    case STATES.idle:
      break;
    }
    case STATES.wander:
      this.pos.x += Math.round(Math.random() * 2 - 1);
      this.pos.y += Math.round(Math.random() * 2 - 1);
      break;
    }
  }
}

export default Perple;