import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import PatientLayout from "../layouts/PatientLayout";
import AuthLayout from "../layouts/AuthLayout";

import ProtectedRoute from "../components/ProtectedRoute";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import PatientDashboard from "../pages/PatientDashboard";
import MedicalDocumentsPage from "../pages/MedicalDocumentsPage";
import AIAnalysisPage from "../pages/AIAnalysisPage";
import HospitalMatchingPage from "../pages/HospitalMatchingPage";
import HospitalDetailsPage from "../pages/HospitalDetailsPage";
import ConsultationPage from "../pages/ConsultationPage";
import VideoConsultationPage from "../pages/VideoConsultationPage";
import PaymentPage from "../pages/PaymentPage";
import TreatmentTrackingPage from "../pages/TreatmentTrackingPage";
import MessagesPage from "../pages/MessagesPage";
import NotificationsPage from "../pages/NotificationsPage";
import ProfilePage from "../pages/ProfilePage";
import SettingsPage from "../pages/SettingsPage";

function AppContent() {
  const location = useLocation();

  // Auth pages
  const authPaths = ['/login', '/register', '/forgot-password'];
  if (authPaths.includes(location.pathname)) {
    return (
      <AuthLayout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Routes>
      </AuthLayout>
    );
  }

  // Landing page
  if (location.pathname === '/') {
    return (
      <PublicLayout>
        <LandingPage />
      </PublicLayout>
    );
  }

  // Patient dashboard routes
  if (location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/hospital-details')) {
    return (
      <ProtectedRoute>
        <PatientLayout>
          <Routes>
            <Route path="/dashboard" element={<PatientDashboard />} />
            <Route path="/dashboard/documents" element={<MedicalDocumentsPage />} />
            <Route path="/dashboard/ai-analysis" element={<AIAnalysisPage />} />
            <Route path="/dashboard/hospitals" element={<HospitalMatchingPage />} />
            <Route path="/dashboard/hospitals/:id" element={<HospitalDetailsPage />} />
            <Route path="/dashboard/consultations" element={<ConsultationPage />} />
            <Route path="/dashboard/video-consultation" element={<VideoConsultationPage />} />
            <Route path="/dashboard/payment" element={<PaymentPage />} />
            <Route path="/dashboard/treatment" element={<TreatmentTrackingPage />} />
            <Route path="/dashboard/messages" element={<MessagesPage />} />
            <Route path="/dashboard/notifications" element={<NotificationsPage />} />
            <Route path="/dashboard/profile" element={<ProfilePage />} />
            <Route path="/dashboard/settings" element={<SettingsPage />} />
            <Route path="*" element={<PatientDashboard />} />
          </Routes>
        </PatientLayout>
      </ProtectedRoute>
    );
  }

  return <Navigate to="/" replace />;
}

export default function App() {
  return <AppContent />;
}
