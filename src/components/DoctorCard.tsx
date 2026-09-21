import { useState } from 'react';
import { Star, Video, Phone, Calendar, ChevronRight } from 'lucide-react';
import { Doctor } from '../types/HospitalTypes';

interface DoctorCardProps {
  doctor: Doctor;
  hospitalName: string;
}

export default function DoctorCard({ doctor, hospitalName }: DoctorCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
          <span className="text-teal-700 font-bold text-lg">
            {doctor.firstName[0]}{doctor.lastName[0]}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900">Dr. {doctor.firstName} {doctor.lastName}</h4>
          <p className="text-sm text-teal-600 font-medium">{doctor.specialization}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium">{doctor.rating}</span>
            <span className="text-sm text-gray-400">({doctor.totalReviews})</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{doctor.qualification} &middot; {doctor.experience} yrs</p>
          <p className="text-xs text-gray-400">{hospitalName}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4 text-sm">
        <span className="font-bold text-gray-900">${doctor.consultationFee}</span>
        <span className="text-gray-500">/ consultation</span>
      </div>

      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
        <span className="bg-gray-100 px-2 py-0.5 rounded">{doctor.languages.join(', ')}</span>
      </div>

      {expanded && (
        <div className="mt-4 space-y-3 border-t border-gray-100 pt-3">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Available Slots</p>
            <div className="flex flex-wrap gap-2">
              {doctor.availableSlots.map((slot) => (
                <button
                  key={slot}
                  className="text-xs bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg border border-teal-200 hover:bg-teal-100 transition-colors"
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 mt-4">
        <button className="flex-1 bg-teal-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors flex items-center justify-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          Book Appointment
        </button>
        <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          <Video className="w-4 h-4 text-gray-600" />
        </button>
        <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          <Phone className="w-4 h-4 text-gray-600" />
        </button>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          <ChevronRight className={`w-4 h-4 text-gray-600 transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </button>
      </div>
    </div>
  );
}
