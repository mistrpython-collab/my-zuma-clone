class PathSystem {
  constructor() {
    // Geser semua ke ATAS 25px + lebarkan loop 3
    const controlPoints = [
      // ===== ENTRY =====
      new Phaser.Math.Vector2(48, 160),
      new Phaser.Math.Vector2(50, 143),
      new Phaser.Math.Vector2(55, 123),
      new Phaser.Math.Vector2(63, 105),
      new Phaser.Math.Vector2(75, 90),
      new Phaser.Math.Vector2(92, 75),
      new Phaser.Math.Vector2(112, 63),
      new Phaser.Math.Vector2(138, 53),
      new Phaser.Math.Vector2(168, 46),
      new Phaser.Math.Vector2(200, 41),
      new Phaser.Math.Vector2(235, 38),
      new Phaser.Math.Vector2(272, 36),
      new Phaser.Math.Vector2(310, 35),
      new Phaser.Math.Vector2(348, 35),
      new Phaser.Math.Vector2(388, 35),
      new Phaser.Math.Vector2(428, 36),
      new Phaser.Math.Vector2(468, 39),
      new Phaser.Math.Vector2(505, 45),
      new Phaser.Math.Vector2(540, 54),
      new Phaser.Math.Vector2(572, 66),

      // ===== KANAN ATAS (LOOP 1) =====
      new Phaser.Math.Vector2(602, 81),
      new Phaser.Math.Vector2(630, 100),
      new Phaser.Math.Vector2(655, 123),
      new Phaser.Math.Vector2(676, 150),
      new Phaser.Math.Vector2(693, 180),
      new Phaser.Math.Vector2(706, 213),

      // ===== KANAN (LOOP 1) =====
      new Phaser.Math.Vector2(714, 248),
      new Phaser.Math.Vector2(719, 283),
      new Phaser.Math.Vector2(720, 317),
      new Phaser.Math.Vector2(718, 351),
      new Phaser.Math.Vector2(712, 383),
      new Phaser.Math.Vector2(703, 413),
      new Phaser.Math.Vector2(690, 440),

      // ===== KANAN BAWAH (LOOP 1) =====
      new Phaser.Math.Vector2(672, 465),
      new Phaser.Math.Vector2(650, 487),
      new Phaser.Math.Vector2(624, 507),
      new Phaser.Math.Vector2(593, 524),
      new Phaser.Math.Vector2(560, 536),
      new Phaser.Math.Vector2(524, 544),

      // ===== BAWAH (LOOP 1) — digeser 25px ke atas =====
      new Phaser.Math.Vector2(485, 549),
      new Phaser.Math.Vector2(445, 551),
      new Phaser.Math.Vector2(405, 550),
      new Phaser.Math.Vector2(365, 546),
      new Phaser.Math.Vector2(327, 538),
      new Phaser.Math.Vector2(291, 527),

      // ===== KIRI BAWAH (LOOP 1) =====
      new Phaser.Math.Vector2(258, 512),
      new Phaser.Math.Vector2(228, 494),
      new Phaser.Math.Vector2(200, 472),
      new Phaser.Math.Vector2(176, 447),
      new Phaser.Math.Vector2(155, 419),
      new Phaser.Math.Vector2(137, 389),
      new Phaser.Math.Vector2(124, 357),

      // ===== KIRI (LOOP 1) =====
      new Phaser.Math.Vector2(114, 323),
      new Phaser.Math.Vector2(108, 289),
      new Phaser.Math.Vector2(105, 255),
      new Phaser.Math.Vector2(106, 221),
      new Phaser.Math.Vector2(112, 188),

      // ===== KIRI ATAS (LOOP 2) =====
      new Phaser.Math.Vector2(122, 158),
      new Phaser.Math.Vector2(138, 131),
      new Phaser.Math.Vector2(158, 108),
      new Phaser.Math.Vector2(182, 89),
      new Phaser.Math.Vector2(210, 74),
      new Phaser.Math.Vector2(242, 64),
      new Phaser.Math.Vector2(276, 57),
      new Phaser.Math.Vector2(312, 53),
      new Phaser.Math.Vector2(350, 52),
      new Phaser.Math.Vector2(388, 54),
      new Phaser.Math.Vector2(426, 58),
      new Phaser.Math.Vector2(462, 65),
      new Phaser.Math.Vector2(495, 75),
      new Phaser.Math.Vector2(526, 88),
      new Phaser.Math.Vector2(554, 105),

      // ===== KANAN (LOOP 2) =====
      new Phaser.Math.Vector2(578, 124),
      new Phaser.Math.Vector2(599, 147),
      new Phaser.Math.Vector2(616, 172),
      new Phaser.Math.Vector2(629, 199),
      new Phaser.Math.Vector2(638, 227),
      new Phaser.Math.Vector2(642, 257),
      new Phaser.Math.Vector2(642, 287),
      new Phaser.Math.Vector2(637, 317),
      new Phaser.Math.Vector2(628, 345),

      // ===== KANAN BAWAH (LOOP 2) =====
      new Phaser.Math.Vector2(614, 371),
      new Phaser.Math.Vector2(597, 395),
      new Phaser.Math.Vector2(575, 415),
      new Phaser.Math.Vector2(549, 432),
      new Phaser.Math.Vector2(520, 446),

      // ===== BAWAH (LOOP 2) =====
      new Phaser.Math.Vector2(488, 455),
      new Phaser.Math.Vector2(454, 460),
      new Phaser.Math.Vector2(420, 461),
      new Phaser.Math.Vector2(387, 458),
      new Phaser.Math.Vector2(356, 452),

      // ===== KIRI BAWAH (LOOP 2) =====
      new Phaser.Math.Vector2(328, 442),
      new Phaser.Math.Vector2(303, 429),
      new Phaser.Math.Vector2(281, 413),
      new Phaser.Math.Vector2(264, 394),
      new Phaser.Math.Vector2(251, 372),
      new Phaser.Math.Vector2(243, 348),

      // ===== KIRI (LOOP 2) =====
      new Phaser.Math.Vector2(239, 323),
      new Phaser.Math.Vector2(240, 297),
      new Phaser.Math.Vector2(246, 273),

      // ===== ATAS (LOOP 3) — LEBIH LEBAR & JAUH DARI KATAK =====
      // Katak di y=290, jadi loop 3 atas di y=155-175 (jauh di atas)
      new Phaser.Math.Vector2(258, 240),
      new Phaser.Math.Vector2(272, 220),
      new Phaser.Math.Vector2(291, 203),
      new Phaser.Math.Vector2(313, 190),
      new Phaser.Math.Vector2(337, 180),
      new Phaser.Math.Vector2(363, 173),
      new Phaser.Math.Vector2(391, 170),      // ✅ jauh di atas katak (170 vs 290)
      new Phaser.Math.Vector2(419, 173),
      new Phaser.Math.Vector2(444, 183),

      // ===== KANAN (LOOP 3) — lebar 35px lagi dari sebelumnya =====
      new Phaser.Math.Vector2(470, 200),
      new Phaser.Math.Vector2(492, 223),
      new Phaser.Math.Vector2(508, 250),
      new Phaser.Math.Vector2(518, 281),
      new Phaser.Math.Vector2(521, 315),
      new Phaser.Math.Vector2(518, 349),
      new Phaser.Math.Vector2(508, 380),

      // ===== BAWAH (LOOP 3) =====
      new Phaser.Math.Vector2(492, 405),
      new Phaser.Math.Vector2(472, 425),
      new Phaser.Math.Vector2(448, 440),
      new Phaser.Math.Vector2(422, 448),

      // ===== MENUJU TENKORAK (masuk dari kiri atas tengkorak) =====
      new Phaser.Math.Vector2(398, 448),
      new Phaser.Math.Vector2(378, 446),
      new Phaser.Math.Vector2(365, 444),
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
}