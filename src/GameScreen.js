import Perple from './Perple';

import lexer from './lang/lexer';
import parser from './lang/parser';

import CanvasRenderer from './lib/CanvasRenderer';
import { Container } from './lib/Core';

const scene = new Container();
const renderer = new CanvasRenderer(400, 200);
document.querySelector('#gameArea').appendChild(renderer.view);

// game.addProgram("red move(10, 10) build(2, 2)")

class GameScreen {
  constructor () {
    this.entities = [];
    this.selection = [];

    const p1 = new Perple(20, 20);
    scene.add(p1);
    scene.add(new Perple(10, 10));

    this.selection.push(p1);
  }

  addProgram (code) {
    const tokens = lexer(code);
    const ast = parser(tokens);

    // TODO: get first instruction, if ID, select...
    // else use current selection.
    this.selection.forEach(s => {
      s.initProgram({
        running: true,
        instruction: null,
        state: {},
        ast
      });
    });

  }

  update (dt) {
    scene.update(dt);
  }

  render () {
    renderer.render(scene);
  }
}

export default GameScreen;
