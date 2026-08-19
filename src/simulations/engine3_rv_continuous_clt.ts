import { ThemeColors } from '../types';
import { normalPdf, normalCdf } from '../utils/mathHelpers';

// ----------------------------------------------------
// 3.1 RANDOM VARIABLES & CDF (Step Function)
// ----------------------------------------------------
export class RandomVariablesSim {
  cutoffX: number = 7;
  // 2 Dice Sum probabilities (2 to 12)
  sums = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  pmf = [1/36, 2/36, 3/36, 4/36, 5/36, 6/36, 5/36, 4/36, 3/36, 2/36, 1/36];

  setCutoff(x: number) {
    this.cutoffX = x;
  }

  reset() {
    this.cutoffX = 7;
  }

  update() {}

  render(ctx: CanvasRenderingContext2D, width: number, height: number, theme: ThemeColors) {
    ctx.clearRect(0, 0, width, height);
    const isLight = document.documentElement.classList.contains('light');
    const textColor = isLight ? '#0f172a' : '#f8fafc';
    const subTextColor = isLight ? '#64748b' : '#94a3b8';
    const gridColor = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)';

    // Header
    ctx.fillStyle = textColor;
    ctx.font = 'bold 15px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Slučajna spremenljivka: CDF F(x) = P(X ≤ x) za vsoto dveh kock', 25, 34);

    const plotLeft = 60;
    const plotRight = width - 40;
    const plotWidth = plotRight - plotLeft;
    const plotTop = 60;
    const plotBottom = height - 60;
    const plotHeight = plotBottom - plotTop;

    const getX = (val: number) => plotLeft + ((val - 1) / 12) * plotWidth;
    const getY = (prob: number) => plotBottom - prob * plotHeight;

    // Grid lines for Y (0.0 to 1.0)
    for (let p = 0; p <= 1.0; p += 0.2) {
      const y = getY(p);
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(plotLeft, y);
      ctx.lineTo(plotRight, y);
      ctx.stroke();

      ctx.fillStyle = subTextColor;
      ctx.font = '10px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(p.toFixed(1), plotLeft - 8, y + 3);
    }

    // X Axis ticks
    for (let val = 1; val <= 13; val++) {
      const x = getX(val);
      ctx.fillStyle = subTextColor;
      ctx.font = '11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${val}`, x, plotBottom + 18);
    }

    // Step CDF drawing
    let cumProb = 0;
    let prevY = getY(0);

    ctx.strokeStyle = theme.primary;
    ctx.lineWidth = 3;
    ctx.beginPath();

    // Start before 2 at 0
    ctx.moveTo(getX(1), prevY);

    for (let i = 0; i < this.sums.length; i++) {
      const s = this.sums[i];
      const nextCum = cumProb + this.pmf[i];
      const stepX = getX(s);
      const nextY = getY(nextCum);

      // Horizontal segment to the step
      ctx.lineTo(stepX, prevY);
      // Vertical step jump
      ctx.lineTo(stepX, nextY);

      // Fill active area if <= cutoffX
      if (s <= this.cutoffX) {
        ctx.save();
        ctx.fillStyle = 'rgba(99, 102, 241, 0.15)';
        ctx.fillRect(getX(s - 1), getY(cumProb), stepX - getX(s - 1), plotBottom - getY(cumProb));
        ctx.restore();
      }

      cumProb = nextCum;
      prevY = nextY;
    }
    // Continue to end
    ctx.lineTo(getX(13), prevY);
    ctx.stroke();

    // Cutoff Marker Line
    const cutoffPx = getX(this.cutoffX);
    ctx.save();
    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = theme.chart3;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cutoffPx, plotTop);
    ctx.lineTo(cutoffPx, plotBottom);
    ctx.stroke();
    ctx.restore();

    // Cumulative Prob at Cutoff
    let totalAtCutoff = 0;
    for (let i = 0; i < this.sums.length; i++) {
      if (this.sums[i] <= this.cutoffX) totalAtCutoff += this.pmf[i];
    }

    ctx.fillStyle = theme.chart3;
    ctx.font = 'bold 15px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(
      `x = ${this.cutoffX.toFixed(1)} | F(${this.cutoffX.toFixed(1)}) = P(X ≤ ${this.cutoffX.toFixed(1)}) = ${(totalAtCutoff * 100).toFixed(1)}%`,
      plotRight,
      40
    );
  }
}

// ----------------------------------------------------
// 3.2 DISCRETE TO CONTINUOUS (Binomial into PDF)
// ----------------------------------------------------
export class DiscreteContinuousSim {
  n: number = 20;
  p: number = 0.5;
  intA: number = -1.0;
  intB: number = 1.0;

  setParams(n: number, intA: number, intB: number) {
    this.n = n;
    this.intA = intA;
    this.intB = intB;
  }

  reset() {
    this.n = 20;
    this.intA = -1.0;
    this.intB = 1.0;
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
    ctx.fillText('Prehod diskretno → zvezno: Normalna gostota & integral ploščine', 25, 34);

    const plotLeft = 50;
    const plotRight = width - 40;
    const plotWidth = plotRight - plotLeft;
    const plotBottom = height - 50;
    const plotHeight = height - 100;

    const getX = (z: number) => plotLeft + ((z + 3.5) / 7.0) * plotWidth;
    const getY = (pdf: number) => plotBottom - (pdf / 0.45) * plotHeight;

    // Draw Continuous Normal PDF curve & integral
    ctx.beginPath();
    for (let px = plotLeft; px <= plotRight; px++) {
      const z = -3.5 + ((px - plotLeft) / plotWidth) * 7.0;
      const pdf = normalPdf(z, 0, 1);
      const py = getY(pdf);
      if (px === plotLeft) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = theme.primaryLight;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Fill Integral Area under curve between [intA, intB]
    ctx.save();
    ctx.fillStyle = 'rgba(99, 102, 241, 0.3)';
    ctx.beginPath();
    const startX = getX(this.intA);
    const endX = getX(this.intB);
    ctx.moveTo(startX, plotBottom);

    for (let px = startX; px <= endX; px++) {
      const z = -3.5 + ((px - plotLeft) / plotWidth) * 7.0;
      const pdf = normalPdf(z, 0, 1);
      ctx.lineTo(px, getY(pdf));
    }
    ctx.lineTo(endX, plotBottom);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Draw Discrete Binomial histogram bars
    const mu = this.n * this.p;
    const sigma = Math.sqrt(this.n * this.p * (1 - this.p));

    for (let k = 0; k <= this.n; k++) {
      const z = (k - mu) / sigma;
      if (z >= -3.5 && z <= 3.5) {
        const barX = getX(z);
        const approxPdf = normalPdf(z, 0, 1);
        const barH = (approxPdf / 0.45) * plotHeight;
        const barW = Math.max(3, plotWidth / (this.n * 1.5));

        ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
        ctx.fillRect(barX - barW / 2, plotBottom - barH, barW, barH);
        ctx.strokeStyle = theme.chart2;
        ctx.lineWidth = 1;
        ctx.strokeRect(barX - barW / 2, plotBottom - barH, barW, barH);
      }
    }

    // Integral calculation
    const area = normalCdf(this.intB, 0, 1) - normalCdf(this.intA, 0, 1);

    ctx.fillStyle = theme.primaryLight;
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(
      `P(${this.intA.toFixed(1)} ≤ Z ≤ ${this.intB.toFixed(1)}) = ∫ f(z)dz = ${(area * 100).toFixed(2)}%`,
      plotRight,
      40
    );

    // Baseline axis
    ctx.strokeStyle = isLight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(plotLeft, plotBottom);
    ctx.lineTo(plotRight, plotBottom);
    ctx.stroke();

    for (let z = -3; z <= 3; z++) {
      const x = getX(z);
      ctx.fillStyle = subTextColor;
      ctx.font = '11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${z}σ`, x, plotBottom + 18);
    }
  }
}

// ----------------------------------------------------
// 3.3 CENTRAL LIMIT THEOREM & GALTON BOARD
// ----------------------------------------------------
export class GaltonBoardSim {
  balls: { x: number; y: number; vx: number; vy: number; settled: boolean; binIndex: number }[] = [];
  bins: number[] = new Array(15).fill(0);
  rows: number = 10;
  running: boolean = false;
  autoDropTimer: number = 0;

  constructor() {
    this.reset();
  }

  reset() {
    this.balls = [];
    this.bins = new Array(15).fill(0);
    this.running = false;
  }

  addBall(count: number = 1) {
    for (let i = 0; i < count; i++) {
      this.balls.push({
        x: 0.5 + (Math.random() - 0.5) * 0.02,
        y: 0.1,
        vx: 0,
        vy: 0.005 + Math.random() * 0.003,
        settled: false,
        binIndex: 7,
      });
    }
  }

  update() {
    for (const b of this.balls) {
      if (!b.settled) {
        b.y += b.vy;
        b.x += b.vx;
        b.vy += 0.0006; // gravity

        // Bounce left or right on pins
        const currentPinRow = Math.floor((b.y - 0.15) / 0.05);
        if (currentPinRow >= 0 && currentPinRow < this.rows) {
          if (Math.random() < 0.08) {
            b.vx = (Math.random() < 0.5 ? -1 : 1) * 0.004;
          }
        }

        // Settled into bottom bins
        if (b.y >= 0.70) {
          b.settled = true;
          const bIdx = Math.max(0, Math.min(14, Math.floor((b.x - 0.2) / (0.6 / 15))));
          b.binIndex = bIdx;
          this.bins[bIdx]++;
        }
      }
    }
  }

  render(ctx: CanvasRenderingContext2D, width: number, height: number, theme: ThemeColors) {
    ctx.clearRect(0, 0, width, height);
    const isLight = document.documentElement.classList.contains('light');
    const textColor = isLight ? '#0f172a' : '#f8fafc';
    const subTextColor = isLight ? '#64748b' : '#94a3b8';

    // Header
    ctx.fillStyle = textColor;
    ctx.font = 'bold 15px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Centralni limitni izrek (CLT): Galtonova deska & Gaussova zvonasta porazdelitev', 25, 34);

    const totalBalls = this.bins.reduce((a, b) => a + b, 0);
    ctx.fillStyle = theme.primaryLight;
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`Skupaj kroglic: ${totalBalls}`, width - 30, 34);

    // Draw Triangular Pin Grid (Pegs)
    const pinTopY = height * 0.18;
    const pinSpacingY = height * 0.048;
    const centerX = width * 0.5;

    for (let r = 0; r < this.rows; r++) {
      const pinsInRow = r + 1;
      const rowY = pinTopY + r * pinSpacingY;
      const startX = centerX - (r * 22) / 2;

      for (let p = 0; p < pinsInRow; p++) {
        const px = startX + p * 22;
        ctx.beginPath();
        ctx.arc(px, rowY, 3, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? '#64748b' : '#94a3b8';
        ctx.fill();
      }
    }

    // Draw Falling Balls
    for (const b of this.balls) {
      if (!b.settled) {
        ctx.beginPath();
        ctx.arc(b.x * width, b.y * height, 4, 0, Math.PI * 2);
        ctx.fillStyle = theme.chart1;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Draw Bottom Histogram Bins
    const binBottomY = height - 40;
    const binMaxHeight = height * 0.22;
    const maxBinCount = Math.max(1, ...this.bins);

    const binLeft = width * 0.2;
    const binWidth = (width * 0.6) / 15;

    for (let i = 0; i < 15; i++) {
      const count = this.bins[i];
      const h = (count / maxBinCount) * binMaxHeight;
      const bx = binLeft + i * binWidth;

      // Column bar
      ctx.fillStyle = theme.chart2;
      ctx.fillRect(bx + 1, binBottomY - h, binWidth - 2, h);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(bx + 1, binBottomY - h, binWidth - 2, h);

      // Separator pin
      ctx.strokeStyle = isLight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(bx, binBottomY - binMaxHeight);
      ctx.lineTo(bx, binBottomY);
      ctx.stroke();
    }

    // Overlay Theoretical Normal Bell Curve
    if (totalBalls > 15) {
      ctx.beginPath();
      ctx.strokeStyle = theme.chart3;
      ctx.lineWidth = 2.5;

      for (let px = binLeft; px <= binLeft + 15 * binWidth; px += 2) {
        const z = -3 + ((px - binLeft) / (15 * binWidth)) * 6;
        const pdf = normalPdf(z, 0, 1);
        const curveY = binBottomY - (pdf / 0.4) * binMaxHeight * (maxBinCount / Math.max(1, maxBinCount));
        if (px === binLeft) ctx.moveTo(px, curveY);
        else ctx.lineTo(px, curveY);
      }
      ctx.stroke();
    }
  }
}
