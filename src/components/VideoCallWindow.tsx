import { useState, useEffect, useRef } from 'react';
import { Video, VideoOff, Mic, MicOff, Monitor, PhoneOff, Camera, ScreenShare } from 'lucide-react';

interface VideoCallWindowProps {
  doctorName: string;
  onEndCall: () => void;
}

export default function VideoCallWindow({ doctorName, onEndCall }: VideoCallWindowProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenShare, setIsScreenShare] = useState(false);
  const [showConsent, setShowConsent] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [callTime, setCallTime] = useState(0);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setCallTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setShowConsent(false);
    setIsRecording(true);
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden">
      {/* Video Area */}
      <div className="relative aspect-video bg-gray-800">
        {/* Remote Video */}
        <div className="absolute inset-0 flex items-center justify-center">
          <video ref={remoteVideoRef} className="w-full h-full object-cover" muted playsInline />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-teal-600 flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-2xl font-bold">
                  {doctorName.split(' ').map((n) => n[0]).join('')}
                </span>
              </div>
              <p className="text-white text-lg font-medium">{doctorName}</p>
              <p className="text-gray-400 text-sm">Connecting...</p>
            </div>
          </div>
        </div>

        {/* Local Video */}
        <div className="absolute bottom-4 right-4 w-40 aspect-video rounded-lg overflow-hidden border-2 border-gray-600">
          <video ref={localVideoRef} className="w-full h-full object-cover" muted playsInline autoPlay />
          {isVideoOff && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
              <Camera className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>

        {/* Call Timer */}
        <div className="absolute top-4 left-4 bg-black/60 px-3 py-1.5 rounded-lg">
          <span className="text-white text-sm font-mono">{formatTime(callTime)}</span>
        </div>

        {/* Recording Indicator */}
        {isRecording && (
          <div className="absolute top-4 right-20 flex items-center gap-2 bg-red-600/80 px-3 py-1.5 rounded-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-white text-xs font-medium">REC</span>
          </div>
        )}

        {/* Recording Consent Modal */}
        {showConsent && !isRecording && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <div className="bg-white rounded-xl p-6 max-w-sm mx-4">
              <div className="flex items-center gap-2 mb-3">
                <Video className="w-5 h-5 text-red-500" />
                <h3 className="font-semibold text-gray-900">Recording Consent</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                This recording requires participant consent. Do you agree to record this consultation?
              </p>
              <p className="text-xs text-yellow-600 bg-yellow-50 p-2 rounded-lg mb-4">
                Disclaimer: Recording requires participant consent. All parties must agree before recording begins.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => { setShowConsent(false); onEndCall(); }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
                >
                  Decline
                </button>
                <button
                  onClick={handleStartRecording}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
                >
                  Start Recording
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="px-4 py-3 flex items-center justify-center gap-3">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`p-3 rounded-full transition-colors ${
            isMuted ? 'bg-red-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'
          }`}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>
        <button
          onClick={() => setIsVideoOff(!isVideoOff)}
          className={`p-3 rounded-full transition-colors ${
            isVideoOff ? 'bg-red-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'
          }`}
        >
          {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
        </button>
        <button
          onClick={() => setIsScreenShare(!isScreenShare)}
          className={`p-3 rounded-full transition-colors ${
            isScreenShare ? 'bg-teal-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'
          }`}
        >
          <ScreenShare className="w-5 h-5" />
        </button>
        <button
          onClick={onEndCall}
          className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors ml-4"
        >
          <PhoneOff className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
