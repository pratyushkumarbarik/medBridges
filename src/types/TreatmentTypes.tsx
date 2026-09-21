export type TreatmentStatus = 'not_started' | 'in_progress' | 'completed' | 'on_hold' | 'discharged';
export type TimelineEventType = 'appointment' | 'document' | 'communication' | 'treatment' | 'payment';

export interface TreatmentTimelineEvent {
  id: string;
  date: string;
  type: TimelineEventType;
  title: string;
  description: string;
  status: TreatmentStatus;
  metadata?: Record<string, string>;
}

export interface TreatmentTracking {
  id: string;
  patientId: string;
  hospitalId: string;
  hospitalName: string;
  treatmentName: string;
  diagnosis: string;
  status: TreatmentStatus;
  startDate: string;
  estimatedEndDate?: string;
  timeline: TreatmentTimelineEvent[];
  assignedDoctorId?: string;
  assignedDoctorName?: string;
}

export interface HospitalCommunication {
  id: string;
  from: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}
