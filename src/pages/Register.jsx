import React, { useState, Suspense, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Lock,
  Mail,
  User,
  ShieldCheck,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

// --- 3D Background Particles (Matching Login/Home) ---
function Particles() {
  const ref = useRef();
  const sphere = random.inSphere(new Float32Array(2000), { radius: 1.5 });
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 20;
    ref.current.rotation.y -= delta / 25;
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setIsRegistering(true);

    // Simulate Network Latency
    setTimeout(() => {
      alert('Registration Successful! Welcome to ScamGuard.');
      navigate('/');
    }, 1500);
  };

  return (
    <div style={styles.container}>
      {/* 3D Background Layer */}
      <div style={styles.canvasContainer}>
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <Particles />
          </Suspense>
        </Canvas>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={styles.glassCard}
      >
        {/* Header Section */}
        <div style={styles.header}>
          <div style={styles.iconCircle}>
            <ShieldCheck size={28} color="#60a5fa" />
          </div>
          <h2 style={styles.title}>Join Shield</h2>
          <p style={styles.subtitle}>Create your AI-powered defense account</p>
        </div>

        <form onSubmit={handleRegister} style={styles.form}>
          {/* Full Name Input */}
          <div style={styles.inputWrapper}>
            <label style={styles.label}>Full Name</label>
            <div style={styles.inputGroup}>
              <User size={16} color="#60a5fa" />
              <input
                type="text"
                placeholder="John Doe"
                style={styles.input}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div style={styles.inputWrapper}>
            <label style={styles.label}>Email Address</label>
            <div style={styles.inputGroup}>
              <Mail size={16} color="#60a5fa" />
              <input
                type="email"
                placeholder="name@email.com"
                style={styles.input}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div style={styles.inputWrapper}>
            <label style={styles.label}>Create Password</label>
            <div style={styles.inputGroup}>
              <Lock size={16} color="#60a5fa" />
              <input
                type="password"
                placeholder="••••••••"
                style={styles.input}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
          </div>

          <button type="submit" style={styles.btn} disabled={isRegistering}>
            {isRegistering ? (
              <Loader2 className="spin" size={18} />
            ) : (
              <>
                Register & Initialize <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div style={styles.footer}>
          <span style={{ color: '#64748b' }}>Already protected?</span>
          <span style={styles.link} onClick={() => navigate('/user-login')}>
            Sign In
          </span>
        </div>
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#020617',
    position: 'relative',
    overflow: 'hidden',
  },
  canvasContainer: {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
  },
  glassCard: {
    position: 'relative',
    zIndex: 1,
    background: 'rgba(15, 23, 42, 0.75)',
    backdropFilter: 'blur(20px)',
    padding: '30px 35px',
    borderRadius: '24px',
    border: '1px solid rgba(255,255,255,0.08)',
    width: '90%',
    maxWidth: '380px', // Same compact size as Login
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  iconCircle: {
    width: '56px',
    height: '56px',
    background: 'rgba(59, 130, 246, 0.1)',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 12px',
    border: '1px solid rgba(59, 130, 246, 0.2)',
  },
  title: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#fff',
    letterSpacing: '-0.5px',
    marginBottom: '4px',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: '13px',
    lineHeight: '1.4',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px', // Slightly tighter than login to accommodate 3 fields
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#cbd5e1',
    marginLeft: '4px',
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: 'rgba(2, 6, 23, 0.6)',
    padding: '10px 16px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.05)',
  },
  input: {
    background: 'transparent',
    border: 'none',
    color: 'white',
    outline: 'none',
    width: '100%',
    fontSize: '14px',
  },
  btn: {
    width: '100%',
    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    color: 'white',
    border: 'none',
    padding: '14px',
    borderRadius: '12px',
    fontWeight: '700',
    fontSize: '15px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '10px',
    boxShadow: '0 10px 20px -5px rgba(37, 99, 235, 0.4)',
  },
  footer: {
    marginTop: '25px',
    textAlign: 'center',
    fontSize: '13px',
    display: 'flex',
    justifyContent: 'center',
    gap: '6px',
  },
  link: {
    color: '#60a5fa',
    cursor: 'pointer',
    fontWeight: '700',
    textDecoration: 'none',
  },
};

// Inline animation for the loader
const styleTag = document.createElement('style');
styleTag.innerText = `
  .spin { animation: spin 1s linear infinite; }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  input::placeholder { color: #475569; }
`;
document.head.appendChild(styleTag);

export default Register;
