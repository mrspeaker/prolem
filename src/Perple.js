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
    case 'identifier':
      // Move this to before init.
      console.log('identify:', ins.value);
      break;
    case 'call':
      switch (ins.name) {
      case 'goto':
        // turn goto into repeats.
        break;
      case 'move':
        const [x, y] = ins.args;
        console.log('moveing', ins, x.value, y.value);
        this.pos.x += x.value;
        this.pos.y += y.value;
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
    }
  }
}

export default Perple;
