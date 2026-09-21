import { Star, MapPin, ExternalLink } from 'lucide-react';
import { Hospital } from '../types/HospitalTypes';

interface HospitalCardProps {
  hospital: Hospital;
  onSelect: (hospital: Hospital) => void;
}

export default function HospitalCard({ hospital, onSelect }: HospitalCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-lg">{hospital.name}</h3>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium text-gray-700">{hospital.rating}</span>
              <span className="text-sm text-gray-400">({hospital.totalReviews.toLocaleString()} reviews)</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
              <MapPin className="w-3.5 h-3.5" />
              {hospital.city}, {hospital.country}
            </div>
          </div>
          <span className="text-right">
            <span className="text-lg font-bold text-teal-600">${hospital.consultationFee}</span>
            <span className="text-xs text-gray-500 block">consultation</span>
          </span>
        </div>

        <p className="text-sm text-gray-600 mt-3 line-clamp-2">{hospital.description}</p>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {hospital.specialties.slice(0, 4).map((spec) => (
            <span key={spec} className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-full font-medium">
              {spec}
            </span>
          ))}
          {hospital.specialties.length > 4 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">+{hospital.specialties.length - 4}</span>
          )}
        </div>

        <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
          <span>{hospital.bedCount} beds</span>
          <span>Est. {hospital.establishedYear}</span>
          <span>{hospital.accreditation.join(', ')}</span>
        </div>

        <button
          onClick={() => onSelect(hospital)}
          className="w-full mt-4 bg-teal-600 text-white py-2.5 rounded-lg hover:bg-teal-700 transition-colors font-medium text-sm flex items-center justify-center gap-2"
        >
          View Details
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
