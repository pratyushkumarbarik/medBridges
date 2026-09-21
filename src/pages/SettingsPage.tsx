import { useState, useEffect } from 'react';
import { Save, Bell, Shield, Lock, Mail, Smartphone, Check } from 'lucide-react';
import { mockUserProfile } from '../data/mockUsers';
import { UserProfile } from '../types/UserTypes';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import ConfirmationModal from '../components/ConfirmationModal';

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [consentModal, setConsentModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSettings(mockUserProfile);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSpinner size="lg" text="Loading settings..." />;
  if (!settings) return null;

  const handleToggle = (field: keyof typeof settings.notificationPreferences) => {
    setSettings((prev) => prev ? { ...prev, notificationPreferences: { ...prev.notificationPreferences, [field]: !prev.notificationPreferences[field] } } : prev);
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

  const ToggleSwitch = ({ checked, onChange, label, description }: { checked: boolean; onChange: () => void; label: string; description: string }) => (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
      <div>
        <p className="font-medium text-gray-900 text-sm">{label}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-teal-600' : 'bg-gray-300'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account settings and preferences</p>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <Check className="w-5 h-5 text-green-500" />
          <p className="font-medium text-green-800">Settings saved successfully!</p>
        </div>
      )}

      {error && <ErrorMessage message={error} type="error" onDismiss={() => setError('')} />}

      {/* Notification Preferences */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Bell className="w-4 h-4" />
          Notification Preferences
        </h3>
        <div className="space-y-3">
          <ToggleSwitch
            label="Email Notifications"
            description="Receive updates via email"
            checked={settings.notificationPreferences.emailNotifications}
            onChange={() => handleToggle('emailNotifications')}
          />
          <ToggleSwitch
            label="SMS Notifications"
            description="Receive updates via text message"
            checked={settings.notificationPreferences.smsNotifications}
            onChange={() => handleToggle('smsNotifications')}
          />
          <ToggleSwitch
            label="Push Notifications"
            description="Receive browser push notifications"
            checked={settings.notificationPreferences.pushNotifications}
            onChange={() => handleToggle('pushNotifications')}
          />
          <ToggleSwitch
            label="Appointment Reminders"
            description="Get reminders before appointments"
            checked={settings.notificationPreferences.appointmentReminders}
            onChange={() => handleToggle('appointmentReminders')}
          />
          <ToggleSwitch
            label="Treatment Updates"
            description="Receive treatment progress updates"
            checked={settings.notificationPreferences.treatmentUpdates}
            onChange={() => handleToggle('treatmentUpdates')}
          />
          <ToggleSwitch
            label="Promotions"
            description="Receive promotional offers and news"
            checked={settings.notificationPreferences.promotions}
            onChange={() => handleToggle('promotions')}
          />
        </div>
      </div>

      {/* Privacy & Consent */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Privacy & Consent
        </h3>
        <div className="space-y-3">
          <ToggleSwitch
            label="Data Sharing"
            description="Share anonymized data for research"
            checked={true}
            onChange={() => {}}
          />
          <ToggleSwitch
            label="AI Analysis Consent"
            description="Allow AI analysis of medical documents"
            checked={true}
            onChange={() => {}}
          />
          <button
            onClick={() => setConsentModal(true)}
            className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1 mt-2"
          >
            <Lock className="w-3.5 h-3.5" />
            Update Privacy Policy Consent
          </button>
        </div>
      </div>

      {/* Account Security */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Lock className="w-4 h-4" />
          Account Security
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <p className="font-medium text-gray-900 text-sm">Change Password</p>
            <p className="text-xs text-gray-500 mt-1">Update your account password</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <p className="font-medium text-gray-900 text-sm">Two-Factor Auth</p>
            <p className="text-xs text-gray-500 mt-1">Enable 2FA for extra security</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <p className="font-medium text-gray-900 text-sm">Active Sessions</p>
            <p className="text-xs text-gray-500 mt-1">Manage logged-in devices</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <p className="font-medium text-red-600 text-sm">Delete Account</p>
            <p className="text-xs text-gray-500 mt-1">Permanently delete your account</p>
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 flex items-center gap-2">
          {saving && <span className="animate-spin">...</span>}
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </div>

      <ConfirmationModal
        isOpen={consentModal}
        title="Update Privacy Consent"
        message="You are about to update your privacy policy consent. Review the updated privacy policy and confirm."
        confirmText="I Agree"
        onConfirm={() => setConsentModal(false)}
        onCancel={() => setConsentModal(false)}
      />
    </div>
  );
}
