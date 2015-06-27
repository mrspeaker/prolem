import Perple from './Perple';

class GameScreen {
  constructor () {
    this.p1 = new Perple();
  }

  update (dt) {
    this.p1.update(dt);
  }

  render () {
    console.log(this.p1.pos);
  }
}

export default GameScreen;