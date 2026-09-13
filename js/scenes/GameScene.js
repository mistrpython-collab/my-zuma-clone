class GameScene extends Phaser.Scene {
  
  constructor() {
    super('GameScene');
  }

  create() {
    this.add.image(400, 300, 'background').setDisplaySize(800, 600);

    this.pathSystem = new PathSystem();
    // Posisi katak sedikit ke bawah (290) supaya jalur loop 3 atas lebih lega
    this.frog = new Frog(this, 400, 290);

    this.balls = [];
    this.projectiles = [];
    this.ballSpeed = 0.055;
    this.matchThreshold = 3;
    this.spacing = 36;
    this.isGameEnded = false;

    this.pointerX = 400;
    this.pointerY = 0;

    this.laserGraphics = this.add.graphics();
    this.laserGraphics.setDepth(5);

    this.input.on('pointermove', (pointer) => {
      if (this.isGameEnded) return;
      this.pointerX = pointer.x;
      this.pointerY = pointer.y;
      this.frog.rotateToPointer(pointer);
    });
    this.input.on('pointerdown', (pointer) => {
      if (this.isGameEnded) return;
      this.pointerX = pointer.x;
      this.pointerY = pointer.y;
      this.shootBall();
    });

    this.spawnInitialBalls(30);
    const availableColors = this.getAvailableColors();
    this.frog.syncColors(availableColors);
  }

  update(time, delta) {
    if (this.isGameEnded) {
      this.laserGraphics.clear();
      return;
    }
    
    this.updateBallPositions(delta);
    this.updateProjectiles();
    this.checkProjectileCollisions();
    this.checkGameOver();
    this.drawLaser();
    
    // ===== BARU: Validasi warna setiap frame =====
    // Jadi kalau warna tertentu hilang, langsung diganti saat itu juga
    const availableColors = this.getAvailableColors();
    this.frog.validateColors(availableColors);
  }

  drawLaser() {
    this.laserGraphics.clear();
    
    const startX = this.frog.x;
    const startY = this.frog.y;
    const angle = Phaser.Math.Angle.Between(startX, startY, this.pointerX, this.pointerY);
    
    const offset = 35; // sesuaikan dengan sprite 90
    const realStartX = startX + Math.cos(angle) * offset;
    const realStartY = startY + Math.sin(angle) * offset;
    
    const laserLength = 800;
    const endX = realStartX + Math.cos(angle) * laserLength;
    const endY = realStartY + Math.sin(angle) * laserLength;
    
    this.laserGraphics.lineStyle(1.5, 0xFF6666, 0.35);
    this.laserGraphics.beginPath();
    this.laserGraphics.moveTo(realStartX, realStartY);
    this.laserGraphics.lineTo(endX, endY);
    this.laserGraphics.strokePath();
    
    this.laserGraphics.fillStyle(0xFF8888, 0.5);
    this.laserGraphics.fillCircle(endX, endY, 3);
  }

  spawnInitialBalls(count) {
    for (let i = 0; i < count; i++) {
      const color = Phaser.Math.Between(0, 3);
      const ball = new Ball(this, 0, 0, color);
      ball.distanceOnPath = i * this.spacing;
      this.balls.push(ball);
    }
    this.balls.sort((a, b) => b.distanceOnPath - a.distanceOnPath);
    this.balls.forEach(ball => this.positionBallOnPath(ball));
  }

  updateBallPositions(delta) {
    let lastActiveBall = null;

    for (let i = 0; i < this.balls.length; i++) {
      const ball = this.balls[i];
      if (ball.isDestroyed) continue;

      if (lastActiveBall === null) {
        ball.distanceOnPath += this.ballSpeed * delta;
      } else {
        ball.distanceOnPath = lastActiveBall.distanceOnPath - this.spacing;
      }

      this.positionBallOnPath(ball);
      lastActiveBall = ball;
    }
  }

  positionBallOnPath(ball) {
    const t = ball.distanceOnPath / this.pathSystem.totalLength;
    const point = this.pathSystem.getPointAt(t);
    if (point) {
      ball.setPosition(point.x, point.y);
    }
  }

  getAvailableColors() {
    const colors = new Set();
    this.balls.forEach(ball => {
      if (!ball.isDestroyed) {
        colors.add(ball.color);
      }
    });
    return Array.from(colors);
  }

  shootBall() {
    const shot = this.frog.shoot();
    
    // ===== FIX: Proyektil mulai dari luar badan katak (offset) =====
    const offset = 40;
    const startX = shot.x + Math.cos(shot.angle) * offset;
    const startY = shot.y + Math.sin(shot.angle) * offset;
    
    const projectile = this.add.image(startX, startY, `ball_${shot.color}`);
    projectile.setDisplaySize(36, 36);
    projectile.setData('color', shot.color);
    projectile.setData('vx', Math.cos(shot.angle) * 11);
    projectile.setData('vy', Math.sin(shot.angle) * 11);
    projectile.setData('radius', 18);
    this.projectiles.push(projectile);
    
    const availableColors = this.getAvailableColors();
    this.frog.swapBall(availableColors);
  }

  updateProjectiles() {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.x += p.getData('vx');
      p.y += p.getData('vy');

      if (p.x < -50 || p.x > 850 || p.y < -50 || p.y > 650) {
        p.destroy();
        this.projectiles.splice(i, 1);
      }
    }
  }

  checkProjectileCollisions() {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      for (let j = 0; j < this.balls.length; j++) {
        const ball = this.balls[j];
        if (ball.isDestroyed) continue;

        const dist = Phaser.Math.Distance.Between(p.x, p.y, ball.x, ball.y);
        if (dist < ball.radius + p.getData('radius')) {
          this.insertBallIntoChain(ball, p.getData('color'));
          p.destroy();
          this.projectiles.splice(i, 1);
          break;
        }
      }
    }
  }

  insertBallIntoChain(targetBall, color) {
    const targetIndex = this.balls.indexOf(targetBall);
    if (targetIndex === -1) return;
    
    const newBall = new Ball(this, targetBall.x, targetBall.y, color);
    newBall.distanceOnPath = targetBall.distanceOnPath - this.spacing;
    this.balls.splice(targetIndex + 1, 0, newBall);
    
    for (let i = targetIndex + 2; i < this.balls.length; i++) {
      this.balls[i].distanceOnPath -= this.spacing;
    }
    this.balls.forEach(b => this.positionBallOnPath(b));

    MatchSystem.checkMatches(this, this.balls, this.matchThreshold);
  }

  checkGameOver() {
    const activeBalls = this.balls.filter(b => !b.isDestroyed);

    if (activeBalls.length > 0) {
      const leadBall = activeBalls[0];
      if (leadBall.distanceOnPath >= this.pathSystem.totalLength) {
        this.isGameEnded = true;
        this.showEndScreen('GAME OVER', '#FF0000');
        return;
      }
    }

    if (activeBalls.length === 0 && this.balls.length > 0) {
      this.isGameEnded = true;
      this.showEndScreen('MISI BERHASIL!', '#FFD700');
    }
  }

  showEndScreen(text, color) {
    const overlay = this.add.rectangle(400, 300, 800, 600, 0x000000, 0.6);
    overlay.setDepth(100);

    this.add.text(400, 240, text, {
      fontSize: '64px', fill: color, fontStyle: 'bold',
      stroke: '#000', strokeThickness: 8
    }).setOrigin(0.5).setDepth(101);

    const btn = this.add.text(400, 380, 'MAIN LAGI', {
      fontSize: '28px', fill: '#ffffff',
      backgroundColor: '#228B22',
      padding: { x: 25, y: 12 }
    }).setOrigin(0.5).setDepth(101).setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => btn.setStyle({ fill: '#FFD700' }));
    btn.on('pointerout', () => btn.setStyle({ fill: '#ffffff' }));
    btn.on('pointerdown', () => this.scene.restart());

    const btnMenu = this.add.text(400, 450, 'MENU UTAMA', {
      fontSize: '22px', fill: '#ffffff',
      backgroundColor: '#444444',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setDepth(101).setInteractive({ useHandCursor: true });

    btnMenu.on('pointerover', () => btnMenu.setStyle({ fill: '#FFD700' }));
    btnMenu.on('pointerout', () => btnMenu.setStyle({ fill: '#ffffff' }));
    btnMenu.on('pointerdown', () => this.scene.start('MenuScene'));
  }
}