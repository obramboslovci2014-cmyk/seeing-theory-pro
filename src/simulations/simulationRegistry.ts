import { ThemeColors } from '../types';
import { THEMES } from '../utils/themeConfig';
import { ChanceEventsSim, ExpectationSim, VarianceSim } from './engine1_chance_expectation_variance';
import { SetTheorySim, CountingSim, ConditionalProbSim } from './engine2_set_counting_conditional';
import { RandomVariablesSim, DiscreteContinuousSim, GaltonBoardSim } from './engine3_rv_continuous_clt';
import { PointEstimationSim, IntervalEstimationSim, BootstrapSim } from './engine4_point_interval_bootstrap';
import { BayesMatrixSim, LikelihoodSim, PriorPosteriorSim } from './engine5_bayes_likelihood_posterior';
import { OLSSim, CorrelationSim, ANOVASim } from './engine6_ols_correlation_anova';

export class SimulationManager {
  currentUnitId: string = 'unit-1-1';
  theme: ThemeColors = THEMES.indigo;

  // Cached instances for all 18 units
  engine1_1 = new ChanceEventsSim();
  engine1_2 = new ExpectationSim();
  engine1_3 = new VarianceSim();

  engine2_1 = new SetTheorySim();
  engine2_2 = new CountingSim();
  engine2_3 = new ConditionalProbSim();

  engine3_1 = new RandomVariablesSim();
  engine3_2 = new DiscreteContinuousSim();
  engine3_3 = new GaltonBoardSim();

  engine4_1 = new PointEstimationSim();
  engine4_2 = new IntervalEstimationSim();
  engine4_3 = new BootstrapSim();

  engine5_1 = new BayesMatrixSim();
  engine5_2 = new LikelihoodSim();
  engine5_3 = new PriorPosteriorSim();

  engine6_1 = new OLSSim();
  engine6_2 = new CorrelationSim();
  engine6_3 = new ANOVASim();

  isAutoRunning: boolean = false;
  autoIntervalId: any = null;

  constructor(theme?: ThemeColors) {
    this.theme = theme || THEMES.indigo;
  }

  setUnit(unitId: string) {
    this.currentUnitId = unitId;
    this.stopAuto();
  }

  setTheme(theme?: ThemeColors) {
    this.theme = theme || THEMES.indigo;
  }

  addSample(count: number = 1) {
    switch (this.currentUnitId) {
      // Poglavje 1: Opisna statistika & Temeljni pojmi
      case 'unit-1-1':
        this.engine4_1.addSample(25);
        break;
      case 'unit-1-2':
        this.engine1_2.addWeight(1 + Math.floor(Math.random() * 6));
        break;
      case 'unit-1-3':
        this.engine1_3.addPoint(1 + Math.random() * 9);
        break;

      // Poglavje 2: Verjetnost & Naključje
      case 'unit-2-1':
        this.engine1_1.addFlip(this.engine1_1.p, count);
        break;
      case 'unit-2-2':
        this.engine1_1.addFlip(0.5, count * 10);
        break;
      case 'unit-2-3':
        this.engine1_1.addFlip(0.5, count);
        break;

      // Poglavje 3: Verjetnostne porazdelitve
      case 'unit-3-1':
        this.engine3_1.setCutoff(Math.min(12, this.engine3_1.cutoffX + 1));
        break;
      case 'unit-3-2':
        this.engine3_2.setParams(Math.min(100, this.engine3_2.n + 10), -1, 1);
        break;
      case 'unit-3-3':
        this.engine3_3.addBall(count * 15);
        break;

      // Poglavje 4: Pogojna verjetnost & Bayes
      case 'unit-4-1':
        this.engine2_1.generatePoints(count * 50);
        break;
      case 'unit-4-2':
        this.engine5_1.generatePopulation(1000);
        break;
      case 'unit-4-3':
        for (let i = 0; i < count * 3; i++) {
          this.engine5_3.addCoinFlip(Math.random() < 0.7);
        }
        break;

      // Poglavje 5: Statistično sklepanje & Intervali zaupanja
      case 'unit-5-1':
        this.engine4_1.addSample(25);
        break;
      case 'unit-5-2':
        this.engine4_2.addIntervals(count * 5);
        break;
      case 'unit-5-3':
        this.engine4_3.addResamples(count * 25);
        break;

      // Poglavje 6: Odnosi med podatki & Regresija
      case 'unit-6-1':
        this.engine6_2.reset();
        break;
      case 'unit-6-2':
        this.engine6_1.addPoint(1 + Math.random() * 8, 1 + Math.random() * 8);
        break;
      case 'unit-6-3':
        this.engine6_3.shiftGroup(0, (Math.random() - 0.5) * 4);
        break;
    }
  }

  toggleAuto(): boolean {
    if (this.isAutoRunning) {
      this.stopAuto();
      return false;
    } else {
      this.startAuto();
      return true;
    }
  }

  startAuto() {
    this.isAutoRunning = true;
    this.autoIntervalId = setInterval(() => {
      this.addSample(1);
    }, 150);
  }

  stopAuto() {
    this.isAutoRunning = false;
    if (this.autoIntervalId) {
      clearInterval(this.autoIntervalId);
      this.autoIntervalId = null;
    }
  }

  resetCurrent() {
    this.stopAuto();
    switch (this.currentUnitId) {
      case 'unit-1-1': this.engine4_1.reset(); break;
      case 'unit-1-2': this.engine1_2.reset(); break;
      case 'unit-1-3': this.engine1_3.reset(); break;
      case 'unit-2-1': this.engine1_1.reset(); break;
      case 'unit-2-2': this.engine1_1.reset(); break;
      case 'unit-2-3': this.engine1_1.reset(); break;
      case 'unit-3-1': this.engine3_1.reset(); break;
      case 'unit-3-2': this.engine3_2.reset(); break;
      case 'unit-3-3': this.engine3_3.reset(); break;
      case 'unit-4-1': this.engine2_1.reset(); break;
      case 'unit-4-2': this.engine5_1.reset(); break;
      case 'unit-4-3': this.engine5_3.reset(); break;
      case 'unit-5-1': this.engine4_1.reset(); break;
      case 'unit-5-2': this.engine4_2.reset(); break;
      case 'unit-5-3': this.engine4_3.reset(); break;
      case 'unit-6-1': this.engine6_2.reset(); break;
      case 'unit-6-2': this.engine6_1.reset(); break;
      case 'unit-6-3': this.engine6_3.reset(); break;
    }
  }

  update() {
    switch (this.currentUnitId) {
      case 'unit-1-1': this.engine4_1.update(); break;
      case 'unit-1-2': this.engine1_2.update(); break;
      case 'unit-1-3': this.engine1_3.update(); break;
      case 'unit-2-1': this.engine1_1.update(); break;
      case 'unit-2-2': this.engine1_1.update(); break;
      case 'unit-2-3': this.engine1_1.update(); break;
      case 'unit-3-1': this.engine3_1.update(); break;
      case 'unit-3-2': this.engine3_2.update(); break;
      case 'unit-3-3': this.engine3_3.update(); break;
      case 'unit-4-1': this.engine2_1.update(); break;
      case 'unit-4-2': this.engine5_1.update(); break;
      case 'unit-4-3': this.engine5_3.update(); break;
      case 'unit-5-1': this.engine4_1.update(); break;
      case 'unit-5-2': this.engine4_2.update(); break;
      case 'unit-5-3': this.engine4_3.update(); break;
      case 'unit-6-1': this.engine6_2.update(); break;
      case 'unit-6-2': this.engine6_1.update(); break;
      case 'unit-6-3': this.engine6_3.update(); break;
    }
  }

  render(ctx: CanvasRenderingContext2D, width: number, height: number) {
    const t = this.theme || THEMES.indigo;
    switch (this.currentUnitId) {
      case 'unit-1-1': this.engine4_1.render(ctx, width, height, t); break;
      case 'unit-1-2': this.engine1_2.render(ctx, width, height, t); break;
      case 'unit-1-3': this.engine1_3.render(ctx, width, height, t); break;
      case 'unit-2-1': this.engine1_1.render(ctx, width, height, t); break;
      case 'unit-2-2': this.engine1_1.render(ctx, width, height, t); break;
      case 'unit-2-3': this.engine1_1.render(ctx, width, height, t); break;
      case 'unit-3-1': this.engine3_1.render(ctx, width, height, t); break;
      case 'unit-3-2': this.engine3_2.render(ctx, width, height, t); break;
      case 'unit-3-3': this.engine3_3.render(ctx, width, height, t); break;
      case 'unit-4-1': this.engine2_1.render(ctx, width, height, t); break;
      case 'unit-4-2': this.engine5_1.render(ctx, width, height, t); break;
      case 'unit-4-3': this.engine5_3.render(ctx, width, height, t); break;
      case 'unit-5-1': this.engine4_1.render(ctx, width, height, t); break;
      case 'unit-5-2': this.engine4_2.render(ctx, width, height, t); break;
      case 'unit-5-3': this.engine4_3.render(ctx, width, height, t); break;
      case 'unit-6-1': this.engine6_2.render(ctx, width, height, t); break;
      case 'unit-6-2': this.engine6_1.render(ctx, width, height, t); break;
      case 'unit-6-3': this.engine6_3.render(ctx, width, height, t); break;
    }
  }

  handleCanvasClick(x: number, y: number, width: number, height: number) {
    switch (this.currentUnitId) {
      case 'unit-1-2': {
        const boardLeft = width * 0.12;
        const boardRight = width * 0.88;
        const boardWidth = boardRight - boardLeft;
        const val = 1 + Math.round(((x - boardLeft) / boardWidth) * 5);
        this.engine1_2.addWeight(val);
        break;
      }
      case 'unit-1-3': {
        const axisLeft = 60;
        const axisRight = width - 60;
        const val = 1 + ((x - axisLeft) / (axisRight - axisLeft)) * 9;
        this.engine1_3.addPoint(val);
        break;
      }
      case 'unit-4-1': {
        const modes: ('all' | 'unionAB' | 'intersectAB' | 'intersectABC' | 'compA')[] = [
          'unionAB', 'intersectAB', 'intersectABC', 'compA', 'all'
        ];
        const nextIdx = (modes.indexOf(this.engine2_1.selectedMode) + 1) % modes.length;
        this.engine2_1.setMode(modes[nextIdx]);
        break;
      }
      case 'unit-3-1': {
        const plotLeft = 60;
        const plotRight = width - 40;
        const cutoff = 1 + ((x - plotLeft) / (plotRight - plotLeft)) * 12;
        this.engine3_1.setCutoff(Math.max(1, Math.min(13, cutoff)));
        break;
      }
      case 'unit-6-2': {
        const plotLeft = 60;
        const plotRight = width - 50;
        const plotBottom = height - 50;
        const plotTop = 60;
        const ptX = ((x - plotLeft) / (plotRight - plotLeft)) * 10;
        const ptY = ((plotBottom - y) / (plotBottom - plotTop)) * 10;
        if (ptX >= 0 && ptX <= 10 && ptY >= 0 && ptY <= 10) {
          this.engine6_1.addPoint(ptX, ptY);
        }
        break;
      }
      default:
        this.addSample(1);
    }
  }
}
