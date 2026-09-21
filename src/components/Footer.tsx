import { Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

export default function Footer({ children }: { children?: ReactNode }) {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-teal-600 p-2 rounded-lg">
                <Activity className="text-white w-5 h-5" />
              </div>
              <Link to="/" className="text-lg font-bold text-white">Medibridges</Link>
            </div>
            <p className="text-sm leading-relaxed max-w-md">
              Connecting patients with world-class healthcare providers globally. Your health, our bridge.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-teal-400 transition-colors">Home</Link></li>
              <li><Link to="/login" className="hover:text-teal-400 transition-colors">Login</Link></li>
              <li><Link to="/register" className="hover:text-teal-400 transition-colors">Register</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Consultations</li>
              <li>Medical Documents</li>
              <li>AI Analysis</li>
              <li>Hospital Matching</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          &copy; 2026 Medibridges. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
