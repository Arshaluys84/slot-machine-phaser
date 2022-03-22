import Key from "../../Key/keyScene";
import Options from "../../Constants/options";
import Spin from "../Spin/Spin";
export default class Tween {
  constructor(scene, keyTween = Key.tween) {
    this.scene = scene;
    this.addTween();
  }
  addTween() {
    this.columnTween1 = this.scene.tweens.add(
      {
        targets: this.scene.container,
        props: {
          y: { value: "+=" + Options.symbolHeight, duration: Options.duration },
        },
        repeat: Options.repeat[0],
        onRepeat: this.onRepeat,
        onComplete: this.onComplete,
      },
      this
    );
    this.columnTween2 = this.scene.tweens.add(
      {
        targets: this.scene.container2,
        props: {
          y: { value: "+=" + Options.symbolHeight, duration: Options.duration },
        },
        repeat: Options.repeat[1],
        onRepeat: this.onRepeat,
        onComplete: this.onComplete,
      },
      this
    );
    this.columnTween3 = this.scene.tweens.add(
      {
        targets: this.scene.container3,
        props: {
          y: { value: "+=" + Options.symbolHeight, duration: Options.duration },
        },
        repeat: Options.repeat[2],
        onRepeat: this.onRepeat,
        onComplete: function () {
          this.targets[0].scene.tweens.add({
            targets: this.targets[0],
            props: {
              y: {
                value: "-=" + Options.symbolHeight,
                duration: Options.duration * 2,
              },
            },
            repeat: 1,
            onRepeat: function () {
              const randomNumber = Phaser.Math.RND.between(0, 9);
              this.updateTo(
                "y",
                this.targets[0].y - Options.symbolHeight * 2,
                true
              );
              this.targets[0].last.y =
                this.targets[0].first.y + Options.symbolHeight;
              const symbol = this.targets[0].last;
              symbol
                .setVisible(true)
                .setTexture("symbols", "symbols_" + randomNumber + ".png");
              this.targets[0].moveTo(symbol, 0);
            },
            onComplete: function () {
              this.targets[0].last.y =
                this.targets[0].first.y + Options.symbolHeight;
              const symbol = this.targets[0].last;
              this.targets[0].moveTo(symbol, 0);
              for (let i = 0; i < 3; i++) {
                const symbolsName = this.targets[0].list[i].frame.name;
                this.targets[0].list[i].setTexture("symbols", symbolsName);
              }
              const spin = new Spin(this.targets[0].scene, Key.spin);
              Options.checkClick = false;
            },
          });
        },
      },
      this
    );
  }
  onRepeat() {
    const randomNumber = Phaser.Math.RND.between(0, 9);
    this.updateTo("y", this.targets[0].y + Options.symbolHeight, true);
    this.targets[0].first.y = this.targets[0].last.y - Options.symbolHeight;
    const symbol = this.targets[0].first;
    symbol
      .setVisible(true)
      .setTexture("symbols_blur", "symbols_" + randomNumber + ".png");
    this.targets[0].moveTo(symbol, 4);
  }

  onComplete() {
    this.targets[0].scene.tweens.add({
      targets: this.targets[0],
      props: {
        y: {
          value: "-=" + Options.symbolHeight,
          duration: Options.duration * 2,
        },
      },
      repeat: 1,
      onRepeat: function () {
        const randomNumber = Phaser.Math.RND.between(0, 9);
        this.updateTo("y", this.targets[0].y - Options.symbolHeight * 2, true);
        this.targets[0].last.y = this.targets[0].first.y + Options.symbolHeight;
        const symbol = this.targets[0].last;
        symbol
          .setVisible(true)
          .setTexture("symbols", "symbols_" + randomNumber + ".png");
        this.targets[0].moveTo(symbol, 0);
      },
      onComplete: function () {
        this.targets[0].last.y = this.targets[0].first.y + Options.symbolHeight;
        const symbol = this.targets[0].last;
        this.targets[0].moveTo(symbol, 0);
        for (let i = 0; i < 5; i++) {
          const symbolsName = this.targets[0].list[i].frame.name;
          this.targets[0].list[i].setTexture("symbols", symbolsName);
        }
      },
    });
  }
}
