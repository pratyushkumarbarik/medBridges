import { useState, useEffect } from 'react';
import { Brain, Loader2, CheckCircle, Clock, AlertCircle, FileText } from 'lucide-react';
import AIAnalysisCard from '../components/AIAnalysisCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { AIAnalysis } from '../types/MedicalDocumentTypes';

export default function AIAnalysisPage() {
  const [analyses, setAnalyses] = useState<AIAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnalyses([
        {
          id: 'ai_001',
          documentId: 'doc_001',
          status: 'completed',
          extractedInfo: {
            patientName: 'John Doe',
            dateOfBirth: '1985-06-15',
            diagnosis: ['Mild hypertension', 'Elevated cholesterol'],
            medications: ['Lisinopril 10mg', 'Atorvastatin 20mg'],
            allergies: ['Penicillin', 'Shellfish'],
            procedures: ['Blood panel', 'ECG'],
          },
          specialtyRecommendations: [
            { specialty: 'Cardiology', confidence: 92, reasoning: 'Hypertension indicators suggest cardiac monitoring' },
            { specialty: 'Internal Medicine', confidence: 78, reasoning: 'Multiple systemic markers requiring comprehensive review' },
            { specialty: 'Endocrinology', confidence: 65, reasoning: 'Cholesterol management may benefit from endocrine evaluation' },
          ],
          disclaimer: 'AI analysis is for informational purposes only and does not diagnose or prescribe treatment. Results must be reviewed by a licensed clinician before any medical decisions.',
          clinicianReviewStatus: 'reviewed',
          createdAt: '2025-09-15T10:00:00Z',
          completedAt: '2025-09-15T10:05:00Z',
        },
        {
          id: 'ai_002',
          documentId: 'doc_002',
          status: 'completed',
          extractedInfo: {
            patientName: 'John Doe',
            dateOfBirth: '1985-06-15',
            diagnosis: ['No acute findings'],
            medications: [],
            allergies: ['Penicillin'],
          },
          specialtyRecommendations: [
            { specialty: 'Radiology', confidence: 88, reasoning: 'Imaging shows normal chest structure' },
          ],
          disclaimer: 'AI analysis is for informational purposes only and does not diagnose or prescribe treatment. Results must be reviewed by a licensed clinician.',
          clinicianReviewStatus: 'completed',
          createdAt: '2025-09-10T08:00:00Z',
          completedAt: '2025-09-10T08:03:00Z',
        },
        {
          id: 'ai_003',
          documentId: 'doc_003',
          status: 'processing',
          specialtyRecommendations: [],
          disclaimer: 'AI analysis is for informational purposes only and does not diagnose or prescribe treatment.',
          clinicianReviewStatus: 'not_started',
          createdAt: new Date().toISOString(),
        },
      ]);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleNewAnalysis = async () => {
    setProcessingId('new');
    setError('');
    await new Promise((r) => setTimeout(r, 2000));
    const newAnalysis: AIAnalysis = {
      id: `ai_${Date.now()}`,
      documentId: 'doc_new',
      status: 'completed',
      extractedInfo: {
        patientName: 'John Doe',
        dateOfBirth: '1985-06-15',
        diagnosis: ['Routine checkup - normal findings'],
        medications: [],
        allergies: ['Penicillin'],
      },
      specialtyRecommendations: [
        { specialty: 'General Practice', confidence: 95, reasoning: 'Routine health check shows normal results' },
      ],
      disclaimer: 'AI analysis is for informational purposes only and does not diagnose or prescribe treatment. Results must be reviewed by a licensed clinician.',
      clinicianReviewStatus: 'not_started',
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    };
    setAnalyses((prev) => [newAnalysis, ...prev]);
    setProcessingId(null);
  };

  if (loading) return <LoadingSpinner size="lg" text="Loading AI analyses..." />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Analysis</h1>
          <p className="text-sm text-gray-500 mt-1">Process and analyze your medical documents</p>
        </div>
        <button
          onClick={handleNewAnalysis}
          disabled={processingId !== null}
          className="bg-teal-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-teal-700 transition-colors flex items-center gap-2 text-sm disabled:opacity-50"
        >
          {processingId && <Loader2 className="w-4 h-4 animate-spin" />}
          {processingId ? 'Processing...' : 'New Analysis'}
        </button>
      </div>

      {error && <ErrorMessage message={error} type="error" onDismiss={() => setError('')} />}

      {/* Disclaimer Banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-yellow-800">Important Disclaimer</h3>
            <p className="text-sm text-yellow-700 mt-1">
              Medibridges AI analysis is for informational purposes only and does not diagnose or prescribe treatment.
              All results must be reviewed by a licensed clinician before making any medical decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Analyses', value: analyses.length.toString(), icon: Brain, color: 'bg-teal-50 text-teal-600' },
          { label: 'Completed', value: analyses.filter((a) => a.status === 'completed').length.toString(), icon: CheckCircle, color: 'bg-green-50 text-green-600' },
          { label: 'Processing', value: analyses.filter((a) => a.status === 'processing').length.toString(), icon: Clock, color: 'bg-blue-50 text-blue-600' },
          { label: 'Clinician Reviewed', value: analyses.filter((a) => a.clinicianReviewStatus === 'reviewed' || a.clinicianReviewStatus === 'completed').length.toString(), icon: FileText, color: 'bg-purple-50 text-purple-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Analysis List */}
      {analyses.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <Brain className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No AI analyses yet</p>
          <p className="text-sm text-gray-400 mt-1">Upload documents to get AI-powered analysis</p>
        </div>
      ) : (
        <div className="space-y-4">
          {analyses.map((analysis) => (
            <AIAnalysisCard key={analysis.id} analysis={analysis} />
          ))}
        </div>
      )}
    </div>
  );
}
