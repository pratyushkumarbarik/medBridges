import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Activity, FileText, Brain, Building2, Calendar, TrendingUp } from 'lucide-react';
import { mockCurrentUser } from '../data/mockUsers';
import { mockHospitals } from '../data/mockHospitals';
import { mockConsultations } from '../data/mockConsultations';
import LoadingSpinner from '../components/LoadingSpinner';
import HospitalCard from '../components/HospitalCard';
import AIAnalysisCard from '../components/AIAnalysisCard';
import MedicalDocumentCard from '../components/MedicalDocumentCard';
import { MedicalDocument } from '../types/MedicalDocumentTypes';
import { AIAnalysis } from '../types/MedicalDocumentTypes';

export default function PatientDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const [documents] = useState<MedicalDocument[]>([
    { id: 'doc_001', fileName: 'Blood_Test_Results.pdf', fileSize: 2450000, fileType: 'application/pdf', fileUrl: '#', uploadDate: '2025-09-15T10:00:00Z', status: 'completed', uploadProgress: 100 },
    { id: 'doc_002', fileName: 'XRay_Chest.jpg', fileSize: 3200000, fileType: 'image/jpeg', fileUrl: '#', uploadDate: '2025-09-10T08:00:00Z', status: 'completed', uploadProgress: 100 },
    { id: 'doc_003', fileName: 'Prescription_Meds.png', fileSize: 890000, fileType: 'image/png', fileUrl: '#', uploadDate: '2025-09-18T14:00:00Z', status: 'pending_review', uploadProgress: 100 },
  ]);

  const [analyses] = useState<AIAnalysis[]>([
    {
      id: 'ai_001',
      documentId: 'doc_001',
      status: 'completed',
      extractedInfo: {
        patientName: 'John Doe',
        dateOfBirth: '1985-06-15',
        diagnosis: ['Mild hypertension', 'Elevated cholesterol'],
        medications: ['Lisinopril 10mg', 'Atorvastatin 20mg'],
        allergies: ['Penicillin'],
      },
      specialtyRecommendations: [
        { specialty: 'Cardiology', confidence: 92, reasoning: 'Hypertension and cholesterol indicators suggest cardiac monitoring' },
        { specialty: 'Internal Medicine', confidence: 78, reasoning: 'Multiple systemic markers requiring comprehensive management' },
      ],
      disclaimer: 'AI analysis is for informational purposes only and does not diagnose or prescribe treatment. Results must be reviewed by a licensed clinician.',
      clinicianReviewStatus: 'reviewed',
      createdAt: '2025-09-15T11:00:00Z',
      completedAt: '2025-09-15T11:05:00Z',
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
        { specialty: 'Radiology', confidence: 88, reasoning: 'Imaging results require radiologist review' },
      ],
      disclaimer: 'AI analysis is for informational purposes only and does not diagnose or prescribe treatment. Results must be reviewed by a licensed clinician.',
      clinicianReviewStatus: 'completed',
      createdAt: '2025-09-10T09:00:00Z',
      completedAt: '2025-09-10T09:03:00Z',
    },
  ]);

  const upcomingConsultations = mockConsultations.filter((c) => c.status === 'scheduled');
  const recommendedHospitals = mockHospitals.slice(0, 3);

  if (loading) return <LoadingSpinner size="lg" text="Loading your dashboard..." />;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl p-6 sm:p-8 text-white">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Welcome back, {mockCurrentUser.firstName}!</h1>
            <p className="text-teal-100 text-sm mt-1">Here's your health overview today</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Documents', value: documents.length.toString(), icon: FileText, color: 'bg-red-50 text-red-600' },
          { label: 'AI Analyses', value: analyses.length.toString(), icon: Brain, color: 'bg-teal-50 text-teal-600' },
          { label: 'Hospitals', value: '3', icon: Building2, color: 'bg-blue-50 text-blue-600' },
          { label: 'Consultations', value: upcomingConsultations.length.toString(), icon: Calendar, color: 'bg-purple-50 text-purple-600' },
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

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Consultations */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Upcoming Consultations</h3>
              <Link to="/dashboard/consultations" className="text-sm text-teal-600 hover:text-teal-700 font-medium">View All</Link>
            </div>
            {upcomingConsultations.length === 0 ? (
              <p className="text-sm text-gray-400 py-4 text-center">No upcoming consultations</p>
            ) : (
              <div className="space-y-3">
                {upcomingConsultations.map((c) => (
                  <div key={c.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{c.doctorName}</p>
                      <p className="text-xs text-gray-500">{c.hospitalName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{c.date}</p>
                      <p className="text-xs text-gray-500">{c.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Documents */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Recent Documents</h3>
              <Link to="/dashboard/documents" className="text-sm text-teal-600 hover:text-teal-700 font-medium">View All</Link>
            </div>
            <div className="space-y-3">
              {documents.map((doc) => (
                <MedicalDocumentCard key={doc.id} document={doc} onPreview={(_doc) => {}} onDelete={(_id) => {}} />
              ))}
            </div>
          </div>

          {/* AI Analysis */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">AI Analysis</h3>
              <Link to="/dashboard/ai-analysis" className="text-sm text-teal-600 hover:text-teal-700 font-medium">View All</Link>
            </div>
            <div className="space-y-3">
              {analyses.map((analysis) => (
                <AIAnalysisCard key={analysis.id} analysis={analysis} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recommended Hospitals */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Recommended Hospitals</h3>
            <div className="space-y-4">
              {recommendedHospitals.map((hospital) => (
                <HospitalCard key={hospital.id} hospital={hospital} onSelect={(_hosp) => {}} />
              ))}
            </div>
          </div>

          {/* Health Score */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Health Score</h3>
              <TrendingUp className="w-4 h-4 text-teal-500" />
            </div>
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                  <circle cx="64" cy="64" r="56" stroke="#0d9488" strokeWidth="8" fill="none"
                    strokeDasharray={`${0.85 * 2 * Math.PI * 56} ${2 * Math.PI * 56}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">85%</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">Good</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
