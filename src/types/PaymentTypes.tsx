export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
export type PaymentMethod = 'credit_card' | 'debit_card' | 'bank_transfer' | 'insurance' | 'wallet';

export interface ConsultationCharge {
  id: string;
  consultationId: string;
  doctorName: string;
  description: string;
  amount: number;
}

export interface TreatmentCharge {
  id: string;
  treatmentName: string;
  description: string;
  amount: number;
}

export interface MedibridgesServiceFee {
  id: string;
  description: string;
  amount: number;
}

export interface ThirdPartyCharge {
  id: string;
  category: 'travel' | 'accommodation' | 'transportation' | 'other';
  provider: string;
  description: string;
  amount: number;
}

export interface PaymentSummary {
  id: string;
  consultationCharges: ConsultationCharge[];
  treatmentCharges: TreatmentCharge[];
  serviceFees: MedibridgesServiceFee[];
  thirdPartyCharges: ThirdPartyCharge[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  createdAt: string;
}
