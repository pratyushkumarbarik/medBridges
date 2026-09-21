import { useState, useEffect } from 'react';
import { Send, Paperclip, Phone, Video, MoreVertical, Search, Plus } from 'lucide-react';
import ChatBox from '../components/ChatBox';
import { mockHospitals } from '../data/mockHospitals';

interface Message {
  id: string;
  sender: 'patient' | 'hospital';
  senderName: string;
  text: string;
  date: string;
  read: boolean;
  attachments?: { name: string; url: string }[];
}

export default function MessagesPage() {
  const [activeHospital, setActiveHospital] = useState('MediCore International Hospital');
  const [messagesByHospital, setMessagesByHospital] = useState<Record<string, Message[]>>({
    'MediCore International Hospital': [
      { id: 'm_001', sender: 'hospital', senderName: 'MediCore Hospital', text: 'Your appointment is confirmed for Oct 15, 2025 at 10:00 AM.', date: '2025-09-22T09:00:00Z', read: true },
      { id: 'm_002', sender: 'patient', senderName: 'John Doe', text: 'Thank you, I will be there.', date: '2025-09-22T09:05:00Z', read: true },
      { id: 'm_003', sender: 'hospital', senderName: 'MediCore Hospital', text: 'Please bring your previous medical records and insurance card.', date: '2025-09-22T09:10:00Z', read: false },
    ],
    'Global Health Medical Center': [
      { id: 'm_004', sender: 'hospital', senderName: 'Global Health', text: 'Your consultation report is ready for review.', date: '2025-09-20T14:00:00Z', read: true },
    ],
  });

  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const hospitals = mockHospitals;
  const activeMessages = messagesByHospital[activeHospital] || [];

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: `m_${Date.now()}`,
      sender: 'patient',
      senderName: 'John Doe',
      text: input.trim(),
      date: new Date().toISOString(),
      read: true,
    };
    setMessagesByHospital((prev) => ({
      ...prev,
      [activeHospital]: [...(prev[activeHospital] || []), newMsg],
    }));
    setInput('');
  };

  const unreadCount = (hospitalName: string) => {
    return (messagesByHospital[hospitalName] || []).filter((m) => !m.read && m.sender === 'hospital').length;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-sm text-gray-500 mt-1">Communicate with your healthcare providers</p>
        </div>
        <button className="bg-teal-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-teal-700 transition-colors flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" />
          New Message
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Hospital List */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search hospitals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            {hospitals
              .filter((h) => h.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((hospital) => (
                <button
                  key={hospital.id}
                  onClick={() => setActiveHospital(hospital.name)}
                  className={`w-full flex items-center gap-3 p-4 text-left border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    activeHospital === hospital.name ? 'bg-teal-50 border-l-4 border-l-teal-600' : ''
                  }`}
                >
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-700 font-bold text-sm">
                      {hospital.name.split(' ').map((w) => w[0]).join('').substring(0, 2)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{hospital.name}</p>
                    <p className="text-xs text-gray-500 truncate">{hospital.city}</p>
                  </div>
                  {unreadCount(hospital.name) > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                      {unreadCount(hospital.name)}
                    </span>
                  )}
                </button>
              ))}
          </div>
        </div>

        {/* Chat */}
        <div className="lg:col-span-2">
          <ChatBox messages={activeMessages} hospitalName={activeHospital} />
        </div>
      </div>
    </div>
  );
}
