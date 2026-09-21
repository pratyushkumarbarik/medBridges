import { useState, useEffect } from 'react';
import { Camera, Save, Mail, Phone, MapPin, User, AlertCircle } from 'lucide-react';
import { mockUserProfile, mockCurrentUser } from '../data/mockUsers';
import { UserProfile } from '../types/UserTypes';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import ConfirmationModal from '../components/ConfirmationModal';

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setProfile(mockUserProfile);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSpinner size="lg" text="Loading profile..." />;
  if (!profile) return null;

  const handleChange = (field: keyof UserProfile, value: string | string[] | typeof profile.notificationPreferences) => {
    setProfile((prev) => prev ? { ...prev, [field]: value } : prev);
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const InputField = ({ label, field, value, type = 'text', icon: Icon }: { label: string; field: keyof UserProfile; value: string; type?: string; icon?: any }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />}
        <input
          type={type}
          value={value}
          onChange={(e) => handleChange(field, e.target.value)}
          className={`w-full ${Icon ? 'pl-10' : ''} px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500`}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your personal information</p>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-green-500 rotate-0" />
          <p className="font-medium text-green-800">Profile saved successfully!</p>
        </div>
      )}

      {error && <ErrorMessage message={error} type="error" onDismiss={() => setError('')} />}

      {/* Avatar Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
              <span className="text-teal-700 font-bold text-2xl">
                {profile.firstName[0]}{profile.lastName[0]}
              </span>
            </div>
            <button className="absolute bottom-0 right-0 bg-teal-600 text-white p-1.5 rounded-full hover:bg-teal-700">
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{profile.firstName} {profile.lastName}</h3>
            <p className="text-sm text-gray-500">{profile.email}</p>
            <p className="text-sm text-gray-500">{profile.phone}</p>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <User className="w-4 h-4" />
          Personal Information
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <InputField label="First Name" field="firstName" value={profile.firstName} icon={User} />
          <InputField label="Last Name" field="lastName" value={profile.lastName} icon={User} />
          <InputField label="Email" field="email" value={profile.email} type="email" icon={Mail} />
          <InputField label="Phone" field="phone" value={profile.phone} icon={Phone} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input type="date" value={profile.dateOfBirth} onChange={(e) => handleChange('dateOfBirth', e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
            <input type="text" value={profile.bloodType} onChange={(e) => handleChange('bloodType', e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500" />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <div className="grid sm:grid-cols-2 gap-3">
            <input type="text" placeholder="Street" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500" defaultValue={profile.address?.street} />
            <input type="text" placeholder="City" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500" defaultValue={profile.address?.city} />
            <input type="text" placeholder="State" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500" defaultValue={profile.address?.state} />
            <input type="text" placeholder="Zip Code" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500" defaultValue={profile.address?.zipCode} />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
          <div className="flex flex-wrap gap-2">
            {(profile.allergies || []).map((a) => (
              <span key={a} className="bg-red-50 text-red-700 text-xs font-medium px-2 py-1 rounded-full">{a}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Emergency Contact</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" value={profile.emergencyContactName} onChange={(e) => handleChange('emergencyContactName', e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input type="tel" value={profile.emergencyContactPhone} onChange={(e) => handleChange('emergencyContactPhone', e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500" />
          </div>
        </div>
      </div>

      {/* Insurance */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Insurance Information</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
            <input type="text" value={profile.insuranceProvider} onChange={(e) => handleChange('insuranceProvider', e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Policy Number</label>
            <input type="text" value={profile.insurancePolicyNumber} onChange={(e) => handleChange('insurancePolicyNumber', e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500" />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
        <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 flex items-center gap-2">
          {saving && <span className="animate-spin">...</span>}
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}
