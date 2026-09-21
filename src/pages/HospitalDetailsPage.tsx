import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, MapPin, Phone, Clock, Shield, CheckCircle, Calendar, ChevronRight, DollarSign } from 'lucide-react';
import DoctorCard from '../components/DoctorCard';
import { mockHospitals } from '../data/mockHospitals';
import { mockDoctors } from '../data/mockDoctors';
import { Hospital } from '../types/HospitalTypes';
import ErrorMessage from '../components/ErrorMessage';

export default function HospitalDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [doctors, setDoctors] = useState(mockDoctors);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = mockHospitals.find((h) => h.id === id);
      if (found) {
        setHospital(found);
        setDoctors(mockDoctors.filter((d) => d.hospitalId === found.id));
      } else {
        setError('Hospital not found');
      }
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600" /></div>;
  if (error || !hospital) {
    return (
      <div className="text-center py-20">
        <ErrorMessage message={error || 'Hospital not found'} type="error" />
        <Link to="/dashboard/hospitals" className="mt-4 inline-block text-teal-600 hover:text-teal-700 font-medium">
          &larr; Back to Hospitals
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button onClick={() => navigate(-1)} className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center gap-1">
        &larr; Back
      </button>

      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-teal-500 to-teal-700" />
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{hospital.name}</h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium">{hospital.rating}</span>
                  <span className="text-sm text-gray-400">({hospital.totalReviews.toLocaleString()} reviews)</span>
                </div>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {hospital.city}, {hospital.country}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-teal-600">${hospital.consultationFee}</p>
              <p className="text-xs text-gray-500">Starting consultation fee</p>
            </div>
          </div>

          <p className="text-gray-600 mt-4">{hospital.description}</p>

          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Address</h3>
              <p className="text-sm text-gray-600">{hospital.address}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Accreditation</h3>
              <div className="flex flex-wrap gap-2">
                {hospital.accreditation.map((acc) => (
                  <span key={acc} className="bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded-full">{acc}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-medium text-gray-900 mb-2">Facilities</h3>
            <div className="flex flex-wrap gap-2">
              {hospital.facilities.map((f) => (
                <span key={f} className="bg-teal-50 text-teal-700 text-xs font-medium px-2 py-1 rounded-full">{f}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Doctors */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Available Doctors ({doctors.length})</h2>
          <Link to="/dashboard/hospitals" className="text-sm text-teal-600 hover:text-teal-700">
            All Hospitals
          </Link>
        </div>
        {doctors.length === 0 ? (
          <p className="text-gray-400 text-sm">No doctors available at this hospital</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} hospitalName={hospital.name} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
