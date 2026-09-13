class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

    const loadingText = this.add.text(width / 2, height / 2 - 50, 'Memuat...', {
      fontSize: '20px', fill: '#ffffff'
    }).setOrigin(0.5);

    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });

    // ===== MUAT GAMBAR SESUAI NAMA FILE KAMU =====
    this.load.image('ball_0', 'assets/images/ball-r.png'); // Merah
    this.load.image('ball_1', 'assets/images/ball-b.png'); // Biru
    this.load.image('ball_2', 'assets/images/ball-g.png'); // Hijau
    this.load.image('ball_3', 'assets/images/ball-y.png'); // Kuning
    this.load.image('frog', 'assets/images/frog-up.png');
    this.load.image('background', 'assets/images/bg.png');
  }

  create() {
    this.scene.start('MenuScene');
  }
}