import { Container, Rect } from './lib/Core';

const STATES = {
  idle: 0,
  wander: 1,
  running: 2,
};

class Perple extends Container {
  constructor (x = 0, y = 0) {
    super();
    this.children = [];
    this.pos = {x, y};

    this.add(new Rect('#777', 10, 10));
    this.tags = [];
    this.state = STATES.idle;
  }

  update (dt) {
    super.update(dt);

    switch (this.state) {

    case STATES.idle:
      this.state = STATES.wander;
      break;

    case STATES.wander:
      this.pos.x += Math.round(Math.random() * 2 - 1) * dt * 0.01;
      this.pos.y += Math.round(Math.random() * 2 - 1) * dt * 0.01;
      break;

    case STATES.running:
      this.run();
      break;

    }
  }

  initProgram (program) {
    this.program = program;
    this.state = STATES.running;
  }

  run () {

    const program = this.program;

    if (!program.running) {
      return;
    }

    if (program.ast.length === 0) {
      // program terminated.
      console.log('program terminated');
      program.running = false;
      this.state = STATES.wander;
      return;
    }
    program.instruction = program.ast[0];
    program.ast = program.ast.slice(1);

    const ins = program.instruction;

    switch (ins.type) {
    case 'call':
      switch (ins.name) {
      case 'goto':
        // turn goto into repeats.
        // "while not at a point, move towards a point"
        break;
      case 'move':
        const dest = ins.args[0];
        if (dest.type === 'call') {
          if (dest.name === 'towards') {
            const [x, y] = ins.args[0].args;
            const xdiff = this.pos.x < x.value ? 1 : -1;
            const ydiff = this.pos.y < y.value ? 1 : -1;
            this.pos.x += xdiff;
            this.pos.y += ydiff;
          } else {
            console.log('err, no', dest.name);
          }
        } else {
          console.log('moveing by val');
          const [x, y] = ins.args;
          this.pos.x += x.value;
          this.pos.y += y.value;
        }
        break;
      case 'build':
        console.log('buld');
        break;
      case 'repeat':
        const reps = [...new Array(ins.args[0].value)].map(() => ins.args[1]);
        program.ast = [...reps, ...program.ast];
        break;
      default:
        console.log('unknown command:', ins.name);
      }
      break;
    default:
      console.log('unknown top level command:', ins);
    }
  }
}

export default Perple;
