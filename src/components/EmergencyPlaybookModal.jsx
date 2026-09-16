import React, { useState } from 'react';
import {
  ShieldAlert,
  X,
  PhoneCall,
  FileText,
  AlertTriangle,
  Lock,
  Copy,
  Check,
  Download,
  CheckCircle2,
  ArrowRight,
  Clock,
  ExternalLink,
} from 'lucide-react';

export default function EmergencyPlaybookModal({ onClose }) {
  const [activeStep, setActiveStep] = useState(1);
  const [victimName, setVictimName] = useState('');
  const [perpetratorContact, setPerpetratorContact] = useState('');
  const [perpetratorUpi, setPerpetratorUpi] = useState('');
  const [amountLost, setAmountLost] = useState('');
  const [incidentDescription, setIncidentDescription] = useState('');
  const [incidentDate, setIncidentDate] = useState(new Date().toISOString().split('T')[0]);
  const [copiedLetter, setCopiedLetter] = useState(false);

  const generatedComplaintLetter = `To,
The Cyber Crime Police Station / Nodal Officer,
Sub: Urgent Complaint Regarding Financial Cyber Fraud of Rs. ${amountLost || '[Amount]'}

Respected Sir/Madam,

I, ${victimName || '[Your Full Name]'}, wish to lodge an urgent complaint regarding a cyber fraud incident that occurred on ${incidentDate}.

INCIDENT DETAILS:
- Date & Time of Incident: ${incidentDate}
- Suspect / Scammer Phone / ID: ${perpetratorContact || '[Phone / Sender ID]'}
- Suspect UPI / Bank Account Details: ${perpetratorUpi || '[UPI ID / Account Number]'}
- Total Amount Defrauded: INR ${amountLost || '[Amount]'}

BRIEF MODUS OPERANDI:
${incidentDescription || 'The scammer impersonated an official authority / bank representative and coerced an unauthorized transaction under false pretenses.'}

IMMEDIATE ACTION REQUESTED:
1. Urgent freeze / lien on the beneficiary account / UPI ID (${perpetratorUpi || 'perpetrator'}).
2. Request to initiate reversal protocols with the beneficiary bank.
3. Registration of formal complaint under appropriate sections of the Information Technology Act.

I am attaching transaction screenshots, call logs, and SMS proofs for your verification.

Sincerely,
${victimName || '[Your Name]'}
Contact: [Your Mobile Number]
Date: ${new Date().toLocaleDateString()}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedComplaintLetter);
    setCopiedLetter(true);
    setTimeout(() => setCopiedLetter(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl text-white relative max-h-[90vh] overflow-y-auto font-sans">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
            <ShieldAlert size={26} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              "I Got Scammed" Emergency Recovery Hub
            </h2>
            <p className="text-xs text-slate-400">
              Immediate golden-hour crisis action plan & automated cyber crime complaint letter generator
            </p>
          </div>
        </div>

        {/* Step Navigation Tabs */}
        <div className="flex gap-2 my-5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveStep(1)}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeStep === 1 ? 'bg-red-600 text-white shadow-md shadow-red-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Golden Hour Steps
          </button>
          <button
            onClick={() => setActiveStep(2)}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeStep === 2 ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Generate Police/FIR Letter
          </button>
        </div>

        {/* STEP 1: GOLDEN HOUR ACTION CHECKLIST */}
        {activeStep === 1 && (
          <div className="space-y-4">
            <div className="p-4 bg-red-950/40 border border-red-500/30 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold">
                  <PhoneCall size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">Call National Cyber Helpline Immediately</h4>
                  <p className="text-xs text-red-200">Dial 1930 within the first 2 hours to freeze money in fraudster's account.</p>
                </div>
              </div>
              <a
                href="tel:1930"
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-black text-sm rounded-xl flex items-center gap-1.5 shadow-lg"
              >
                Call 1930
              </a>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <h5 className="text-xs font-bold text-white">Freeze UPI Apps & Netbanking</h5>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Open your banking app (GPay, PhonePe, Paytm, YONO) and immediately lock your UPI PIN or debit card.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <h5 className="text-xs font-bold text-white">Preserve Evidence (Do NOT Delete Chats)</h5>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Take screenshots of all WhatsApp messages, call logs, SMS headers, UPI transaction IDs, and bank reference UTR numbers.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <h5 className="text-xs font-bold text-white">File Online Complaint on Government Portal</h5>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Submit a report on <strong>cybercrime.gov.in</strong> with your transaction acknowledgement number.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveStep(2)}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 mt-4"
            >
              <span>Draft Official Police Complaint Letter</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* STEP 2: AUTO COMPLAINT LETTER GENERATOR */}
        {activeStep === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-300">Your Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={victimName}
                  onChange={(e) => setVictimName(e.target.value)}
                  className="w-full h-10 px-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 mt-1"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300">Amount Defrauded (INR)</label>
                <input
                  type="number"
                  placeholder="e.g. 25000"
                  value={amountLost}
                  onChange={(e) => setAmountLost(e.target.value)}
                  className="w-full h-10 px-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 mt-1"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300">Suspect Phone / Sender ID</label>
                <input
                  type="text"
                  placeholder="e.g. +91 98765 43210"
                  value={perpetratorContact}
                  onChange={(e) => setPerpetratorContact(e.target.value)}
                  className="w-full h-10 px-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 mt-1"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300">Suspect UPI / Bank Account</label>
                <input
                  type="text"
                  placeholder="e.g. scammer@ybl / ICICI Account"
                  value={perpetratorUpi}
                  onChange={(e) => setPerpetratorUpi(e.target.value)}
                  className="w-full h-10 px-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 mt-1"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300">Brief Incident Description</label>
              <textarea
                rows={2}
                placeholder="Explain what happened (e.g. received fake electricity cut SMS, clicked link, entered OTP)..."
                value={incidentDescription}
                onChange={(e) => setIncidentDescription(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 mt-1"
              />
            </div>

            {/* Formatted Letter Output */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 relative">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-400">Generated Formal Complaint Draft:</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold"
                >
                  {copiedLetter ? <Check size={13} /> : <Copy size={13} />}
                  {copiedLetter ? 'Copied to Clipboard!' : 'Copy Complaint'}
                </button>
              </div>
              <pre className="text-[11px] text-slate-300 font-mono whitespace-pre-wrap max-h-48 overflow-y-auto leading-relaxed">
                {generatedComplaintLetter}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
