import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import UserLogin from './pages/UserLogin';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import EmergencyPlaybookModal from './components/EmergencyPlaybookModal';
import ScamEncyclopediaModal from './components/ScamEncyclopediaModal';
import VerifiedDirectoryModal from './components/VerifiedDirectoryModal';
import ScamQuizModal from './components/ScamQuizModal';

export default function App() {
  const [showApiModal, setShowApiModal] = useState(false);
  const [showErModal, setShowErModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showEncyclopediaModal, setShowEncyclopediaModal] = useState(false);
  const [showDirectoryModal, setShowDirectoryModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);

  return (
    <Router>
      <div style={appContainerStyle}>
        <Header
          onOpenApiPlayground={() => setShowApiModal(true)}
          onOpenErDiagram={() => setShowErModal(true)}
          onOpenReportModal={() => setShowReportModal(true)}
          onOpenEmergency={() => setShowEmergencyModal(true)}
          onOpenEncyclopedia={() => setShowEncyclopediaModal(true)}
          onOpenDirectory={() => setShowDirectoryModal(true)}
          onOpenQuiz={() => setShowQuizModal(true)}
        />

        <main style={{ flex: 1 }}>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  showApiModal={showApiModal}
                  setShowApiModal={setShowApiModal}
                  showErModal={showErModal}
                  setShowErModal={setShowErModal}
                  showReportModal={showReportModal}
                  setShowReportModal={setShowReportModal}
                  showVoiceModal={showVoiceModal}
                  setShowVoiceModal={setShowVoiceModal}
                  onOpenEmergency={() => setShowEmergencyModal(true)}
                  onOpenEncyclopedia={() => setShowEncyclopediaModal(true)}
                  onOpenDirectory={() => setShowDirectoryModal(true)}
                  onOpenQuiz={() => setShowQuizModal(true)}
                />
              }
            />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/user-login" element={<UserLogin />} />
          </Routes>
        </main>

        <Footer
          onOpenReportModal={() => setShowReportModal(true)}
          onOpenVoiceModal={() => setShowVoiceModal(true)}
          onOpenEmergency={() => setShowEmergencyModal(true)}
          onOpenEncyclopedia={() => setShowEncyclopediaModal(true)}
          onOpenDirectory={() => setShowDirectoryModal(true)}
          onOpenQuiz={() => setShowQuizModal(true)}
        />

        {/* Dynamic Global Modals */}
        {showEmergencyModal && <EmergencyPlaybookModal onClose={() => setShowEmergencyModal(false)} />}
        {showEncyclopediaModal && <ScamEncyclopediaModal onClose={() => setShowEncyclopediaModal(false)} />}
        {showDirectoryModal && <VerifiedDirectoryModal onClose={() => setShowDirectoryModal(false)} />}
        {showQuizModal && <ScamQuizModal onClose={() => setShowQuizModal(false)} />}
      </div>
    </Router>
  );
}

const appContainerStyle = {
  minHeight: '100vh',
  backgroundColor: '#030014',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: "'Inter', sans-serif",
};
