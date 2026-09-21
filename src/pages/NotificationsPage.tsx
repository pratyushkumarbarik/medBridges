import { useState, useEffect } from 'react';
import { Bell, Check, CheckCheck, XCircle } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'reminder';
  read: boolean;
  date: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications([
        { id: 'n_001', title: 'Appointment Reminder', message: 'Your consultation with Dr. Sarah Johnson is tomorrow at 10:00 AM.', type: 'reminder', read: false, date: '2025-09-27T08:00:00Z' },
        { id: 'n_002', title: 'Document Processed', message: 'Your Blood Test Results have been analyzed by AI.', type: 'success', read: false, date: '2025-09-25T10:00:00Z' },
        { id: 'n_003', title: 'Payment Received', message: 'Your payment of $200 has been processed successfully.', type: 'success', read: true, date: '2025-09-20T14:00:00Z' },
        { id: 'n_004', title: 'New Message', message: 'MediCore Hospital sent you a new message.', type: 'info', read: false, date: '2025-09-22T09:00:00Z' },
        { id: 'n_005', title: 'Lab Results Available', message: 'Your MRI Brain results are now available for review.', type: 'info', read: true, date: '2025-09-18T11:00:00Z' },
        { id: 'n_006', title: 'Treatment Update', message: 'Your Cardiac Care Program progress has been updated.', type: 'warning', read: false, date: '2025-09-26T16:00:00Z' },
      ]);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getTypeStyle = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'reminder': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <Check className="w-4 h-4 text-green-500" />;
      case 'warning': return <Bell className="w-4 h-4 text-yellow-500" />;
      case 'reminder': return <Bell className="w-4 h-4 text-blue-500" />;
      default: return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const filtered = filter === 'unread' ? notifications.filter((n) => !n.read) : notifications;
  const unreadCount = notifications.filter((n) => !n.read).length;

  if (loading) return <LoadingSpinner size="lg" text="Loading notifications..." />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-sm text-gray-500 mt-1">Stay updated with your health journey</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
          >
            <CheckCheck className="w-4 h-4" />
            Mark all as read
          </button>
        )}
      </div>

      {error && <ErrorMessage message={error} type="error" onDismiss={() => setError('')} />}

      {/* Filters */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'all' ? 'bg-teal-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'unread' ? 'bg-teal-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No notifications</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start gap-3 p-4 rounded-xl border ${getTypeStyle(notification.type)} ${
                !notification.read ? 'ring-1 ring-teal-200' : ''
              }`}
            >
              <div className="mt-0.5">{getTypeIcon(notification.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                    {notification.title}
                  </h4>
                  <div className="flex items-center gap-1">
                    {!notification.read && (
                      <button onClick={() => markAsRead(notification.id)} className="p-1 hover:bg-white/50 rounded">
                        <Check className="w-3.5 h-3.5 text-gray-400" />
                      </button>
                    )}
                    <button onClick={() => deleteNotification(notification.id)} className="p-1 hover:bg-white/50 rounded">
                      <XCircle className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-0.5">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(notification.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at{' '}
                  {new Date(notification.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
