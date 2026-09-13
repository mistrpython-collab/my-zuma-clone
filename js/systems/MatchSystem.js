class MatchSystem {
  static checkMatches(scene, balls, matchThreshold) {
    if (!balls || balls.length === 0) return;

    let matchStart = 0;
    let matchColor = balls[0].color;

    for (let i = 1; i <= balls.length; i++) {
      const currentColor = i < balls.length ? balls[i].color : -1;

      if (currentColor !== matchColor) {
        const matchLength = i - matchStart;
        if (matchLength >= matchThreshold && matchColor !== -1) {
          // Tandai bola dan beri efek fade-out
          for (let k = matchStart; k < i; k++) {
            MatchSystem.destroyBallWithEffect(scene, balls[k]);
          }
          scene.time.delayedCall(250, () => {
            MatchSystem.removeDestroyedBalls(scene);
          });
        }
        matchStart = i;
        matchColor = currentColor;
      }
    }
  }

  // ===== Efek visual saat bola dihancurkan =====
  static destroyBallWithEffect(scene, ball) {
    if (ball.isDestroyed) return;
    ball.isDestroyed = true;
    
    // Matikan visible interaction
    // Tween: mengecil + transparan
    scene.tweens.add({
      targets: ball,
      scale: 0,
      alpha: 0,
      duration: 250,
      ease: 'Cubic.easeIn',
      onComplete: () => {
        ball.setVisible(false);
      }
    });
  }

  static removeDestroyedBalls(scene) {
    const currentBalls = scene.balls;
    const removed = currentBalls.filter(b => b.isDestroyed);
    
    if (removed.length === 0) return;
    
    // Hapus bola yang isDestroyed
    scene.balls = currentBalls.filter(b => {
      if (b.isDestroyed) {
        b.destroy();
        return false;
      }
      return true;
    });

    // Rapatkan rantai
    MatchSystem.tightenChain(scene);
    // Cek chain reaction
    MatchSystem.checkChainReaction(scene);
  }

  // ===== Rapatkan rantai setelah removal =====
  static tightenChain(scene) {
    const balls = scene.balls;
    if (balls.length === 0) return;
    
    // Urutkan berdasarkan distance DESC (paling depan dulu)
    balls.sort((a, b) => b.distanceOnPath - a.distanceOnPath);
    
    // Setiap bola tepat spacing di belakang bola sebelumnya
    for (let i = 1; i < balls.length; i++) {
      balls[i].distanceOnPath = balls[i - 1].distanceOnPath - scene.spacing;
    }
    
    // Update semua posisi
    balls.forEach(b => scene.positionBallOnPath(b));
  }

  static checkChainReaction(scene) {
    const balls = scene.balls;
    if (balls.length < 2) return;
    
    // Cek dua bola berwarna sama bersebelahan
    for (let i = 0; i < balls.length - 1; i++) {
      const leftBall = balls[i];
      const rightBall = balls[i + 1];

      if (leftBall.color === rightBall.color) {
        scene.time.delayedCall(100, () => {
          MatchSystem.checkMatches(scene, scene.balls, scene.matchThreshold);
        });
        return;
      }
    }
  }
}