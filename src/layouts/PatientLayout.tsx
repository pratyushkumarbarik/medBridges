import { Link, useNavigate } from "react-router-dom";
import {
  Activity,
  LogOut,
  LayoutDashboard,
  Menu,
  XCircle,
  Stethoscope,
  FileText,
  Brain,
  Building2,
  Calendar,
  CreditCard,
  MessageSquare,
  User,
  Settings,
} from "lucide-react";
import { type ReactNode, useState } from "react";
import logo from "../assets/MediBridges_logo.png";

interface PatientLayoutProps {
  children: ReactNode;
}

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Documents", path: "/dashboard/documents", icon: FileText },
  { label: "AI Analysis", path: "/dashboard/ai-analysis", icon: Brain },
  { label: "Hospitals", path: "/dashboard/hospitals", icon: Building2 },
  {
    label: "Consultations",
    path: "/dashboard/consultations",
    icon: Calendar,
  },
  { label: "Payment", path: "/dashboard/payment", icon: CreditCard },
  { label: "Treatment", path: "/dashboard/treatment", icon: Activity },
  { label: "Messages", path: "/dashboard/messages", icon: MessageSquare },
  { label: "Profile", path: "/dashboard/profile", icon: User },
  { label: "Settings", path: "/dashboard/settings", icon: Settings },
];

export default function PatientLayout({
  children,
}: PatientLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and Mobile Menu */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
                aria-label="Toggle navigation menu"
              >
                {sidebarOpen ? (
                  <XCircle className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>

              <Link to="/" className="flex items-center gap-2">
                <img
                  src={logo}
                  alt="Medibridges Logo"
                  className="h-12 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Patient and Logout */}
            <div className="flex items-center gap-4">
              <span className="hidden items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-sm text-teal-700 sm:flex">
                <Stethoscope className="h-3.5 w-3.5" />
                Patient
              </span>

              <button
                onClick={handleLogout}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                title="Logout"
                aria-label="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Page Layout */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8 py-6">
          {/* Mobile Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-30 bg-black/50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside
            className={`${
              sidebarOpen
                ? "fixed inset-y-0 left-0 z-40 block w-64 bg-white px-4 pt-20 shadow-xl"
                : "hidden"
            } w-64 flex-shrink-0 lg:relative lg:block lg:bg-transparent lg:px-0 lg:pt-0 lg:shadow-none`}
          >
            <nav className="space-y-1 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-teal-50 hover:text-teal-700"
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}