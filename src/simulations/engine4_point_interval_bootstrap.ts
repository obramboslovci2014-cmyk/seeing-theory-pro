import { ThemeColors } from '../types';
import { randNormal, mean, median } from '../utils/mathHelpers';

// ----------------------------------------------------
// 4.1 POINT ESTIMATION (Target Shooter & Bias vs MSE)
// ----------------------------------------------------
export class PointEstimationSim {
  samples: { meanVal: number; medianVal: number }[] = [];
  trueTheta: number = 50;

  addSample(sampleSize: number = 25) {
    const vals: number[] = [];
    for (let i = 0; i < sampleSize; i++) {
      vals.push(randNormal(this.trueTheta, 8));
    }
    this.samples.push({
      meanVal: mean(vals),
      medianVal: median(vals),
    });
  }

  reset() {
    this.samples = [];
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
    ctx.fillText('Točkovno ocenjevanje: Nepristranskost & primerjava MSE (Povprečje vs. Mediana)', 25, 34);

    const axisLeft = 60;
    const axisRight = width - 60;
    const axisWidth = axisRight - axisLeft;

    const getX = (val: number) => axisLeft + ((val - 30) / 40) * axisWidth;

    const yMeanRow = height * 0.42;
    const yMedianRow = height * 0.68;

    // Draw Target Parameter θ Line
    const thetaX = getX(this.trueTheta);
    ctx.save();
    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = theme.chart3;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(thetaX, 55);
    ctx.lineTo(thetaX, height - 40);
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = theme.chart3;
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`Pravi θ = ${this.trueTheta}`, thetaX, 50);

    // 1. Mean Row Track
    ctx.fillStyle = textColor;
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Cenilka 1: Vzorčno povprečje X̄', axisLeft, yMeanRow - 25);

    ctx.strokeStyle = isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(axisLeft, yMeanRow);
    ctx.lineTo(axisRight, yMeanRow);
    ctx.stroke();

    // 2. Median Row Track
    ctx.fillStyle = textColor;
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.fillText('Cenilka 2: Vzorčna mediana M̃', axisLeft, yMedianRow - 25);

    ctx.beginPath();
    ctx.moveTo(axisLeft, yMedianRow);
    ctx.lineTo(axisRight, yMedianRow);
    ctx.stroke();

    // Plot Estimates Dots
    const allMeans = this.samples.map(s => s.meanVal);
    const allMedians = this.samples.map(s => s.medianVal);

    for (const s of this.samples) {
      // Mean dot
      ctx.beginPath();
      ctx.arc(getX(s.meanVal), yMeanRow, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(99, 102, 241, 0.4)';
      ctx.fill();

      // Median dot
      ctx.beginPath();
      ctx.arc(getX(s.medianVal), yMedianRow, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
      ctx.fill();
    }

    // Live Metrics Stats
    if (this.samples.length > 2) {
      const avgMean = mean(allMeans);
      const mseMean = mean(allMeans.map(m => Math.pow(m - this.trueTheta, 2)));

      const avgMedian = mean(allMedians);
      const mseMedian = mean(allMedians.map(m => Math.pow(m - this.trueTheta, 2)));

      ctx.fillStyle = theme.chart1;
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(
        `E[X̄] = ${avgMean.toFixed(2)} | MSE = ${mseMean.toFixed(3)}`,
        axisRight,
        yMeanRow - 25
      );

      ctx.fillStyle = theme.chart2;
      ctx.fillText(
        `E[M̃] = ${avgMedian.toFixed(2)} | MSE = ${mseMedian.toFixed(3)}`,
        axisRight,
        yMedianRow - 25
      );
    }
  }
}

// ----------------------------------------------------
// 4.2 INTERVAL ESTIMATION (Falling 95% CIs)
// ----------------------------------------------------
export class IntervalEstimationSim {
  intervals: { mean: number; lower: number; upper: number; captured: boolean }[] = [];
  trueMu: number = 50;
  confLevel: number = 0.95;

  addIntervals(count: number = 10) {
    const zCrit = 1.96; // 95%
    const sigma = 10;
    const n = 25;
    const se = sigma / Math.sqrt(n);

    for (let i = 0; i < count; i++) {
      const m = randNormal(this.trueMu, se);
      const lower = m - zCrit * se;
      const upper = m + zCrit * se;
      const captured = lower <= this.trueMu && this.trueMu <= upper;

      this.intervals.unshift({ mean: m, lower, upper, captured });
      if (this.intervals.length > 40) this.intervals.pop();
    }
  }

  reset() {
    this.intervals = [];
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
    ctx.fillText('Intervali zaupanja: 95 % naključnih intervalov ujame fiksno vrednost μ', 25, 34);

    const plotLeft = 60;
    const plotRight = width - 60;
    const plotWidth = plotRight - plotLeft;

    const getX = (val: number) => plotLeft + ((val - 35) / 30) * plotWidth;

    // True Mu Center Line
    const muPx = getX(this.trueMu);
    ctx.strokeStyle = theme.primary;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(muPx, 50);
    ctx.lineTo(muPx, height - 30);
    ctx.stroke();

    ctx.fillStyle = theme.primary;
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Pravi parameter μ = ${this.trueMu}`, muPx, 48);

    // Draw Falling Horizontal Intervals
    const startY = 65;
    const rowHeight = Math.min(18, (height - 110) / Math.max(1, this.intervals.length));

    let capturedCount = 0;

    this.intervals.forEach((ci, idx) => {
      const y = startY + idx * rowHeight;
      const x1 = getX(ci.lower);
      const x2 = getX(ci.upper);
      const mx = getX(ci.mean);

      if (ci.captured) capturedCount++;

      // Line
      ctx.strokeStyle = ci.captured ? theme.chart4 : theme.chart3; // Green vs Red
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1, y);
      ctx.lineTo(x2, y);
      ctx.stroke();

      // End caps
      ctx.beginPath();
      ctx.moveTo(x1, y - 3);
      ctx.lineTo(x1, y + 3);
      ctx.moveTo(x2, y - 3);
      ctx.lineTo(x2, y + 3);
      ctx.stroke();

      // Center point dot
      ctx.beginPath();
      ctx.arc(mx, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = ci.captured ? theme.chart4 : theme.chart3;
      ctx.fill();
    });

    // Coverage stats at top right
    const total = this.intervals.length;
    const rate = total > 0 ? (capturedCount / total) * 100 : 95.0;

    ctx.fillStyle = theme.chart4;
    ctx.font = 'bold 15px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(
      `Pokritost: ${capturedCount}/${total} (${rate.toFixed(1)}%)`,
      width - 30,
      34
    );
  }
}

// ----------------------------------------------------
// 4.3 THE BOOTSTRAP (Resampling with replacement)
// ----------------------------------------------------
export class BootstrapSim {
  originalSample: number[] = [22, 24, 25, 26, 28, 29, 31, 35, 42, 95];
  resampleMeans: number[] = [];

  addResamples(count: number = 50) {
    const n = this.originalSample.length;
    for (let b = 0; b < count; b++) {
      const res: number[] = [];
      for (let i = 0; i < n; i++) {
        const idx = Math.floor(Math.random() * n);
        res.push(this.originalSample[idx]);
      }
      this.resampleMeans.push(mean(res));
    }
  }

  reset() {
    this.resampleMeans = [];
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
    ctx.fillText('The Bootstrap: Ponovno vzorčenje z vračanjem (Resampling)', 25, 34);

    const axisLeft = 50;
    const axisRight = width - 40;
    const axisWidth = axisRight - axisLeft;

    const getX = (val: number) => axisLeft + ((val - 15) / 85) * axisWidth;

    // 1. Original Sample Display
    ctx.fillStyle = textColor;
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.fillText('Originalni vzorec (N = 10):', axisLeft, 68);

    this.originalSample.forEach((val) => {
      const px = getX(val);
      ctx.beginPath();
      ctx.arc(px, 90, 6, 0, Math.PI * 2);
      ctx.fillStyle = theme.chart1;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = subTextColor;
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${val}`, px, 110);
    });

    // 2. Bootstrap Resampling Distribution Histogram
    const histTop = 135;
    const histBottom = height - 50;
    const histHeight = histBottom - histTop;

    ctx.fillStyle = textColor;
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Bootstrap porazdelitev povprečij (B = ${this.resampleMeans.length}):`, axisLeft, histTop);

    // Build bins for resample means (range 20 to 60)
    const nBins = 25;
    const bins = new Array(nBins).fill(0);
    for (const m of this.resampleMeans) {
      const bIdx = Math.max(0, Math.min(nBins - 1, Math.floor(((m - 20) / 40) * nBins)));
      bins[bIdx]++;
    }
    const maxBin = Math.max(1, ...bins);
    const binW = (axisRight - axisLeft) / nBins;

    for (let i = 0; i < nBins; i++) {
      const bx = axisLeft + i * binW;
      const count = bins[i];
      const h = (count / maxBin) * (histHeight - 30);

      ctx.fillStyle = theme.chart2;
      ctx.fillRect(bx + 1, histBottom - h, binW - 2, h);
    }

    // Bootstrap SE and Confidence Interval
    if (this.resampleMeans.length > 10) {
      const bootMean = mean(this.resampleMeans);
      const sorted = [...this.resampleMeans].sort((a, b) => a - b);
      const q025 = sorted[Math.floor(sorted.length * 0.025)];
      const q975 = sorted[Math.floor(sorted.length * 0.975)];

      ctx.fillStyle = theme.chart3;
      ctx.font = 'bold 13px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(
        `Bootstrap Mean: ${bootMean.toFixed(2)} | 95% CI: [${q025.toFixed(1)}, ${q975.toFixed(1)}]`,
        axisRight,
        histTop
      );
    }
  }
}
