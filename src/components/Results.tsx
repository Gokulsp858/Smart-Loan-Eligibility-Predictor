import React from 'react';
import { PredictionResult, ModelMetrics } from '../types/loan';
import { CheckCircle, XCircle, AlertTriangle, TrendingUp, TrendingDown, BarChart3, Target } from 'lucide-react';

interface ResultsProps {
  result: PredictionResult;
  metrics: ModelMetrics;
}

const Results: React.FC<ResultsProps> = ({ result, metrics }) => {
  const { eligible, confidence, riskScore, recommendation, factors } = result;

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceBgColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-100';
    if (confidence >= 0.6) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getRiskColor = (riskScore: number) => {
    if (riskScore <= 30) return 'text-green-600';
    if (riskScore <= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const MetricCard = ({ label, value, icon: Icon, color = 'text-blue-600' }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className={`text-2xl font-bold ${color}`}>{(value * 100).toFixed(1)}%</p>
        </div>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Main Result */}
      <div className={`p-6 rounded-xl border-2 ${eligible ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
        <div className="flex items-center gap-4">
          {eligible ? (
            <CheckCircle className="w-12 h-12 text-green-600" />
          ) : (
            <XCircle className="w-12 h-12 text-red-600" />
          )}
          <div>
            <h2 className={`text-2xl font-bold ${eligible ? 'text-green-800' : 'text-red-800'}`}>
              {eligible ? 'Loan Approved' : 'Loan Rejected'}
            </h2>
            <p className={`text-lg ${eligible ? 'text-green-700' : 'text-red-700'}`}>
              Confidence: {(confidence * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-xl ${getConfidenceBgColor(confidence)}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Confidence Score</h3>
            <Target className={`w-6 h-6 ${getConfidenceColor(confidence)}`} />
          </div>
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${
                  confidence >= 0.8 ? 'bg-green-500' :
                  confidence >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${confidence * 100}%` }}
              ></div>
            </div>
            <p className={`text-2xl font-bold mt-2 ${getConfidenceColor(confidence)}`}>
              {(confidence * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Risk Score</h3>
            <AlertTriangle className={`w-6 h-6 ${getRiskColor(riskScore)}`} />
          </div>
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${
                  riskScore <= 30 ? 'bg-green-500' :
                  riskScore <= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${riskScore}%` }}
              ></div>
            </div>
            <p className={`text-2xl font-bold mt-2 ${getRiskColor(riskScore)}`}>
              {riskScore.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <div className="p-6 rounded-xl bg-blue-50 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Recommendation</h3>
        <p className="text-blue-800">{recommendation}</p>
      </div>

      {/* Factors Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-green-50 border border-green-200">
          <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Positive Factors
          </h3>
          <ul className="space-y-2">
            {factors.positive.map((factor, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-green-800 text-sm">{factor}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-xl bg-red-50 border border-red-200">
          <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
            <TrendingDown className="w-5 h-5" />
            Risk Factors
          </h3>
          <ul className="space-y-2">
            {factors.negative.length > 0 ? (
              factors.negative.map((factor, index) => (
                <li key={index} className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-red-800 text-sm">{factor}</span>
                </li>
              ))
            ) : (
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-green-800 text-sm">No significant risk factors identified</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Model Performance */}
      <div className="p-6 rounded-xl bg-white border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Model Performance Metrics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <MetricCard 
            label="Accuracy" 
            value={metrics.accuracy} 
            icon={Target}
            color="text-blue-600"
          />
          <MetricCard 
            label="Precision" 
            value={metrics.precision} 
            icon={TrendingUp}
            color="text-green-600"
          />
          <MetricCard 
            label="Recall" 
            value={metrics.recall} 
            icon={TrendingDown}
            color="text-yellow-600"
          />
          <MetricCard 
            label="F1-Score" 
            value={metrics.f1Score} 
            icon={BarChart3}
            color="text-purple-600"
          />
          <MetricCard 
            label="AUC" 
            value={metrics.auc} 
            icon={TrendingUp}
            color="text-indigo-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Results;