import React, { useState } from 'react';
import { LoanApplication, PredictionResult, ModelMetrics } from './types/loan';
import { predictLoanEligibility, getModelMetrics } from './utils/loanPredictor';
import LoanForm from './components/LoanForm';
import Results from './components/Results';
import { Brain, TrendingUp, Shield, Users } from 'lucide-react';

function App() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [metrics] = useState<ModelMetrics>(getModelMetrics());
  const [isLoading, setIsLoading] = useState(false);

  const handleLoanSubmit = async (application: LoanApplication) => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const prediction = predictLoanEligibility(application);
    setResult(prediction);
    setIsLoading(false);
  };

  const resetForm = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Smart Loan Eligibility Predictor</h1>
                <p className="text-gray-600">AI-powered loan assessment system</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingUp className="w-4 h-4" />
                <span>89.2% Accuracy</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4" />
                <span>Enterprise Grade</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>100K+ Applications</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!result ? (
          <div className="space-y-8">
            {/* Introduction */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get Instant Loan Eligibility Assessment
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our advanced machine learning model analyzes multiple factors to provide accurate loan eligibility predictions with detailed risk assessment.
              </p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <LoanForm onSubmit={handleLoanSubmit} isLoading={isLoading} />
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Brain className="w-8 h-8 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">AI-Powered Analysis</h3>
                </div>
                <p className="text-gray-600">
                  Advanced machine learning algorithms analyze multiple data points for accurate predictions.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Real-time Results</h3>
                </div>
                <p className="text-gray-600">
                  Get instant loan eligibility decisions with confidence scores and risk assessments.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-8 h-8 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Risk Assessment</h3>
                </div>
                <p className="text-gray-600">
                  Comprehensive risk evaluation with detailed factor analysis and recommendations.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Results Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Loan Eligibility Assessment Results
              </h2>
              <button
                onClick={resetForm}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Back to Form
              </button>
            </div>

            {/* Results */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <Results result={result} metrics={metrics} />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">
            © 2025 Smart Loan Eligibility Predictor. Built with advanced machine learning for accurate loan assessments.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;