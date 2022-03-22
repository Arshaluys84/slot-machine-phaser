import Config from "../Config/config";
import Key from "../Key/keyScene";
import Options from "../Constants/options";
import Sprite from "../Class/Sprite";
import Container from "../Class/Container";
import BaseSpin from "../Class/Spin/BaseSpin";
import AutoSpin from "../Class/Spin/AutoSpin";
export default class GameScene extends Phaser.Scene {
  constructor() {
    super(Key.game);
  }

  create() {
    Options.hsv = Phaser.Display.Color.HSVColorWheel();
    this.bg = new Sprite(
      this,
      Config.width / 2,
      Config.height / 2,
      "background"
    );
    this.bg.setScale(0.7);
    this.win = new Sprite(this, Config.width / 2, Config.height / 2, "win")
      .setScale(2.2)
      .setVisible(false);
    this.win.depth = 5;

    this.container = new Container(
      this,
      Config.width - 925,
      Config.height - 90
    );
    this.container2 = new Container(
      this,
      Config.width - 650,
      Config.height - 90
    );
    this.container3 = new Container(
      this,
      Config.width - 385,
      Config.height - 90
    );
    const machine = new Sprite(
      this,
      Config.width / 2,
      Config.height / 2,
      "background"
    );
    machine.setScale(0.7);
    this.cheatToolBackground = new Sprite(
      this,
      200,
      10,
      "cheatToolBackground"
    ).setVisible(false);
    this.cheatToolInput = new Sprite(this, 90, 35, "cheatToolInput").setScale(
      1.9,
      1.1
    );
    this.toolsText = this.add.text(20, 5, "Tools").setScale(2);
    this.arrow = new Sprite(this, 150, 20, "arrow").setInteractive();
    this.isCheatToolInputOpen = false;
    const _this = this;

    this.arrow.on("pointerdown", () => {
      if (!this.isCheatToolInputOpen) {
        _this.isCheatToolInputOpen = true;
        _this.cheatToolBackground.setVisible(true);
        _this.toolsText.setPosition(20, 95);
        _this.cheatToolInput.setVisible(false);
        _this.arrow.setRotation(+-Math.PI);
        _this.arrow.y = 100;
      } else {
        _this.isCheatToolInputOpen = false;
        _this.cheatToolBackground.setVisible(false);
        _this.toolsText.setPosition(20, 5);
        _this.cheatToolInput.setVisible(true);
        _this.arrow.setRotation(0);
        _this.arrow.y = 20;
      }
    });

    this.autoSpin = new AutoSpin(this);
    this.baseSpin = new BaseSpin(this);
  }
  update() {}
}
