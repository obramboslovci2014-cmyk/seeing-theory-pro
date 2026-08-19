import { ThemeColors } from '../types';
import { betaPdf } from '../utils/mathHelpers';

// ----------------------------------------------------
// 5.1 BAYES' THEOREM (1000-dot Population Matrix)
// ----------------------------------------------------
export class BayesMatrixSim {
  prevalence: number = 0.02; // 2%
  sensitivity: number = 0.95; // 95%
  falsePositiveRate: number = 0.05; // 5%
  dots: { hasDisease: boolean; testPositive: boolean }[] = [];

  constructor() {
    this.generatePopulation(1000);
  }

  generatePopulation(n: number = 1000) {
    this.dots = [];
    for (let i = 0; i < n; i++) {
      const hasDisease = Math.random() < this.prevalence;
      const testPositive = hasDisease
        ? Math.random() < this.sensitivity
        : Math.random() < this.falsePositiveRate;

      this.dots.push({ hasDisease, testPositive });
    }
  }

  setParams(prev: number, sens: number, fpr: number) {
    this.prevalence = prev;
    this.sensitivity = sens;
    this.falsePositiveRate = fpr;
    this.generatePopulation(1000);
  }

  reset() {
    this.generatePopulation(1000);
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
    ctx.fillText("Bayesov izrek & populacijska matrika 1.000 oseb: P(Bolezen | +)", 25, 34);

    const matrixLeft = 40;
    const matrixTop = 60;
    const cols = 40;
    const rows = 25;
    const cellW = (width * 0.52) / cols;
    const cellH = (height - 110) / rows;

    let truePositives = 0;
    let falsePositives = 0;
    let trueNegatives = 0;
    let falseNegatives = 0;

    // Draw 1000 Dots Matrix
    for (let i = 0; i < this.dots.length; i++) {
      const d = this.dots[i];
      const r = Math.floor(i / cols);
      const c = i % cols;
      const x = matrixLeft + c * cellW;
      const y = matrixTop + r * cellH;

      if (d.hasDisease && d.testPositive) {
        truePositives++;
        ctx.fillStyle = theme.chart3; // Pink True Positive
      } else if (!d.hasDisease && d.testPositive) {
        falsePositives++;
        ctx.fillStyle = theme.chart5; // Amber False Positive
      } else if (d.hasDisease && !d.testPositive) {
        falseNegatives++;
        ctx.fillStyle = '#9333ea';
      } else {
        trueNegatives++;
        ctx.fillStyle = isLight ? 'rgba(148, 163, 184, 0.25)' : 'rgba(71, 85, 105, 0.3)';
      }

      ctx.beginPath();
      ctx.arc(x, y, d.testPositive ? 4.5 : 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Right Side Matrix Legend & Bayesian Computation
    const statsX = matrixLeft + width * 0.52 + 30;
    let sy = 75;

    ctx.fillStyle = textColor;
    ctx.font = 'bold 15px system-ui, sans-serif';
    ctx.fillText('Diagnostični razcep (N = 1.000):', statsX, sy);

    sy += 28;
    ctx.fillStyle = theme.chart3;
    ctx.font = '13px monospace';
    ctx.fillText(`● Resnično bolni in pozitivni (+): ${truePositives}`, statsX, sy);

    sy += 24;
    ctx.fillStyle = theme.chart5;
    ctx.fillText(`● Zdravi, a lažno pozitivni (+):   ${falsePositives}`, statsX, sy);

    sy += 24;
    ctx.fillStyle = subTextColor;
    ctx.fillText(`● Pravilno negativni (-):          ${trueNegatives}`, statsX, sy);

    // Posterior Probability Calculation
    const totalPositive = truePositives + falsePositives;
    const postProb = totalPositive > 0 ? (truePositives / totalPositive) * 100 : 0;

    sy += 40;
    ctx.fillStyle = theme.chart3;
    ctx.font = 'bold 18px monospace';
    ctx.fillText(`P(Bolezen | +) = ${postProb.toFixed(1)}%`, statsX, sy);

    sy += 22;
    ctx.fillStyle = subTextColor;
    ctx.font = '12px system-ui, sans-serif';
    ctx.fillText(`= ${truePositives} / (${truePositives} + ${falsePositives})`, statsX, sy);
    sy += 20;
    ctx.fillText('Baznocenostna past: večina pozitivnih testov je lažnih alarmov!', statsX, sy);
  }
}

// ----------------------------------------------------
// 5.2 LIKELIHOOD FUNCTION & MLE (Interactive θ slider)
// ----------------------------------------------------
export class LikelihoodSim {
  k: number = 7;
  n: number = 10;
  theta: number = 0.5;

  setTheta(t: number) {
    this.theta = t;
  }

  setSample(k: number, n: number) {
    this.k = k;
    this.n = n;
  }

  reset() {
    this.k = 7;
    this.n = 10;
    this.theta = 0.5;
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
    ctx.fillText('Funkcija verjetja & MLE: L(θ | x) = θᵏ (1 - θ)ⁿ⁻ᵏ', 25, 34);

    const plotLeft = 60;
    const plotRight = width - 50;
    const plotWidth = plotRight - plotLeft;
    const plotBottom = height - 55;
    const plotHeight = height - 110;

    const getX = (t: number) => plotLeft + t * plotWidth;

    // Compute maximum likelihood for normalization
    const mleTheta = this.k / this.n;
    const maxLik = Math.pow(mleTheta, this.k) * Math.pow(1 - mleTheta, this.n - this.k);

    const getY = (lik: number) => plotBottom - (lik / (maxLik * 1.15)) * plotHeight;

    // Draw Grid
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    for (let t = 0; t <= 1.0; t += 0.2) {
      const x = getX(t);
      ctx.beginPath();
      ctx.moveTo(x, 60);
      ctx.lineTo(x, plotBottom);
      ctx.stroke();

      ctx.fillStyle = subTextColor;
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(t.toFixed(1), x, plotBottom + 18);
    }

    // Draw Likelihood Curve L(theta)
    ctx.beginPath();
    ctx.strokeStyle = theme.primaryLight;
    ctx.lineWidth = 3;

    for (let px = plotLeft; px <= plotRight; px++) {
      const t = (px - plotLeft) / plotWidth;
      const lik = Math.pow(t, this.k) * Math.pow(1 - t, this.n - this.k);
      const py = getY(lik);
      if (px === plotLeft) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // MLE Peak Point marker
    const mleX = getX(mleTheta);
    const mleY = getY(maxLik);

    ctx.save();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = theme.chart3;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(mleX, 60);
    ctx.lineTo(mleX, plotBottom);
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = theme.chart3;
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`MLE θ̂ = ${mleTheta.toFixed(2)}`, mleX, 55);

    // Current Selected θ on Slider
    const currentLik = Math.pow(this.theta, this.k) * Math.pow(1 - this.theta, this.n - this.k);
    const curX = getX(this.theta);
    const curY = getY(currentLik);

    ctx.beginPath();
    ctx.arc(curX, curY, 7, 0, Math.PI * 2);
    ctx.fillStyle = theme.primary;
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Top Right Metric Info
    ctx.fillStyle = textColor;
    ctx.font = 'bold 15px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(
      `Podatki: ${this.k}/${this.n} cifer | Izbrani θ = ${this.theta.toFixed(2)} | L(θ) = ${(currentLik * 1000).toFixed(3)}‰`,
      plotRight,
      34
    );
  }
}

// ----------------------------------------------------
// 5.3 PRIOR TO POSTERIOR (Beta-Binomial Conjugate)
// ----------------------------------------------------
export class PriorPosteriorSim {
  alphaPrior: number = 2;
  betaPrior: number = 2;
  heads: number = 8;
  tails: number = 2;

  addCoinFlip(isHead: boolean) {
    if (isHead) this.heads++;
    else this.tails++;
  }

  reset() {
    this.alphaPrior = 2;
    this.betaPrior = 2;
    this.heads = 0;
    this.tails = 0;
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
    ctx.fillText('Prior v Posterior: Beta(α + k, β + n - k) konjugirana posodobitev', 25, 34);

    const plotLeft = 60;
    const plotRight = width - 40;
    const plotWidth = plotRight - plotLeft;
    const plotBottom = height - 55;
    const plotHeight = height - 110;

    const getX = (t: number) => plotLeft + t * plotWidth;

    const alphaPost = this.alphaPrior + this.heads;
    const betaPost = this.betaPrior + this.tails;

    // Draw Prior Curve (Beta prior) - dashed blue
    ctx.beginPath();
    ctx.strokeStyle = isLight ? 'rgba(99, 102, 241, 0.5)' : 'rgba(99, 102, 241, 0.5)';
    ctx.lineWidth = 2;
    ctx.save();
    ctx.setLineDash([5, 4]);

    for (let px = plotLeft + 1; px < plotRight; px++) {
      const t = (px - plotLeft) / plotWidth;
      const pdf = betaPdf(t, this.alphaPrior, this.betaPrior);
      const py = plotBottom - (pdf / 5.5) * plotHeight;
      if (px === plotLeft + 1) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.restore();

    // Draw Posterior Curve (Beta posterior) - solid vibrant
    ctx.beginPath();
    ctx.strokeStyle = theme.primaryLight;
    ctx.lineWidth = 3;

    for (let px = plotLeft + 1; px < plotRight; px++) {
      const t = (px - plotLeft) / plotWidth;
      const pdf = betaPdf(t, alphaPost, betaPost);
      const py = plotBottom - (pdf / 5.5) * plotHeight;
      if (px === plotLeft + 1) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Legend & Stats at Top Right
    const priorMean = this.alphaPrior / (this.alphaPrior + this.betaPrior);
    const postMean = alphaPost / (alphaPost + betaPost);

    ctx.fillStyle = theme.chart1;
    ctx.font = '12px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`-- Prior: Beta(${this.alphaPrior}, ${this.betaPrior}) [Mean: ${priorMean.toFixed(2)}]`, plotRight, 60);

    ctx.fillStyle = theme.primaryLight;
    ctx.font = 'bold 13px monospace';
    ctx.fillText(`— Posterior: Beta(${alphaPost}, ${betaPost}) [Mean: ${postMean.toFixed(2)}]`, plotRight, 80);

    ctx.fillStyle = subTextColor;
    ctx.font = '12px system-ui, sans-serif';
    ctx.fillText(`Novi podatki: +${this.heads} cifer (H), +${this.tails} grbov (T)`, plotRight, 100);
  }
}
