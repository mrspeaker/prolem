import GameScreen from './GameScreen';

const game = new GameScreen();

function loop () {
  game.update(16);
  game.render();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

export default game;



