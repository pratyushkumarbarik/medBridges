import { Link } from "react-router-dom";
import { ReactNode } from "react";
import logo from "../assets/MediBridges_logo.png";

interface NavbarProps {
  user?: {
    firstName: string;
  } | null;
  onLogout?: () => void;
}

export default function Navbar({
  user,
  onLogout,
}: NavbarProps) {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Medibridges Logo"
              className="h-12 w-auto object-contain"
            />

            <span className="text-xl font-bold text-gray-900">
              Medibridges
            </span>
          </Link>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-sm text-gray-600">
                Hi, {user.firstName}
              </span>
            )}

            <button
              onClick={onLogout}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}