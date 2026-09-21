export interface Hospital {
  id: string;
  name: string;
  description: string;
  country: string;
  city: string;
  address: string;
  rating: number;
  totalReviews: number;
  consultationFee: number;
  image?: string;
  specialties: string[];
  doctors: Doctor[];
  accreditation: string[];
  facilities: string[];
  establishedYear: number;
  bedCount: number;
}

export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  specialization: string;
  qualification: string;
  experience: number;
  rating: number;
  totalReviews: number;
  consultationFee: number;
  availableSlots: string[];
  image?: string;
  languages: string[];
  hospitalId: string;
}

export interface HospitalFilterOptions {
  country?: string;
  specialty?: string;
  maxConsultationFee?: number;
  minRating?: number;
  searchQuery?: string;
}
