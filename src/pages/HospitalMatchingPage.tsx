import { useState, useEffect } from 'react';
import HospitalCard from '../components/HospitalCard';
import HospitalFilter from '../components/HospitalFilter';
import DoctorCard from '../components/DoctorCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { mockHospitals } from '../data/mockHospitals';
import { mockDoctors } from '../data/mockDoctors';
import { Hospital, HospitalFilterOptions } from '../types/HospitalTypes';

export default function HospitalMatchingPage() {
  const [hospitals, setHospitals] = useState(mockHospitals);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [showDoctors, setShowDoctors] = useState(false);
  const [filters, setFilters] = useState<HospitalFilterOptions>({});

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const countries = [...new Set(mockHospitals.map((h) => h.country))];
  const specialties = [...new Set(mockHospitals.flatMap((h) => h.specialties))];

  const applyFilters = () => {
    let result = [...mockHospitals];
    if (filters.searchQuery) {
      result = result.filter((h) => h.name.toLowerCase().includes(filters.searchQuery!.toLowerCase()) || h.city.toLowerCase().includes(filters.searchQuery!.toLowerCase()));
    }
    if (filters.country) {
      result = result.filter((h) => h.country === filters.country);
    }
    if (filters.specialty) {
      result = result.filter((h) => h.specialties.includes(filters.specialty!));
    }
    if (filters.maxConsultationFee) {
      result = result.filter((h) => h.consultationFee <= filters.maxConsultationFee!);
    }
    if (filters.minRating) {
      result = result.filter((h) => h.rating >= filters.minRating!);
    }
    setHospitals(result);
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const selectedHospitalDoctors = selectedHospital ? mockDoctors.filter((d) => d.hospitalId === selectedHospital.id) : [];

  if (loading) return <LoadingSpinner size="lg" text="Finding hospitals..." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hospital Matching</h1>
        <p className="text-sm text-gray-500 mt-1">Find the best hospitals matched to your needs</p>
      </div>

      {error && <ErrorMessage message={error} type="error" onDismiss={() => setError('')} />}

      {/* Filters */}
      <HospitalFilter
        filters={filters}
        onChange={setFilters}
        countries={countries}
        specialties={specialties}
      />

      {/* Results */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{hospitals.length} hospitals found</p>
        <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500">
          <option>Sort by Rating</option>
          <option>Sort by Price (Low to High)</option>
          <option>Sort by Name</option>
        </select>
      </div>

      {selectedHospital ? (
        <div className="space-y-6">
          <button onClick={() => { setSelectedHospital(null); setShowDoctors(false); }} className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center gap-1">
            &larr; Back to results
          </button>
          <HospitalCard hospital={selectedHospital} onSelect={(_hosp) => {}} />
          <button
            onClick={() => setShowDoctors(!showDoctors)}
            className="w-full bg-teal-600 text-white py-2.5 rounded-lg font-medium hover:bg-teal-700 transition-colors"
          >
            {showDoctors ? 'Hide' : 'View'} Available Doctors ({selectedHospitalDoctors.length})
          </button>
          {showDoctors && (
            <div className="grid sm:grid-cols-2 gap-4">
              {selectedHospitalDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} hospitalName={selectedHospital.name} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitals.map((hospital) => (
            <HospitalCard
              key={hospital.id}
              hospital={hospital}
              onSelect={(hosp) => { setSelectedHospital(hosp); setShowDoctors(false); }}
            />
          ))}
        </div>
      )}

      {hospitals.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <p className="text-gray-500">No hospitals match your criteria</p>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
