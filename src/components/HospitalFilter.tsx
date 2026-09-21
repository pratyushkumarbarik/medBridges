import { Search, SlidersHorizontal } from 'lucide-react';
import { HospitalFilterOptions } from '../types/HospitalTypes';

interface HospitalFilterProps {
  filters: HospitalFilterOptions;
  onChange: (filters: HospitalFilterOptions) => void;
  countries: string[];
  specialties: string[];
}

export default function HospitalFilter({ filters, onChange, countries, specialties }: HospitalFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <SlidersHorizontal className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Filters</span>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-auto text-sm text-teal-600 hover:text-teal-700"
        >
          {isExpanded ? 'Less' : 'More'}
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search hospitals..."
          value={filters.searchQuery || ''}
          onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 block">Country</label>
            <select
              value={filters.country || ''}
              onChange={(e) => onChange({ ...filters, country: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">All Countries</option>
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 block">Specialty</label>
            <select
              value={filters.specialty || ''}
              onChange={(e) => onChange({ ...filters, specialty: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">All Specialties</option>
              {specialties.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 block">Max Fee</label>
              <select
                value={filters.maxConsultationFee || ''}
                onChange={(e) => onChange({ ...filters, maxConsultationFee: e.target.value ? Number(e.target.value) : undefined })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="">Any</option>
                <option value="100">Up to $100</option>
                <option value="150">Up to $150</option>
                <option value="200">Up to $200</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 block">Min Rating</label>
              <select
                value={filters.minRating || ''}
                onChange={(e) => onChange({ ...filters, minRating: e.target.value ? Number(e.target.value) : undefined })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="">Any</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="4.5">4.5+</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
