import React from 'react';
import { Shield, Sparkles, Target, Users, Lock, Award, Heart, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div style={styles.container}>
      {/* Background Glows */}
      <div style={styles.glowTop} />
      <div style={styles.glowBottom} />

      <div style={styles.wrapper}>
        {/* Breadcrumb / Back */}
        <Link to="/" style={styles.backLink}>
          <ArrowLeft size={14} /> Back to Threat Scanner
        </Link>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.badge}>
            <Sparkles size={14} /> DEFENDING DIGITAL CITIZENS
          </div>
          <h1 style={styles.title}>
            About <span style={styles.gradientText}>ScamGuard</span>
          </h1>
          <p style={styles.subtitle}>
            Empowering individuals, families, and organizations with real-time AI threat intelligence to neutralize cyber fraud, telephone extortion, and social engineering attacks.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div style={styles.grid}>
          <div style={styles.card}>
            <div style={{ ...styles.cardIcon, background: 'rgba(59, 130, 246, 0.15)' }}>
              <Target size={24} color="#60a5fa" />
            </div>
            <h3 style={styles.cardTitle}>Our Mission</h3>
            <p style={styles.cardText}>
              To eradicate digital extortion, impersonation fraud, and phishing traps by providing free, accessible, and ultra-fast multi-modal AI threat detection tools to every citizen in India and across the globe.
            </p>
          </div>

          <div style={styles.card}>
            <div style={{ ...styles.cardIcon, background: 'rgba(168, 85, 247, 0.15)' }}>
              <Shield size={24} color="#c084fc" />
            </div>
            <h3 style={styles.cardTitle}>Zero-Trust Protection</h3>
            <p style={styles.cardText}>
              We believe in preemptive defense. Whether it's an urgent SMS claiming bank account suspension, a deceptive Telegram part-time job task, or an AI voice clone call — ScamGuard evaluates signatures before damage occurs.
            </p>
          </div>

          <div style={styles.card}>
            <div style={{ ...styles.cardIcon, background: 'rgba(16, 185, 129, 0.15)' }}>
              <Lock size={24} color="#34d399" />
            </div>
            <h3 style={styles.cardTitle}>Privacy-First Architecture</h3>
            <p style={styles.cardText}>
              Your data belongs to you. ScamGuard operates on a strict zero-log privacy policy. Queries, uploaded screenshots, and scanned messages are parsed ephemerally for heuristic analysis and are never monetized.
            </p>
          </div>
        </div>

        {/* Key Statistics / Highlights */}
        <div style={styles.statsBanner}>
          <div style={styles.statItem}>
            <div style={styles.statVal}>11+</div>
            <div style={styles.statLab}>Threat Detection Vectors</div>
          </div>
          <div style={styles.statDiv} />
          <div style={styles.statItem}>
            <div style={{ ...styles.statVal, color: '#38bdf8' }}>99.4%</div>
            <div style={styles.statLab}>AI Precision Benchmark</div>
          </div>
          <div style={styles.statDiv} />
          <div style={styles.statItem}>
            <div style={{ ...styles.statVal, color: '#fbbf24' }}>5,680+</div>
            <div style={styles.statLab}>Global Blacklist Nodes</div>
          </div>
          <div style={styles.statDiv} />
          <div style={styles.statItem}>
            <div style={{ ...styles.statVal, color: '#34d399' }}>24/7</div>
            <div style={styles.statLab}>Real-Time Telemetry</div>
          </div>
        </div>

        {/* Core Values Section */}
        <div style={styles.valuesSection}>
          <h2 style={styles.sectionTitle}>Why Citizens Trust ScamGuard</h2>
          <div style={styles.valuesList}>
            <div style={styles.valueRow}>
              <CheckCircle2 size={20} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={styles.valueHeading}>Community-Driven Intelligence</h4>
                <p style={styles.valueDesc}>
                  Every report filed by users actively fortifies the global database, helping millions of others avoid new and trending scam numbers.
                </p>
              </div>
            </div>

            <div style={styles.valueRow}>
              <CheckCircle2 size={20} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={styles.valueHeading}>Multi-Modal Heuristics & OCR</h4>
                <p style={styles.valueDesc}>
                  From text and voice formants to screenshot OCR document readers, our platform detects extortion cues across all communication channels.
                </p>
              </div>
            </div>

            <div style={styles.valueRow}>
              <CheckCircle2 size={20} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={styles.valueHeading}>National Cyber Emergency Integration</h4>
                <p style={styles.valueDesc}>
                  Direct alignment with Indian Cyber Crime Coordination Center (I4C) helpline 1930 protocols to ensure fast financial freezes for victims.
                </p>
              </div>
            </div>
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
  glowBottom: {
    position: 'absolute',
    bottom: '0%',
    right: '10%',
    width: '50%',
    height: '40%',
    background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  wrapper: {
    maxWidth: '1000px',
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
    transition: 'color 0.2s',
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    marginBottom: '40px',
  },
  card: {
    background: 'rgba(15, 23, 42, 0.75)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(16px)',
    borderRadius: '24px',
    padding: '30px',
  },
  cardIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '18px',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '800',
    color: 'white',
    marginBottom: '10px',
  },
  cardText: {
    fontSize: '13px',
    color: '#94a3b8',
    lineHeight: '1.6',
    margin: 0,
  },
  statsBanner: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    background: 'rgba(15, 23, 42, 0.85)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '24px',
    padding: '24px 30px',
    marginBottom: '50px',
  },
  statItem: {
    textAlign: 'center',
    minWidth: '120px',
  },
  statVal: {
    fontSize: '28px',
    fontWeight: '900',
    color: '#ffffff',
  },
  statLab: {
    fontSize: '11px',
    color: '#94a3b8',
    fontWeight: '600',
    marginTop: '4px',
  },
  statDiv: {
    width: '1px',
    height: '40px',
    background: 'rgba(255, 255, 255, 0.08)',
  },
  valuesSection: {
    background: 'rgba(15, 23, 42, 0.5)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '28px',
    padding: '40px',
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: '800',
    color: 'white',
    marginBottom: '25px',
    textAlign: 'center',
  },
  valuesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  valueRow: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
  },
  valueHeading: {
    fontSize: '15px',
    fontWeight: '700',
    color: 'white',
    margin: '0 0 4px',
  },
  valueDesc: {
    fontSize: '13px',
    color: '#94a3b8',
    lineHeight: '1.6',
    margin: 0,
  },
};
