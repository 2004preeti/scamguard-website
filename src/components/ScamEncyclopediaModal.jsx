import React, { useState } from 'react';
import {
  BookOpen,
  X,
  ShieldAlert,
  Search,
  Volume2,
  AlertTriangle,
  CheckCircle,
  FileText,
  PhoneCall,
  DollarSign,
  Package,
  KeyRound,
  CreditCard,
  Building,
} from 'lucide-react';

const SCAM_ARCHIVE = [
  {
    id: 'digital_arrest',
    title: 'Digital Arrest & Police Video Call Extortion',
    category: 'Extortion / Police Spoofing',
    threatLevel: 'CRITICAL',
    icon: <ShieldAlert size={20} color="#ef4444" />,
    summary: 'Scammers pose as CBI / Mumbai Police / Customs officers on Skype/WhatsApp video calls claiming drugs were seized in a parcel under your Aadhaar.',
    redFlags: [
      'Demand to stay on continuous video call without informing family',
      'Threaten immediate arrest and demand "security clearance" deposit',
      'Show fake Supreme Court notices or forged police ID cards',
    ],
    scriptSample: '"This is Inspector Sharma from Cyber Crime Cell. A FedEx courier with 5 passports and contraband is registered in your name. Cooperate immediately or police will raid your house."',
    safetyRule: 'Real police and law enforcement NEVER conduct trials or demand money over Skype / WhatsApp video calls. Hang up and dial 1930.',
  },
  {
    id: 'job_task',
    title: 'Telegram Part-Time Task & Deposit Trap',
    category: 'Employment Fraud',
    threatLevel: 'HIGH',
    icon: <DollarSign size={20} color="#a855f7" />,
    summary: 'Offers 5,000–10,000 INR daily for liking YouTube videos or reviewing Google Maps hotels, leading into high-value cryptocurrency/prepaid deposit traps.',
    redFlags: [
      'Pays small Rs 150-500 profits initially to gain trust',
      'Shifts communication to unofficial Telegram VIP groups',
      'Demands Rs 10,000+ "recharge" before unlocking your earned profits',
    ],
    scriptSample: '"Congratulations! Selected for Amazon part-time rating job. Earn Rs 500 per task from home. Complete 3 tasks to get instant payout."',
    safetyRule: 'No legitimate global company (Amazon, Google, YouTube) pays via Telegram tasks or demands money to release candidate salaries.',
  },
  {
    id: 'bank_kyc',
    title: 'Urgent Bank / KYC Suspension Phishing',
    category: 'Financial Phishing',
    threatLevel: 'CRITICAL',
    icon: <CreditCard size={20} color="#3b82f6" />,
    summary: 'SMS claiming your SBI / HDFC / PNB account will be suspended within 24 hours unless you update PAN / KYC on an unverified link.',
    redFlags: [
      'Urgency coercion ("Account blocked within 24 hours")',
      'Shortened or lookalike domains (e.g. sbi-kyc-verify.xyz, bit.ly/sbi)',
      'Asks for full Netbanking password, OTP, and Debit Card CVV',
    ],
    scriptSample: '"Dear SBI Customer, Your YONO account is locked today. Update your PAN card immediately to avoid permanent deactivation: http://bit.ly/sbi-pan-up"',
    safetyRule: 'Banks never send SMS containing links to update KYC. Only update KYC physically at your branch or inside the official banking app.',
  },
  {
    id: 'electricity',
    title: 'Electricity Power-Cut Extortion Call',
    category: 'Utility Scam',
    threatLevel: 'HIGH',
    icon: <Building size={20} color="#f59e0b" />,
    summary: 'SMS stating your home electricity will be disconnected tonight at 9:30 PM due to unpaid bill, asking you to call a fake officer number.',
    redFlags: [
      'Specific panic deadline ("Power cut at 9:30 PM tonight")',
      'Provides a personal 10-digit mobile number instead of official electricity board helpline',
      'Instructs to install remote desktop apps (AnyDesk, TeamViewer, RustDesk)',
    ],
    scriptSample: '"Dear Consumer, Your electricity power will be disconnected at 9:30 PM from electricity office because previous bill was not updated. Call Officer at 9876543210."',
    safetyRule: 'Official state electricity discoms send automated receipts with your Consumer ID. Never install remote screen-sharing apps.',
  },
  {
    id: 'voice_clone',
    title: 'AI Voice Clone Kidnapping Scam',
    category: 'Deepfake Audio',
    threatLevel: 'CRITICAL',
    icon: <PhoneCall size={20} color="#ec4899" />,
    summary: 'Scammers clone your child’s or family member’s voice using a 5-second social media audio clip and call parents crying for emergency bail money.',
    redFlags: [
      'Child/Relative crying in panic in the background',
      'Demands immediate cash transfer via UPI to an unknown hospital/lawyer account',
      'Pressures parent not to hang up or call anyone else',
    ],
    scriptSample: '"Mom, please help me! I met with an accident and police have detained me. Send 50,000 to this officer’s Google Pay right now!"',
    safetyRule: 'Establish a private "Family Safe Word". Hang up immediately and call your family member directly on their primary phone number.',
  },
];

export default function ScamEncyclopediaModal({ onClose }) {
  const [selectedScam, setSelectedScam] = useState(SCAM_ARCHIVE[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArchive = SCAM_ARCHIVE.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl text-white relative max-h-[90vh] overflow-y-auto font-sans">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <BookOpen size={26} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">Scam Encyclopedia & Modus Operandi Archive</h2>
            <p className="text-xs text-slate-400">
              Declassified fraud case studies, real scam dialogue scripts, and red-flag checklists
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="my-4">
          <input
            type="text"
            placeholder="Search scam types (e.g. Digital arrest, Telegram task, KYC, Electricity)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 px-4 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* List Column */}
          <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
            {filteredArchive.map((scam) => (
              <div
                key={scam.id}
                onClick={() => setSelectedScam(scam)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  selectedScam.id === scam.id
                    ? 'bg-purple-600/20 border-purple-500 shadow-md'
                    : 'bg-slate-950/80 border-slate-800 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {scam.icon}
                  <span className="text-xs font-bold text-white truncate">{scam.title}</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-400">{scam.category}</span>
                  <span className={`px-1.5 py-0.5 rounded font-bold ${
                    scam.threatLevel === 'CRITICAL' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {scam.threatLevel}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Details Column */}
          <div className="md:col-span-2 p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">{selectedScam.category}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                  {selectedScam.threatLevel} THREAT
                </span>
              </div>
              <h3 className="text-lg font-black text-white mt-1">{selectedScam.title}</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">{selectedScam.summary}</p>
            </div>

            {/* Red Flags */}
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
              <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-2">
                <AlertTriangle size={14} /> Critical Red Flags to Identify
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedScam.redFlags.map((flag, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Audio Script Sample */}
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
              <h4 className="text-xs font-bold text-blue-400 flex items-center gap-1.5 mb-2">
                <Volume2 size={14} /> Exact Deceptive Dialogue Script Used by Scammers
              </h4>
              <p className="text-xs text-slate-300 italic font-mono bg-slate-950 p-3 rounded-lg border border-slate-800">
                {selectedScam.scriptSample}
              </p>
            </div>

            {/* Golden Safety Rule */}
            <div className="p-3.5 bg-emerald-950/30 rounded-xl border border-emerald-500/30">
              <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
                <CheckCircle size={14} /> Golden Defense Rule
              </h4>
              <p className="text-xs text-slate-200">{selectedScam.safetyRule}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
