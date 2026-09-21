export type DocumentStatus = 'uploading' | 'processing' | 'completed' | 'failed' | 'pending_review';

export interface MedicalDocument {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  fileUrl: string;
  uploadDate: string;
  status: DocumentStatus;
  uploadProgress: number;
  extractedInfo?: ExtractedMedicalInfo;
  aiAnalysisStatus?: string;
  previewUrl?: string;
}

export interface ExtractedMedicalInfo {
  patientName?: string;
  dateOfBirth?: string;
  diagnosis?: string[];
  medications?: string[];
  allergies?: string[];
  procedures?: string[];
  recommendations?: string[];
  confidenceScore?: number;
}

export interface AIAnalysis {
  id: string;
  documentId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  extractedInfo?: ExtractedMedicalInfo;
  specialtyRecommendations: SpecialtyRecommend[];
  disclaimer: string;
  clinicianReviewStatus: 'not_started' | 'in_progress' | 'completed' | 'reviewed';
  createdAt: string;
  completedAt?: string;
}

export interface SpecialtyRecommend {
  specialty: string;
  confidence: number;
  reasoning: string;
}
