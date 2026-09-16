import React from 'react';
import { Shield, Lock, Eye, FileText, CheckCircle2, ArrowLeft, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  const contactEmail = 'scamguard03@gmail.com';

  return (
    <div style={styles.container}>
      <div style={styles.glowTop} />
      <div style={styles.wrapper}>
        <Link to="/" style={styles.backLink}>
          <ArrowLeft size={14} /> Back to Threat Scanner
        </Link>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.badge}>
            <Lock size={14} /> PRIVACY & DATA GOVERNANCE
          </div>
          <h1 style={styles.title}>
            Privacy <span style={styles.gradientText}>Policy</span>
          </h1>
          <p style={styles.subtitle}>
            Last updated: September 2026. ScamGuard is built on a strict privacy-first, zero-log foundation to protect citizens without compromising their personal data.
          </p>
        </div>

        {/* Content Body */}
        <div style={styles.contentCard}>
          <section style={styles.section}>
            <h2 style={styles.heading}>1. Executive Summary & Zero-Log Architecture</h2>
            <p style={styles.paragraph}>
              ScamGuard ("we", "our", "us") respects your digital privacy. Unlike commercial data brokers, our mission is exclusively cyber threat detection. We do <strong>NOT</strong> collect, sell, monetize, or track your personal identity, browsing history, address books, or confidential communications.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>2. Information Processed by Threat Scanners</h2>
            <p style={styles.paragraph}>
              When you submit a query through our 11 fraud detection scanners (e.g. Phone lookup, SMS text, WhatsApp messages, OCR screenshots, or URL links):
            </p>
            <ul style={styles.list}>
              <li>
                <strong>Ephemeral Scanning:</strong> Scanned text and extracted OCR images are parsed temporarily in memory solely to calculate heuristic fraud risk scores and are discarded after evaluation.
              </li>
              <li>
                <strong>No Personally Identifiable Information (PII):</strong> We strip out sensitive personal tokens (such as personal banking account numbers, passwords, and private names) prior to database heuristic aggregation.
              </li>
              <li>
                <strong>Crowdsourced Spam Reports:</strong> Numbers and phishing URLs voluntarily submitted via the "Report Spam" module are stored as public threat intelligence to protect the wider community against robocallers and scam syndicates.
              </li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>3. Cryptography & Data Transmission Security</h2>
            <p style={styles.paragraph}>
              All communications between your client device and ScamGuard servers are encrypted using modern Transport Layer Security (TLS 1.3 / HTTPS). Data in transit is secured with high-grade 256-bit encryption.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>4. Cookies & Local Storage</h2>
            <p style={styles.paragraph}>
              ScamGuard does not employ third-party advertising cookies or cross-site tracking trackers. Local browser storage is used strictly for user preferences and authenticated administrator sessions.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>5. Data Retention & Deletion</h2>
            <p style={styles.paragraph}>
              Audit scan logs maintain anonymized metadata (e.g., threat category and risk score) for operational analytics and are purged systematically. You have the right to request deletion of any crowdsourced number report submitted in error.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>6. Contacting the Privacy Officer</h2>
            <p style={styles.paragraph}>
              For any questions regarding this Privacy Policy or data governance requests, please contact our Data Protection team at:
            </p>
            <div style={styles.contactBox}>
              <Mail size={16} color="#60a5fa" />
              <span>Email: <a href={`mailto:${contactEmail}`} style={styles.emailLink}>{contactEmail}</a></span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#030014',
    minHeight: '100vh',
    color: '#f8fafc',
    fontFamily: "'Inter', sans-serif",
    padding: '40px 20px 100px',
    position: 'relative',
    overflow: 'hidden',
  },
  glowTop: {
    position: 'absolute',
    top: '-10%',
    left: '20%',
    width: '60%',
    height: '40%',
    background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  wrapper: {
    maxWidth: '900px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 10,
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    color: '#94a3b8',
    textDecoration: 'none',
    fontWeight: '600',
    marginBottom: '30px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 16px',
    borderRadius: '100px',
    background: 'rgba(59, 130, 246, 0.1)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    fontSize: '11px',
    fontWeight: '700',
    color: '#60a5fa',
    marginBottom: '16px',
  },
  title: {
    fontSize: 'clamp(32px, 5vw, 44px)',
    fontWeight: '900',
    margin: '0 0 14px',
    letterSpacing: '-1px',
  },
  gradientText: {
    background: 'linear-gradient(135deg, #60a5fa, #a855f7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '14px',
    color: '#94a3b8',
    lineHeight: '1.7',
    maxWidth: '650px',
    margin: '0 auto',
  },
  contentCard: {
    background: 'rgba(15, 23, 42, 0.8)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(20px)',
    borderRadius: '28px',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  heading: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#ffffff',
    margin: 0,
  },
  paragraph: {
    fontSize: '14px',
    color: '#94a3b8',
    lineHeight: '1.7',
    margin: 0,
  },
  list: {
    paddingLeft: '20px',
    margin: '6px 0 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontSize: '14px',
    color: '#94a3b8',
    lineHeight: '1.6',
  },
  contactBox: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(59, 130, 246, 0.1)',
    border: '1px solid rgba(59, 130, 246, 0.25)',
    borderRadius: '12px',
    padding: '10px 16px',
    fontSize: '13px',
    color: '#cbd5e1',
    marginTop: '6px',
  },
  emailLink: {
    color: '#60a5fa',
    fontWeight: '700',
    textDecoration: 'none',
  },
};
