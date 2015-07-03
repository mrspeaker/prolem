import Perple from './Perple';

import lexer from './lang/lexer';
import parser from './lang/parser';

// game.addProgram("red goto(10, 10) build(2, 2)")

class GameScreen {
  constructor () {
    this.p1 = new Perple();

    this.programs = [];
  }

  addProgram (code) {
    const tokens = lexer(code);
    const ast = parser(tokens);
    this.programs.push({
      running: true,
      selection: [],
      instruction: null,
      state: {},
      ast
    });
  }

  runProgram (program) {

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
      program.selection = this[ins.value] ? [this[ins.value]] : [];
      //program.selection.push(ins.value === 'red' ? this.p1 : null);
      program.instruction = null;
      break;
    case 'call':
      if (first) {
        console.log('call', ins.name, 'on', program.selection );
        program.state.tick = 0;
      } else {
        program.state.tick++;
        console.log('tick', ins.args[0].value);
        if (ins.args[0].value-- <= 0) {
          program.instruction = null;
          program.state.tick = 0;
        }
      }
    }
  }

  update (dt) {
    this.programs.map(p => this.runProgram(p));

    this.p1.update(dt);
  }

  render () {
    //console.log(this.p1.pos);
  }
}

export default GameScreen;