import { LoanApplication, PredictionResult, ModelMetrics } from '../types/loan';

export function predictLoanEligibility(application: LoanApplication): PredictionResult {
  const {
    age,
    annualIncome,
    education,
    creditScore,
    employmentStatus,
    loanAmount,
    loanTerm,
    previousDefaults,
    hasCollateral,
    monthlyExpenses
  } = application;

  let score = 0;
  const factors = { positive: [], negative: [] };

  // Age factor (25-60 is ideal)
  if (age >= 25 && age <= 60) {
    score += 15;
    factors.positive.push('Age within ideal range (25-60)');
  } else if (age < 25) {
    score -= 10;
    factors.negative.push('Age below ideal range');
  } else {
    score -= 5;
    factors.negative.push('Age above ideal range');
  }

  // Income factor
  const debtToIncomeRatio = (loanAmount / loanTerm / 12) / (annualIncome / 12);
  if (debtToIncomeRatio < 0.3) {
    score += 25;
    factors.positive.push('Excellent debt-to-income ratio');
  } else if (debtToIncomeRatio < 0.4) {
    score += 15;
    factors.positive.push('Good debt-to-income ratio');
  } else if (debtToIncomeRatio < 0.5) {
    score += 5;
    factors.positive.push('Acceptable debt-to-income ratio');
  } else {
    score -= 20;
    factors.negative.push('High debt-to-income ratio');
  }

  // Education factor
  const educationScores = {
    'high_school': 5,
    'bachelor': 10,
    'master': 15,
    'phd': 20
  };
  score += educationScores[education];
  factors.positive.push(`Higher education: ${education.replace('_', ' ')}`);

  // Credit score factor
  if (creditScore >= 750) {
    score += 30;
    factors.positive.push('Excellent credit score (750+)');
  } else if (creditScore >= 700) {
    score += 20;
    factors.positive.push('Good credit score (700-749)');
  } else if (creditScore >= 650) {
    score += 10;
    factors.positive.push('Fair credit score (650-699)');
  } else if (creditScore >= 600) {
    score -= 10;
    factors.negative.push('Poor credit score (600-649)');
  } else {
    score -= 30;
    factors.negative.push('Very poor credit score (<600)');
  }

  // Employment status factor
  if (employmentStatus === 'employed') {
    score += 20;
    factors.positive.push('Stable employment');
  } else if (employmentStatus === 'self_employed') {
    score += 10;
    factors.positive.push('Self-employed');
  } else if (employmentStatus === 'retired') {
    score += 5;
    factors.positive.push('Retired with pension');
  } else {
    score -= 25;
    factors.negative.push('Unemployed');
  }

  // Previous defaults factor
  if (previousDefaults === 0) {
    score += 15;
    factors.positive.push('No previous defaults');
  } else if (previousDefaults === 1) {
    score -= 10;
    factors.negative.push('One previous default');
  } else {
    score -= 25;
    factors.negative.push('Multiple previous defaults');
  }

  // Collateral factor
  if (hasCollateral) {
    score += 15;
    factors.positive.push('Has collateral');
  }

  // Monthly expenses factor
  const expenseRatio = monthlyExpenses / (annualIncome / 12);
  if (expenseRatio < 0.5) {
    score += 10;
    factors.positive.push('Low monthly expenses');
  } else if (expenseRatio > 0.8) {
    score -= 15;
    factors.negative.push('High monthly expenses');
  }

  // Convert score to probability
  const probability = Math.max(0, Math.min(1, (score + 50) / 100));
  const eligible = probability >= 0.6;
  const confidence = probability;
  const riskScore = Math.max(0, Math.min(100, (1 - probability) * 100));

  let recommendation = '';
  if (eligible) {
    if (confidence >= 0.8) {
      recommendation = 'Highly recommended for approval. Low risk profile.';
    } else {
      recommendation = 'Recommended for approval with standard terms.';
    }
  } else {
    if (confidence < 0.4) {
      recommendation = 'High risk. Consider rejection or require additional collateral.';
    } else {
      recommendation = 'Consider approval with higher interest rate or stricter terms.';
    }
  }

  return {
    eligible,
    confidence,
    riskScore,
    recommendation,
    factors
  };
}

export function getModelMetrics(): ModelMetrics {
  // Simulated model performance metrics
  return {
    accuracy: 0.892,
    precision: 0.876,
    recall: 0.834,
    f1Score: 0.855,
    auc: 0.918
  };
}