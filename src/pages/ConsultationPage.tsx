import { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import ConsultationCard from '../components/ConsultationCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmationModal from '../components/ConfirmationModal';
import ErrorMessage from '../components/ErrorMessage';
import { mockConsultations } from '../data/mockConsultations';
import { mockDoctors } from '../data/mockDoctors';
import { Consultation, ConsultationType } from '../types/ConsultationTypes';

export default function ConsultationPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [booked, setBooked] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setConsultations(mockConsultations);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Booking form state
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [type, setType] = useState<ConsultationType>('video');

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600" /></div>;

  const handleBook = async () => {
    if (!doctorId || !date || !time || !reason) {
      setError('Please fill all fields');
      return;
    }
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));

    const doctor = mockDoctors.find((d) => d.id === doctorId);
    const newConsultation: Consultation = {
      id: `con_${Date.now()}`,
      doctorId,
      doctorName: doctor ? `Dr. ${doctor.firstName} ${doctor.lastName}` : 'Unknown',
      doctorSpecialization: doctor?.specialization || '',
      patientId: 'usr_001',
      patientName: 'John Doe',
      hospitalId: doctor?.hospitalId || '',
      hospitalName: 'Demo Hospital',
      date,
      time,
      duration: 30,
      type,
      status: 'scheduled',
      fee: doctor?.consultationFee || 100,
      reason,
      createdAt: new Date().toISOString(),
    };

    setConsultations((prev) => [newConsultation, ...prev]);
    setLoading(false);
    setShowBooking(false);
    setBooked(true);
    setDoctorId('');
    setDate('');
    setTime('');
    setReason('');
    setType('video');
  };

  const scheduled = consultations.filter((c) => c.status === 'scheduled');
  const completed = consultations.filter((c) => c.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Consultations</h1>
          <p className="text-sm text-gray-500 mt-1">Book and manage your consultations</p>
        </div>
        <button onClick={() => setShowBooking(true)} className="bg-teal-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-teal-700 transition-colors text-sm">
          Book New Consultation
        </button>
      </div>

      {booked && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <div>
            <p className="font-medium text-green-800">Consultation booked successfully!</p>
            <p className="text-sm text-green-600">Check your consultation list for details.</p>
          </div>
          <button onClick={() => setBooked(false)} className="ml-auto text-green-600 hover:text-green-800">
            <AlertCircle className="w-4 h-4" />
          </button>
        </div>
      )}

      {error && <ErrorMessage message={error} type="error" onDismiss={() => setError('')} />}

      {/* Booking Form */}
      {showBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => { setShowBooking(false); setError(''); }} />
          <div className="relative bg-white rounded-xl shadow-xl p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Book Consultation</h3>
            {error && <ErrorMessage message={error} type="error" className="mb-4" />}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Doctor</label>
                <select
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Choose a doctor</option>
                  {mockDoctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      Dr. {doc.firstName} {doc.lastName} - {doc.specialization} (${doc.consultationFee})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <div className="flex gap-2">
                  {(['video', 'audio', 'in_person'] as ConsultationType[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                        type === t ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {t.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500"
                  rows={3}
                  placeholder="Describe your symptoms or reason for consultation..."
                />
              </div>

              <div className="flex justify-end gap-2">
                <button onClick={() => { setShowBooking(false); setError(''); }} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">Cancel</button>
                <button onClick={handleBook} disabled={loading} className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 flex items-center gap-2">
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Upcoming Consultations ({scheduled.length})</h3>
        {scheduled.length === 0 ? (
          <p className="text-gray-400 text-sm py-4 text-center">No upcoming consultations</p>
        ) : (
          <div className="space-y-3">
            {scheduled.map((c) => (
              <ConsultationCard key={c.id} consultation={c} />
            ))}
          </div>
        )}
      </div>

      {/* History */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Consultation History</h3>
        {completed.length === 0 ? (
          <p className="text-gray-400 text-sm py-4 text-center">No consultation history</p>
        ) : (
          <div className="space-y-3">
            {completed.map((c) => (
              <ConsultationCard key={c.id} consultation={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
