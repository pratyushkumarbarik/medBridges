import { Link } from "react-router-dom";
import { ReactNode } from "react";
import logo from "../assets/MediBridges_logo.png";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="Medibridges Logo"
                className="h-14 w-40 object-contain"
              />
            </Link>

            {/* Navigation */}
            <nav className="hidden items-center gap-6 md:flex">
              <Link
                to="/"
                className="font-medium text-gray-600 transition-colors hover:text-teal-600"
              >
                Home
              </Link>

              <Link
                to="/login"
                className="font-medium text-gray-600 transition-colors hover:text-teal-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="font-medium text-gray-600 transition-colors hover:text-teal-600"
              >
                Register
              </Link>

              <Link
                to="/dashboard"
                className="rounded-lg bg-teal-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-teal-700"
              >
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-gray-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="inline-flex items-center">
                <img
                  src={logo}
                  alt="Medibridges Logo"
                  className="h-16 w-44 rounded-lg bg-white p-2 object-contain"
                />
              </Link>

              <p className="mt-4 max-w-md text-sm leading-relaxed">
                Connecting patients with world-class healthcare providers
                globally. Your health, our bridge.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-4 font-semibold text-white">Quick Links</h4>

              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/"
                    className="transition-colors hover:text-teal-400"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to="/login"
                    className="transition-colors hover:text-teal-400"
                  >
                    Login
                  </Link>
                </li>

                <li>
                  <Link
                    to="/register"
                    className="transition-colors hover:text-teal-400"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="mb-4 font-semibold text-white">Services</h4>

              <ul className="space-y-2 text-sm">
                <li>Consultations</li>
                <li>Medical Documents</li>
                <li>AI Analysis</li>
                <li>Hospital Matching</li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm">
            &copy; 2026 Medibridges. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}