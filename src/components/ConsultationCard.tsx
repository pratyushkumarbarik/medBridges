import { Calendar, Clock, Video, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Consultation } from '../types/ConsultationTypes';

interface ConsultationCardProps {
  consultation: Consultation;
}

export default function ConsultationCard({ consultation }: ConsultationCardProps) {
  const getStatusIcon = () => {
    switch (consultation.status) {
      case 'scheduled': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'in_progress': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: Consultation['status']) => {
    const styles = {
      scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
      completed: 'bg-green-50 text-green-700 border-green-200',
      cancelled: 'bg-red-50 text-red-700 border-red-200',
      in_progress: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      pending: 'bg-gray-50 text-gray-700 border-gray-200',
    };
    return (
      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${styles[status]}`}>
        {status.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
      </span>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="bg-teal-50 p-2 rounded-lg">
            {consultation.type === 'video' ? (
              <Video className="w-5 h-5 text-teal-600" />
            ) : (
              <Calendar className="w-5 h-5 text-teal-600" />
            )}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{consultation.doctorName}</h4>
            <p className="text-sm text-gray-500">{consultation.doctorSpecialization}</p>
            <p className="text-sm text-gray-500">{consultation.hospitalName}</p>
          </div>
        </div>
        {getStatusBadge(consultation.status)}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{consultation.date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{consultation.time}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <span className="text-sm text-gray-500">{consultation.reason}</span>
        <span className="font-bold text-gray-900">${consultation.fee}</span>
      </div>

      <div className="flex items-center gap-2 mt-3">
        {getStatusIcon()}
        <span className="text-xs text-gray-500">
          {consultation.type.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())} consultation
        </span>
      </div>
    </div>
  );
}
