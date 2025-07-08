import React, { useState } from 'react';
import { LoanApplication } from '../types/loan';
import { User, DollarSign, GraduationCap, CreditCard, Briefcase, Calendar, TrendingUp, AlertCircle } from 'lucide-react';

interface LoanFormProps {
  onSubmit: (application: LoanApplication) => void;
  isLoading: boolean;
}

const LoanForm: React.FC<LoanFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<LoanApplication>({
    age: 35,
    annualIncome: 75000,
    education: 'bachelor',
    creditScore: 720,
    employmentStatus: 'employed',
    loanAmount: 250000,
    loanTerm: 15,
    previousDefaults: 0,
    hasCollateral: false,
    monthlyExpenses: 3000
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof LoanApplication, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Personal Information
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
            <input
              type="number"
              min="18"
              max="80"
              value={formData.age}
              onChange={(e) => handleChange('age', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Education Level</label>
            <select
              value={formData.education}
              onChange={(e) => handleChange('education', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="high_school">High School</option>
              <option value="bachelor">Bachelor's Degree</option>
              <option value="master">Master's Degree</option>
              <option value="phd">PhD</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Employment Status</label>
            <select
              value={formData.employmentStatus}
              onChange={(e) => handleChange('employmentStatus', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="employed">Employed</option>
              <option value="self_employed">Self-Employed</option>
              <option value="unemployed">Unemployed</option>
              <option value="retired">Retired</option>
            </select>
          </div>
        </div>

        {/* Financial Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            Financial Information
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income ($)</label>
            <input
              type="number"
              min="0"
              step="1000"
              value={formData.annualIncome}
              onChange={(e) => handleChange('annualIncome', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Credit Score</label>
            <input
              type="number"
              min="300"
              max="850"
              value={formData.creditScore}
              onChange={(e) => handleChange('creditScore', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Expenses ($)</label>
            <input
              type="number"
              min="0"
              step="100"
              value={formData.monthlyExpenses}
              onChange={(e) => handleChange('monthlyExpenses', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
          </div>
        </div>

        {/* Loan Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-purple-600" />
            Loan Details
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount ($)</label>
            <input
              type="number"
              min="1000"
              step="1000"
              value={formData.loanAmount}
              onChange={(e) => handleChange('loanAmount', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Loan Term (years)</label>
            <input
              type="number"
              min="1"
              max="30"
              value={formData.loanTerm}
              onChange={(e) => handleChange('loanTerm', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
          </div>
        </div>

        {/* Risk Factors */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            Risk Assessment
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Previous Defaults</label>
            <input
              type="number"
              min="0"
              max="10"
              value={formData.previousDefaults}
              onChange={(e) => handleChange('previousDefaults', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="collateral"
              checked={formData.hasCollateral}
              onChange={(e) => handleChange('hasCollateral', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="collateral" className="text-sm font-medium text-gray-700">
              Has Collateral
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-6">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Analyzing...
            </>
          ) : (
            <>
              <TrendingUp className="w-5 h-5" />
              Predict Loan Eligibility
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default LoanForm;