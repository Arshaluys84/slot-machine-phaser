import Key from "../Key/keyScene";
export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super(Key.preload);
  }

  preload() {
    this.load.path = "../../assets/";

    this.load.image("background", "images/bg/Background.png");
    this.load.image("win", "images/others/Win.png");
    this.load.image("arrow", "images/others/Arrow.png");
    this.load.image("cheatToolInput", "images/others/CheatToolInput.png");
    this.load.image(
      "cheatToolBackground",
      "images/others/CheatToolBackground.png"
    );
    this.load.image("bgButtons", "images/buttons/spin.png");
    this.load.atlas(
      "symbols",
      "images/symbols/symbols.png",
      "images/symbols/symbols.json"
    );
    this.load.atlas(
      "symbols_blur",
      "images/symbols/symbols_blur.png",
      "images/symbols/symbols_blur.json"
    );
  }

  create() {
    this.scene.start(Key.boot);
  }
}
