import React from 'react';
import { Shield, FileText, CheckCircle2, ArrowLeft, Mail, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
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
            <FileText size={14} /> USER TERMS & OPERATIONAL GUIDELINES
          </div>
          <h1 style={styles.title}>
            Terms of <span style={styles.gradientText}>Service</span>
          </h1>
          <p style={styles.subtitle}>
            Last updated: September 2026. Please read these terms carefully before accessing or using the ScamGuard platform.
          </p>
        </div>

        {/* Content Body */}
        <div style={styles.contentCard}>
          <section style={styles.section}>
            <h2 style={styles.heading}>1. Acceptance of Terms</h2>
            <p style={styles.paragraph}>
              By accessing, browsing, or utilizing the ScamGuard web application, threat analysis scanners, AI heuristics, or emergency recovery guides, you agree to be legally bound by these Terms of Service. If you do not agree with any part of these terms, you must refrain from using the platform.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>2. Purpose & Nature of Service</h2>
            <p style={styles.paragraph}>
              ScamGuard provides multi-modal AI threat assessment tools intended to assist users in detecting potential telephone scam calls, phishing SMS, WhatsApp tasks, fake job offers, and fraudulent URLs. Our platform operates as an informational advisory defense tool.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>3. Acceptable Use Policy</h2>
            <p style={styles.paragraph}>
              Users agree to utilize ScamGuard strictly for lawful, personal, or authorized organizational cybersecurity evaluation. You agree NOT to:
            </p>
            <ul style={styles.list}>
              <li>Submit deliberately false or malicious spam reports intended to harass legitimate individuals or businesses.</li>
              <li>Attempt to disrupt, overload, or execute denial-of-service (DDoS) attacks against ScamGuard infrastructure or APIs.</li>
              <li>Utilize automated web-scraping bots without prior written authorization.</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>4. AI Accuracy & Disclaimer of Warranties</h2>
            <p style={styles.paragraph}>
              While ScamGuard's AI models achieve industry-leading benchmarks (99.4% accuracy), cyber threat actors constantly evolve their techniques. Threat evaluation scores represent probabilistic heuristic classifications. In all financial or legal emergencies, users are urged to immediately contact their official banking branch or dial the National Cyber Emergency helpline <strong>1930</strong>.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>5. Limitation of Liability</h2>
            <p style={styles.paragraph}>
              To the maximum extent permitted by applicable law, ScamGuard, its developers, and contributors shall not be held liable for any indirect, incidental, or consequential damages resulting from the use or inability to use the platform.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>6. Contact & Legal Inquiries</h2>
            <p style={styles.paragraph}>
              For any legal, licensing, or terms inquiries, please contact our administrative team at:
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
