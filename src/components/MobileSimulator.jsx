import React, { useState } from 'react';
import {
  Shield,
  PhoneCall,
  MessageSquare,
  Globe,
  MessageCircle,
  Cpu,
  Settings as SettingsIcon,
  ChevronRight,
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
  Bell,
  Menu,
  Trash2,
  Ban,
  Upload,
  RefreshCw,
  Zap,
  Radio,
  Sliders,
  Check,
  Share2,
} from 'lucide-react';
import axios from 'axios';

const API_BASE = 'https://scamguard-hqs7.onrender.com/api';

export default function MobileSimulator({ onClose }) {
  // Screens: 'SPLASH' | 'ONBOARDING_1' | 'ONBOARDING_2' | 'ONBOARDING_3' | 'DASHBOARD' | 'CALL_SCANNER' | 'SMS_SCANNER' | 'LINK_SCANNER' | 'WHATSAPP_SCANNER' | 'AI_PREDICTION' | 'SETTINGS'
  const [currentScreen, setCurrentScreen] = useState('SPLASH');
  const [searchNumber, setSearchNumber] = useState('');
  const [callSearchStatus, setCallSearchStatus] = useState(null);
  
  // Link scanner state
  const [inputUrl, setInputUrl] = useState('https://sbi-secure-update.xyz/login');
  const [urlResult, setUrlResult] = useState({ detected: true, score: 92 });

  // WhatsApp scanner state
  const [waText, setWaText] = useState('Selected for Amazon Part-time job! Earn 5000 daily. Just deposit 500 registration fee.');
  const [waResult, setWaResult] = useState({ category: 'Fake Job Offer', reports: 3200 });

  // Settings toggles
  const [settings, setSettings] = useState({
    autoBlock: true,
    autoDeleteSms: true,
    darkMode: true,
    cloudBackup: true,
  });

  const [blockedList, setBlockedList] = useState(['+91 14098 76543']);
  const [scanningPhone, setScanningPhone] = useState(false);
  const [alertDismissed, setAlertDismissed] = useState(false);

  // Calls list (Frame 6)
  const [calls, setCalls] = useState([
    {
      id: 1,
      number: '+91 98765 43210',
      status: 'SCAM',
      statusColor: '#FF4D4F',
      desc: 'Potential Fraud – Reported 150 times',
      blocked: false,
    },
    {
      id: 2,
      number: '+91 94231 11223',
      status: 'UNKNOWN',
      statusColor: '#FFD53D',
      desc: 'Unknown caller – No spam record',
      blocked: false,
    },
    {
      id: 3,
      number: '+91 98220 99887',
      status: 'SAFE',
      statusColor: '#37D67A',
      desc: 'Verified Contact • Bank Official Helpline',
      blocked: false,
    },
  ]);

  const handleBlockCall = (id, number) => {
    setCalls(calls.map((c) => (c.id === id ? { ...c, blocked: true } : c)));
    if (!blockedList.includes(number)) setBlockedList([...blockedList, number]);
  };

  const handleSearchPhone = (num) => {
    if (!num) return;
    if (num.includes('140') || num.includes('98765') || num.length < 10) {
      setCallSearchStatus({
        status: 'SCAM',
        color: '#FF4D4F',
        msg: 'Suspicious Telemarketer / Fraud Reported 150+ times',
      });
    } else {
      setCallSearchStatus({
        status: 'SAFE',
        color: '#37D67A',
        msg: 'Verified Normal Number',
      });
    }
  };

  const handleScanPhoneFull = () => {
    setScanningPhone(true);
    setTimeout(() => {
      setScanningPhone(false);
      setCurrentScreen('AI_PREDICTION');
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Phone Frame Container */}
      <div className="relative w-[390px] h-[844px] bg-[#0A0F1F] rounded-[48px] border-[10px] border-[#1e293b] shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col font-sans text-white select-none">
        
        {/* Dynamic Island / Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-black rounded-b-2xl z-50 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-[#111827] mr-3 border border-slate-700"></div>
          <div className="w-10 h-2 rounded-full bg-[#111827]"></div>
        </div>

        {/* Mobile Top Status Bar */}
        <div className="w-full pt-2 px-7 pb-1 flex justify-between items-center text-xs text-slate-400 font-semibold z-40 bg-opacity-80">
          <span>09:41</span>
          <div className="flex items-center gap-1.5 text-[11px]">
            <span>5G</span>
            <span>100%</span>
          </div>
        </div>

        {/* Content Screens Container */}
        <div className="flex-1 overflow-y-auto relative flex flex-col">
          
          {/* ================= FRAME 1: SPLASH SCREEN ================= */}
          {currentScreen === 'SPLASH' && (
            <div className="flex-1 flex flex-col items-center justify-center px-6 text-center animate-fadeIn bg-[#0A0F1F]">
              <div className="relative mb-6">
                <div className="w-28 h-28 rounded-full bg-blue-600/20 flex items-center justify-center animate-pulse">
                  <Shield size={64} className="text-[#2D8CFF]" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-1.5 border-2 border-[#0A0F1F]">
                  <Zap size={16} className="text-black fill-black" />
                </div>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white mb-2">SecureGuard AI</h1>
              <p className="text-xs text-blue-300 font-medium tracking-widest uppercase mb-8">
                Next-Gen Security & Fraud Protector
              </p>
              
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-8">
                <RefreshCw size={14} className="animate-spin text-[#2D8CFF]" />
                <span>Initializing Neural Threat Engine...</span>
              </div>

              <button
                onClick={() => setCurrentScreen('ONBOARDING_1')}
                className="w-full py-3.5 bg-[#2D8CFF] hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-blue-500/25"
              >
                Get Started
              </button>
            </div>
          )}

          {/* ================= FRAME 2: ONBOARDING 1 ================= */}
          {currentScreen === 'ONBOARDING_1' && (
            <div className="flex-1 flex flex-col justify-between p-6 animate-fadeIn bg-[#0A0F1F]">
              <div className="flex justify-end pt-2">
                <button onClick={() => setCurrentScreen('DASHBOARD')} className="text-xs text-slate-400 font-medium">Skip</button>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-44 h-44 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-8 relative">
                  <PhoneCall size={68} className="text-[#2D8CFF] animate-bounce" />
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Shield size={14} className="text-emerald-400" />
                  </div>
                </div>

                <h2 className="text-[24px] font-bold text-white leading-tight mb-3">
                  Block Fake Calls Automatically
                </h2>
                <p className="text-sm text-[#BFC2C8] leading-relaxed max-w-[280px]">
                  Identify fraud & spam callers before you answer. Community-powered live protection.
                </p>
              </div>

              <div>
                <div className="flex justify-center gap-2 mb-6">
                  <div className="w-6 h-2 rounded-full bg-[#2D8CFF]"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                </div>

                <button
                  onClick={() => setCurrentScreen('ONBOARDING_2')}
                  className="w-full h-[52px] bg-[#2D8CFF] hover:bg-blue-500 text-white font-semibold rounded-xl text-base flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/25"
                >
                  Next <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* ================= FRAME 3: ONBOARDING 2 ================= */}
          {currentScreen === 'ONBOARDING_2' && (
            <div className="flex-1 flex flex-col justify-between p-6 animate-fadeIn bg-[#0A0F1F]">
              <div className="flex justify-between items-center pt-2">
                <button onClick={() => setCurrentScreen('ONBOARDING_1')} className="text-slate-400 hover:text-white">
                  <ArrowLeft size={18} />
                </button>
                <button onClick={() => setCurrentScreen('DASHBOARD')} className="text-xs text-slate-400 font-medium">Skip</button>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-44 h-44 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-8 relative">
                  <MessageSquare size={68} className="text-amber-400" />
                  <div className="absolute -top-2 -right-2 bg-red-500 text-[10px] font-bold px-2 py-0.5 rounded-full text-white">
                    ALERT
                  </div>
                </div>

                <h2 className="text-[24px] font-bold text-white leading-tight mb-3">
                  Detect Scam Messages & KYC Fraud
                </h2>
                <p className="text-sm text-[#BFC2C8] leading-relaxed max-w-[280px]">
                  Instant warnings for harmful links, bank phishing, and fake delivery notifications.
                </p>
              </div>

              <div>
                <div className="flex justify-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                  <div className="w-6 h-2 rounded-full bg-[#2D8CFF]"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                </div>

                <button
                  onClick={() => setCurrentScreen('ONBOARDING_3')}
                  className="w-full h-[52px] bg-[#2D8CFF] hover:bg-blue-500 text-white font-semibold rounded-xl text-base flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/25"
                >
                  Next <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* ================= FRAME 4: ONBOARDING 3 ================= */}
          {currentScreen === 'ONBOARDING_3' && (
            <div className="flex-1 flex flex-col justify-between p-6 animate-fadeIn bg-[#0A0F1F]">
              <div className="flex justify-start pt-2">
                <button onClick={() => setCurrentScreen('ONBOARDING_2')} className="text-slate-400 hover:text-white">
                  <ArrowLeft size={18} />
                </button>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-44 h-44 rounded-3xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-8 relative">
                  <Cpu size={68} className="text-purple-400 animate-pulse" />
                  <div className="absolute inset-0 border border-purple-500/30 rounded-3xl animate-ping opacity-25"></div>
                </div>

                <h2 className="text-[24px] font-bold text-white leading-tight mb-3">
                  AI Fraud Prediction Engine
                </h2>
                <p className="text-sm text-[#BFC2C8] leading-relaxed max-w-[280px]">
                  App learns and gets smarter with every scam report across millions of nodes.
                </p>
              </div>

              <div>
                <div className="flex justify-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                  <div className="w-6 h-2 rounded-full bg-[#2D8CFF]"></div>
                </div>

                <button
                  onClick={() => setCurrentScreen('DASHBOARD')}
                  className="w-full h-[52px] bg-gradient-to-r from-[#2D8CFF] to-purple-600 hover:opacity-95 text-white font-semibold rounded-xl text-base transition-all shadow-lg shadow-blue-500/25"
                >
                  Get Started 🛡
                </button>
              </div>
            </div>
          )}

          {/* ================= FRAME 5: HOME DASHBOARD ================= */}
          {currentScreen === 'DASHBOARD' && (
            <div className="flex-1 p-4 pb-20 flex flex-col gap-4 animate-fadeIn">
              {/* Top Bar */}
              <div className="flex justify-between items-center py-2">
                <button onClick={() => setCurrentScreen('SETTINGS')} className="p-2 rounded-xl bg-slate-800/80 text-slate-300">
                  <Menu size={18} />
                </button>
                <div className="flex items-center gap-2">
                  <Shield size={18} className="text-[#2D8CFF]" />
                  <span className="font-bold text-sm tracking-wide">SecureGuard AI</span>
                </div>
                <button onClick={() => setCurrentScreen('SETTINGS')} className="p-2 rounded-xl bg-slate-800/80 text-slate-300 relative">
                  <Bell size={18} />
                  <div className="w-2 h-2 rounded-full bg-red-500 absolute top-1.5 right-1.5"></div>
                </button>
              </div>

              {/* Search Bar: Enter Number / Verify User */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter phone number to check..."
                  value={searchNumber}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    if (val.length <= 10) {
                      setSearchNumber(val);
                      if (val.length > 5) handleSearchPhone(val);
                      else setCallSearchStatus(null);
                    }
                  }}
                  maxLength={10}
                  className="w-full h-11 pl-10 pr-4 bg-slate-900/90 border border-slate-700/60 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#2D8CFF]"
                />
                <Search size={15} className="absolute left-3.5 top-3.5 text-slate-400" />
              </div>

              {callSearchStatus && (
                <div className="p-3 rounded-xl border bg-slate-900 flex items-center justify-between animate-fadeIn text-xs" style={{ borderColor: `${callSearchStatus.color}40` }}>
                  <div>
                    <span className="font-bold mr-2" style={{ color: callSearchStatus.color }}>[{callSearchStatus.status}]</span>
                    <span className="text-slate-300 text-[11px]">{callSearchStatus.msg}</span>
                  </div>
                  <button onClick={() => setCurrentScreen('CALL_SCANNER')} className="text-blue-400 underline text-[11px]">View</button>
                </div>
              )}

              {/* Quick Cards Grid (2x2) */}
              <div className="grid grid-cols-2 gap-3">
                {/* Card 1: Call Scanner */}
                <button
                  onClick={() => setCurrentScreen('CALL_SCANNER')}
                  className="h-[120px] bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-3 flex flex-col justify-between text-left transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-[#2D8CFF] group-hover:scale-110 transition-transform">
                    <PhoneCall size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">Call Scanner</h3>
                    <p className="text-[10px] text-slate-400">Incoming spam shield</p>
                  </div>
                </button>

                {/* Card 2: SMS Scanner */}
                <button
                  onClick={() => setCurrentScreen('SMS_SCANNER')}
                  className="h-[120px] bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-3 flex flex-col justify-between text-left transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">SMS Scanner</h3>
                    <p className="text-[10px] text-slate-400">Fake links & KYC trap</p>
                  </div>
                </button>

                {/* Card 3: Link Scanner */}
                <button
                  onClick={() => setCurrentScreen('LINK_SCANNER')}
                  className="h-[120px] bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/40 rounded-2xl p-3 flex flex-col justify-between text-left transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                    <Globe size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">Link Scanner</h3>
                    <p className="text-[10px] text-slate-400">Phishing & SSL safety</p>
                  </div>
                </button>

                {/* Card 4: WhatsApp Scam Check */}
                <button
                  onClick={() => setCurrentScreen('WHATSAPP_SCANNER')}
                  className="h-[120px] bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-3 flex flex-col justify-between text-left transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">WhatsApp Scam</h3>
                    <p className="text-[10px] text-slate-400">OCR & Job fraud test</p>
                  </div>
                </button>
              </div>

              {/* Section: Live Alert Status */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-3.5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">Live Alert Status</span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                    <span>10 New Spam Numbers Blocked Today</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                    <span>3 New Fraud Patterns Detected (Bank/KYC)</span>
                  </div>
                </div>
              </div>

              {/* Big CTA Button: SCAN MY PHONE */}
              <button
                onClick={handleScanPhoneFull}
                disabled={scanningPhone}
                className="w-full h-[58px] bg-[#2D8CFF] hover:bg-blue-500 text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition-all active:scale-98"
              >
                {scanningPhone ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    <span>SCANNING DEVICE NODES...</span>
                  </>
                ) : (
                  <>
                    <Shield size={20} />
                    <span>SCAN MY PHONE</span>
                  </>
                )}
              </button>

              {/* AI Prediction Quick Link */}
              <button
                onClick={() => setCurrentScreen('AI_PREDICTION')}
                className="py-2 px-3 bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 text-purple-300 text-xs font-medium rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Cpu size={15} />
                  <span>View AI Neural Risk Meter</span>
                </div>
                <ChevronRight size={14} />
              </button>
            </div>
          )}

          {/* ================= FRAME 6: CALL SCANNER SCREEN ================= */}
          {currentScreen === 'CALL_SCANNER' && (
            <div className="flex-1 p-4 pb-20 flex flex-col gap-4 animate-fadeIn">
              <div className="flex items-center justify-between py-2 border-b border-slate-800">
                <button onClick={() => setCurrentScreen('DASHBOARD')} className="text-slate-400 hover:text-white">
                  <ArrowLeft size={18} />
                </button>
                <h2 className="text-sm font-bold text-white">Call Scanner</h2>
                <div className="w-5"></div>
              </div>

              <p className="text-[11px] text-slate-400">Scan Incoming / Recent Calls</p>

              {/* Calls List */}
              <div className="flex flex-col gap-3">
                {calls.map((c) => (
                  <div key={c.id} className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                          <PhoneCall size={18} style={{ color: c.statusColor }} />
                        </div>
                        <div>
                          <div className="font-bold text-xs text-white">{c.number}</div>
                          <span
                            className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5"
                            style={{
                              backgroundColor: `${c.statusColor}20`,
                              color: c.statusColor,
                              border: `1px solid ${c.statusColor}50`,
                            }}
                          >
                            ● {c.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 pl-1">{c.desc}</p>

                    <div className="flex items-center gap-2 pt-1 border-t border-slate-800/80">
                      <button
                        onClick={() => handleBlockCall(c.id, c.number)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-semibold ${
                          c.blocked ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-red-600 hover:bg-red-500 text-white'
                        }`}
                      >
                        {c.blocked ? 'Blocked' : 'Block'}
                      </button>
                      <button
                        onClick={() => alert(`Details for ${c.number}: AI reputation score computed with 0 anomaly records.`)}
                        className="flex-1 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300"
                      >
                        More Info
                      </button>
                      <button
                        onClick={() => alert(`Report filed for ${c.number}. Submitted to Global Spam Database.`)}
                        className="py-1.5 px-3 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20"
                      >
                        Report
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= FRAME 7: SMS SCANNER SCREEN ================= */}
          {currentScreen === 'SMS_SCANNER' && (
            <div className="flex-1 p-4 pb-20 flex flex-col gap-4 animate-fadeIn">
              <div className="flex items-center justify-between py-2 border-b border-slate-800">
                <button onClick={() => setCurrentScreen('DASHBOARD')} className="text-slate-400 hover:text-white">
                  <ArrowLeft size={18} />
                </button>
                <h2 className="text-sm font-bold text-white">SMS Scanner</h2>
                <div className="w-5"></div>
              </div>

              <p className="text-[11px] text-slate-400">Scam SMS & Fake Link Detector</p>

              {/* Scan Result Card */}
              <div className="p-4 bg-slate-900 border border-red-500/40 rounded-2xl flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-slate-400">Sender: +91 99881 22334</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/40">
                    ⚠ Scam Detected
                  </span>
                </div>

                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
                  "Dear customer, your bank KYC is expired. Your account will be BLOCKED in 24 hours. Click to update: https://bit.ly/fake-bank-kyc"
                </div>

                <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 p-2.5 rounded-xl border border-red-500/20">
                  <AlertTriangle size={16} />
                  <span>Status: <strong>Dangerous Link & KYC Phishing</strong></span>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => alert('SMS deleted securely.')}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5"
                  >
                    <Trash2 size={14} /> Delete SMS
                  </button>
                  <button
                    onClick={() => alert('Sender number has been added to blacklist.')}
                    className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5"
                  >
                    <Ban size={14} /> Block Sender
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= FRAME 8: LINK SCANNER SCREEN ================= */}
          {currentScreen === 'LINK_SCANNER' && (
            <div className="flex-1 p-4 pb-20 flex flex-col gap-4 animate-fadeIn">
              <div className="flex items-center justify-between py-2 border-b border-slate-800">
                <button onClick={() => setCurrentScreen('DASHBOARD')} className="text-slate-400 hover:text-white">
                  <ArrowLeft size={18} />
                </button>
                <h2 className="text-sm font-bold text-white">Link / URL Scanner</h2>
                <div className="w-5"></div>
              </div>

              <p className="text-[11px] text-slate-400">Paste any link to check safety</p>

              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="Paste URL here..."
                  className="w-full h-11 px-3.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono"
                />
                <button
                  onClick={() => setUrlResult({ detected: true, score: 92 })}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-95 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2"
                >
                  <Globe size={14} /> SCAN URL
                </button>
              </div>

              {urlResult && (
                <div className="p-4 bg-slate-900/90 border border-red-500/40 rounded-2xl flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                      <AlertTriangle size={15} /> ⚠ Phishing Website
                    </span>
                    <span className="text-xs font-bold text-red-400">✖ Risk: {urlResult.score}%</span>
                  </div>

                  {/* Slider visual */}
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-red-500 rounded-full transition-all duration-700"
                      style={{ width: `${urlResult.score}%` }}
                    ></div>
                  </div>

                  <div className="text-[11px] text-slate-400 flex flex-col gap-1">
                    <div>• SSL Certificate: <span className="text-red-400 font-semibold">Missing / Insecure</span></div>
                    <div>• Domain Age: <span className="text-amber-400 font-semibold">Registered 3 days ago</span></div>
                    <div>• Threat Signature: <span className="text-red-400 font-semibold">Fake Bank Login Clone</span></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= FRAME 9: WHATSAPP SCAM CHECKER ================= */}
          {currentScreen === 'WHATSAPP_SCANNER' && (
            <div className="flex-1 p-4 pb-20 flex flex-col gap-4 animate-fadeIn">
              <div className="flex items-center justify-between py-2 border-b border-slate-800">
                <button onClick={() => setCurrentScreen('DASHBOARD')} className="text-slate-400 hover:text-white">
                  <ArrowLeft size={18} />
                </button>
                <h2 className="text-sm font-bold text-white">WhatsApp Scam Detector</h2>
                <div className="w-5"></div>
              </div>

              <p className="text-[11px] text-slate-400">Upload Screenshot / Forwarded Message</p>

              <textarea
                value={waText}
                onChange={(e) => setWaText(e.target.value)}
                rows={3}
                placeholder="Paste WhatsApp message here..."
                className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />

              <div className="flex gap-2">
                <label className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700">
                  <Upload size={14} /> Upload Screenshot
                  <input type="file" className="hidden" onChange={() => alert('Screenshot OCR extracted message successfully!')} />
                </label>
                <button
                  onClick={() => setWaResult({ category: 'Fake Job Offer', reports: 3200 })}
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold"
                >
                  Analyze Text
                </button>
              </div>

              {waResult && (
                <div className="p-4 bg-slate-900/90 border border-red-500/40 rounded-2xl flex flex-col gap-2.5">
                  <div className="text-xs font-bold text-red-400">
                    ⚠ Scam Category: “{waResult.category}”
                  </div>
                  <div className="text-[11px] text-slate-300">
                    Reported by: <span className="text-amber-400 font-bold">{waResult.reports} people</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Scammers trick victims with high daily earning promises and ask for upfront registration / training fees.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ================= FRAME 10: AI FRAUD PREDICTION ================= */}
          {currentScreen === 'AI_PREDICTION' && (
            <div className="flex-1 p-4 pb-20 flex flex-col gap-4 animate-fadeIn">
              <div className="flex items-center justify-between py-2 border-b border-slate-800">
                <button onClick={() => setCurrentScreen('DASHBOARD')} className="text-slate-400 hover:text-white">
                  <ArrowLeft size={18} />
                </button>
                <h2 className="text-sm font-bold text-white">AI Fraud Prediction Page</h2>
                <div className="w-5"></div>
              </div>

              <div className="text-center text-xs text-slate-400 font-semibold tracking-wider uppercase">
                AI Risk Meter
              </div>

              {/* Circular Gauge Meter */}
              <div className="flex flex-col items-center justify-center my-2">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1e293b" strokeWidth="10" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#FF4D4F"
                      strokeWidth="10"
                      strokeDasharray="251.2"
                      strokeDashoffset="37.6" // 85% full
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center text-center">
                    <span className="text-3xl font-black text-white">85%</span>
                    <span className="text-[10px] font-bold text-red-400 uppercase tracking-wide">Fraud Likely</span>
                  </div>
                </div>
                <span className="mt-2 text-xs font-bold text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                  Risk Level: HIGH
                </span>
              </div>

              {/* Reasons List */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col gap-2">
                <span className="text-xs font-bold text-slate-300">Reason:</span>
                <ul className="text-[11px] text-slate-400 flex flex-col gap-1.5 list-disc pl-4">
                  <li>Number reported 500+ times</li>
                  <li>Fake KYC pattern detected</li>
                  <li>URL pattern matches bank phishing</li>
                </ul>
              </div>

              <button
                onClick={() => setCurrentScreen('DASHBOARD')}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold mt-auto"
              >
                Back to Dashboard
              </button>
            </div>
          )}

          {/* ================= FRAME 11: SETTINGS ================= */}
          {currentScreen === 'SETTINGS' && (
            <div className="flex-1 p-4 pb-20 flex flex-col gap-4 animate-fadeIn">
              <div className="flex items-center justify-between py-2 border-b border-slate-800">
                <button onClick={() => setCurrentScreen('DASHBOARD')} className="text-slate-400 hover:text-white">
                  <ArrowLeft size={18} />
                </button>
                <h2 className="text-sm font-bold text-white">Settings</h2>
                <div className="w-5"></div>
              </div>

              {/* Toggles List */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col gap-3">
                <div className="flex items-center justify-between py-1">
                  <span className="text-xs text-slate-200">Auto-block spam calls</span>
                  <input
                    type="checkbox"
                    checked={settings.autoBlock}
                    onChange={(e) => setSettings({ ...settings, autoBlock: e.target.checked })}
                    className="toggle toggle-primary cursor-pointer w-4 h-4 accent-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between py-1 border-t border-slate-800">
                  <span className="text-xs text-slate-200">Auto-delete scam SMS</span>
                  <input
                    type="checkbox"
                    checked={settings.autoDeleteSms}
                    onChange={(e) => setSettings({ ...settings, autoDeleteSms: e.target.checked })}
                    className="toggle toggle-primary cursor-pointer w-4 h-4 accent-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between py-1 border-t border-slate-800">
                  <span className="text-xs text-slate-200">Dark mode</span>
                  <input
                    type="checkbox"
                    checked={settings.darkMode}
                    onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })}
                    className="toggle toggle-primary cursor-pointer w-4 h-4 accent-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between py-1 border-t border-slate-800">
                  <span className="text-xs text-slate-200">Cloud Backup</span>
                  <input
                    type="checkbox"
                    checked={settings.cloudBackup}
                    onChange={(e) => setSettings({ ...settings, cloudBackup: e.target.checked })}
                    className="toggle toggle-primary cursor-pointer w-4 h-4 accent-blue-500"
                  />
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => alert('Report Scam Number dialog opened')}
                  className="w-full py-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs text-slate-200 font-medium flex items-center justify-between px-4"
                >
                  <span>Report a new scam number</span>
                  <ChevronRight size={15} className="text-slate-500" />
                </button>

                <button
                  onClick={() => alert('SecureGuard AI Support: help@secureguard.ai • 24x7 helpline')}
                  className="w-full py-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs text-slate-200 font-medium flex items-center justify-between px-4"
                >
                  <span>Contact Support</span>
                  <ChevronRight size={15} className="text-slate-500" />
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Mobile Navigation Bar (Frames 5 - 11) */}
        {['DASHBOARD', 'CALL_SCANNER', 'SMS_SCANNER', 'LINK_SCANNER', 'WHATSAPP_SCANNER', 'AI_PREDICTION', 'SETTINGS'].includes(
          currentScreen
        ) && (
          <div className="h-16 border-t border-slate-800/90 bg-[#0A0F1F]/95 backdrop-blur px-6 flex justify-between items-center z-40">
            <button
              onClick={() => setCurrentScreen('DASHBOARD')}
              className={`flex flex-col items-center gap-1 ${currentScreen === 'DASHBOARD' ? 'text-[#2D8CFF]' : 'text-slate-500'}`}
            >
              <Shield size={18} />
              <span className="text-[9px] font-semibold">Home</span>
            </button>
            <button
              onClick={() => setCurrentScreen('CALL_SCANNER')}
              className={`flex flex-col items-center gap-1 ${currentScreen === 'CALL_SCANNER' ? 'text-[#2D8CFF]' : 'text-slate-500'}`}
            >
              <PhoneCall size={18} />
              <span className="text-[9px] font-semibold">Calls</span>
            </button>
            <button
              onClick={() => setCurrentScreen('SMS_SCANNER')}
              className={`flex flex-col items-center gap-1 ${currentScreen === 'SMS_SCANNER' ? 'text-[#2D8CFF]' : 'text-slate-500'}`}
            >
              <MessageSquare size={18} />
              <span className="text-[9px] font-semibold">SMS</span>
            </button>
            <button
              onClick={() => setCurrentScreen('AI_PREDICTION')}
              className={`flex flex-col items-center gap-1 ${currentScreen === 'AI_PREDICTION' ? 'text-[#2D8CFF]' : 'text-slate-500'}`}
            >
              <Cpu size={18} />
              <span className="text-[9px] font-semibold">AI Risk</span>
            </button>
            <button
              onClick={() => setCurrentScreen('SETTINGS')}
              className={`flex flex-col items-center gap-1 ${currentScreen === 'SETTINGS' ? 'text-[#2D8CFF]' : 'text-slate-500'}`}
            >
              <SettingsIcon size={18} />
              <span className="text-[9px] font-semibold">Settings</span>
            </button>
          </div>
        )}

        {/* Home Indicator Bar */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-600 rounded-full z-50"></div>
      </div>
    </div>
  );
}
