import React, { useState } from 'react';
import { Mail, PhoneCall, Send, CheckCircle2, ShieldAlert, Copy, Check, ArrowLeft, Clock, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const officialEmail = 'scamguard03@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(officialEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

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
            <Sparkles size={14} /> 24/7 CITIZEN & ENTERPRISE SUPPORT
          </div>
          <h1 style={styles.title}>
            Contact <span style={styles.gradientText}>ScamGuard</span>
          </h1>
          <p style={styles.subtitle}>
            Have questions, feedback, partnership inquiries, or need assistance reporting a cyber fraud incident? Reach out to our dedicated support team.
          </p>
        </div>

        <div style={styles.grid}>
          {/* Left Column: Contact Cards */}
          <div style={styles.infoCol}>
            {/* Primary Email Card */}
            <div style={styles.infoCard}>
              <div style={styles.iconCircle}>
                <Mail size={22} color="#60a5fa" />
              </div>
              <div>
                <span style={styles.infoLabel}>Official Support Email</span>
                <div style={styles.emailRow}>
                  <a href={`mailto:${officialEmail}`} style={styles.emailText}>
                    {officialEmail}
                  </a>
                  <button onClick={handleCopyEmail} style={styles.copyBtn} title="Copy Email">
                    {copied ? <Check size={14} color="#34d399" /> : <Copy size={14} color="#94a3b8" />}
                  </button>
                </div>
                <p style={styles.infoNote}>Average response time: &lt; 24 hours</p>
              </div>
            </div>

            {/* Emergency Helpline Card */}
            <div style={{ ...styles.infoCard, borderColor: 'rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.05)' }}>
              <div style={{ ...styles.iconCircle, background: 'rgba(239, 68, 68, 0.15)' }}>
                <PhoneCall size={22} color="#ef4444" />
              </div>
              <div>
                <span style={{ ...styles.infoLabel, color: '#f87171' }}>National Cyber Emergency Helpline</span>
                <div style={styles.helplineBig}>1930</div>
                <p style={styles.infoNote}>Toll-free 24x7 government helpline to freeze defrauded money.</p>
              </div>
            </div>

            {/* Response Time & Security */}
            <div style={styles.infoCard}>
              <div style={{ ...styles.iconCircle, background: 'rgba(168, 85, 247, 0.15)' }}>
                <Clock size={22} color="#c084fc" />
              </div>
              <div>
                <span style={styles.infoLabel}>Operations & Incident Response</span>
                <div style={styles.operatingHours}>24/7 Real-Time Telemetry</div>
                <p style={styles.infoNote}>Scam reports and threat lookups are automated in real-time.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div style={styles.formCard}>
            {submitted ? (
              <div style={styles.successBox}>
                <div style={styles.successIcon}>
                  <CheckCircle2 size={40} color="#34d399" />
                </div>
                <h3 style={styles.successTitle}>Message Dispatched!</h3>
                <p style={styles.successText}>
                  Thank you, <strong>{name}</strong>. Your message has been routed to our security operations team at <strong>{officialEmail}</strong>. We will respond promptly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setSubject('');
                    setMessage('');
                  }}
                  style={styles.resetBtn}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={styles.form}>
                <h3 style={styles.formTitle}>Send a Direct Message</h3>
                <p style={styles.formSub}>Fill out the form below and our team will get back to you.</p>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anjali Verma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. anjali@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Reporting New Phishing Campaign / Enterprise Inquiry"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your inquiry, incident details, or feedback..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={styles.textarea}
                  />
                </div>

                <button type="submit" style={styles.submitBtn}>
                  <Send size={15} /> Send Message to ScamGuard
                </button>
              </form>
            )}
          </div>
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
    maxWidth: '1050px',
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
    marginBottom: '50px',
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
    fontSize: 'clamp(32px, 5vw, 48px)',
    fontWeight: '900',
    margin: '0 0 16px',
    letterSpacing: '-1px',
  },
  gradientText: {
    background: 'linear-gradient(135deg, #60a5fa, #a855f7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '15px',
    color: '#94a3b8',
    lineHeight: '1.7',
    maxWidth: '700px',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '30px',
  },
  infoCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  infoCard: {
    background: 'rgba(15, 23, 42, 0.75)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '24px',
    padding: '24px',
    display: 'flex',
    gap: '18px',
    alignItems: 'flex-start',
  },
  iconCircle: {
    width: '46px',
    height: '46px',
    borderRadius: '14px',
    background: 'rgba(59, 130, 246, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  infoLabel: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  emailRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    margin: '4px 0',
  },
  emailText: {
    fontSize: '15px',
    fontWeight: '800',
    color: '#60a5fa',
    textDecoration: 'none',
  },
  copyBtn: {
    background: 'rgba(255, 255, 255, 0.06)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    padding: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helplineBig: {
    fontSize: '28px',
    fontWeight: '900',
    color: '#ffffff',
    margin: '2px 0',
  },
  operatingHours: {
    fontSize: '15px',
    fontWeight: '800',
    color: '#ffffff',
    margin: '4px 0',
  },
  infoNote: {
    fontSize: '12px',
    color: '#64748b',
    margin: 0,
  },
  formCard: {
    background: 'rgba(15, 23, 42, 0.85)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '28px',
    padding: '36px',
  },
  formTitle: {
    fontSize: '20px',
    fontWeight: '800',
    color: 'white',
    margin: '0 0 6px',
  },
  formSub: {
    fontSize: '13px',
    color: '#94a3b8',
    margin: '0 0 24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#cbd5e1',
  },
  input: {
    background: 'rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '12px 16px',
    fontSize: '13px',
    color: 'white',
    outline: 'none',
  },
  textarea: {
    background: 'rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '12px 16px',
    fontSize: '13px',
    color: 'white',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  submitBtn: {
    background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '14px',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '8px',
    boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)',
  },
  successBox: {
    textAlign: 'center',
    padding: '40px 20px',
  },
  successIcon: {
    width: '64px',
    height: '64px',
    borderRadius: '20px',
    background: 'rgba(16, 185, 129, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
  },
  successTitle: {
    fontSize: '22px',
    fontWeight: '800',
    color: 'white',
    marginBottom: '10px',
  },
  successText: {
    fontSize: '13px',
    color: '#94a3b8',
    lineHeight: '1.6',
    maxWidth: '400px',
    margin: '0 auto 24px',
  },
  resetBtn: {
    background: 'rgba(255, 255, 255, 0.08)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '12px',
    padding: '10px 20px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};
