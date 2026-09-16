import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ShieldAlert, ArrowLeft, KeyRound, Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Try real backend auth endpoint
      const res = await axios.post(`${API_BASE}/auth/login`, { email, password }).catch(() => null);
      if (res && res.data?.token) {
        localStorage.setItem('adminToken', res.data.token);
        localStorage.setItem('adminUser', JSON.stringify(res.data.user || { email }));
        navigate('/admin-dashboard');
        return;
      }

      // 2. Built-in Admin Access for Owner (scamguard03@gmail.com / preeti@scamguard.com / admin@scamguard.ai)
      const allowedAdmins = ['scamguard03@gmail.com', 'preeti@scamguard.com', 'admin@scamguard.ai', 'admin@scamguard.com'];
      if (allowedAdmins.includes(email.toLowerCase().trim()) && password === 'admin123') {
        const dummyToken = 'sg_neural_adm_token_' + Date.now();
        localStorage.setItem('adminToken', dummyToken);
        localStorage.setItem('adminUser', JSON.stringify({ email, role: 'SUPER_ADMIN' }));
        navigate('/admin-dashboard');
      } else {
        setError('Access Denied. Invalid Admin credentials.');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <Link to="/" style={styles.backBtn}>
          <ArrowLeft size={14} /> Back to Website
        </Link>

        <div style={styles.iconCircle}>
          <Lock size={32} color="#60a5fa" />
        </div>

        <h2 style={styles.title}>Private Admin Portal</h2>
        <p style={styles.subtitle}>
          Restricted access. Only authorized security administrators can access this terminal.
        </p>

        {error && (
          <div style={styles.errorBox}>
            <AlertCircle size={16} color="#ef4444" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <Mail size={18} color="#64748b" />
            <input
              type="email"
              placeholder="Admin Email (e.g. scamguard03@gmail.com)"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <KeyRound size={18} color="#64748b" />
            <input
              type="password"
              placeholder="Admin Password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? <Loader2 size={18} className="spin" /> : 'Authenticate & Enter Dashboard'}
          </button>
        </form>

        <div style={styles.securityNote}>
          <ShieldAlert size={12} color="#64748b" />
          <span>All unauthorized login attempts are logged and monitored.</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#030014',
    padding: '20px',
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    background: 'rgba(15, 23, 42, 0.85)',
    backdropFilter: 'blur(24px)',
    padding: '44px 36px',
    borderRadius: '28px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    textAlign: 'center',
    width: '100%',
    maxWidth: '440px',
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)',
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: '#94a3b8',
    textDecoration: 'none',
    fontWeight: '600',
  },
  iconCircle: {
    width: '64px',
    height: '64px',
    borderRadius: '20px',
    background: 'rgba(59, 130, 246, 0.12)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px auto 20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: '-0.5px',
    margin: '0 0 8px',
  },
  subtitle: {
    fontSize: '13px',
    color: '#94a3b8',
    lineHeight: '1.5',
    margin: '0 0 24px',
  },
  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '12px',
    padding: '10px 14px',
    color: '#f87171',
    fontSize: '12px',
    fontWeight: '600',
    marginBottom: '20px',
    textAlign: 'left',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: 'rgba(0, 0, 0, 0.4)',
    padding: '12px 16px',
    borderRadius: '14px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
  },
  input: {
    background: 'transparent',
    border: 'none',
    color: 'white',
    outline: 'none',
    width: '100%',
    fontSize: '14px',
  },
  submitBtn: {
    width: '100%',
    background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
    color: 'white',
    border: 'none',
    padding: '14px',
    borderRadius: '14px',
    fontWeight: '700',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '6px',
    boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'opacity 0.2s',
  },
  securityNote: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontSize: '11px',
    color: '#64748b',
    marginTop: '24px',
  },
};
