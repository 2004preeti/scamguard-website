import React, { useState } from 'react';
import {
  ShieldAlert,
  Mail,
  PhoneCall,
  Globe,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  Heart,
  Radar,
  Lock,
  BookOpen,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer({
  onOpenReportModal,
  onOpenVoiceModal,
  onOpenEmergency,
  onOpenEncyclopedia,
  onOpenDirectory,
  onOpenQuiz,
}) {
  const [copied, setCopied] = useState(false);
  const email = 'scamguard03@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer style={styles.footer}>
      {/* Top Gradient Border */}
      <div style={styles.topBorder} />

      <div style={styles.container}>
        {/* Main Grid */}
        <div style={styles.grid}>
          {/* Column 1: Brand & Mission */}
          <div style={styles.brandCol}>
            <div style={styles.brandLogo}>
              <div style={styles.logoIcon}>
                <ShieldAlert size={22} color="#fff" />
              </div>
              <div>
                <span style={styles.brandName}>ScamGuard</span>
                <span style={styles.brandBadge}>AI</span>
              </div>
            </div>
            <p style={styles.brandDesc}>
              Next-generation multi-modal AI threat intelligence platform defending citizens against telephone extortion, phishing SMS, deepfake voices, and cyber fraud.
            </p>

            {/* Email Contact Box */}
            <div style={styles.emailBox}>
              <div style={styles.emailIconWrapper}>
                <Mail size={16} color="#60a5fa" />
              </div>
              <div style={styles.emailDetails}>
                <span style={styles.emailLabel}>Support & Inquiries</span>
                <a href={`mailto:${email}`} style={styles.emailLink}>
                  {email}
                </a>
              </div>
              <button
                onClick={handleCopyEmail}
                style={styles.copyBtn}
                title="Copy Email Address"
                aria-label="Copy Email Address"
              >
                {copied ? <Check size={14} color="#34d399" /> : <Copy size={14} color="#94a3b8" />}
              </button>
            </div>
          </div>

          {/* Column 2: Threat Detection Modules */}
          <div style={styles.linkCol}>
            <h4 style={styles.colTitle}>Protection Modules</h4>
            <ul style={styles.linkList}>
              <li>Fake Calls & Robocallers</li>
              <li>SMS Phishing & KYC Traps</li>
              <li>WhatsApp Task Scams</li>
              <li>Fake Job Offer Verification</li>
              <li>Customs & Parcel Extortion</li>
              <li>AI Voice Clone & Deepfakes</li>
              <li>Fake Loan Apps & Malicious URLs</li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div style={styles.linkCol}>
            <h4 style={styles.colTitle}>Platform Links</h4>
            <ul style={styles.linkList}>
              <li>
                <a
                  href="#scanner"
                  style={styles.navLink}
                  onClick={(e) => {
                    const el = document.getElementById('scanner');
                    if (el) {
                      e.preventDefault();
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <Radar size={13} /> Unified Threat Scanner
                </a>
              </li>
              <li>
                <button
                  onClick={() => onOpenReportModal && onOpenReportModal()}
                  style={styles.actionBtn}
                >
                  <ShieldAlert size={13} /> Report Spam Number
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenEmergency && onOpenEmergency()}
                  style={{ ...styles.actionBtn, color: '#f87171', fontWeight: 'bold' }}
                >
                  <AlertCircle size={13} color="#f87171" /> "I Got Scammed" Emergency Recovery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenEncyclopedia && onOpenEncyclopedia()}
                  style={styles.actionBtn}
                >
                  <BookOpen size={13} color="#c084fc" /> Scam Encyclopedia & Archive
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenQuiz && onOpenQuiz()}
                  style={styles.actionBtn}
                >
                  <Sparkles size={13} color="#fbbf24" /> "How Scam-Proof Are You?" Quiz
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Company & Legal */}
          <div style={styles.linkCol}>
            <h4 style={styles.colTitle}>Company & Legal</h4>
            <ul style={styles.linkList}>
              <li>
                <Link to="/about" style={styles.navLink}>
                  About ScamGuard
                </Link>
              </li>
              <li>
                <Link to="/contact" style={styles.navLink}>
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/privacy" style={styles.navLink}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" style={styles.navLink}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/login" style={styles.navLink}>
                  <Lock size={13} /> Portal Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: National Cyber Emergency */}
          <div style={styles.helplineCol}>
            <h4 style={styles.colTitle}>Emergency Cyber Help</h4>
            <div style={styles.helplineCard}>
              <div style={styles.helplineHeader}>
                <PhoneCall size={18} color="#ef4444" />
                <span style={styles.helplineTitle}>National Cyber Helpline</span>
              </div>
              <div style={styles.helplineNumber}>1930</div>
              <p style={styles.helplineSub}>
                Toll-free 24x7 Indian Cyber Crime Reporting helpline for immediate financial freeze.
              </p>
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noreferrer"
                style={styles.govLink}
              >
                cybercrime.gov.in <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={styles.bottomBar}>
          <div style={styles.copyText}>
            © {new Date().getFullYear()} <strong>ScamGuard AI</strong>. All rights reserved.
          </div>
          <div style={styles.bottomLinks}>
            <Link to="/about" style={{ color: '#94a3b8', textDecoration: 'none' }}>About</Link>
            <span style={styles.dot}>•</span>
            <Link to="/contact" style={{ color: '#94a3b8', textDecoration: 'none' }}>Contact</Link>
            <span style={styles.dot}>•</span>
            <Link to="/privacy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</Link>
            <span style={styles.dot}>•</span>
            <Link to="/terms" style={{ color: '#94a3b8', textDecoration: 'none' }}>Terms of Service</Link>
            <span style={styles.dot}>•</span>
            <span style={{ color: '#34d399', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span style={styles.livePulse}></span> Network Active
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#02030a',
    position: 'relative',
    zIndex: 20,
    marginTop: 'auto',
    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
    fontFamily: "'Inter', sans-serif",
  },
  topBorder: {
    height: '2px',
    background: 'linear-gradient(90deg, transparent, #3b82f6, #a855f7, transparent)',
    width: '100%',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '60px 24px 30px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '40px',
    marginBottom: '50px',
  },
  brandCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  brandLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoIcon: {
    width: '38px',
    height: '38px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 14px rgba(59, 130, 246, 0.3)',
  },
  brandName: {
    fontSize: '18px',
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: '-0.5px',
  },
  brandBadge: {
    fontSize: '10px',
    fontWeight: '800',
    color: '#60a5fa',
    marginLeft: '6px',
    background: 'rgba(59, 130, 246, 0.15)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    padding: '2px 6px',
    borderRadius: '6px',
  },
  brandDesc: {
    fontSize: '13px',
    color: '#94a3b8',
    lineHeight: '1.6',
    margin: 0,
  },
  emailBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: 'rgba(15, 23, 42, 0.8)',
    border: '1px solid rgba(59, 130, 246, 0.25)',
    borderRadius: '14px',
    padding: '10px 14px',
    marginTop: '6px',
  },
  emailIconWrapper: {
    width: '32px',
    height: '32px',
    borderRadius: '10px',
    background: 'rgba(59, 130, 246, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  emailDetails: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minWidth: 0,
  },
  emailLabel: {
    fontSize: '10px',
    color: '#64748b',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  emailLink: {
    fontSize: '13px',
    color: '#60a5fa',
    fontWeight: '700',
    textDecoration: 'none',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  copyBtn: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    padding: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
  linkCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  colTitle: {
    fontSize: '14px',
    fontWeight: '800',
    color: '#f1f5f9',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    margin: 0,
  },
  linkList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    fontSize: '13px',
    color: '#94a3b8',
  },
  navLink: {
    color: '#94a3b8',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'color 0.2s',
    cursor: 'pointer',
  },
  actionBtn: {
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    padding: 0,
    fontFamily: 'inherit',
    fontSize: '13px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'color 0.2s',
  },
  helplineCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  helplineCard: {
    background: 'rgba(239, 68, 68, 0.05)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    borderRadius: '18px',
    padding: '18px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  helplineHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  helplineTitle: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#f87171',
    textTransform: 'uppercase',
  },
  helplineNumber: {
    fontSize: '28px',
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: '1px',
  },
  helplineSub: {
    fontSize: '11px',
    color: '#cbd5e1',
    lineHeight: '1.5',
    margin: 0,
  },
  govLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    color: '#f87171',
    fontSize: '12px',
    fontWeight: '600',
    textDecoration: 'none',
    marginTop: '4px',
  },
  bottomBar: {
    paddingTop: '24px',
    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    fontSize: '12px',
    color: '#64748b',
  },
  copyText: {
    color: '#94a3b8',
  },
  bottomLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
  },
  dot: {
    color: '#334155',
  },
  livePulse: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    backgroundColor: '#34d399',
    display: 'inline-block',
  },
};
