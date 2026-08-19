import { ThemeColors } from '../types';

// ----------------------------------------------------
// 2.1 SET THEORY & VENN DIAGRAMS (Interactive 3-circle)
// ----------------------------------------------------
export class SetTheorySim {
  points: { x: number; y: number; inA: boolean; inB: boolean; inC: boolean }[] = [];
  selectedMode: 'all' | 'unionAB' | 'intersectAB' | 'intersectABC' | 'compA' = 'unionAB';

  constructor() {
    this.generatePoints(250);
  }

  generatePoints(n: number = 100) {
    for (let i = 0; i < n; i++) {
      const x = 0.15 + Math.random() * 0.7;
      const y = 0.2 + Math.random() * 0.6;
      // Circle A center (0.42, 0.45), R = 0.22
      const distA = Math.hypot(x - 0.42, y - 0.45);
      // Circle B center (0.58, 0.45), R = 0.22
      const distB = Math.hypot(x - 0.58, y - 0.45);
      // Circle C center (0.50, 0.60), R = 0.20
      const distC = Math.hypot(x - 0.50, y - 0.60);

      this.points.push({
        x,
        y,
        inA: distA <= 0.22,
        inB: distB <= 0.22,
        inC: distC <= 0.20,
      });
    }
  }

  reset() {
    this.points = [];
    this.generatePoints(200);
  }

  setMode(mode: 'all' | 'unionAB' | 'intersectAB' | 'intersectABC' | 'compA') {
    this.selectedMode = mode;
  }

  update() {}

  render(ctx: CanvasRenderingContext2D, width: number, height: number, theme: ThemeColors) {
    ctx.clearRect(0, 0, width, height);
    const isLight = document.documentElement.classList.contains('light');
    const textColor = isLight ? '#0f172a' : '#f8fafc';
    const subTextColor = isLight ? '#64748b' : '#94a3b8';

    const cxA = width * 0.42;
    const cyA = height * 0.48;
    const rA = Math.min(width, height) * 0.24;

    const cxB = width * 0.58;
    const cyB = height * 0.48;
    const rB = rA;

    const cxC = width * 0.50;
    const cyC = height * 0.64;
    const rC = rA * 0.88;

    // Header
    ctx.fillStyle = textColor;
    ctx.font = 'bold 15px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Vennov diagram & teorija množic: P(A ∪ B) = P(A) + P(B) - P(A ∩ B)', 25, 34);

    // Universe Box Ω
    ctx.strokeStyle = isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(20, 50, width - 40, height - 70);

    ctx.fillStyle = subTextColor;
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.fillText('Vzorčni prostor Ω', 32, 70);

    // Draw 3 Circles with theme colors
    const drawCircle = (cx: number, cy: number, r: number, color: string, label: string, lx: number, ly: number) => {
      ctx.save();
      ctx.fillStyle = color;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = textColor;
      ctx.font = 'bold 16px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(label, lx, ly);
      ctx.restore();
    };

    drawCircle(cxA, cyA, rA, 'rgba(99, 102, 241, 0.25)', 'A', cxA - rA * 0.6, cyA - rA * 0.6);
    drawCircle(cxB, cyB, rB, 'rgba(6, 182, 212, 0.25)', 'B', cxB + rB * 0.6, cyB - rB * 0.6);
    drawCircle(cxC, cyC, rC, 'rgba(236, 72, 153, 0.20)', 'C', cxC, cyC + rC * 0.8);

    // Check highlighted condition for each point
    let highlightedCount = 0;
    for (const p of this.points) {
      const px = p.x * width;
      const py = p.y * height;

      let isHighlighted = false;
      if (this.selectedMode === 'all') isHighlighted = true;
      else if (this.selectedMode === 'unionAB') isHighlighted = p.inA || p.inB;
      else if (this.selectedMode === 'intersectAB') isHighlighted = p.inA && p.inB;
      else if (this.selectedMode === 'intersectABC') isHighlighted = p.inA && p.inB && p.inC;
      else if (this.selectedMode === 'compA') isHighlighted = !p.inA;

      if (isHighlighted) highlightedCount++;

      ctx.beginPath();
      ctx.arc(px, py, isHighlighted ? 4.5 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = isHighlighted ? theme.accent : 'rgba(148, 163, 184, 0.3)';
      ctx.fill();
    }

    // Stats bar at bottom
    const total = this.points.length;
    const prop = total > 0 ? (highlightedCount / total) * 100 : 0;
    ctx.fillStyle = textColor;
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(
      `Izbrano območje: ${highlightedCount}/${total} točk (${prop.toFixed(1)}%)`,
      width - 35,
      height - 30
    );
  }
}

// ----------------------------------------------------
// 2.2 COMBINATORICS & COUNTING (Urn & Tree Structure)
// ----------------------------------------------------
export class CountingSim {
  balls: { id: number; color: string; label: string }[] = [
    { id: 1, color: '#6366f1', label: '1' },
    { id: 2, color: '#06b6d4', label: '2' },
    { id: 3, color: '#10b981', label: '3' },
    { id: 4, color: '#f59e0b', label: '4' },
    { id: 5, color: '#ec4899', label: '5' },
  ];
  drawn: { id: number; color: string; label: string }[] = [];
  withReplacement: boolean = false;

  drawBall() {
    if (this.drawn.length >= 3 && !this.withReplacement) return;
    const available = this.withReplacement
      ? this.balls
      : this.balls.filter(b => !this.drawn.some(d => d.id === b.id));

    if (available.length > 0) {
      const idx = Math.floor(Math.random() * available.length);
      this.drawn.push(available[idx]);
    }
  }

  reset() {
    this.drawn = [];
  }

  update() {}

  render(ctx: CanvasRenderingContext2D, width: number, height: number, theme: ThemeColors) {
    ctx.clearRect(0, 0, width, height);
    const isLight = document.documentElement.classList.contains('light');
    const textColor = isLight ? '#0f172a' : '#f8fafc';
    const subTextColor = isLight ? '#64748b' : '#94a3b8';

    // Header
    ctx.fillStyle = textColor;
    ctx.font = 'bold 15px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Kombinatorika: Permutacije P(n,k) vs. Kombinacije C(n,k)', 25, 34);

    const urnX = width * 0.22;
    const urnY = height * 0.52;

    // Draw Urn (Jar)
    ctx.strokeStyle = isLight ? '#94a3b8' : '#475569';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(urnX - 55, urnY - 70);
    ctx.lineTo(urnX - 55, urnY + 70);
    ctx.arcTo(urnX - 55, urnY + 80, urnX + 55, urnY + 80, 20);
    ctx.lineTo(urnX + 55, urnY + 70);
    ctx.lineTo(urnX + 55, urnY - 70);
    ctx.stroke();

    ctx.fillStyle = textColor;
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Žara (n = 5)', urnX, urnY - 80);

    // Draw Balls inside Urn
    const remaining = this.withReplacement
      ? this.balls
      : this.balls.filter(b => !this.drawn.some(d => d.id === b.id));

    remaining.forEach((b, i) => {
      const bx = urnX + ((i % 3) - 1) * 28;
      const by = urnY + 30 - Math.floor(i / 3) * 35;
      ctx.beginPath();
      ctx.arc(bx, by, 14, 0, Math.PI * 2);
      ctx.fillStyle = b.color;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(b.label, bx, by);
    });

    // Drawn Sample tray on right
    const trayX = width * 0.65;
    const trayY = height * 0.35;

    ctx.fillStyle = isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)';
    ctx.fillRect(trayX - 110, trayY - 40, 220, 90);
    ctx.strokeStyle = theme.primary;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(trayX - 110, trayY - 40, 220, 90);

    ctx.fillStyle = textColor;
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Izvlečeni vzorec (k = ${this.drawn.length}/3)`, trayX, trayY - 50);

    this.drawn.forEach((d, i) => {
      const dx = trayX - 60 + i * 60;
      const dy = trayY + 5;
      ctx.beginPath();
      ctx.arc(dx, dy, 18, 0, Math.PI * 2);
      ctx.fillStyle = d.color;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(d.label, dx, dy);
    });

    // Formulas & Tree summary at bottom right
    const n = 5;
    const k = 3;
    const pVal = 5 * 4 * 3; // 60
    const cVal = pVal / 6; // 10

    ctx.fillStyle = textColor;
    ctx.font = 'bold 14px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Matematični izračun za n = 5, k = 3:', width * 0.48, height * 0.65);

    ctx.fillStyle = theme.chart1;
    ctx.font = '13px monospace';
    ctx.fillText(`Permutacije P(5,3) [Vrstni red šteje] = 5 × 4 × 3 = ${pVal}`, width * 0.48, height * 0.72);

    ctx.fillStyle = theme.chart2;
    ctx.fillText(`Kombinacije C(5,3) [Vrstni red ne šteje] = 60 / 3! = ${cVal}`, width * 0.48, height * 0.79);

    ctx.fillStyle = subTextColor;
    ctx.font = '12px system-ui, sans-serif';
    ctx.fillText(`Način: ${this.withReplacement ? 'Z vračanjem (5³ = 125)' : 'Brez vračanja'}`, width * 0.48, height * 0.86);
  }
}

// ----------------------------------------------------
// 2.3 CONDITIONAL PROBABILITY (2D Sample Space Reduction)
// ----------------------------------------------------
export class ConditionalProbSim {
  conditionActive: boolean = true;
  gridPoints: { x: number; y: number; inA: boolean; inB: boolean }[] = [];

  constructor() {
    this.generateGrid(400);
  }

  generateGrid(n: number = 400) {
    this.gridPoints = [];
    for (let i = 0; i < n; i++) {
      const gx = Math.random();
      const gy = Math.random();
      // Event A: circle inside [0,1]^2
      const inA = Math.hypot(gx - 0.45, gy - 0.45) < 0.35;
      // Event B: right half / bottom
      const inB = gy < 0.60 && gx > 0.25;
      this.gridPoints.push({ x: gx, y: gy, inA, inB });
    }
  }

  reset() {
    this.generateGrid(400);
  }

  update() {}

  render(ctx: CanvasRenderingContext2D, width: number, height: number, theme: ThemeColors) {
    ctx.clearRect(0, 0, width, height);
    const isLight = document.documentElement.classList.contains('light');
    const textColor = isLight ? '#0f172a' : '#f8fafc';
    const subTextColor = isLight ? '#64748b' : '#94a3b8';

    // Header
    ctx.fillStyle = textColor;
    ctx.font = 'bold 15px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Pogojna verjetnost & skrčenje prostora: P(A | B) = P(A ∩ B) / P(B)', 25, 34);

    const boxLeft = width * 0.12;
    const boxTop = 60;
    const boxSize = Math.min(width * 0.5, height - 120);

    // Full Universe Box Ω
    ctx.fillStyle = isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)';
    ctx.fillRect(boxLeft, boxTop, boxSize, boxSize);
    ctx.strokeStyle = isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(boxLeft, boxTop, boxSize, boxSize);

    // Draw Points
    let countTotal = this.gridPoints.length;
    let countA = 0;
    let countB = 0;
    let countAandB = 0;

    for (const p of this.gridPoints) {
      if (p.inA) countA++;
      if (p.inB) countB++;
      if (p.inA && p.inB) countAandB++;

      const px = boxLeft + p.x * boxSize;
      const py = boxTop + p.y * boxSize;

      // When condition B is active, points not in B are dimmed/erased
      const isVisible = !this.conditionActive || p.inB;

      ctx.beginPath();
      ctx.arc(px, py, isVisible ? 3.5 : 1.5, 0, Math.PI * 2);

      if (!isVisible) {
        ctx.fillStyle = 'rgba(148, 163, 184, 0.08)';
      } else if (p.inA && p.inB) {
        ctx.fillStyle = theme.chart3; // Intersection
      } else if (p.inB) {
        ctx.fillStyle = theme.chart2; // In B only
      } else if (p.inA) {
        ctx.fillStyle = theme.chart1; // In A only
      } else {
        ctx.fillStyle = subTextColor;
      }
      ctx.fill();
    }

    // Right Side Live Analytics
    const pA = countTotal > 0 ? countA / countTotal : 0;
    const pB = countTotal > 0 ? countB / countTotal : 0;
    const pAandB = countTotal > 0 ? countAandB / countTotal : 0;
    const pAgivenB = countB > 0 ? countAandB / countB : 0;

    const statsX = boxLeft + boxSize + 40;
    let sY = 90;

    ctx.fillStyle = textColor;
    ctx.font = 'bold 15px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Analiza verjetnosti:', statsX, sY);

    sY += 30;
    ctx.fillStyle = theme.chart1;
    ctx.font = '13px monospace';
    ctx.fillText(`Nepogojni P(A) = ${pA.toFixed(3)} (${countA}/${countTotal})`, statsX, sY);

    sY += 25;
    ctx.fillStyle = theme.chart2;
    ctx.fillText(`Pogoj P(B) = ${pB.toFixed(3)} (${countB}/${countTotal})`, statsX, sY);

    sY += 25;
    ctx.fillStyle = theme.chart3;
    ctx.fillText(`Presek P(A ∩ B) = ${pAandB.toFixed(3)} (${countAandB}/${countTotal})`, statsX, sY);

    sY += 40;
    ctx.fillStyle = theme.primaryLight;
    ctx.font = 'bold 18px monospace';
    ctx.fillText(`P(A | B) = ${pAgivenB.toFixed(4)}`, statsX, sY);

    sY += 25;
    ctx.fillStyle = subTextColor;
    ctx.font = '12px system-ui, sans-serif';
    ctx.fillText(`= ${countAandB} / ${countB} točk v skrčenem prostoru`, statsX, sY);
  }
}
