class PathSystem {
  constructor() {
    // SET THIS TO true TO SEE THE PATH ON SCREEN
    // Once it perfectly matches your background lanes, set it to false
    this.DEBUG = false;

    // Geser semua ke ATAS 25px + lebarkan loop 3
    const controlPoints = [
      // ===== ENTRY =====
      new Phaser.Math.Vector2(17, 226),
      new Phaser.Math.Vector2(38, 203),
      new Phaser.Math.Vector2(53, 173),
      new Phaser.Math.Vector2(110, 109),
      new Phaser.Math.Vector2(145, 85),
      new Phaser.Math.Vector2(185, 67),
      new Phaser.Math.Vector2(215, 59),
      
      new Phaser.Math.Vector2(262, 44),
      new Phaser.Math.Vector2(310, 35),
      new Phaser.Math.Vector2(348, 35),
      new Phaser.Math.Vector2(388, 35),
      new Phaser.Math.Vector2(428, 36),
      new Phaser.Math.Vector2(468, 39),
      new Phaser.Math.Vector2(505, 45),
      new Phaser.Math.Vector2(540, 54),
      new Phaser.Math.Vector2(572, 66),

      // ===== KANAN ATAS (LOOP 1) =====
      new Phaser.Math.Vector2(603, 79),
      new Phaser.Math.Vector2(642, 94),
      new Phaser.Math.Vector2(671, 116),
      new Phaser.Math.Vector2(695, 136),
      new Phaser.Math.Vector2(717, 167),
      new Phaser.Math.Vector2(733, 200),

      // ===== KANAN (LOOP 1) =====
      new Phaser.Math.Vector2(747, 242),
      new Phaser.Math.Vector2(749, 278),//
      new Phaser.Math.Vector2(752, 323),
      new Phaser.Math.Vector2(750, 355),
      new Phaser.Math.Vector2(735, 387),
      new Phaser.Math.Vector2(724, 419),//
      new Phaser.Math.Vector2(695, 452),

      // ===== KANAN BAWAH (LOOP 1) =====
      new Phaser.Math.Vector2(675, 473),
      new Phaser.Math.Vector2(650, 497),
      new Phaser.Math.Vector2(624, 517),
      new Phaser.Math.Vector2(593, 529),
      new Phaser.Math.Vector2(560, 544),
      new Phaser.Math.Vector2(524, 558),

      // ===== BAWAH (LOOP 1) — digeser 25px ke atas =====
      new Phaser.Math.Vector2(485, 567),
      new Phaser.Math.Vector2(445, 566),
      new Phaser.Math.Vector2(405, 566),
      new Phaser.Math.Vector2(360, 568),
      new Phaser.Math.Vector2(320, 562),
      new Phaser.Math.Vector2(273, 554),

      // ===== KIRI BAWAH (LOOP 1) =====
      new Phaser.Math.Vector2(238, 542),
      new Phaser.Math.Vector2(208, 522),
      new Phaser.Math.Vector2(173, 498),
      new Phaser.Math.Vector2(144, 463),
      new Phaser.Math.Vector2(116, 424),
      new Phaser.Math.Vector2(107, 392),
      new Phaser.Math.Vector2(92, 357),

      // ===== KIRI (LOOP 1) =====
      new Phaser.Math.Vector2(94, 313),
      new Phaser.Math.Vector2(94, 289),
      new Phaser.Math.Vector2(98, 255),
      new Phaser.Math.Vector2(106, 221),
      new Phaser.Math.Vector2(130, 188),

      // ===== KIRI ATAS (LOOP 2) =====
      
      
      new Phaser.Math.Vector2(175, 141),
      
      
      new Phaser.Math.Vector2(256, 108),
      
      
      new Phaser.Math.Vector2(353, 92),
      
      
      new Phaser.Math.Vector2(454, 95),
      
      new Phaser.Math.Vector2(554, 119),

      // ===== KANAN (LOOP 2) =====
     
      new Phaser.Math.Vector2(594, 151),
      
      new Phaser.Math.Vector2(635, 193),
      
      new Phaser.Math.Vector2(659, 254),
      
      new Phaser.Math.Vector2(669, 319),
      

      // ===== KANAN BAWAH (LOOP 2) =====
      new Phaser.Math.Vector2(646, 382),
      
      new Phaser.Math.Vector2(605, 436),
      new Phaser.Math.Vector2(570, 466),
      new Phaser.Math.Vector2(521, 488),

      // ===== BAWAH (LOOP 2) =====
      new Phaser.Math.Vector2(478, 502),
      new Phaser.Math.Vector2(440, 503),// mulai dari sini
      new Phaser.Math.Vector2(392, 506),
      new Phaser.Math.Vector2(347, 508),
      new Phaser.Math.Vector2(299, 492),

      // ===== KIRI BAWAH (LOOP 2) =====
      new Phaser.Math.Vector2(248, 463),
      
      new Phaser.Math.Vector2(210, 423),
      new Phaser.Math.Vector2(184, 384),
      new Phaser.Math.Vector2(170, 333),
      new Phaser.Math.Vector2(176, 273),

      // ===== KIRI (LOOP 2) =====
      new Phaser.Math.Vector2(216, 213),
      
      new Phaser.Math.Vector2(259, 179),

      // ===== ATAS (LOOP 3) — LEBIH LEBAR & JAUH DARI KATAK =====
      // Katak di y=290, jadi loop 3 atas di y=155-175 (jauh di atas)
      
           // ✅ jauh di atas katak (170 vs 290)
      new Phaser.Math.Vector2(354, 159),
      new Phaser.Math.Vector2(444, 158),

      // ===== KANAN (LOOP 3) — lebar 35px lagi dari sebelumnya =====
      new Phaser.Math.Vector2(511, 177),
      new Phaser.Math.Vector2(563, 218),
      
      new Phaser.Math.Vector2(584, 289),
      new Phaser.Math.Vector2(571, 358),

      // ===== BAWAH (LOOP 3) =====
      new Phaser.Math.Vector2(533, 405),
      

      // ===== MENUJU TENKORAK (masuk dari kiri atas tengkorak) =====
      new Phaser.Math.Vector2(477, 428),
      new Phaser.Math.Vector2(434, 426),
      
      new Phaser.Math.Vector2(357, 440)
    ];

    const baseSpline = new Phaser.Curves.Spline(controlPoints);
    const densePoints = baseSpline.getSpacedPoints(2000);
    this.curve = new Phaser.Curves.Spline(densePoints);
    this.totalLength = this.curve.getLength();
    
    this.controlPoints = controlPoints;
  }

  getPointAt(t) {
    return this.curve.getPointAt(Phaser.Math.Clamp(t, 0, 1));
  }

  getPointAtDistance(distance) {
    const t = distance / this.totalLength;
    return this.getPointAt(t);
  }

  // NEW: Draws the path on screen so you can perfectly align it
  drawDebug(scene) {
    if (!this.DEBUG) return;
    
    const graphics = scene.add.graphics();
    graphics.setDepth(100); // Draw on top of everything

    // Draw the actual path the balls will take (Green Line)
    graphics.lineStyle(3, 0x00ff00, 0.8);
    const points = this.curve.getSpacedPoints(300);
    graphics.beginPath();
    graphics.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      graphics.lineTo(points[i].x, points[i].y);
    }
    graphics.strokePath();
    
    // Draw the control points (Red Dots)
    graphics.fillStyle(0xff0000, 1);
    this.controlPoints.forEach(p => {
      graphics.fillCircle(p.x, p.y, 4);
    });

    console.log("DEBUG MODE ON: Green line = actual path, Red dots = control points.");
  }
}