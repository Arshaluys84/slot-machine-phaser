import Key from "../Key/keyScene";
export default class BootScene extends Phaser.Scene {
  constructor() {
    super(Key.boot);
  }

  create() {
    setTimeout(() => {
      this.scene.start(Key.game);
    }, 500);
  }
  
}
