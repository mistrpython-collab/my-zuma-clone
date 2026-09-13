class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    this.add.text(400, 200, 'ZUMA CLONE', {
      fontSize: '64px',
      fill: '#FFD700',
      fontStyle: 'bold',
      stroke: '#000',
      strokeThickness: 6
    }).setOrigin(0.5);

    const startBtn = this.add.text(400, 350, 'MULAI GAME', {
      fontSize: '32px',
      fill: '#ffffff',
      backgroundColor: '#228B22',
      padding: { x: 30, y: 15 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    startBtn.on('pointerover', () => startBtn.setStyle({ fill: '#FFD700' }));
    startBtn.on('pointerout', () => startBtn.setStyle({ fill: '#ffffff' }));
    
    startBtn.on('pointerdown', () => {
      this.scene.start('GameScene');
    });
  }
}