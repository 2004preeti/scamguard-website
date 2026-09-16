import React, { useState } from 'react';
import {
  Sparkles,
  X,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Trophy,
} from 'lucide-react';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    scenario: 'You receive an SMS: "Dear Customer, your SBI YONO account will be blocked tonight at 10 PM. Update your PAN card now at http://bit.ly/sbi-pan-update". What should you do?',
    options: [
      { text: 'Click the link immediately so my bank account does not get blocked.', isCorrect: false },
      { text: 'Ignore and delete the SMS. Never click shortened bit.ly links claiming to be from banks.', isCorrect: true },
      { text: 'Reply to the SMS with my PAN card number.', isCorrect: false },
    ],
    explanation: 'Banks never send shortened links (bit.ly/tinyurl) or threaten to freeze accounts within hours via SMS.',
  },
  {
    id: 2,
    scenario: 'A recruiter messages you on WhatsApp: "Selected for Amazon rating job! Earn Rs 8,000 daily. Just deposit Rs 500 registration fee." Is this legitimate?',
    options: [
      { text: 'Yes, because Rs 500 is a small training deposit for high daily earnings.', isCorrect: false },
      { text: 'No, this is a classic Advance-Fee Task Scam. Legitimate companies never charge candidates.', isCorrect: true },
      { text: 'Yes, if they send an Amazon logo in the chat.', isCorrect: false },
    ],
    explanation: 'Amazon and genuine recruiters never recruit via unofficial WhatsApp tasks or charge upfront deposit fees.',
  },
  {
    id: 3,
    scenario: 'You receive a WhatsApp video call from a person in a police uniform claiming drugs were seized in a FedEx parcel with your Aadhaar and demanding "Digital Arrest". What should you do?',
    options: [
      { text: 'Transfer the penalty money to avoid police raiding my home.', isCorrect: false },
      { text: 'Hang up immediately and dial 1930. Police never conduct video call trials or ask for money.', isCorrect: true },
      { text: 'Stay on the video call and show all my bank passbooks.', isCorrect: false },
    ],
    explanation: 'There is no legal concept called "Digital Arrest". Law enforcement officers never investigate or demand funds over WhatsApp/Skype video calls.',
  },
  {
    id: 4,
    scenario: 'An electricity officer calls saying: "Your power will be cut tonight at 9:30 PM due to unpaid bill. Install AnyDesk on your mobile to update the meter." Should you install it?',
    options: [
      { text: 'Yes, otherwise my house electricity will be disconnected.', isCorrect: false },
      { text: 'No! Installing AnyDesk/TeamViewer gives scammers complete remote control of your phone and bank OTPs.', isCorrect: true },
      { text: 'Yes, but only for 5 minutes.', isCorrect: false },
    ],
    explanation: 'Never install remote desktop apps (AnyDesk, QuickSupport, RustDesk) on the instructions of unknown callers.',
  },
  {
    id: 5,
    scenario: 'You receive a call from your crying daughter asking for urgent hospital money, but the voice sounds slightly robotic and strained. What is your immediate action?',
    options: [
      { text: 'Immediately send Rs 50,000 to the unknown Google Pay number.', isCorrect: false },
      { text: 'Hang up and immediately call my daughter on her known primary number / ask family safe word.', isCorrect: true },
      { text: 'Share my Debit Card OTP with the caller.', isCorrect: false },
    ],
    explanation: 'Scammers use 5-second voice samples to create AI Deepfake clones. Always hang up and call the family member directly.',
  },
];

export default function ScamQuizModal({ onClose }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx) => {
    if (showExplanation) return;
    setSelectedOption(idx);
    setShowExplanation(true);
    if (currentQ.options[idx].isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setIsCompleted(false);
  };

  const immunityPercent = Math.round((score / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl text-white relative font-sans">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
        >
          <X size={20} />
        </button>

        {!isCompleted ? (
          <div>
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800 mb-4">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">How Scam-Proof Are You?</h3>
                <span className="text-[11px] text-slate-400">Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}</span>
              </div>
            </div>

            {/* Scenario */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 mb-4">
              <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wide">Real-World Threat Scenario</span>
              <p className="text-xs text-white font-medium mt-1.5 leading-relaxed">{currentQ.scenario}</p>
            </div>

            {/* Options */}
            <div className="space-y-2 mb-4">
              {currentQ.options.map((opt, idx) => {
                let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/60';
                if (showExplanation) {
                  if (opt.isCorrect) {
                    btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-300';
                  } else if (selectedOption === idx) {
                    btnStyle = 'bg-red-950/60 border-red-500 text-red-300';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={showExplanation}
                    className={`w-full p-3 text-left rounded-xl border text-xs font-semibold transition-all ${btnStyle}`}
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            {showExplanation && (
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 mb-4 text-xs">
                <span className="font-bold text-amber-400">Why? </span>
                <span className="text-slate-300">{currentQ.explanation}</span>
              </div>
            )}

            {showExplanation && (
              <button
                onClick={handleNext}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <span>{currentIdx + 1 === QUIZ_QUESTIONS.length ? 'View Final Results' : 'Next Scenario'}</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-xl">
              <Trophy size={32} />
            </div>

            <div>
              <h3 className="text-xl font-black text-white">Your Scam Immunity Score: {immunityPercent}%</h3>
              <p className="text-xs text-slate-400 mt-1">
                You correctly identified {score} out of {QUIZ_QUESTIONS.length} high-risk scam vectors!
              </p>
            </div>

            <div className={`p-4 rounded-2xl border text-xs max-w-md mx-auto ${
              immunityPercent >= 80
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
            }`}>
              {immunityPercent >= 80 ? (
                <span>🛡️ <strong>Master Defender!</strong> You have excellent awareness against deceptive social engineering and digital traps.</span>
              ) : (
                <span>⚠️ <strong>Moderate Risk!</strong> Review our Scam Encyclopedia to learn how to spot urgent phishing and impersonation tricks.</span>
              )}
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5"
              >
                <RotateCcw size={13} /> Retake Test
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs"
              >
                Close Hub
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
