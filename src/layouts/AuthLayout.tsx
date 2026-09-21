import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { ReactNode } from "react";
import logo from "../assets/MediBridges_logo.png";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-gray-50 flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between px-6 sm:px-12 py-6">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="MediBridges Logo"
            className="h-12 w-auto object-contain"
          />
        </Link>

        <Link
          to="/"
          className="text-sm text-gray-500 hover:text-teal-600 transition-colors"
        >
          Back to Home
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">

            {/* Auth Branding */}
            <div className="text-center mb-8">
              <img
                src={logo}
                alt="MediBridges Logo"
                className="h-20 w-auto max-w-[240px] object-contain mx-auto mb-4"
              />

              <p className="text-sm text-gray-500 mt-1">
                Your healthcare, connected globally
              </p>
            </div>

            {children}
          </div>

          {/* Support */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Need help?{" "}
              <Link
                to="/"
                className="text-teal-600 hover:underline font-medium"
              >
                Contact Support
              </Link>
            </p>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-400">
        &copy; 2026 Medibridges. All rights reserved.
      </footer>

    </div>
  );
}