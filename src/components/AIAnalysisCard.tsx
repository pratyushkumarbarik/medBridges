import { useState } from "react";
import { Brain, CheckCircle, Clock, Loader2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { AIAnalysis } from '../types/MedicalDocumentTypes';

interface AIAnalysisCardProps {
  analysis: AIAnalysis;
}

export default function AIAnalysisCard({ analysis }: AIAnalysisCardProps) {
  const [expanded, setExpanded] = useState(false);

  const getStatusIcon = () => {
    switch (analysis.status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'processing': return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'failed': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusLabel = () => {
    switch (analysis.status) {
      case 'completed': return 'Completed';
      case 'processing': return 'Processing';
      case 'failed': return 'Failed';
      default: return 'Pending';
    }
  };

  const getClinicianLabel = () => {
    switch (analysis.clinicianReviewStatus) {
      case 'completed': return 'Reviewed';
      case 'in_progress': return 'In Progress';
      case 'reviewed': return 'Reviewed';
      default: return 'Not Started';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-teal-50 p-2 rounded-lg">
          <Brain className="w-5 h-5 text-teal-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">AI Analysis</h3>
          <p className="text-xs text-gray-500">
            {new Date(analysis.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {getStatusIcon()}
          <span className="text-sm font-medium text-gray-700">{getStatusLabel()}</span>
        </div>
      </div>

      {analysis.status === 'completed' && analysis.extractedInfo && (
        <div className="space-y-3 mb-4">
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Extracted Information</h4>
            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              {analysis.extractedInfo.patientName && (
                <p className="text-sm"><span className="text-gray-500">Patient:</span> {analysis.extractedInfo.patientName}</p>
              )}
              {analysis.extractedInfo.dateOfBirth && (
                <p className="text-sm"><span className="text-gray-500">DOB:</span> {analysis.extractedInfo.dateOfBirth}</p>
              )}
              {analysis.extractedInfo.diagnosis && analysis.extractedInfo.diagnosis.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-gray-500">Diagnosis:</p>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {analysis.extractedInfo.diagnosis.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                </div>
              )}
              {analysis.extractedInfo.medications && analysis.extractedInfo.medications.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-gray-500">Medications:</p>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {analysis.extractedInfo.medications.map((m, i) => <li key={i}>{m}</li>)}
                  </ul>
                </div>
              )}
              {analysis.extractedInfo.allergies && analysis.extractedInfo.allergies.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-gray-500">Allergies:</p>
                  <p className="text-sm text-gray-700">{analysis.extractedInfo.allergies.join(', ')}</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700"
            >
              Specialty Recommendations
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expanded && (
              <div className="mt-2 space-y-2">
                {analysis.specialtyRecommendations.map((rec, i) => (
                  <div key={i} className="bg-teal-50 border border-teal-100 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{rec.specialty}</span>
                      <span className="text-sm text-teal-600 font-medium">{rec.confidence}%</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{rec.reasoning}</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                      <div className="bg-teal-600 h-1.5 rounded-full" style={{ width: `${rec.confidence}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-xs text-yellow-800">{analysis.disclaimer}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Clinician Review:</span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              analysis.clinicianReviewStatus === 'completed' || analysis.clinicianReviewStatus === 'reviewed'
                ? 'bg-green-100 text-green-700'
                : analysis.clinicianReviewStatus === 'in_progress'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {getClinicianLabel()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
