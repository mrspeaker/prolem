import GameScreen from './GameScreen';

import lexer from './lang/lexer';
import parser from './lang/parser';
import evaluator from './lang/evaluator';

const input = 'red goto(10, 10, 10) build(2, 2)';

const tokens = lexer(input);
const ast = parser(tokens);
//const output = evaluator(ast);

console.log(JSON.stringify(ast, null, 2));

/*const game = new GameScreen();

function loop () {
  game.update(16);
  game.render();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
*/
export default {};



