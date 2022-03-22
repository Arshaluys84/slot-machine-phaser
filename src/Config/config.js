import PreloadScene from "../Scene/PreloadScene";
import BootScene from "../Scene/BootScene";
import GameScene from "../Scene/GameScene";

export default {
  type: Phaser.Auto,
  width: 1280,
  height: 720,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },

  fps: {
    min: 30,
    target: 60,
  },
  scene: [PreloadScene, BootScene, GameScene],
};
