class Ball extends Phaser.GameObjects.Image {
  constructor(scene, x, y, color) {
    super(scene, x, y, `ball_${color}`);
    scene.add.existing(this);
    this.color = color;
    this.distanceOnPath = 0;
    this.isDestroyed = false;
    this.radius = 18;
  }
}