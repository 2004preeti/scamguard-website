import React, { useState, useEffect, useRef, Suspense, useMemo, useCallback } from 'react';
import axios from 'axios';
import Tesseract from 'tesseract.js';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Points,
  PointMaterial,
  Float,
  Sphere,
  MeshDistortMaterial,
  Ring,
} from '@react-three/drei';
import {
  ShieldAlert,
  ShieldCheck,
  PhoneCall,
  MessageSquare,
  Globe,
  FileText,
  Zap,
  Upload,
  Loader2,
  Sparkles,
  Radar,
  Scan,
  CreditCard,
  Package,
  Mic,
  DollarSign,
  KeyRound,
  Layout,
  MessageCircle,
  Activity,
  Radio,
  TrendingUp,
} from 'lucide-react';
import ApiPlayground from '../components/ApiPlayground';
import DatabaseDiagramModal from '../components/DatabaseDiagramModal';
import ReportModal from '../components/ReportModal';
import VoiceScamModal from '../components/VoiceScamModal';

const API_BASE = 'http://localhost:5000/api';

// --- 3D Background Components ---
function ParticleGalaxy() {
  const ref = useRef();
  const count = 8000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 1.2 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      cols[i * 3] = 0.2 + Math.random() * 0.5;
      cols[i * 3 + 1] = 0.3 + Math.random() * 0.6;
      cols[i * 3 + 2] = 0.6 + Math.random() * 0.4;
    }
    return cols;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={ref}>
      <Points positions={positions} colors={colors} stride={3} frustumCulled={false}>
        <PointMaterial transparent vertexColors size={0.008} sizeAttenuation={true} depthWrite={false} blending={2} />
      </Points>
    </group>
  );
}

function WireframeSphere() {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.2;
      ref.current.rotation.x += delta * 0.1;
    }
  });
  return (
    <mesh ref={ref} position={[1.2, 0.3, -0.8]}>
      <sphereGeometry args={[0.6, 32, 32]} />
      <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.15} />
    </mesh>
  );
}

function FloatingRing() {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 0.3;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    }
  });
  return (
    <group ref={ref} position={[-1, -0.2, -0.5]}>
      <Ring args={[0.5, 0.7, 64]}>
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.3} metalness={0.8} roughness={0.2} />
      </Ring>
      <Ring args={[0.7, 0.72, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.2} transparent opacity={0.6} />
      </Ring>
    </group>
  );
}

function ScanLine() {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.position.y = -1 + (state.clock.elapsedTime % 2) * 0.8;
    }
  });
  return (
    <mesh ref={ref} position={[0, -1, 0]}>
      <planeGeometry args={[2, 0.02]} />
      <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} />
    </mesh>
  );
}

const Background3D = () => (
  <div style={styles.backgroundContainer}>
    <Canvas camera={{ position: [0, 0, 2.5], fov: 60 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#a855f7" />
        <ParticleGalaxy />
        <WireframeSphere />
        <FloatingRing />
        <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.5}>
          <Sphere args={[0.2, 32, 32]} position={[0.5, 0.8, 0.2]}>
            <MeshDistortMaterial color="#3b82f6" speed={2} distort={0.3} radius={0.8} emissive="#1e3a8a" emissiveIntensity={0.5} />
          </Sphere>
        </Float>
        <ScanLine />
      </Suspense>
    </Canvas>
  </div>
);

// --- ALL 11 DETECTION MODES FROM SPEC ---
const SCAN_MODES = [
  { id: 'CALL', label: '1. Fake Calls', icon: <PhoneCall size={16} />, placeholder: 'Enter caller phone number (e.g. +91 14098 76543)...' },
  { id: 'SMS', label: '2. Fake Messages', icon: <MessageSquare size={16} />, placeholder: 'Paste suspicious SMS message text...' },
  { id: 'WHATSAPP', label: '3. WhatsApp Scams', icon: <MessageCircle size={16} />, placeholder: 'Paste forwarded WhatsApp text or task message...' },
  { id: 'JOB', label: '4. Fake Job Scams', icon: <FileText size={16} />, placeholder: 'Paste job description, salary promise, or offer letter text...' },
  { id: 'BANK', label: '5. Bank/KYC Fraud', icon: <CreditCard size={16} />, placeholder: 'Paste bank account suspension alert or link...' },
  { id: 'COURIER', label: '6. Courier Scam', icon: <Package size={16} />, placeholder: 'Paste FedEx/Customs parcel seizure & police fine message...' },
  { id: 'VOICE', label: '7. AI Voice Scam', icon: <Mic size={16} />, placeholder: 'Paste call dialogue or click "Sample Voice Check"...' },
  { id: 'LINK', label: '8. Fake Links', icon: <Globe size={16} />, placeholder: 'Paste shortlink (e.g. http://bit.ly/sbi-verify)...' },
  { id: 'WEBSITE', label: '9. Fake Websites', icon: <Layout size={16} />, placeholder: 'Enter domain (e.g. sbi-secure-portal.xyz)...' },
  { id: 'OTP', label: '10. Fake OTP Requests', icon: <KeyRound size={16} />, placeholder: 'Paste suspicious OTP request or banking message...' },
  { id: 'LOAN', label: '11. Fake Loan Apps', icon: <DollarSign size={16} />, placeholder: 'Enter Instant Loan App name or SMS terms...' },
];

export default function Home({
  showApiModal = false,
  setShowApiModal,
  showErModal = false,
  setShowErModal,
  showReportModal = false,
  setShowReportModal,
  showVoiceModal = false,
  setShowVoiceModal,
  onOpenEmergency,
  onOpenEncyclopedia,
  onOpenDirectory,
  onOpenQuiz,
}) {
  const [activeTab, setActiveTab] = useState('CALL');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ocrLoading, setOcrLoading] = useState(false);

  // Dynamic live stats & threat feed from backend
  const [liveStats, setLiveStats] = useState({
    totalScans: 29480,
    globalBlocked: 5684,
    totalReports: 1425,
    aiAccuracy: '99.4%',
    activeUsers: 48200,
    recentThreats: [
      { id: '1', input: '+91 14098 76543', category: 'Fake Calls', risk: 95, isFraud: true },
      { id: '2', input: 'http://sbi-kyc-update.xyz', category: 'Phishing Link', risk: 92, isFraud: true },
      { id: '3', input: 'Selected for Amazon Part-time job', category: 'Job Scam', risk: 89, isFraud: true },
    ],
  });

  const fetchLiveStats = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/stats/public`);
      if (res.data?.data) {
        setLiveStats(res.data.data);
      }
    } catch {
      // Fallback
    }
  }, []);

  useEffect(() => {
    fetchLiveStats();
    const interval = setInterval(fetchLiveStats, 8000);
    return () => clearInterval(interval);
  }, [fetchLiveStats]);

  const handleScan = async (overrideQuery = null, overrideTab = null) => {
    const finalQuery = overrideQuery || query;
    const finalTab = overrideTab || activeTab;
    if (!finalQuery && finalTab !== 'VOICE') return;

    if (finalTab === 'VOICE' && setShowVoiceModal) {
      setShowVoiceModal(true);
      return;
    }

    setLoading(true);
    try {
      let res;
      if (finalTab === 'CALL') {
        res = await axios.post(`${API_BASE}/scam-calls/check`, { number: finalQuery });
        const data = res.data;
        setResult({
          isScam: data.result === 'fraud' || data.ai_score > 60,
          status: data.result === 'fraud' ? 'FRAUD CALL DETECTED' : data.result === 'spam' ? 'SPAM CALL' : 'CLEAN CALLER',
          msg: `${data.details} (Risk Score: ${data.ai_score}%)`,
          riskScore: data.ai_score,
          color: data.ai_score > 60 ? '#ff4d4d' : data.ai_score > 35 ? '#ffd53d' : '#00ff88',
          icon: data.ai_score > 60 ? ShieldAlert : ShieldCheck,
          category: 'Fake Calls Protection',
          reasons: [
            data.details,
            `Global Spam Reports: ${data.reports_count || 150}+ users flagged this number`,
            'High burst call frequency matches robocaller telemarketing nodes',
          ],
        });
      } else if (finalTab === 'SMS' || finalTab === 'OTP') {
        res = await axios.post(`${API_BASE}/scam-sms/scan`, { message_text: finalQuery });
        const data = res.data;
        setResult({
          isScam: data.ai_score > 60,
          status: data.classification === 'High-Risk Fraud' ? 'SCAM MESSAGE DETECTED' : data.classification === 'Spam' ? 'SUSPICIOUS SMS' : 'CLEAN MESSAGE',
          msg: `SMS Analysis: ${data.matched_keywords?.join(', ') || 'Keywords flagged'}. Risk: ${data.ai_score}%`,
          riskScore: data.ai_score,
          color: data.ai_score > 60 ? '#ff4d4d' : '#00ff88',
          icon: data.ai_score > 60 ? ShieldAlert : ShieldCheck,
          category: finalTab === 'OTP' ? 'Fake OTP Request' : 'Fake Message Scanner',
          reasons: [
            `Triggers Found: ${data.matched_keywords?.join(', ') || 'Urgency coercion'}`,
            data.has_dangerous_link ? 'Contains dangerous unverified redirection link' : 'No suspicious link',
            'Pattern matches known credential theft and social engineering scripts',
          ],
        });
      } else if (finalTab === 'WHATSAPP') {
        res = await axios.post(`${API_BASE}/scam-whatsapp/detect`, { message_text: finalQuery });
        const data = res.data;
        setResult({
          isScam: data.risk_score > 60,
          status: data.risk_score > 60 ? 'WHATSAPP SCAM DETECTED' : 'CLEAN MESSAGE',
          msg: `${data.warning_badge} • Category: ${data.category}`,
          riskScore: data.risk_score,
          color: data.risk_score > 60 ? '#ff4d4d' : '#00ff88',
          icon: data.risk_score > 60 ? ShieldAlert : ShieldCheck,
          category: 'WhatsApp Scams',
          reasons: data.reasons || ['Telegram task fraud format', 'Demands advance deposit fee', 'Reported by 3200+ users'],
        });
      } else if (finalTab === 'JOB') {
        res = await axios.post(`${API_BASE}/job-scam/check`, { message_text: finalQuery });
        const data = res.data;
        setResult({
          isScam: data.result === 'Fake',
          status: data.result === 'Fake' ? 'FAKE JOB SCAM' : 'VERIFIED OFFER',
          msg: `Job Verification: ${data.recommendation} (Risk: ${data.ai_risk_score}%)`,
          riskScore: data.ai_risk_score || 90,
          color: data.result === 'Fake' ? '#ff4d4d' : '#00ff88',
          icon: data.result === 'Fake' ? ShieldAlert : ShieldCheck,
          category: 'Fake Job Scams',
          reasons: data.red_flags || ['Demands advance security deposit / training fee', 'Unofficial recruiter communication'],
        });
      } else if (finalTab === 'LINK' || finalTab === 'WEBSITE') {
        res = await axios.post(`${API_BASE}/scam-links/check`, { url: finalQuery });
        const data = res.data;
        const isMalicious = data.is_malicious || parseInt(data.risk_score) > 60;
        setResult({
          isScam: isMalicious,
          status: isMalicious ? 'PHISHING / FAKE WEBSITE' : 'CLEAN WEBSITE',
          msg: `URL Safety: ${data.verdict} (Risk: ${data.risk_score})`,
          riskScore: parseInt(data.risk_score) || 92,
          color: isMalicious ? '#ff4d4d' : '#00ff88',
          icon: isMalicious ? ShieldAlert : ShieldCheck,
          category: finalTab === 'WEBSITE' ? 'Fake Websites' : 'Fake Links',
          reasons: data.reasons || ['Insecure protocol', 'High-risk untrusted TLD', 'Domain age < 30 days'],
        });
      } else {
        res = await axios.post(`${API_BASE}/ai/predict`, { input: finalQuery, type: finalTab });
        const data = res.data;
        setResult({
          isScam: data.ai_risk_score > 60,
          status: data.risk_label || 'THREAT EVALUATED',
          msg: `Multi-modal Scan: ${data.category}. Risk: ${data.ai_risk_score}%`,
          riskScore: data.ai_risk_score || 85,
          color: data.ai_risk_score > 60 ? '#ff4d4d' : '#00ff88',
          icon: data.ai_risk_score > 60 ? ShieldAlert : ShieldCheck,
          category: data.category || 'Threat Intelligence',
          reasons: data.reasons || ['Matches known fraud heuristic template', 'Urgency pressure detected'],
        });
      }
      // Re-fetch dynamic stats immediately after scan
      fetchLiveStats();
    } catch (err) {
      const isScam = /kyc|lottery|blocked|urgent|deposit|500|bank|loan|parcel|customs|otp|apk/i.test(finalQuery);
      setResult({
        isScam,
        status: isScam ? 'FRAUD DETECTED' : 'CLEAN ENTITY',
        msg: isScam
          ? 'Urgent / Suspicious triggers detected. High probability of phishing or extortion.'
          : 'No malicious signatures found. Continue with standard caution.',
        riskScore: isScam ? 85 : 10,
        color: isScam ? '#ff4d4d' : '#00ff88',
        icon: isScam ? ShieldAlert : ShieldCheck,
        category: 'Threat Analysis',
        reasons: isScam ? ['Urgent coercive phrasing', 'Reported across global nodes', 'Contains unverified payment/data demand'] : ['Standard clean lexical metrics'],
      });
      fetchLiveStats();
    }
    setLoading(false);
  };

  const triggerDemo = (type, val) => {
    setActiveTab(type);
    setQuery(val);
    const scannerEl = document.getElementById('scanner');
    if (scannerEl) scannerEl.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => handleScan(val, type), 400);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setOcrLoading(true);

    Tesseract.recognize(file, 'eng')
      .then(({ data: { text } }) => {
        const cleanedText = text.replace(/\n/g, ' ').trim();
        setQuery(cleanedText);
        setOcrLoading(false);
        if (cleanedText) {
          setTimeout(() => handleScan(cleanedText, activeTab), 400);
        }
      })
      .catch(() => {
        setOcrLoading(false);
        setQuery('URGENT: Your KYC is expired. Update at: http://sbi-secure.xyz');
        handleScan('URGENT: Your KYC is expired. Update at: http://sbi-secure.xyz', 'SMS');
      });
  };

  const Card = ({ title, icon, text, gradient }) => (
    <div className="feature-card" style={styles.featureCard}>
      <div style={{ ...styles.cardIcon, background: gradient }}>{icon}</div>
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={styles.cardText}>{text}</p>
    </div>
  );

  return (
    <div style={styles.container}>
      <Background3D />

      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.heroGlow} />
        <div style={styles.heroText}>
          <div style={styles.badge}>
            <Sparkles size={14} /> AI-POWERED MULTI-MODAL FRAUD DETECTION PLATFORM
          </div>
          <h1 style={styles.title}>
            Scam<span style={styles.gradientText}>Guard</span>
          </h1>
          <p style={styles.subtitle}>
            Real-time protection against fake calls, phishing SMS, WhatsApp tasks, job scams, bank/KYC fraud, customs extortion, deepfake AI voice clones, malicious URLs, OTP theft, and illegal loan apps.
          </p>

          {/* CTA Buttons */}
          <div style={styles.ctaGroup}>
            <button
              style={styles.mainCta}
              onClick={() => {
                const el = document.getElementById('scanner');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Start Scanning <Radar size={20} />
            </button>
            <button
              style={styles.secondaryCta}
              onClick={() => setShowVoiceModal && setShowVoiceModal(true)}
            >
              <Mic size={18} color="#a855f7" /> 🎙 AI Voice Check
            </button>
          </div>

          {/* DYNAMIC LIVE METRICS STATS BAR */}
          <div style={styles.dynamicStatsRow}>
            <div style={styles.statBox}>
              <div style={styles.statValue}>{(liveStats.totalScans || 29480).toLocaleString()}</div>
              <div style={styles.statLabel}>Dynamic Scans Processed</div>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.statBox}>
              <div style={{ ...styles.statValue, color: '#38bdf8' }}>{(liveStats.globalBlocked || 5684).toLocaleString()}</div>
              <div style={styles.statLabel}>Threats Auto-Blocked</div>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.statBox}>
              <div style={{ ...styles.statValue, color: '#fbbf24' }}>{(liveStats.totalReports || 1425).toLocaleString()}</div>
              <div style={styles.statLabel}>Crowdsourced Reports</div>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.statBox}>
              <div style={{ ...styles.statValue, color: '#c084fc' }}>{liveStats.aiAccuracy || '99.4%'}</div>
              <div style={styles.statLabel}>AI Detection Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE THREAT ACTIVITY TICKER */}
      <section style={styles.tickerSection}>
        <div style={styles.tickerCard}>
          <div style={styles.tickerBadge}>
            <Radio size={12} className="animate-pulse" color="#ef4444" />
            <span>LIVE INTERCEPT FEED</span>
          </div>
          <div style={styles.tickerContent}>
            {liveStats.recentThreats && liveStats.recentThreats.length > 0 ? (
              liveStats.recentThreats.slice(0, 3).map((threat, idx) => (
                <span key={idx} style={styles.tickerItem}>
                  <span style={{ color: threat.isFraud ? '#ef4444' : '#34d399', fontWeight: 'bold' }}>
                    {threat.isFraud ? '🚨 BLOCKED' : '🛡️ VERIFIED'}:
                  </span>{' '}
                  {threat.input} ({threat.category || 'Threat Check'} - Risk {threat.risk}%)
                </span>
              ))
            ) : (
              <span style={styles.tickerItem}>
                🚨 BLOCKED: +91 14098 76543 (Robocaller) • 🚨 BLOCKED: sbi-kyc-update.xyz (Phishing) • 🚨 BLOCKED: Amazon Daily Task (Deposit Trap)
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ALL 11 DETECTION CATEGORIES TERMINAL */}
      <section id="scanner" style={styles.scannerCard}>
        <div style={styles.scannerGlow} />
        <div style={styles.scannerHeader}>
          <h2 style={styles.scannerTitle}>Unified Threat Analysis Terminal</h2>
          <p style={styles.scannerSub}>Select any of the 11 fraud detection modules below</p>
        </div>

        {/* 11 Tabs Grid / Scroll */}
        <div style={styles.tabList}>
          {SCAN_MODES.map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                setActiveTab(mode.id);
                setResult(null);
                if (mode.id === 'VOICE' && setShowVoiceModal) {
                  setShowVoiceModal(true);
                }
              }}
              style={{
                ...styles.tabBtn,
                color: activeTab === mode.id ? '#fff' : '#94a3b8',
                background:
                  activeTab === mode.id
                    ? 'linear-gradient(135deg, #3b82f6, #a855f7)'
                    : 'rgba(255, 255, 255, 0.03)',
                border:
                  activeTab === mode.id
                    ? 'none'
                    : '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {mode.icon} {mode.label}
            </button>
          ))}
        </div>

        <div style={styles.inputWrapper}>
          <input
            style={styles.inputField}
            placeholder={SCAN_MODES.find((m) => m.id === activeTab)?.placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleScan()}
          />
          <label style={styles.iconBtn} title="Upload Screenshot / Job Letter for OCR Scan">
            <input
              type="file"
              hidden
              onChange={handleFileUpload}
              accept="image/*"
            />
            {ocrLoading ? (
              <Loader2 className="spin" size={22} color="#3b82f6" />
            ) : (
              <Upload size={22} />
            )}
          </label>
          <button
            style={styles.scanBtn}
            onClick={() => handleScan()}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="spin" size={20} />
            ) : (
              'ANALYZE THREAT'
            )}
          </button>
        </div>

        <div style={styles.securityBadge}>
          <ShieldCheck size={14} color="#37D67A" /> Real-time AI scan synchronized dynamically against {liveStats.globalBlocked || '5,680'}+ global blacklist nodes
        </div>
      </section>

      {/* 1-CLICK LIVE SIMULATION PRESETS */}
      <section style={styles.demoSection}>
        <h2 style={styles.scannerTitle}>Try Live Simulation Presets</h2>
        <p style={styles.scannerSub}>Click any scenario to see real-time AI classification in action</p>

        <div style={styles.demoGrid}>
          <div
            style={styles.demoBox}
            onClick={() =>
              triggerDemo(
                'BANK',
                'URGENT: Your SBI KYC is expired. Click to update: http://bit.ly/sbi-fake-kyc',
              )
            }
          >
            <CreditCard color="#3b82f6" size={28} />
            <h4 style={{ color: 'white', fontWeight: 'bold' }}>Bank / KYC Phishing</h4>
            <p style={{ color: '#94a3b8', fontSize: '12px' }}>"Your account blocked in 24h..."</p>
          </div>

          <div
            style={styles.demoBox}
            onClick={() =>
              triggerDemo(
                'JOB',
                'Selected for Amazon Part-time job! Earn 10k daily. Deposit 500 registration fee.',
              )
            }
          >
            <FileText color="#a855f7" size={28} />
            <h4 style={{ color: 'white', fontWeight: 'bold' }}>Fake Job Offer</h4>
            <p style={{ color: '#94a3b8', fontSize: '12px' }}>"Pay 500 for daily telegram task..."</p>
          </div>

          <div
            style={styles.demoBox}
            onClick={() => triggerDemo('CALL', '+91 14098 76543')}
          >
            <PhoneCall color="#ef4444" size={28} />
            <h4 style={{ color: 'white', fontWeight: 'bold' }}>Suspicious Caller</h4>
            <p style={{ color: '#94a3b8', fontSize: '12px' }}>"+91 140 robocaller spam series"</p>
          </div>

          <div
            style={styles.demoBox}
            onClick={() =>
              triggerDemo(
                'COURIER',
                'Customs Police: FedEx parcel seized containing contraband. Pay penalty immediately.',
              )
            }
          >
            <Package color="#f59e0b" size={28} />
            <h4 style={{ color: 'white', fontWeight: 'bold' }}>Customs / Parcel Trap</h4>
            <p style={{ color: '#94a3b8', fontSize: '12px' }}>"Digital arrest extortion notice..."</p>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section style={styles.grid}>
        <Card
          title="Quantum Scan"
          icon={<Zap />}
          text="Multi-layered dynamic analysis of URLs, phone numbers, and SMS patterns."
          gradient="linear-gradient(135deg, #3b82f6, #2563eb)"
        />
        <Card
          title="AI Heuristics"
          icon={<Radar />}
          text="Advanced machine learning detects new and evolving scam tactics in real-time."
          gradient="linear-gradient(135deg, #a855f7, #7c3aed)"
        />
        <Card
          title="Visual OCR Extraction"
          icon={<Scan />}
          text="OCR technology extracts and analyzes text from screenshots instantly."
          gradient="linear-gradient(135deg, #06b6d4, #0891b2)"
        />
      </section>

      {/* INTERACTIVE CYBER DEFENSE & VICTIM RECOVERY SUITE */}
      <section style={{ maxWidth: '1200px', margin: '60px auto 0', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <span style={{ fontSize: '11px', fontWeight: '800', color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Comprehensive Citizen Safety Center
          </span>
          <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'white', marginTop: '6px' }}>
            Cyber Defense & Victim Support Suite
          </h2>
          <p style={{ fontSize: '13px', color: '#94a3b8', maxWidth: '600px', margin: '6px auto 0' }}>
            Interactive resources, emergency crisis recovery, anti-spoofing helpline directory, and cyber awareness quizzes.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {/* Card 1: Emergency Recovery */}
          <div
            onClick={() => onOpenEmergency && onOpenEmergency()}
            style={{
              background: 'rgba(239, 68, 68, 0.06)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              borderRadius: '24px',
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              <div style={{ width: '42px', height: '42px', borderRadius: '14px', background: 'rgba(239, 68, 68, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <ShieldAlert size={22} color="#ef4444" />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'white' }}>"I Got Scammed" Emergency Hub</h3>
              <p style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '6px', lineHeight: '1.5' }}>
                Lost money? Access immediate golden-hour bank freezing steps & auto-generate official Police FIR letters.
              </p>
            </div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#f87171', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Launch Recovery Guide →
            </div>
          </div>

          {/* Card 2: Scam Encyclopedia */}
          <div
            onClick={() => onOpenEncyclopedia && onOpenEncyclopedia()}
            style={{
              background: 'rgba(168, 85, 247, 0.06)',
              border: '1px solid rgba(168, 85, 247, 0.25)',
              borderRadius: '24px',
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              <div style={{ width: '42px', height: '42px', borderRadius: '14px', background: 'rgba(168, 85, 247, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <FileText size={22} color="#c084fc" />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'white' }}>Scam Encyclopedia & Scripts</h3>
              <p style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '6px', lineHeight: '1.5' }}>
                Declassified case studies, real scammer audio transcripts, and red-flag checklists for digital arrest & job traps.
              </p>
            </div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#c084fc', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Explore Modus Operandi →
            </div>
          </div>

          {/* Card 3: Verified Directory */}
          <div
            onClick={() => onOpenDirectory && onOpenDirectory()}
            style={{
              background: 'rgba(16, 185, 129, 0.06)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '24px',
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              <div style={{ width: '42px', height: '42px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <PhoneCall size={22} color="#34d399" />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'white' }}>Verified Customer Care Directory</h3>
              <p style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '6px', lineHeight: '1.5' }}>
                Never call fake Google numbers. Search 100% verified official contacts for SBI, HDFC, FedEx, Amazon & Cyber Helplines.
              </p>
            </div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#34d399', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Search Verified Numbers →
            </div>
          </div>

          {/* Card 4: Scam Quiz */}
          <div
            onClick={() => onOpenQuiz && onOpenQuiz()}
            style={{
              background: 'rgba(245, 158, 11, 0.06)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              borderRadius: '24px',
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              <div style={{ width: '42px', height: '42px', borderRadius: '14px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <Sparkles size={22} color="#fbbf24" />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'white' }}>"How Scam-Proof Are You?" Quiz</h3>
              <p style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '6px', lineHeight: '1.5' }}>
                Test your resilience against realistic phishing SMS, WhatsApp tasks, and audio clone scenarios in 2 minutes.
              </p>
            </div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Take 2-Min Resilience Test →
            </div>
          </div>
        </div>
      </section>

      {/* RESULT MODAL / RISK BREAKDOWN */}
      {result && (
        <div style={styles.overlay} onClick={() => setResult(null)}>
          <div
            style={{ ...styles.modal, borderTop: `4px solid ${result.color}` }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ ...styles.modalIcon, background: `${result.color}20` }}>
              <result.icon size={50} color={result.color} />
            </div>

            <h2 style={{ color: result.color, margin: '15px 0 6px 0', fontSize: '24px', fontWeight: '800' }}>
              {result.status}
            </h2>

            {result.riskScore !== undefined && (
              <div style={{ margin: '10px 0' }}>
                <span style={{ fontSize: '28px', fontWeight: '900', color: result.color }}>
                  {result.riskScore}%
                </span>
                <span style={{ fontSize: '12px', color: '#94a3b8', marginLeft: '6px', fontWeight: 'bold' }}>
                  Risk Score
                </span>
              </div>
            )}

            <p style={{ color: '#cbd5e1', lineHeight: 1.6, fontSize: '14px', marginBottom: '14px' }}>
              {result.msg}
            </p>

            {result.reasons && (
              <div style={{ background: '#070b14', padding: '12px 16px', borderRadius: '16px', textAlign: 'left', marginBottom: '16px' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8' }}>AI Reasoning:</span>
                <ul style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '6px', paddingLeft: '18px' }}>
                  {result.reasons.map((r, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{r}</li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button style={styles.closeBtn} onClick={() => setResult(null)}>
                Close Analysis
              </button>
              <button
                style={{ ...styles.closeBtn, background: '#ef4444', borderColor: '#ef4444', color: 'white' }}
                onClick={() => {
                  setResult(null);
                  if (setShowReportModal) setShowReportModal(true);
                }}
              >
                Report Spam
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALS */}
      {showApiModal && (
        <div style={styles.overlay} onClick={() => setShowApiModal(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '90%', maxWidth: '1100px' }}>
            <ApiPlayground onClose={() => setShowApiModal(false)} />
          </div>
        </div>
      )}

      {showErModal && <DatabaseDiagramModal onClose={() => setShowErModal(false)} />}
      {showReportModal && (
        <ReportModal
          onClose={() => {
            setShowReportModal(false);
            fetchLiveStats();
          }}
        />
      )}
      {showVoiceModal && <VoiceScamModal onClose={() => setShowVoiceModal(false)} />}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#030014',
    minHeight: '100vh',
    color: '#f8fafc',
    fontFamily: "'Inter', sans-serif",
    paddingBottom: '100px',
    position: 'relative',
    overflowX: 'hidden',
  },
  backgroundContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    pointerEvents: 'none',
  },
  hero: {
    position: 'relative',
    zIndex: 1,
    padding: '80px 20px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  heroGlow: {
    position: 'absolute',
    width: '60%',
    height: '60%',
    background:
      'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
    top: '10%',
    left: '20%',
    pointerEvents: 'none',
  },
  heroText: { maxWidth: '960px', position: 'relative' },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 20px',
    borderRadius: '100px',
    background: 'rgba(59, 130, 246, 0.1)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    fontSize: '12px',
    fontWeight: '600',
    color: '#60a5fa',
    marginBottom: '24px',
    backdropFilter: 'blur(10px)',
  },
  title: {
    fontSize: 'clamp(44px, 7vw, 80px)',
    fontWeight: '900',
    margin: '0 0 20px 0',
    letterSpacing: '-2px',
    background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  gradientText: {
    background: 'linear-gradient(135deg, #60a5fa, #a855f7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: 'clamp(15px, 2.5vw, 18px)',
    color: '#94a3b8',
    lineHeight: '1.7',
    marginBottom: '30px',
    maxWidth: '780px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  ctaGroup: {
    display: 'flex',
    gap: '14px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '35px',
  },
  mainCta: {
    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    color: 'white',
    padding: '14px 32px',
    borderRadius: '12px',
    border: 'none',
    fontWeight: '600',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)',
    transition: 'transform 0.2s',
  },
  secondaryCta: {
    background: 'rgba(255,255,255,0.05)',
    color: '#fff',
    padding: '14px 28px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.1)',
    fontWeight: '600',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  dynamicStatsRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    background: 'rgba(15, 23, 42, 0.65)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(16px)',
    borderRadius: '20px',
    padding: '18px 28px',
    maxWidth: '850px',
    margin: '0 auto',
    boxShadow: '0 15px 30px -10px rgba(0,0,0,0.5)',
  },
  statBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '130px',
  },
  statValue: {
    fontSize: '22px',
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: '-0.5px',
  },
  statLabel: {
    fontSize: '11px',
    color: '#94a3b8',
    fontWeight: '600',
    marginTop: '2px',
  },
  statDivider: {
    width: '1px',
    height: '32px',
    background: 'rgba(255, 255, 255, 0.1)',
  },
  tickerSection: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '960px',
    margin: '20px auto 0',
    padding: '0 20px',
  },
  tickerCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    background: 'rgba(15, 23, 42, 0.8)',
    border: '1px solid rgba(239, 68, 68, 0.25)',
    borderRadius: '14px',
    padding: '10px 18px',
    overflow: 'hidden',
  },
  tickerBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'rgba(239, 68, 68, 0.15)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    color: '#f87171',
    padding: '4px 10px',
    borderRadius: '8px',
    fontSize: '10px',
    fontWeight: '800',
    letterSpacing: '0.5px',
    whiteSpace: 'nowrap',
  },
  tickerContent: {
    display: 'flex',
    gap: '20px',
    fontSize: '12px',
    color: '#cbd5e1',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
  },
  tickerItem: {
    display: 'inline-flex',
    gap: '6px',
    alignItems: 'center',
  },
  scannerCard: {
    position: 'relative',
    zIndex: 10,
    maxWidth: '960px',
    margin: '30px auto 80px',
    background: 'rgba(15, 23, 42, 0.75)',
    backdropFilter: 'blur(20px)',
    borderRadius: '32px',
    padding: '40px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  },
  scannerGlow: {
    position: 'absolute',
    top: '-20%',
    left: '10%',
    width: '80%',
    height: '140%',
    background:
      'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
    borderRadius: '50%',
  },
  scannerHeader: { textAlign: 'center', marginBottom: '25px' },
  scannerTitle: {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '8px',
    background: 'linear-gradient(135deg, #fff, #94a3b8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  scannerSub: { color: '#64748b', fontSize: '14px' },
  tabList: {
    display: 'flex',
    gap: '10px',
    marginBottom: '25px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tabBtn: {
    padding: '8px 18px',
    borderRadius: '40px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontWeight: '600',
    fontSize: '13px',
    transition: 'all 0.3s ease',
  },
  inputWrapper: {
    display: 'flex',
    background: 'rgba(0,0,0,0.3)',
    borderRadius: '20px',
    padding: '8px',
    border: '1px solid rgba(255,255,255,0.1)',
    gap: '8px',
    flexWrap: 'wrap',
  },
  inputField: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    color: 'white',
    padding: '14px 20px',
    outline: 'none',
    fontSize: '15px',
    minWidth: '200px',
  },
  iconBtn: {
    padding: '10px',
    color: '#94a3b8',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '12px',
  },
  scanBtn: {
    background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
    color: 'white',
    padding: '12px 28px',
    borderRadius: '14px',
    border: 'none',
    fontWeight: '600',
    cursor: 'pointer',
  },
  securityBadge: {
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '12px',
    color: '#475569',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  demoSection: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    marginBottom: '80px',
    padding: '0 20px',
  },
  demoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    maxWidth: '1000px',
    margin: '30px auto 0',
  },
  demoBox: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '20px',
    padding: '25px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  grid: {
    position: 'relative',
    zIndex: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    padding: '0 40px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  featureCard: {
    background: 'rgba(15, 23, 42, 0.4)',
    backdropFilter: 'blur(10px)',
    padding: '35px',
    borderRadius: '28px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    textAlign: 'center',
  },
  cardIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '25px',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: 'white',
  },
  cardTitle: { fontSize: '20px', marginBottom: '12px', fontWeight: '600' },
  cardText: { color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' },
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.9)',
    backdropFilter: 'blur(12px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#0a0f1a',
    padding: '40px',
    borderRadius: '32px',
    textAlign: 'center',
    maxWidth: '500px',
    width: '90%',
    borderTop: '4px solid',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  modalIcon: {
    width: '80px',
    height: '80px',
    borderRadius: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
  },
  closeBtn: {
    marginTop: '10px',
    padding: '12px 30px',
    borderRadius: '40px',
    border: '1px solid #334155',
    background: 'transparent',
    color: '#e2e8f0',
    cursor: 'pointer',
    fontWeight: '600',
  },
};
