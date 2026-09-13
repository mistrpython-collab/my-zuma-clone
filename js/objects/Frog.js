class Frog extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    scene.add.existing(this);
    
    this.currentBallColor = Phaser.Math.Between(0, 3);
    this.nextBallColor = Phaser.Math.Between(0, 3);
    
    // PERKECIL: dari 120 → 90 supaya tidak nabrak jalur
    this.frogSprite = scene.add.image(0, 0, 'frog').setDisplaySize(90, 90);
    this.add(this.frogSprite);
    
    // Bola di mulut — offset proporsional dengan sprite 90
    this.mouthBall = scene.add.image(0, -21, `ball_${this.currentBallColor}`);
    this.mouthBall.setDisplaySize(24, 24);
    this.add(this.mouthBall);
    
    // Preview bola berikutnya (tidak ikut berputar)
    this.nextPreview = scene.add.image(60, 540, `ball_${this.nextBallColor}`);
    this.nextPreview.setDisplaySize(40, 40);
    this.nextPreview.setDepth(50);
    
    this.nextPreviewLabel = scene.add.text(60, 570, 'NEXT', {
      fontSize: '12px', fill: '#FFFFFF', fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(50);
  }

  rotateToPointer(pointer) {
    const angle = Phaser.Math.Angle.Between(this.x, this.y, pointer.x, pointer.y);
    this.rotation = angle + Math.PI / 2;
  }

  shoot() {
    return {
      x: this.x,
      y: this.y,
      angle: this.rotation - Math.PI / 2,
      color: this.currentBallColor
    };
  }

  // ===== METHOD BARU: Validasi warna setiap frame =====
  // Dipanggil di update() GameScene, jadi bola berikut selalu sinkron
  validateColors(availableColors) {
    if (!availableColors || availableColors.length === 0) return;
    
    let changed = false;
    
    if (!availableColors.includes(this.currentBallColor)) {
      this.currentBallColor = Phaser.Utils.Array.GetRandom(availableColors);
      this.mouthBall.setTexture(`ball_${this.currentBallColor}`);
      changed = true;
    }
    
    if (!availableColors.includes(this.nextBallColor)) {
      this.nextBallColor = Phaser.Utils.Array.GetRandom(availableColors);
      this.nextPreview.setTexture(`ball_${this.nextBallColor}`);
      changed = true;
    }
    
    return changed;
  }

  // Sinkronisasi awal
  syncColors(availableColors) {
    this.validateColors(availableColors);
  }

  // SwapBall tetap ada, tapi validasi tambahan di validateColors
  swapBall(availableColors) {
    this.currentBallColor = this.nextBallColor;
    
    if (availableColors && availableColors.length > 0) {
      if (!availableColors.includes(this.currentBallColor)) {
        this.currentBallColor = Phaser.Utils.Array.GetRandom(availableColors);
      }
      this.nextBallColor = Phaser.Utils.Array.GetRandom(availableColors);
    } else {
      this.nextBallColor = Phaser.Math.Between(0, 3);
    }
    
    this.mouthBall.setTexture(`ball_${this.currentBallColor}`);
    this.nextPreview.setTexture(`ball_${this.nextBallColor}`);
  }
}