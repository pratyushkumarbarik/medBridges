import { useState } from 'react';
import { Video, VideoOff, Mic, MicOff, Monitor, PhoneOff, Camera, ScreenShare, Loader2 } from 'lucide-react';
import VideoCallWindow from '../components/VideoCallWindow';
import ConfirmationModal from '../components/ConfirmationModal';
import ErrorMessage from '../components/ErrorMessage';

export default function VideoConsultationPage() {
  const [callActive, setCallActive] = useState(true);
  const [ending, setEnding] = useState(false);
  const [error, setError] = useState('');
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [connectionQuality, setConnectionQuality] = useState('good');

  const handleEndCall = () => {
    setShowEndConfirm(false);
    setEnding(true);
    setTimeout(() => {
      setCallActive(false);
      setEnding(false);
    }, 2000);
  };

  if (!callActive) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Video Consultation</h1>
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Video className="w-8 h-8 text-teal-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Call Ended</h3>
          <p className="text-sm text-gray-500 mt-2">Your consultation has been completed</p>
          <div className="mt-4 flex justify-center gap-4">
            <button className="bg-teal-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-teal-700">
              Start New Call
            </button>
            <button className="border border-gray-300 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50">
              View Call Summary
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Video Consultation</h1>
          <p className="text-sm text-gray-500 mt-1">Dr. Sarah Johnson - Cardiology</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${connectionQuality === 'good' ? 'bg-green-500' : 'bg-yellow-500'}`} />
          <span className="text-sm text-gray-500">{connectionQuality === 'good' ? 'Good Connection' : 'Poor Connection'}</span>
        </div>
      </div>

      {error && <ErrorMessage message={error} type="error" onDismiss={() => setError('')} />}

      {ending ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-teal-600" />
        </div>
      ) : (
        <>
          {/* Video Call */}
          <VideoCallWindow doctorName="Dr. Sarah Johnson" onEndCall={() => setShowEndConfirm(true)} />

          {/* Consent Reminder */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Video className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-800">Recording Consent</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  This recording requires participant consent. All parties must agree before recording begins.
                </p>
              </div>
            </div>
          </div>

          {/* Call Info */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Call Information</h3>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Doctor</p>
                <p className="font-medium text-gray-900">Dr. Sarah Johnson</p>
              </div>
              <div>
                <p className="text-gray-500">Specialization</p>
                <p className="font-medium text-gray-900">Cardiology</p>
              </div>
              <div>
                <p className="text-gray-500">Connection</p>
                <p className="font-medium text-green-600">Stable</p>
              </div>
            </div>
          </div>

          <ConfirmationModal
            isOpen={showEndConfirm}
            title="End Call?"
            message="Are you sure you want to end this consultation?"
            confirmText="End Call"
            onConfirm={handleEndCall}
            onCancel={() => setShowEndConfirm(false)}
            variant="danger"
          />
        </>
      )}
    </div>
  );
}
