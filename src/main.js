import GameScreen from './GameScreen';

const game = new GameScreen();

console.log("ya");
function loop () {
  game.update(16);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

export default game;



