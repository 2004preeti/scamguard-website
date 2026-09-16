import React, { useState } from 'react';
import { Mic, Radio, Volume2, AlertTriangle, CheckCircle2, Play, Square, X, Activity } from 'lucide-react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export default function VoiceScamModal({ onClose }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [sampleType, setSampleType] = useState('ai_voice');
  const [result, setResult] = useState(null);

  const handleAnalyzeVoice = async (type) => {
    setSampleType(type);
    setAnalyzing(true);
    setResult(null);

    try {
      const res = await axios.post(`${API_BASE}/ai/voice-check`, { simulated_type: type });
      setResult(res.data);
    } catch {
      // Fallback simulation
      const isScam = type !== 'natural';
      setResult({
        ai_voice_detected: isScam,
        voice_clone_probability: isScam ? '94.6%' : '4.2%',
        spectral_artifacts: isScam ? 'Synthetic vocoder frequencies detected (16kHz cut-off)' : 'Natural vocal formant transitions',
        fraud_script_match: isScam ? 'Matches "Digital Arrest / Police Extortion" audio script' : 'Natural conversational dialogue',
        threat_level: isScam ? 'HIGH RISK VOIP SCAM' : 'SAFE AUDIO',
        recommendation: isScam ? 'Hang up immediately. Police or Customs never interrogate on Skype/WhatsApp voice calls.' : 'Verified natural caller tone.',
      });
    }
    setAnalyzing(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl text-white relative">
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-white">
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Mic size={22} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">AI Voice & Deepfake Audio Analyzer</h3>
            <p className="text-xs text-slate-400">Caller Spectral Analysis & Synthetic Speech Classifier</p>
          </div>
        </div>

        {/* Audio Waveform Graphic */}
        <div className="my-5 p-5 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center gap-3">
          <div className="flex items-center gap-1.5 h-14">
            {[20, 45, 60, 30, 80, 95, 40, 70, 85, 30, 60, 90, 45, 25, 75, 50, 85, 35, 65, 40].map((h, i) => (
              <div
                key={i}
                className={`w-1.5 rounded-full transition-all duration-300 ${
                  analyzing ? 'bg-gradient-to-t from-purple-500 to-pink-500 animate-pulse' : 'bg-slate-700'
                }`}
                style={{ height: analyzing ? `${(h * Math.random() + 20)}%` : `${h}%` }}
              ></div>
            ))}
          </div>

          <span className="text-xs text-slate-400 font-mono flex items-center gap-2">
            <Activity size={14} className={analyzing ? 'text-purple-400 animate-spin' : 'text-slate-500'} />
            {analyzing ? 'Extracting vocoder artifacts & pitch frequency...' : 'Select a caller sample to analyze:'}
          </span>

          <div className="flex gap-3 mt-1">
            <button
              onClick={() => handleAnalyzeVoice('ai_voice')}
              disabled={analyzing}
              className="px-4 py-2 bg-purple-600/20 border border-purple-500/40 hover:bg-purple-600/30 text-purple-300 rounded-xl text-xs font-semibold flex items-center gap-2"
            >
              <Play size={13} /> Sample 1: "Digital Arrest AI Voice"
            </button>
            <button
              onClick={() => handleAnalyzeVoice('natural')}
              disabled={analyzing}
              className="px-4 py-2 bg-emerald-600/20 border border-emerald-500/40 hover:bg-emerald-600/30 text-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-2"
            >
              <Play size={13} /> Sample 2: "Normal Friend Call"
            </button>
          </div>
        </div>

        {/* Results Card */}
        {result && (
          <div
            className={`p-4 rounded-2xl border flex flex-col gap-2.5 animate-fadeIn ${
              result.ai_voice_detected ? 'bg-red-950/40 border-red-500/40 text-red-200' : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                {result.ai_voice_detected ? <AlertTriangle size={16} className="text-red-400" /> : <CheckCircle2 size={16} className="text-emerald-400" />}
                {result.threat_level}
              </span>
              <span className="text-xs font-black">AI Clone Probability: {result.voice_clone_probability}</span>
            </div>

            <div className="text-xs space-y-1 text-slate-300">
              <div>• <strong>Spectrogram Artifact:</strong> {result.spectral_artifacts}</div>
              <div>• <strong>Fraud Script Check:</strong> {result.fraud_script_match}</div>
            </div>

            <div className="text-xs p-2.5 rounded-xl bg-black/40 font-medium text-slate-200 mt-1">
              💡 <strong>Action:</strong> {result.recommendation}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
