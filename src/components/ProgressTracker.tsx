import { CheckCircle, Circle, Loader2 } from 'lucide-react';
import { TreatmentTracking } from '../types/TreatmentTypes';

interface ProgressTrackerProps {
  treatment: TreatmentTracking;
}

export default function ProgressTracker({
  treatment,
}: ProgressTrackerProps) {
  const getStatusIcon = (
    eventStatus: TreatmentTracking['timeline'][number]['status']
  ) => {
    if (eventStatus === 'completed') {
      return (
        <CheckCircle className="w-4 h-4 text-green-500" />
      );
    }

    if (eventStatus === 'in_progress') {
      return (
        <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
      );
    }

    if (eventStatus === 'on_hold') {
      return (
        <Circle className="w-4 h-4 text-yellow-500" />
      );
    }

    return (
      <Circle className="w-4 h-4 text-gray-300" />
    );
  };

  const getTimelineColor = (type: string) => {
    switch (type) {
      case 'appointment':
        return 'border-blue-400';

      case 'document':
        return 'border-purple-400';

      case 'communication':
        return 'border-green-400';

      case 'treatment':
        return 'border-orange-400';

      case 'payment':
        return 'border-teal-400';

      default:
        return 'border-gray-400';
    }
  };

  const formatStatus = (status: string) => {
    return status
      .replace('_', ' ')
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-gray-900">
            {treatment.treatmentName}
          </h3>

          <p className="text-sm text-gray-500">
            {treatment.hospitalName}
          </p>
        </div>

        <span
          className={`text-xs font-medium px-3 py-1 rounded-full border ${
            treatment.status === 'completed'
              ? 'bg-green-50 text-green-700 border-green-200'
              : treatment.status === 'in_progress'
              ? 'bg-blue-50 text-blue-700 border-blue-200'
              : treatment.status === 'on_hold'
              ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
              : 'bg-gray-50 text-gray-700 border-gray-200'
          }`}
        >
          {formatStatus(treatment.status)}
        </span>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-6">
          {treatment.timeline.map((event) => (
            <div
              key={event.id}
              className="relative flex items-start gap-4"
            >
              {/* Timeline Icon */}
              <div
                className={`relative z-10 bg-white border-2 p-1.5 rounded-full ${getTimelineColor(
                  event.type
                )}`}
              >
                {getStatusIcon(event.status)}
              </div>

              {/* Event Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium text-gray-900">
                    {event.title}
                  </h4>

                  <span className="text-xs text-gray-400 capitalize">
                    {event.type}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-0.5">
                  {event.description}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {event.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}