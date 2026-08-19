import { ThemeColors } from '../types';
import { clamp } from '../utils/mathHelpers';

// ----------------------------------------------------
// 1.1 CHANCE EVENTS SIMULATOR (Coins & Proportion Curve)
// ----------------------------------------------------
export class ChanceEventsSim {
  flips: { isHead: boolean; step: number; prop: number }[] = [];
  coins: { x: number; y: number; vy: number; rotX: number; rotSpeed: number; isHead: boolean; settled: boolean }[] = [];
  p: number = 0.5;
  running: boolean = false;
  autoTimer: number = 0;

  constructor() {
    this.reset();
  }

  reset() {
    this.flips = [];
    this.coins = [];
    this.running = false;
  }

  addFlip(p: number = this.p, count: number = 1) {
    this.p = p;
    for (let c = 0; c < count; c++) {
      const isHead = Math.random() < this.p;
      const step = this.flips.length + 1;
      const prevHeads = this.flips.length > 0 ? this.flips[this.flips.length - 1].prop * this.flips.length : 0;
      const heads = prevHeads + (isHead ? 1 : 0);
      const prop = heads / step;

      this.flips.push({ isHead, step, prop });

      // Add falling 3D coin
      if (this.coins.length < 50) {
        this.coins.push({
          x: 100 + Math.random() * 80,
          y: 40,
          vy: 2 + Math.random() * 3,
          rotX: Math.random() * Math.PI * 2,
          rotSpeed: 0.15 + Math.random() * 0.2,
          isHead,
          settled: false,
        });
      }
    }
  }

  update() {
    for (const coin of this.coins) {
      if (!coin.settled) {
        coin.y += coin.vy;
        coin.rotX += coin.rotSpeed;
        coin.vy += 0.25; // gravity
        if (coin.y >= 260) {
          coin.y = 260;
          coin.settled = true;
          coin.rotX = coin.isHead ? 0 : Math.PI;
        }
      }
    }
    // Clean up settled coins if too many
    if (this.coins.length > 40) {
      this.coins = this.coins.filter(c => !c.settled).slice(-20);
    }
  }

  render(ctx: CanvasRenderingContext2D, width: number, height: number, theme: ThemeColors) {
    ctx.clearRect(0, 0, width, height);

    const isLight = document.documentElement.classList.contains('light');
    const textColor = isLight ? '#0f172a' : '#f8fafc';
    const subTextColor = isLight ? '#64748b' : '#94a3b8';
    const gridColor = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)';

    // 1. Draw Left Pane: 3D Coins drop & Column Stacks
    const leftWidth = Math.min(260, width * 0.35);
    ctx.fillStyle = isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)';
    ctx.fillRect(10, 10, leftWidth - 20, height - 20);

    ctx.fillStyle = textColor;
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.fillText('Padanje & Zlaganje', 20, 32);

    // Draw Falling Coins
    for (const coin of this.coins) {
      ctx.save();
      ctx.translate(coin.x, coin.y);
      const scaleY = Math.cos(coin.rotX);
      ctx.scale(1, Math.abs(scaleY) < 0.05 ? 0.05 : scaleY);

      // Coin circle
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, Math.PI * 2);
      ctx.fillStyle = coin.isHead ? theme.chart1 : theme.chart2;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      // Coin Face text
      if (Math.abs(scaleY) > 0.4) {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(coin.isHead ? 'H' : 'T', 0, 0);
      }
      ctx.restore();
    }

    // Bottom Stacks (Heads vs Tails)
    const headsCount = this.flips.filter(f => f.isHead).length;
    const tailsCount = this.flips.length - headsCount;
    const maxStack = Math.max(1, headsCount, tailsCount);
    const stackHMax = height - 140;

    // Heads Bar
    const hBarH = (headsCount / maxStack) * stackHMax;
    ctx.fillStyle = theme.chart1;
    ctx.fillRect(40, height - 40 - hBarH, 45, hBarH);
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.font = '12px system-ui, sans-serif';
    ctx.fillText(`H: ${headsCount}`, 62, height - 20);

    // Tails Bar
    const tBarH = (tailsCount / maxStack) * stackHMax;
    ctx.fillStyle = theme.chart2;
    ctx.fillRect(110, height - 40 - tBarH, 45, tBarH);
    ctx.fillStyle = textColor;
    ctx.fillText(`T: ${tailsCount}`, 132, height - 20);

    // 2. Draw Right Pane: Proportion Convergence Curve
    const graphLeft = leftWidth + 20;
    const graphRight = width - 30;
    const graphTop = 50;
    const graphBottom = height - 60;
    const graphWidth = graphRight - graphLeft;
    const graphHeight = graphBottom - graphTop;

    // Background & Grid
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    for (let pVal = 0.0; pVal <= 1.0; pVal += 0.25) {
      const y = graphBottom - pVal * graphHeight;
      ctx.beginPath();
      ctx.moveTo(graphLeft, y);
      ctx.lineTo(graphRight, y);
      ctx.stroke();

      ctx.fillStyle = subTextColor;
      ctx.font = '10px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(pVal.toFixed(2), graphLeft - 6, y + 3);
    }

    // Theoretical p Line (dashed)
    const pY = graphBottom - this.p * graphHeight;
    ctx.save();
    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = theme.chart3;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(graphLeft, pY);
    ctx.lineTo(graphRight, pY);
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = theme.chart3;
    ctx.font = '11px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Teoretični p = ${this.p.toFixed(2)}`, graphLeft + 10, pY - 8);

    // Draw Convergence Line
    if (this.flips.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = theme.primaryLight;
      ctx.lineWidth = 2.5;
      const maxN = Math.max(50, this.flips.length);

      for (let i = 0; i < this.flips.length; i++) {
        const f = this.flips[i];
        const x = graphLeft + (f.step / maxN) * graphWidth;
        const y = graphBottom - f.prop * graphHeight;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Current Point circle
      const last = this.flips[this.flips.length - 1];
      const lastX = graphLeft + (last.step / maxN) * graphWidth;
      const lastY = graphBottom - last.prop * graphHeight;
      ctx.beginPath();
      ctx.arc(lastX, lastY, 6, 0, Math.PI * 2);
      ctx.fillStyle = theme.primary;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Headers & Current Stat
    ctx.fillStyle = textColor;
    ctx.font = 'bold 14px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Delež Cifer: P̂(H) = k / N', graphLeft, 32);

    const currentProp = this.flips.length > 0 ? this.flips[this.flips.length - 1].prop : 0;
    ctx.fillStyle = theme.primaryLight;
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(
      `N = ${this.flips.length} | P̂ = ${currentProp.toFixed(4)}`,
      graphRight,
      32
    );
  }
}

// ----------------------------------------------------
// 1.2 EXPECTATION SIMULATOR (Torque Balance & Fulcrum)
// ----------------------------------------------------
export class ExpectationSim {
  weights: { value: number; count: number }[] = [
    { value: 1, count: 1 },
    { value: 2, count: 1 },
    { value: 3, count: 1 },
    { value: 4, count: 1 },
    { value: 5, count: 1 },
    { value: 6, count: 1 },
  ];
  fulcrumX: number = 3.5;
  boardAngle: number = 0;
  targetAngle: number = 0;

  constructor() {
    this.recompute();
  }

  addWeight(val: number) {
    val = clamp(Math.round(val), 1, 6);
    const item = this.weights.find(w => w.value === val);
    if (item) item.count++;
    else this.weights.push({ value: val, count: 1 });
    this.recompute();
  }

  reset() {
    this.weights = [
      { value: 1, count: 1 },
      { value: 2, count: 1 },
      { value: 3, count: 1 },
      { value: 4, count: 1 },
      { value: 5, count: 1 },
      { value: 6, count: 1 },
    ];
    this.recompute();
  }

  recompute() {
    let totalMass = 0;
    let weightedSum = 0;
    for (const w of this.weights) {
      totalMass += w.count;
      weightedSum += w.value * w.count;
    }
    this.fulcrumX = totalMass > 0 ? weightedSum / totalMass : 3.5;
  }

  update() {
    // Smooth torque balancing spring physics
    this.boardAngle += (0 - this.boardAngle) * 0.1;
  }

  render(ctx: CanvasRenderingContext2D, width: number, height: number, theme: ThemeColors) {
    ctx.clearRect(0, 0, width, height);
    const isLight = document.documentElement.classList.contains('light');
    const textColor = isLight ? '#0f172a' : '#f8fafc';
    const subTextColor = isLight ? '#64748b' : '#94a3b8';

    const centerY = height * 0.58;
    const boardLeft = width * 0.12;
    const boardRight = width * 0.88;
    const boardWidth = boardRight - boardLeft;

    const getPixelX = (val: number) => boardLeft + ((val - 1) / 5) * boardWidth;

    // Header & Live Expectation
    ctx.fillStyle = textColor;
    ctx.font = 'bold 16px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Fizikalna tehtnica navorov: ∑ (xᵢ - μ) · P(X = xᵢ) = 0', boardLeft, 40);

    ctx.fillStyle = theme.primaryLight;
    ctx.font = 'bold 20px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`Težišče E[X] = μ = ${this.fulcrumX.toFixed(3)}`, boardRight, 40);

    // Ground line
    ctx.strokeStyle = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width * 0.05, centerY + 80);
    ctx.lineTo(width * 0.95, centerY + 80);
    ctx.stroke();

    // 1. Fulcrum (Triangle at mu position)
    const fulcrumPx = getPixelX(this.fulcrumX);
    ctx.save();
    ctx.fillStyle = theme.chart3;
    ctx.beginPath();
    ctx.moveTo(fulcrumPx, centerY);
    ctx.lineTo(fulcrumPx - 22, centerY + 65);
    ctx.lineTo(fulcrumPx + 22, centerY + 65);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Fulcrum label
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('μ', fulcrumPx, centerY + 45);
    ctx.restore();

    // 2. The Wooden Balance Beam
    ctx.save();
    ctx.translate(fulcrumPx, centerY);
    ctx.rotate(this.boardAngle);
    ctx.translate(-fulcrumPx, -centerY);

    // Beam rectangle
    ctx.fillStyle = isLight ? '#cbd5e1' : '#334155';
    ctx.strokeStyle = theme.primary;
    ctx.lineWidth = 2;
    ctx.fillRect(boardLeft - 10, centerY - 8, boardWidth + 20, 16);
    ctx.strokeRect(boardLeft - 10, centerY - 8, boardWidth + 20, 16);

    // Draw Markings (1 to 6) and Stacks of Weights
    let totalWeights = this.weights.reduce((sum, w) => sum + w.count, 0);

    for (let val = 1; val <= 6; val++) {
      const px = getPixelX(val);
      const wObj = this.weights.find(w => w.value === val);
      const count = wObj ? wObj.count : 0;
      const prob = totalWeights > 0 ? count / totalWeights : 0;

      // Tick mark
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(px, centerY - 8);
      ctx.lineTo(px, centerY + 8);
      ctx.stroke();

      // Number label below
      ctx.fillStyle = textColor;
      ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${val}`, px, centerY + 28);

      // Prob label
      ctx.fillStyle = subTextColor;
      ctx.font = '11px monospace';
      ctx.fillText(`${(prob * 100).toFixed(0)}%`, px, centerY + 44);

      // Stacked Weights on the beam
      for (let k = 0; k < count; k++) {
        const boxY = centerY - 14 - (k + 1) * 22;
        ctx.fillStyle = theme.chart1;
        ctx.fillRect(px - 14, boxY, 28, 20);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(px - 14, boxY, 28, 20);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('1kg', px, boxY + 10);
      }

      // Draw Torque Arrow from Fulcrum to Value
      if (count > 0 && Math.abs(val - this.fulcrumX) > 0.05) {
        const isRight = val > this.fulcrumX;
        ctx.strokeStyle = isRight ? theme.chart4 : theme.chart2;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(fulcrumPx, centerY - 2);
        ctx.lineTo(px, centerY - 2);
        ctx.stroke();
      }
    }

    ctx.restore();
  }
}

// ----------------------------------------------------
// 1.3 VARIANCE SIMULATOR (Dynamic Squares & Springs)
// ----------------------------------------------------
export class VarianceSim {
  points: number[] = [2.0, 4.0, 4.0, 4.0, 5.0, 5.0, 7.0, 9.0];

  addPoint(val: number) {
    this.points.push(clamp(val, 1, 10));
  }

  reset() {
    this.points = [2.0, 4.0, 4.0, 4.0, 5.0, 5.0, 7.0, 9.0];
  }

  update() {}

  render(ctx: CanvasRenderingContext2D, width: number, height: number, theme: ThemeColors) {
    ctx.clearRect(0, 0, width, height);
    const isLight = document.documentElement.classList.contains('light');
    const textColor = isLight ? '#0f172a' : '#f8fafc';
    const subTextColor = isLight ? '#64748b' : '#94a3b8';

    const axisLeft = 60;
    const axisRight = width - 60;
    const axisWidth = axisRight - axisLeft;
    const axisY = height * 0.72;

    const getPx = (val: number) => axisLeft + ((val - 1) / 9) * axisWidth;

    const mu = this.points.length > 0 ? this.points.reduce((a, b) => a + b, 0) / this.points.length : 5;
    const ss = this.points.reduce((acc, x) => acc + Math.pow(x - mu, 2), 0);
    const varPop = this.points.length > 0 ? ss / this.points.length : 0;
    const sd = Math.sqrt(varPop);

    // Header info
    ctx.fillStyle = textColor;
    ctx.font = 'bold 15px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Geometrijski kvadrati odstopanj: Var(X) = 1/N ∑ (xᵢ - μ)²', axisLeft, 34);

    ctx.fillStyle = theme.primaryLight;
    ctx.font = 'bold 15px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`μ = ${mu.toFixed(2)} | Var = ${varPop.toFixed(2)} | σ = ${sd.toFixed(2)}`, axisRight, 34);

    // Axis line
    ctx.strokeStyle = isLight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(axisLeft, axisY);
    ctx.lineTo(axisRight, axisY);
    ctx.stroke();

    // Axis Numbers (1 to 10)
    for (let v = 1; v <= 10; v++) {
      const px = getPx(v);
      ctx.beginPath();
      ctx.moveTo(px, axisY - 5);
      ctx.lineTo(px, axisY + 5);
      ctx.stroke();

      ctx.fillStyle = subTextColor;
      ctx.font = '11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${v}`, px, axisY + 20);
    }

    // Mean vertical marker line
    const muPx = getPx(mu);
    ctx.save();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = theme.chart3;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(muPx, 60);
    ctx.lineTo(muPx, axisY + 30);
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = theme.chart3;
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Povprečje μ = ${mu.toFixed(2)}`, muPx, 55);

    // Draw Geometric Squares of deviation (x_i - mu)^2
    for (let i = 0; i < this.points.length; i++) {
      const p = this.points[i];
      const pPx = getPx(p);
      const devPx = pPx - muPx;
      const squareSize = Math.abs(devPx);

      // Draw square attached to deviation line
      ctx.save();
      ctx.fillStyle = p > mu ? 'rgba(99, 102, 241, 0.15)' : 'rgba(236, 72, 153, 0.15)';
      ctx.strokeStyle = p > mu ? theme.chart1 : theme.chart3;
      ctx.lineWidth = 1.5;

      const sqX = Math.min(muPx, pPx);
      const sqY = axisY - 15 - squareSize - (i % 3) * 6;

      ctx.fillRect(sqX, sqY, squareSize, squareSize);
      ctx.strokeRect(sqX, sqY, squareSize, squareSize);
      ctx.restore();

      // Point dot on the axis
      ctx.beginPath();
      ctx.arc(pPx, axisY, 6, 0, Math.PI * 2);
      ctx.fillStyle = theme.chart1;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Standard deviation bar [mu - sd, mu + sd]
    const sdLowPx = getPx(mu - sd);
    const sdHighPx = getPx(mu + sd);
    ctx.fillStyle = theme.chart4;
    ctx.fillRect(sdLowPx, axisY + 35, sdHighPx - sdLowPx, 8);
    ctx.fillStyle = theme.chart4;
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`±1σ interval [${(mu - sd).toFixed(2)}, ${(mu + sd).toFixed(2)}]`, muPx, axisY + 58);
  }
}
