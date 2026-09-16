import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Shield, Globe, ShieldAlert, LogIn, PhoneCall,
  BookOpen, Sparkles, AlertCircle, Menu, X,
} from 'lucide-react';

export default function Header({
  onOpenReportModal,
  onOpenEmergency,
  onOpenEncyclopedia,
  onOpenDirectory,
  onOpenQuiz,
}) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const scrollToScanner = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById('scanner');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  return (
    <>
      <style>{`
        .hdr-root {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(3, 0, 20, 0.92);
          backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .hdr-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 20px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        /* LOGO */
        .hdr-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .hdr-logo-icon {
          width: 34px; height: 34px;
          border-radius: 9px;
          background: rgba(59,130,246,0.15);
          border: 1px solid rgba(59,130,246,0.3);
          display: flex; align-items: center; justify-content: center;
        }
        .hdr-logo-text {
          font-size: 17px; font-weight: 800;
          color: #fff; letter-spacing: -0.5px;
        }
        .hdr-logo-accent {
          background: linear-gradient(135deg,#60a5fa,#a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hdr-badge {
          margin-left: 7px;
          font-size: 9px; font-weight: 700;
          padding: 2px 5px; border-radius: 5px;
          background: rgba(59,130,246,0.2);
          color: #60a5fa;
          border: 1px solid rgba(59,130,246,0.3);
        }

        /* DESKTOP NAV */
        .hdr-nav {
          display: flex; align-items: center; gap: 6px;
        }
        .hdr-nav-link {
          display: flex; align-items: center; gap: 5px;
          font-size: 12px; color: #cbd5e1; font-weight: 500;
          text-decoration: none;
          padding: 5px 9px; border-radius: 8px;
          transition: background 0.2s;
          background: none; border: none; cursor: pointer;
          white-space: nowrap;
        }
        .hdr-nav-link:hover { background: rgba(255,255,255,0.06); color: #fff; }
        .hdr-emergency {
          display: flex; align-items: center; gap: 5px;
          font-size: 12px; font-weight: 700;
          color: #fca5a5;
          padding: 5px 10px; border-radius: 9px;
          background: rgba(239,68,68,0.12);
          border: 1px solid rgba(239,68,68,0.3);
          cursor: pointer; white-space: nowrap;
          transition: all 0.2s;
        }
        .hdr-actions {
          display: flex; align-items: center; gap: 8px;
        }
        .hdr-report-btn {
          display: flex; align-items: center; gap: 5px;
          font-size: 12px; font-weight: 600; color: #fca5a5;
          padding: 6px 13px; border-radius: 9px;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.25);
          cursor: pointer; white-space: nowrap;
          transition: all 0.2s;
        }
        .hdr-login-btn {
          display: flex; align-items: center; gap: 5px;
          font-size: 12px; font-weight: 600; color: #93c5fd;
          padding: 6px 13px; border-radius: 9px;
          background: rgba(59,130,246,0.1);
          border: 1px solid rgba(59,130,246,0.3);
          text-decoration: none; white-space: nowrap;
          transition: all 0.2s;
        }

        /* HAMBURGER */
        .hdr-hamburger {
          display: none;
          background: none; border: none;
          color: #fff; cursor: pointer;
          padding: 6px; border-radius: 8px;
          transition: background 0.2s;
        }
        .hdr-hamburger:hover { background: rgba(255,255,255,0.08); }

        /* MOBILE DRAWER */
        .hdr-drawer {
          display: none;
          position: fixed;
          top: 60px; left: 0; right: 0;
          background: rgba(5, 2, 28, 0.98);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding: 16px 20px 24px;
          flex-direction: column;
          gap: 6px;
          z-index: 99;
          animation: slideDown 0.2s ease;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hdr-drawer.open { display: flex; }

        .hdr-drawer-item {
          display: flex; align-items: center; gap: 10px;
          font-size: 14px; color: #cbd5e1; font-weight: 500;
          padding: 12px 14px; border-radius: 10px;
          text-decoration: none;
          background: none; border: none; cursor: pointer;
          text-align: left; width: 100%;
          transition: background 0.2s;
        }
        .hdr-drawer-item:hover { background: rgba(255,255,255,0.06); color: #fff; }

        .hdr-drawer-emergency {
          display: flex; align-items: center; gap: 10px;
          font-size: 14px; font-weight: 700; color: #fca5a5;
          padding: 12px 14px; border-radius: 10px;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.2);
          cursor: pointer; text-align: left; width: 100%;
          transition: all 0.2s;
        }
        .hdr-drawer-divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin: 8px 0;
        }
        .hdr-drawer-report {
          display: flex; align-items: center; gap: 10px;
          font-size: 14px; font-weight: 600; color: #fca5a5;
          padding: 12px 14px; border-radius: 10px;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.2);
          cursor: pointer; width: 100%;
          transition: all 0.2s;
        }
        .hdr-drawer-login {
          display: flex; align-items: center; gap: 10px;
          font-size: 14px; font-weight: 600; color: #93c5fd;
          padding: 12px 14px; border-radius: 10px;
          background: rgba(59,130,246,0.1);
          border: 1px solid rgba(59,130,246,0.25);
          text-decoration: none;
          transition: all 0.2s;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .hdr-nav   { display: none; }
          .hdr-actions { display: none; }
          .hdr-hamburger { display: flex; align-items: center; }
        }
      `}</style>

      <header className="hdr-root">
        <div className="hdr-inner">
          {/* Logo */}
          <Link to="/" className="hdr-logo">
            <div className="hdr-logo-icon">
              <Shield size={18} color="#60a5fa" />
            </div>
            <div>
              <span className="hdr-logo-text">
                Scam<span className="hdr-logo-accent">Guard</span>
              </span>
              <span className="hdr-badge">v3.2</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hdr-nav">
            <a href="#scanner" className="hdr-nav-link" onClick={scrollToScanner}>
              <Globe size={13} /> Threat Scanner
            </a>
            {onOpenEmergency && (
              <button className="hdr-emergency" onClick={onOpenEmergency}>
                <AlertCircle size={13} /> Emergency 1930
              </button>
            )}
            {onOpenEncyclopedia && (
              <button className="hdr-nav-link" onClick={onOpenEncyclopedia}>
                <BookOpen size={13} color="#c084fc" /> Scam Archive
              </button>
            )}
            {onOpenDirectory && (
              <button className="hdr-nav-link" onClick={onOpenDirectory}>
                <PhoneCall size={13} color="#34d399" /> Verified Directory
              </button>
            )}
            {onOpenQuiz && (
              <button className="hdr-nav-link" onClick={onOpenQuiz}>
                <Sparkles size={13} color="#fbbf24" /> Scam Quiz
              </button>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hdr-actions">
            {onOpenReportModal && (
              <button className="hdr-report-btn" onClick={onOpenReportModal}>
                <ShieldAlert size={13} /> Report Spam
              </button>
            )}
            <Link to="/login" className="hdr-login-btn">
              <LogIn size={13} /> Login
            </Link>
          </div>

          {/* Hamburger Button (Mobile) */}
          <button
            className="hdr-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`hdr-drawer${menuOpen ? ' open' : ''}`}>
        <a href="#scanner" className="hdr-drawer-item" onClick={scrollToScanner}>
          <Globe size={16} /> Threat Scanner
        </a>

        {onOpenEmergency && (
          <button className="hdr-drawer-emergency" onClick={() => { onOpenEmergency(); closeMenu(); }}>
            <AlertCircle size={16} color="#f87171" /> Emergency 1930
          </button>
        )}

        {onOpenEncyclopedia && (
          <button className="hdr-drawer-item" onClick={() => { onOpenEncyclopedia(); closeMenu(); }}>
            <BookOpen size={16} color="#c084fc" /> Scam Archive
          </button>
        )}

        {onOpenDirectory && (
          <button className="hdr-drawer-item" onClick={() => { onOpenDirectory(); closeMenu(); }}>
            <PhoneCall size={16} color="#34d399" /> Verified Directory
          </button>
        )}

        {onOpenQuiz && (
          <button className="hdr-drawer-item" onClick={() => { onOpenQuiz(); closeMenu(); }}>
            <Sparkles size={16} color="#fbbf24" /> Scam Quiz
          </button>
        )}

        <div className="hdr-drawer-divider" />

        {onOpenReportModal && (
          <button className="hdr-drawer-report" onClick={() => { onOpenReportModal(); closeMenu(); }}>
            <ShieldAlert size={16} color="#ef4444" /> Report Spam
          </button>
        )}

        <Link to="/login" className="hdr-drawer-login" onClick={closeMenu}>
          <LogIn size={16} color="#60a5fa" /> Login
        </Link>
      </div>
    </>
  );
}
