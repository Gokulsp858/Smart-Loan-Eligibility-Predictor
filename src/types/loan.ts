export interface LoanApplication {
  age: number;
  annualIncome: number;
  education: 'high_school' | 'bachelor' | 'master' | 'phd';
  creditScore: number;
  employmentStatus: 'employed' | 'self_employed' | 'unemployed' | 'retired';
  loanAmount: number;
  loanTerm: number;
  previousDefaults: number;
  hasCollateral: boolean;
  monthlyExpenses: number;
}

export interface PredictionResult {
  eligible: boolean;
  confidence: number;
  riskScore: number;
  recommendation: string;
  factors: {
    positive: string[];
    negative: string[];
  };
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  auc: number;
}