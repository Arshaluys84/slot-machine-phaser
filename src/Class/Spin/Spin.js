import Options from "../../Constants/options";
export default class Spin {
  constructor(scene) {
    this.scene = scene;
    this.printResult();
    this.clearColor();
  }

  clearColor() {
    this.scene.baseSpin.bgSpin.clearTint();
    this.scene.autoSpin.buttonAuto.clearTint();
  }

  printResult() {
    let s1,
      s2,
      s3,
      autoSpin = this.scene.autoSpin.tweens,
      baseSpin = this.scene.baseSpin.tweens;
    if (autoSpin) {
      s1 = autoSpin.columnTween1.targets[0];
      s2 = autoSpin.columnTween2.targets[0];
      s3 = autoSpin.columnTween3.targets[0];
    } else {
      s1 = baseSpin.columnTween1.targets[0];
      s2 = baseSpin.columnTween2.targets[0];
      s3 = baseSpin.columnTween3.targets[0];
    }
    Options.result.push(
      [s1.list[3].frame.name, s1.list[2].frame.name, s1.list[1].frame.name],
      [s2.list[3].frame.name, s2.list[2].frame.name, s2.list[1].frame.name],
      [s3.list[3].frame.name, s3.list[2].frame.name, s3.list[1].frame.name]
    );
    this.getWinningLines();
  }
  getWinningLines() {
    for (let lineIndx = 0; lineIndx < Options.line; lineIndx++) {
      let streak = 0;
      let currentkind = null;
      for (
        let coordIndx = 0;
        coordIndx < Options.payLines[lineIndx].length;
        coordIndx++
      ) {
        let coords = Options.payLines[lineIndx][coordIndx];
        let symbolAtCoords = Options.result[coords[0]][coords[1]];
        if (coordIndx === 0) {
          currentkind = symbolAtCoords;
          streak = 1;
        } else {
          if (symbolAtCoords != currentkind) {
            break;
          }
          streak++;
        }
      }
      if (streak >= 3) {
        this.scene.win.setVisible(true);
        this.scene.win.setInteractive();
        this.scene.win.on("pointerdown", () => {
          this.scene.win.setVisible(false);
        });
      }
    }
    this.resetOptions();
  }
  resetOptions() {
    Options.win = 0;
    Options.moneyWin = 0;
    Options.result = [];
    Options.winningLines = [];
  }
}
