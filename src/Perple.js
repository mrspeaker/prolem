
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

  initProgram (program) {

  }

  run () {

    const program = this.program;

    if (!program.running) {
      return;
    }

    var first = false;
    if (!program.instruction) {
      if (program.ast.length === 0) {
        // program terminated.
        program.running = false;
        return;
      }
      program.instruction = program.ast[0];
      program.ast = program.ast.slice(1);
      first = true;
    }

    var ins = program.instruction;

    switch (ins.type) {
    case 'identifier':
      console.log('identify:', ins.value);
      //program.selection = this[ins.value] ? [this[ins.value]] : [];
      //selection is now "this"
      //program.selection.push(ins.value === 'red' ? this.p1 : null);
      program.instruction = null;
      break;
    case 'call':
      if (first) {
        console.log('call', ins.name, 'on', program.selection );
        program.state.tick = 0;
      } else {
        switch (ins.name) {
        case 'goto':
          r.pos.x += 1;
          //r.pos.y = Math.random() * 200 | 0;
          break;
        case 'build':
          break;
        default:
          console.log('unknown command:', ins.name);
        }
        program.state.tick++;
        console.log('tick', ins.args[0].value);
        if (ins.args[0].value-- <= 0) {
          program.instruction = null;
          program.state.tick = 0;
        }
      }
    }
  }
}

export default Perple;
