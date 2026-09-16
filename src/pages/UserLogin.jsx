import React, { useState, Suspense, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

// --- 3D Background Particles ---
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

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handleUserLogin = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      if (email && password) {
        navigate('/');
      } else {
        alert('Please enter valid credentials');
        setIsLoggingIn(false);
      }
    }, 1500);
  };

  return (
    <div style={styles.container}>
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
        <div style={styles.header}>
          <div style={styles.iconCircle}>
            <ShieldCheck size={28} color="#60a5fa" />
          </div>
          <h2 style={styles.title}>Secure Login</h2>
          <p style={styles.subtitle}>Enter credentials for ScamGuard AI</p>
        </div>

        <form onSubmit={handleUserLogin} style={styles.form}>
          <div style={styles.inputWrapper}>
            <label style={styles.label}>Email</label>
            <div style={styles.inputGroup}>
              <Mail size={16} color="#60a5fa" />
              <input
                type="email"
                placeholder="name@mail.com"
                style={styles.input}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={styles.inputWrapper}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputGroup}>
              <Lock size={16} color="#60a5fa" />
              <input
                type="password"
                placeholder="••••••••"
                style={styles.input}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={styles.forgotPass}>Forgot Password?</div>

          <button type="submit" style={styles.loginBtn} disabled={isLoggingIn}>
            {isLoggingIn ? (
              <Loader2 className="spin" size={18} />
            ) : (
              <>
                Authorize <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div style={styles.footer}>
          <span style={{ color: '#64748b' }}>New?</span>
          <span style={styles.link} onClick={() => navigate('/register')}>
            Create Account
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
    padding: '30px 35px', // Reduced padding
    borderRadius: '24px', // Slightly tighter corners
    border: '1px solid rgba(255,255,255,0.08)',
    width: '90%',
    maxWidth: '380px', // Reduced width from 460px to 380px
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '25px', // Reduced margin
  },
  iconCircle: {
    width: '56px',
    height: '56px',
    background: 'rgba(59, 130, 246, 0.1)',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 15px',
    border: '1px solid rgba(59, 130, 246, 0.2)',
  },
  title: {
    fontSize: '24px', // Slightly smaller font
    fontWeight: '800',
    color: '#fff',
    letterSpacing: '-0.5px',
    marginBottom: '6px',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: '13px',
    lineHeight: '1.4',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px', // Tighter spacing between inputs
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
    padding: '12px 16px', // Compact input padding
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
  forgotPass: {
    textAlign: 'right',
    fontSize: '12px',
    color: '#60a5fa',
    cursor: 'pointer',
    fontWeight: '500',
  },
  loginBtn: {
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
    marginTop: '5px',
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
  },
};

const styleTag = document.createElement('style');
styleTag.innerText = `
  .spin { animation: spin 1s linear infinite; }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  input::placeholder { color: #475569; }
`;
document.head.appendChild(styleTag);

export default UserLogin;
