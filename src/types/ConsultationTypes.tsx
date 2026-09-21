export type ConsultationStatus = 'scheduled' | 'completed' | 'cancelled' | 'in_progress' | 'pending';
export type ConsultationType = 'video' | 'audio' | 'in_person' | 'chat';

export interface Consultation {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialization: string;
  patientId: string;
  patientName: string;
  hospitalId: string;
  hospitalName: string;
  date: string;
  time: string;
  duration: number;
  type: ConsultationType;
  status: ConsultationStatus;
  fee: number;
  reason: string;
  notes?: string;
  createdAt: string;
}

export interface ConsultationBooking {
  doctorId: string;
  hospitalId: string;
  date: string;
  time: string;
  reason: string;
  type: ConsultationType;
}
