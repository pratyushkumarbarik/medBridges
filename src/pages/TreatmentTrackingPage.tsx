import { useState, useEffect } from 'react';
import ProgressTracker from '../components/ProgressTracker';
import AccordionItem from '../components/AccordionItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { mockHospitals } from '../data/mockHospitals';
import { TreatmentTracking } from '../types/TreatmentTypes';

export default function TreatmentTrackingPage() {
  const [loading, setLoading] = useState(true);
  const [treatments, setTreatments] = useState<TreatmentTracking[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTreatments([
        {
          id: 'tr_001',
          patientId: 'usr_001',
          hospitalId: 'hosp_001',
          hospitalName: 'MediCore International Hospital',
          treatmentName: 'Cardiac Care Program',
          diagnosis: 'Mild hypertension, elevated cholesterol',
          status: 'in_progress',
          startDate: '2025-09-01',
          estimatedEndDate: '2025-12-01',
          assignedDoctorName: 'Dr. Sarah Johnson',
          timeline: [
            { id: 'ev_001', date: '2025-09-01', type: 'treatment', title: 'Treatment Started', description: 'Cardiac care program initiated', status: 'completed' },
            { id: 'ev_002', date: '2025-09-05', type: 'appointment', title: 'Initial Consultation', description: 'First appointment with Dr. Johnson', status: 'completed' },
            { id: 'ev_003', date: '2025-09-10', type: 'document', title: 'Lab Results Uploaded', description: 'Blood test results uploaded and analyzed', status: 'completed' },
            { id: 'ev_004', date: '2025-09-15', type: 'communication', title: 'Hospital Update', description: 'Treatment plan reviewed and adjusted', status: 'completed' },
            { id: 'ev_005', date: '2025-09-20', type: 'appointment', title: 'Follow-up Scheduled', description: 'Next appointment scheduled for Oct 15', status: 'completed' },
            { id: 'ev_006', date: '2025-09-25', type: 'treatment', title: 'Medication Review', description: 'Current medications being reviewed', status: 'in_progress' },
          ],
        },
        {
          id: 'tr_002',
          patientId: 'usr_001',
          hospitalId: 'hosp_002',
          hospitalName: 'Global Health Medical Center',
          treatmentName: 'Post-Treatment Monitoring',
          diagnosis: 'Post-surgical recovery',
          status: 'completed',
          startDate: '2025-07-01',
          estimatedEndDate: '2025-09-01',
          assignedDoctorName: 'Dr. Emily Watson',
          timeline: [
            { id: 'ev_007', date: '2025-07-01', type: 'treatment', title: 'Treatment Started', description: 'Post-surgical monitoring initiated', status: 'completed' },
            { id: 'ev_008', date: '2025-07-15', type: 'appointment', title: 'Surgery Follow-up', description: 'Post-operative checkup completed', status: 'completed' },
            { id: 'ev_009', date: '2025-08-01', type: 'document', title: 'Imaging Results', description: 'CT scan completed', status: 'completed' },
            { id: 'ev_010', date: '2025-09-01', type: 'treatment', title: 'Treatment Completed', description: 'All milestones achieved', status: 'completed' },
          ],
        },
      ]);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSpinner size="lg" text="Loading treatment progress..." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Treatment Tracking</h1>
        <p className="text-sm text-gray-500 mt-1">Monitor your treatment progress and hospital communications</p>
      </div>

      {treatments.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <p className="text-gray-400">No active treatments</p>
        </div>
      ) : (
        <div className="space-y-6">
          {treatments.map((treatment) => (
            <div key={treatment.id} className="space-y-4">
              <ProgressTracker treatment={treatment} />

              {/* Hospital Communication */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Hospital Communications</h3>
                <div className="space-y-3">
                  {treatment.timeline
                    .filter((ev) => ev.type === 'communication')
                    .map((event) => (
                      <div key={event.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{event.title}</p>
                          <p className="text-xs text-gray-500">{event.date}</p>
                        </div>
                      </div>
                    ))}
                  {treatment.timeline.filter((ev) => ev.type === 'communication').length === 0 && (
                    <p className="text-sm text-gray-400">No hospital communications yet</p>
                  )}
                </div>
              </div>

              {/* Details Accordion */}
              <div className="space-y-2">
                <AccordionItem title="Treatment Details" defaultOpen={false}>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Diagnosis</p>
                      <p className="font-medium">{treatment.diagnosis}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Doctor</p>
                      <p className="font-medium">{treatment.assignedDoctorName}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Start Date</p>
                      <p className="font-medium">{treatment.startDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Est. End Date</p>
                      <p className="font-medium">{treatment.estimatedEndDate || 'TBD'}</p>
                    </div>
                  </div>
                </AccordionItem>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
