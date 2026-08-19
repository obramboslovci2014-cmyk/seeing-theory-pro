export type ThemeName = 'indigo' | 'emerald' | 'violet' | 'rose' | 'amber' | 'zinc';

export interface ThemeColors {
  name: ThemeName;
  label: string;
  primary: string;
  primaryHover: string;
  primaryLight: string;
  accent: string;
  bgDark: string;
  cardDark: string;
  borderDark: string;
  textDark: string;
  canvasBgDark: string;
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
}

export interface POEOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface POEQuizData {
  question: string;
  prompt: string;
  options: POEOption[];
  insight: string;
  followUpExperiment: string;
}

export interface MathStep {
  title: string;
  latex: string;
  explanation: string;
}

export interface MiniJupyterConfig {
  language: 'python' | 'r';
  title: string;
  defaultCode: string;
  rCode?: string;
  description: string;
  runCode: (code: string, params?: Record<string, any>) => {
    output: string;
    metrics?: Record<string, number | string>;
    canvasPayload?: any;
    simState?: Record<string, any>;
  };
}

export interface MnemonicCard {
  eli5: string; // Preprosta razlaga z vsakdanjo prispodobo
  anchor: string; // Miselno sidro (kratko pravilo)
  fallacyWarning: {
    name: string;
    description: string;
    example: string;
  };
}

export type ExplanationDepth = 'simple' | 'deep' | 'math';

export interface ExplanationLevels {
  simpleQuote?: string; // Preprosta misel ali zlato pravilo
  simpleExplanation: string; // Razlaga za vsakogar skozi vsakdanje primere
  practicalInsight: string; // Kako to deluje v praksi in pri podatkih
  mathematicalTheory: string; // Matematični opis in definicije
}

// Backwards compatibility alias
export type TextbookWisdom = ExplanationLevels;

export interface UnitConfig {
  id: string;
  unitNumber: string; // e.g. "0.1", "1.1"
  chapterId: string;
  title: string;
  subtitle: string;
  leadParagraph: string;
  deepDive: string;
  mnemonic: MnemonicCard;
  explanationLevels?: ExplanationLevels;
  textbookWisdom?: ExplanationLevels;
  cueBannerText: string;
  hasSimulation?: boolean;
  poeQuiz?: POEQuizData;
  mathProof?: {
    summaryLatex: string;
    steps: MathStep[];
  };
  miniJupyter?: MiniJupyterConfig;
  initialParams?: Record<string, any>;
}

export interface ChapterConfig {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle?: string;
  description: string;
  iconName: string;
  color: string;
  units: UnitConfig[];
}

export interface CanvasEngineControls {
  addSample: (count?: number) => void;
  toggleAuto: (running?: boolean) => void;
  reset: () => void;
  setParam: (key: string, value: any) => void;
  getStats: () => Record<string, any>;
}

