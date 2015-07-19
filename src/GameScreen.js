import Perple from './Perple';

import lexer from './lang/lexer';
import parser from './lang/parser';

import CanvasRenderer from './lib/CanvasRenderer';
import { Container } from './lib/Core';

const scene = new Container();
const renderer = new CanvasRenderer(400, 200);
document.querySelector('#gameArea').appendChild(renderer.view);

// game.addProgram("red move(10, 10) build(2, 2) take(1) thing()")

class GameScreen {
  constructor () {
    this.entities = [];
    this.selection = [];

    const p1 = new Perple(20, 20);
    p1.tag = 'perp';
    scene.add(p1);
    const p2 = new Perple(10, 10);
    p2.tag = 'perp';
    scene.add(p2);

    this.entities.push(p1, p2);
    this.selection.push(p1);
  }

  addProgram (code) {
    const tokens = lexer(code);
    const ast = parser(tokens);

    const first = ast[0];
    if (first.type === 'identifier') {
      // New selection
      this.selection = this.entities.filter(e => {
        return e.tag.match(first.value);
      });
      ast.shift();
    }

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
