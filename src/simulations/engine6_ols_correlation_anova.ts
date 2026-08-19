import { ThemeColors } from '../types';
import { linearRegression, oneWayAnova } from '../utils/mathHelpers';

// ----------------------------------------------------
// 6.1 ORDINARY LEAST SQUARES (OLS & Residual Squares)
// ----------------------------------------------------
export class OLSSim {
  points: { x: number; y: number }[] = [
    { x: 1.5, y: 2.2 },
    { x: 2.5, y: 3.8 },
    { x: 3.5, y: 3.5 },
    { x: 4.5, y: 5.2 },
    { x: 5.5, y: 6.0 },
    { x: 6.5, y: 7.2 },
    { x: 7.5, y: 7.0 },
    { x: 8.5, y: 8.8 },
  ];

  addPoint(x: number, y: number) {
    this.points.push({ x, y });
  }

  reset() {
    this.points = [
      { x: 1.5, y: 2.2 },
      { x: 2.5, y: 3.8 },
      { x: 3.5, y: 3.5 },
      { x: 4.5, y: 5.2 },
      { x: 5.5, y: 6.0 },
      { x: 6.5, y: 7.2 },
      { x: 7.5, y: 7.0 },
      { x: 8.5, y: 8.8 },
    ];
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
    ctx.fillText('Metoda najmanjših kvadratov (OLS): Minimizacija vsote kvadratov rezidualov ∑ (yᵢ - ŷᵢ)²', 25, 34);

    const plotLeft = 60;
    const plotRight = width - 50;
    const plotBottom = height - 50;
    const plotTop = 60;
    const plotWidth = plotRight - plotLeft;
    const plotHeight = plotBottom - plotTop;

    const getPx = (x: number) => plotLeft + (x / 10) * plotWidth;
    const getPy = (y: number) => plotBottom - (y / 10) * plotHeight;

    const reg = linearRegression(this.points);

    // Draw OLS Regression Line
    const x0 = 0;
    const y0 = reg.intercept;
    const x1 = 10;
    const y1 = reg.slope * 10 + reg.intercept;

    ctx.beginPath();
    ctx.strokeStyle = theme.primaryLight;
    ctx.lineWidth = 3;
    ctx.moveTo(getPx(x0), getPy(y0));
    ctx.lineTo(getPx(x1), getPy(y1));
    ctx.stroke();

    // Draw Vertical Residual Squares for each point
    let totalRSS = 0;
    for (const p of this.points) {
      const px = getPx(p.x);
      const py = getPy(p.y);
      const yPred = reg.slope * p.x + reg.intercept;
      const predPy = getPy(yPred);
      const residDiff = predPy - py;
      const squareSize = Math.abs(residDiff);

      totalRSS += Math.pow(p.y - yPred, 2);

      // Residual square box
      ctx.save();
      ctx.fillStyle = residDiff > 0 ? 'rgba(99, 102, 241, 0.15)' : 'rgba(236, 72, 153, 0.15)';
      ctx.strokeStyle = residDiff > 0 ? theme.chart1 : theme.chart3;
      ctx.lineWidth = 1;
      const sqX = px;
      const sqY = Math.min(py, predPy);
      ctx.fillRect(sqX, sqY, squareSize, squareSize);
      ctx.strokeRect(sqX, sqY, squareSize, squareSize);
      ctx.restore();

      // Vertical error line
      ctx.strokeStyle = theme.chart3;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px, predPy);
      ctx.stroke();

      // Data point dot
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fillStyle = theme.chart1;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Top Right Regression Analytics
    ctx.fillStyle = theme.primaryLight;
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(
      `ŷ = ${reg.intercept.toFixed(2)} + ${reg.slope.toFixed(2)}x | R² = ${reg.r2.toFixed(3)} | RSS = ${totalRSS.toFixed(2)}`,
      plotRight,
      34
    );

    // Axis numbers
    ctx.strokeStyle = isLight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(plotLeft, plotBottom);
    ctx.lineTo(plotRight, plotBottom);
    ctx.moveTo(plotLeft, plotBottom);
    ctx.lineTo(plotLeft, plotTop);
    ctx.stroke();

    for (let x = 0; x <= 10; x += 2) {
      ctx.fillStyle = subTextColor;
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${x}`, getPx(x), plotBottom + 16);
    }
  }
}

// ----------------------------------------------------
// 6.2 CORRELATION & COVARIANCE QUADRANTS
// ----------------------------------------------------
export class CorrelationSim {
  datasetType: 'linear' | 'parabola' | 'circle' = 'parabola';
  points: { x: number; y: number }[] = [];

  constructor() {
    this.setMode('parabola');
  }

  setMode(mode: 'linear' | 'parabola' | 'circle') {
    this.datasetType = mode;
    this.points = [];

    if (mode === 'parabola') {
      // Y = X^2 on [-3, 3] -> r = 0 but 100% dependent
      for (let x = -3; x <= 3; x += 0.25) {
        this.points.push({ x, y: x * x + (Math.random() - 0.5) * 0.2 });
      }
    } else if (mode === 'linear') {
      for (let x = -3; x <= 3; x += 0.25) {
        this.points.push({ x, y: 1.5 * x + (Math.random() - 0.5) * 1.5 });
      }
    } else {
      for (let angle = 0; angle < Math.PI * 2; angle += 0.2) {
        this.points.push({
          x: 2.5 * Math.cos(angle) + (Math.random() - 0.5) * 0.2,
          y: 2.5 * Math.sin(angle) + (Math.random() - 0.5) * 0.2,
        });
      }
    }
  }

  reset() {
    this.setMode(this.datasetType);
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
    ctx.fillText('Korelacija vs. Odvisnost: 4 kvadranti kovariance in protiprimer Y = X²', 25, 34);

    const centerX = width * 0.5;
    const centerY = height * 0.55;
    const scale = Math.min(width, height) * 0.08;

    const reg = linearRegression(this.points);

    // Draw 4 Covariance Quadrants
    ctx.strokeStyle = isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(30, centerY);
    ctx.lineTo(width - 30, centerY);
    ctx.moveTo(centerX, 60);
    ctx.lineTo(centerX, height - 30);
    ctx.stroke();

    // Quadrant signs (+ / -)
    ctx.font = 'bold 12px monospace';
    ctx.fillStyle = 'rgba(16, 185, 129, 0.4)'; // green positive
    ctx.fillText('(+) Q1: (x-x̄)(y-ȳ) > 0', centerX + 40, centerY - 60);
    ctx.fillText('(+) Q3: (x-x̄)(y-ȳ) > 0', centerX - 180, centerY + 60);

    ctx.fillStyle = 'rgba(244, 63, 94, 0.4)'; // red negative
    ctx.fillText('(-) Q2: (x-x̄)(y-ȳ) < 0', centerX - 180, centerY - 60);
    ctx.fillText('(-) Q4: (x-x̄)(y-ȳ) < 0', centerX + 40, centerY + 60);

    // Plot Points
    for (const p of this.points) {
      const px = centerX + p.x * scale;
      const py = centerY - (p.y - reg.meanY) * scale;

      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fillStyle = theme.chart1;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Correlation Metric Display
    ctx.fillStyle = theme.chart3;
    ctx.font = 'bold 17px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`Pearsonov r = ${reg.r.toFixed(3)}`, width - 30, 34);

    ctx.fillStyle = subTextColor;
    ctx.font = '12px system-ui, sans-serif';
    ctx.fillText(
      this.datasetType === 'parabola'
        ? 'Parabola Y = X²: Popolna odvisnost, toda r = 0.00!'
        : 'Linearna zveza',
      width - 30,
      56
    );
  }
}

// ----------------------------------------------------
// 6.3 ANALYSIS OF VARIANCE (ANOVA & Fisher's F-Meter)
// ----------------------------------------------------
export class ANOVASim {
  groups: number[][] = [
    [24, 28, 26, 30, 27], // Group A
    [31, 35, 34, 32, 38], // Group B
    [18, 22, 19, 21, 20], // Group C
  ];

  shiftGroup(groupIdx: number, delta: number) {
    this.groups[groupIdx] = this.groups[groupIdx].map(v => v + delta);
  }

  reset() {
    this.groups = [
      [24, 28, 26, 30, 27],
      [31, 35, 34, 32, 38],
      [18, 22, 19, 21, 20],
    ];
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
    ctx.fillText('Analiza variance (ANOVA): F = MS(Med skupinami) / MS(Znotraj skupin)', 25, 34);

    const anova = oneWayAnova(this.groups);

    // Left 3 Groups Column Strip
    const colLeft = width * 0.12;
    const colSpacing = width * 0.18;
    const colBottom = height - 50;
    const getPy = (val: number) => colBottom - (val / 50) * (height - 110);

    const groupNames = ['Skupina A', 'Skupina B', 'Skupina C'];
    const groupColors = [theme.chart1, theme.chart2, theme.chart3];

    // Grand Mean horizontal line
    const grandMeanPy = getPy(anova.grandMean);
    ctx.save();
    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = isLight ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(colLeft - 30, grandMeanPy);
    ctx.lineTo(colLeft + 2 * colSpacing + 30, grandMeanPy);
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = subTextColor;
    ctx.font = '11px monospace';
    ctx.fillText(`Grand Mean: ${anova.grandMean.toFixed(1)}`, colLeft + 2 * colSpacing + 35, grandMeanPy + 4);

    this.groups.forEach((grp, gIdx) => {
      const gx = colLeft + gIdx * colSpacing;
      const gMean = grp.reduce((a, b) => a + b, 0) / grp.length;
      const meanPy = getPy(gMean);

      // Group title & Mean bar
      ctx.fillStyle = textColor;
      ctx.font = 'bold 13px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(groupNames[gIdx], gx, colBottom + 22);

      // Group mean tick
      ctx.fillStyle = groupColors[gIdx];
      ctx.fillRect(gx - 25, meanPy - 2, 50, 4);

      // Group points
      grp.forEach(val => {
        const py = getPy(val);
        ctx.beginPath();
        ctx.arc(gx, py, 6, 0, Math.PI * 2);
        ctx.fillStyle = groupColors[gIdx];
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
    });

    // Right Side Fisher F-Ratio Meter
    const meterX = width * 0.76;
    const meterY = height * 0.52;
    const meterR = 65;

    ctx.fillStyle = textColor;
    ctx.font = 'bold 14px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Fisherjev F-Merilnik:', meterX, meterY - 80);

    // Gauge Arc (Green to Red)
    ctx.beginPath();
    ctx.arc(meterX, meterY, meterR, Math.PI * 0.8, Math.PI * 2.2);
    ctx.strokeStyle = isLight ? '#cbd5e1' : '#334155';
    ctx.lineWidth = 14;
    ctx.stroke();

    // Gauge Needle
    const clampedF = Math.min(50, anova.fStat);
    const needleAngle = Math.PI * 0.8 + (clampedF / 50) * (Math.PI * 1.4);

    ctx.strokeStyle = theme.chart3;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(meterX, meterY);
    ctx.lineTo(meterX + Math.cos(needleAngle) * (meterR - 10), meterY + Math.sin(needleAngle) * (meterR - 10));
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(meterX, meterY, 6, 0, Math.PI * 2);
    ctx.fillStyle = theme.chart3;
    ctx.fill();

    // Metrics text
    ctx.fillStyle = theme.primaryLight;
    ctx.font = 'bold 20px monospace';
    ctx.fillText(`F = ${anova.fStat.toFixed(2)}`, meterX, meterY + 45);

    ctx.fillStyle = anova.pValue < 0.05 ? theme.chart4 : theme.chart5;
    ctx.font = 'bold 12px monospace';
    ctx.fillText(`p = ${anova.pValue < 0.001 ? '< 0.001' : anova.pValue.toFixed(4)}`, meterX, meterY + 65);
  }
}
