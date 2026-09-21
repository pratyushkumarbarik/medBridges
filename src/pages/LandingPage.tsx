import { Search, Briefcase, Heart, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>
          <div className="w-12 h-1 bg-teal-600 mx-auto mt-3 rounded" />
        </div>
        {children}
      </div>
    </section>
  );
}

export default function LandingPage() {
  const services = [
    { icon: Briefcase, title: 'Hospital Matching', desc: 'AI-powered matching to find the best hospitals for your needs worldwide.' },
    { icon: Heart, title: 'Consultations', desc: 'Video, audio, and in-person consultations with top specialists.' },
    { icon: FileIcon, title: 'Medical Documents', desc: 'Secure upload, storage, and AI analysis of your medical records.' },
    { icon: Globe, title: 'Global Network', desc: 'Access to healthcare providers across 30+ countries.' },
    { icon: Shield, title: 'Insurance Support', desc: 'Navigate insurance claims and coverage with ease.' },
    { icon: Search, title: 'AI Analysis', desc: 'Intelligent document processing with preliminary insights.' },
  ];

  const steps = [
    { num: '1', title: 'Create Account', desc: 'Register as a patient and set up your health profile.' },
    { num: '2', title: 'Upload Documents', desc: 'Securely upload your medical documents and records.' },
    { num: '3', title: 'Get AI Analysis', desc: 'Our AI analyzes your documents and provides insights.' },
    { num: '4', title: 'Find Hospitals', desc: 'Discover recommended hospitals and doctors matched to you.' },
    { num: '5', title: 'Book Consultation', desc: 'Schedule appointments and connect with healthcare providers.' },
    { num: '6', title: 'Track Treatment', desc: 'Monitor your treatment progress and communicate with your care team.' },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Your Health, Our Bridge
              </h1>
              <p className="mt-6 text-lg text-teal-100 leading-relaxed max-w-lg">
                Medibridges connects you with world-class healthcare providers globally. From document management to AI-powered insights, we're your trusted healthcare companion.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="bg-white text-teal-700 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors shadow-lg"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="bg-transparent border-2 border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  Login
                </Link>
              </div>
              <div className="mt-10 flex items-center gap-6 text-teal-100 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  HIPAA Compliant
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  30+ Countries
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: '2,500+', label: 'Hospitals' },
                  { num: '15,000+', label: 'Doctors' },
                  { num: '1M+', label: 'Documents' },
                  { num: '98%', label: 'Satisfaction' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/10 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-white">{stat.num}</p>
                    <p className="text-sm text-teal-100">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <Section title="Our Services">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.title} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="bg-teal-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.desc}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* How It Works */}
      <Section title="How It Works">
        <div className="relative">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-teal-200" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {steps.map((step) => (
              <div key={step.num} className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg relative z-10">
                  {step.num}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-teal-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to take control of your health?</h2>
          <p className="mt-4 text-teal-100 text-lg">Join thousands of patients who trust Medibridges for their healthcare journey.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/register" className="bg-white text-teal-700 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors">
              Create Free Account
            </Link>
            <Link to="/login" className="bg-transparent border-2 border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FileIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M14.5 13a2.5 2.5 0 0 0-2 4l-.5 1.5" />
    </svg>
  );
}
