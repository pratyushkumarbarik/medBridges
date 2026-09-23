import {
  LayoutDashboard,
  FileText,
  Brain,
  Building2,
  Calendar,
  CreditCard,
  Stethoscope,
  MessageSquare,
  User,
  Settings,
} from 'lucide-react';

import { Link, useLocation } from 'react-router-dom';
import { ReactNode, useState } from 'react';

interface SidebarProps {
  children?: ReactNode;
  onNavigate?: (path: string) => void;
}

const navItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Documents',
    path: '/dashboard/documents',
    icon: FileText,
  },
  {
    label: 'AI Analysis',
    path: '/dashboard/ai-analysis',
    icon: Brain,
  },
  {
    label: 'Hospitals',
    path: '/dashboard/hospitals',
    icon: Building2,
  },
  {
    label: 'Consultations',
    path: '/dashboard/consultations',
    icon: Calendar,
  },
  {
    label: 'Payment',
    path: '/dashboard/payment',
    icon: CreditCard,
  },
  {
    label: 'Treatment',
    path: '/dashboard/treatment',
    icon: Stethoscope,
  },
  {
    label: 'Messages',
    path: '/dashboard/messages',
    icon: MessageSquare,
  },
  {
    label: 'Profile',
    path: '/dashboard/profile',
    icon: User,
  },
  {
    label: 'Settings',
    path: '/dashboard/settings',
    icon: Settings,
  },
];

export default function Sidebar({
  children,
  onNavigate,
}: SidebarProps) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex-shrink-0 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <nav className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 space-y-1">
        <div className="flex items-center justify-between px-2 py-2 mb-2">
          {!collapsed && (
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Menu
            </span>
          )}

          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded hover:bg-gray-100 text-gray-400"
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            location.pathname === item.path ||
            location.pathname.startsWith(item.path + '/');

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => onNavigate?.(item.path)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-600 hover:bg-teal-50 hover:text-teal-700'
              } ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />

              {!collapsed && item.label}
            </Link>
          );
        })}
      </nav>

      {children}
    </aside>
  );
}