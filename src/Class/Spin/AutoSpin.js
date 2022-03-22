import Config from "../../Config/config";
import Options from "../../Constants/options";
import Sprite from "../Sprite";
import Tween from "../Tween/Tween";

export default class AutoSpin {
  constructor(scene) {
    this.scene = scene;
    this.autoSpin();
  }

  autoSpin() {
    this.buttonAuto = new Sprite(
      this.scene,
      Config.width - 110,
      Config.height - 50
    );
    this.buttonAuto.on("pointerup", () => this.buttonAuto.setScale(1));
  }
  playSpeedAuto() {
    if (Options.txtAutoSpin === "STOP") {
      Options.txtAutoSpin = "AUTO";
      this.txtAutoSpin.setText(Options.txtAutoSpin);
      if (this.txtSpeed && this.timer) {
        this.txtSpeed.destroy();
        this.timer.remove();
      }
    } else {
      Options.txtAutoSpin = "STOP";
      this.txtAutoSpin.setText(Options.txtAutoSpin);
      this.setXAuto();
      this.exit();
    }
  }
  speedPlay(speed) {
    let width;
    speed > 5 ? (width = Config.width - 150) : (width = Config.width - 130);
    this.timer = this.scene.time.addEvent({
      delay: 500,
      callback: function () {
        this.timer.delay = 4500;
        if (speed > 0 && this.scene.valueMoney >= Options.coin * Options.line) {
          this.scene.baseSpin.setColor();
          Options.checkClick = true;
          this.scene.baseSpin.destroyLineArr();
          this.scene.baseSpin.removeTextWin();
          this.tweens = new Tween(this.scene);
          speed--;
          this.txtSpeed.setText(speed);
        } else {
          Options.checkClick = false;
          this.timer.remove(false);
          this.txtSpeed.destroy();
          this.setTextAuto();
        }
      },
      callbackScope: this,
      loop: true,
    });
  }
  setTextAuto() {
    Options.txtAutoSpin = "AUTO";
    this.txtAutoSpin.setText(Options.txtAutoSpin);
  }

  setXAuto() {
    if (Options.txtAuto >= 100) this.txtAuto.x = 610;
    else if (Options.txtAuto >= 10) this.txtAuto.x = 620;
    else this.txtAuto.x = 635;
  }
  removeImgAuto() {
    this.bgAuto.destroy();
    this.btnPlus.destroy();
    this.btnMinus.destroy();
    this.auto.destroy();
    this.txtAuto.destroy();
    this.btnPlay.destroy();
    this.btnExit.destroy();
  }
}
