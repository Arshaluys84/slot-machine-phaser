import Config from "../../Config/config";
import Options from "../../Constants/options";
import Sprite from "../Sprite";
import Tween from "../../Class/Tween/Tween";
export default class BaseSpin {
  constructor(scene) {
    this.scene = scene;
    this.addSpin();
  }

  addSpin() {
    this.bgSpin = new Sprite(
      this.scene,
      Config.width - 645,
      Config.height - 50,
      "bgButtons"
    ).setScale(0.6);
    this.bgSpin.on(
      "pointerdown",
      () => {
        this.playTweens();
        this.scene.win.setVisible(false);
      },
      this
    );
  }
  playTweens() {
    if (!Options.checkClick) {
      this.destroyLineArr();
      this.setColor();
      Options.checkClick = true;
      this.tweens = new Tween(this.scene);
    }
  }
  destroyLineArr() {
    if (Options.lineArray.length > 0) {
      for (let i = 0; i < Options.lineArray.length; i++) {
        Options.lineArray[i].destroy();
      }
      Options.lineArray = [];
    }
  }
  setColor() {
    this.bgSpin.setTint(0xa09d9d);
    this.scene.autoSpin.buttonAuto.setTint(0xa09d9d);
  }
}
