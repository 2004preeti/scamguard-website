import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Globe, ShieldAlert, LogIn, PhoneCall, BookOpen, Sparkles, AlertCircle } from 'lucide-react';

export default function Header({
  onOpenReportModal,
  onOpenEmergency,
  onOpenEncyclopedia,
  onOpenDirectory,
  onOpenQuiz,
}) {
  const location = useLocation();

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* Logo */}
        <Link to="/" style={styles.logoLink}>
          <div style={styles.logoIcon}>
            <Shield size={20} color="#60a5fa" />
          </div>
          <div>
            <span style={styles.logoText}>Scam<span style={styles.logoAccent}>Guard</span></span>
            <span style={styles.badge}>v3.2</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav style={styles.navLinks}>
          <a
            href="#scanner"
            style={styles.navLink}
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                const el = document.getElementById('scanner');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <Globe size={14} /> Threat Scanner
          </a>

          {onOpenEmergency && (
            <button onClick={onOpenEmergency} style={styles.emergencyNavBtn}>
              <AlertCircle size={14} color="#f87171" /> Emergency 1930
            </button>
          )}

          {onOpenEncyclopedia && (
            <button onClick={onOpenEncyclopedia} style={styles.navButton}>
              <BookOpen size={14} color="#c084fc" /> Scam Archive
            </button>
          )}

          {onOpenDirectory && (
            <button onClick={onOpenDirectory} style={styles.navButton}>
              <PhoneCall size={14} color="#34d399" /> Verified Directory
            </button>
          )}

          {onOpenQuiz && (
            <button onClick={onOpenQuiz} style={styles.navButton}>
              <Sparkles size={14} color="#fbbf24" /> Scam Quiz
            </button>
          )}
        </nav>

        {/* Action Tools */}
        <div style={styles.actions}>
          {onOpenReportModal && (
            <button onClick={onOpenReportModal} style={styles.reportBtn}>
              <ShieldAlert size={14} color="#ef4444" /> Report Spam
            </button>
          )}

          <Link to="/login" style={styles.loginBtn}>
            <LogIn size={14} color="#60a5fa" /> Login
          </Link>
        </div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    backgroundColor: 'rgba(3, 0, 20, 0.88)',
    backdropFilter: 'blur(16px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '12px 24px',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
  },
  logoIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    background: 'rgba(59, 130, 246, 0.15)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: '18px',
    fontWeight: '800',
    color: 'white',
    letterSpacing: '-0.5px',
  },
  logoAccent: {
    background: 'linear-gradient(135deg, #60a5fa, #a855f7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  badge: {
    marginLeft: '8px',
    fontSize: '10px',
    fontWeight: '700',
    padding: '2px 6px',
    borderRadius: '6px',
    background: 'rgba(59, 130, 246, 0.2)',
    color: '#60a5fa',
    border: '1px solid rgba(59, 130, 246, 0.3)',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    flexWrap: 'wrap',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    color: '#cbd5e1',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
  },
  navButton: {
    background: 'none',
    border: 'none',
    color: '#cbd5e1',
    fontSize: '13px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '8px',
    transition: 'all 0.2s',
  },
  emergencyNavBtn: {
    background: 'rgba(239, 68, 68, 0.12)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    color: '#fca5a5',
    fontSize: '12px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
    padding: '5px 12px',
    borderRadius: '10px',
    transition: 'all 0.2s',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  reportBtn: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.25)',
    color: '#fca5a5',
    padding: '7px 16px',
    borderRadius: '10px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s',
  },
  loginBtn: {
    background: 'rgba(59, 130, 246, 0.1)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    color: '#93c5fd',
    padding: '7px 16px',
    borderRadius: '10px',
    fontSize: '12px',
    fontWeight: '600',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s',
  },
};
