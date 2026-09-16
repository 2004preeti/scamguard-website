import React from 'react';
import { Database, Table, Key, ArrowRight, X, Layers, Link as LinkIcon } from 'lucide-react';

const TABLES = [
  {
    name: '1. USERS',
    color: 'from-blue-600 to-indigo-600',
    fields: [
      { name: 'id', type: 'PK (ObjectId)', isKey: true },
      { name: 'name', type: 'String' },
      { name: 'phone', type: 'String (Unique)' },
      { name: 'email', type: 'String' },
      { name: 'language', type: 'String' },
      { name: 'created_at', type: 'Timestamp' },
      { name: 'updated_at', type: 'Timestamp' },
    ],
  },
  {
    name: '2. SCAN_LOGS',
    color: 'from-purple-600 to-pink-600',
    badge: 'Connects all tables',
    fields: [
      { name: 'id', type: 'PK (ObjectId)', isKey: true },
      { name: 'user_id', type: 'FK -> USERS.id', isFk: true },
      { name: 'scan_type', type: 'call|sms|wa|link|ocr|job' },
      { name: 'input_data', type: 'String (Raw Text/Num)' },
      { name: 'risk_level', type: 'low | medium | high' },
      { name: 'result', type: 'safe | spam | fraud' },
      { name: 'details', type: 'AI Explanation' },
      { name: 'Timestamp', type: 'Date' },
    ],
  },
  {
    name: '3. CALL_LOGS',
    color: 'from-emerald-600 to-teal-600',
    fields: [
      { name: 'id', type: 'PK (ObjectId)', isKey: true },
      { name: 'user_id', type: 'FK -> USERS.id', isFk: true },
      { name: 'phone_number', type: 'String' },
      { name: 'country', type: 'String' },
      { name: 'risk_level', type: 'low | medium | high' },
      { name: 'result', type: 'safe | spam | fraud' },
      { name: 'ai_score', type: 'Number (0-100)' },
      { name: 'created_at', type: 'Timestamp' },
    ],
  },
  {
    name: '4. SMS_LOGS',
    color: 'from-amber-600 to-orange-600',
    fields: [
      { name: 'id', type: 'PK (ObjectId)', isKey: true },
      { name: 'user_id', type: 'FK -> USERS.id', isFk: true },
      { name: 'sender_number', type: 'String' },
      { name: 'message_text', type: 'String' },
      { name: 'risk_level', type: 'low | med | high' },
      { name: 'category', type: 'bank | kyc | otp | courier' },
      { name: 'ai_score', type: 'Number' },
      { name: 'created_at', type: 'Timestamp' },
    ],
  },
  {
    name: '5. WHATSAPP_SCANS',
    color: 'from-green-600 to-emerald-600',
    fields: [
      { name: 'id', type: 'PK (ObjectId)', isKey: true },
      { name: 'user_id', type: 'FK -> USERS.id', isFk: true },
      { name: 'message_text', type: 'String' },
      { name: 'image_url', type: 'String (URL/Base64)' },
      { name: 'risk_level', type: 'low | medium | high' },
      { name: 'category', type: 'job | loan | courier | OTP' },
      { name: 'ai_score', type: 'Number' },
      { name: 'created_at', type: 'Timestamp' },
    ],
  },
  {
    name: '6. LINK_SCANS',
    color: 'from-violet-600 to-purple-600',
    fields: [
      { name: 'id', type: 'PK (ObjectId)', isKey: true },
      { name: 'user_id', type: 'FK -> USERS.id', isFk: true },
      { name: 'url', type: 'String' },
      { name: 'domain', type: 'String' },
      { name: 'ip_address', type: 'String' },
      { name: 'ssl_status', type: 'valid | missing | expired' },
      { name: 'risk_level', type: 'low | medium | high' },
      { name: 'category', type: 'fake bank | phishing | malware' },
      { name: 'ai_score', type: 'Number' },
      { name: 'created_at', type: 'Timestamp' },
    ],
  },
  {
    name: '7. JOB_SCAM_CHECKS',
    color: 'from-rose-600 to-pink-600',
    fields: [
      { name: 'id', type: 'PK (ObjectId)', isKey: true },
      { name: 'user_id', type: 'FK -> USERS.id', isFk: true },
      { name: 'company_name', type: 'String' },
      { name: 'message_text', type: 'String' },
      { name: 'letter_url', type: 'String' },
      { name: 'risk_level', type: 'low | medium | high' },
      { name: 'ai_score', type: 'Number' },
      { name: 'reason', type: 'String' },
      { name: 'created_at', type: 'Timestamp' },
    ],
  },
  {
    name: '8. IMAGE_SCANS (OCR)',
    color: 'from-cyan-600 to-blue-600',
    fields: [
      { name: 'id', type: 'PK (ObjectId)', isKey: true },
      { name: 'user_id', type: 'FK -> USERS.id', isFk: true },
      { name: 'image_url', type: 'String' },
      { name: 'extracted_text', type: 'String' },
      { name: 'risk_level', type: 'low | medium | high' },
      { name: 'category', type: 'String' },
      { name: 'ai_score', type: 'Number' },
      { name: 'created_at', type: 'Timestamp' },
    ],
  },
  {
    name: '9. REPORTED_NUMBERS',
    color: 'from-red-600 to-amber-600',
    fields: [
      { name: 'id', type: 'PK (ObjectId)', isKey: true },
      { name: 'user_id', type: 'FK -> USERS.id', isFk: true },
      { name: 'number', type: 'String' },
      { name: 'category', type: 'fraud | spam | harassment' },
      { name: 'description', type: 'String' },
      { name: 'region', type: 'String' },
      { name: 'vote_count', type: 'Number' },
      { name: 'status', type: 'pending | verified' },
      { name: 'created_at', type: 'Timestamp' },
    ],
  },
  {
    name: '10. GLOBAL_SPAM_DB',
    color: 'from-slate-700 to-slate-900',
    badge: 'Big Database for AI Engine',
    fields: [
      { name: 'id', type: 'PK (ObjectId)', isKey: true },
      { name: 'number', type: 'String (Unique)' },
      { name: 'country', type: 'String' },
      { name: 'spam_type', type: 'fraud | telemarketing | scam' },
      { name: 'reports_count', type: 'Number' },
      { name: 'ai_risk_score', type: 'Number' },
      { name: 'last_reported', type: 'Timestamp' },
      { name: 'updated_at', type: 'Timestamp' },
    ],
  },
  {
    name: '11. ADMINS',
    color: 'from-indigo-700 to-purple-800',
    fields: [
      { name: 'id', type: 'PK (ObjectId)', isKey: true },
      { name: 'name', type: 'String' },
      { name: 'email', type: 'String (Unique)' },
      { name: 'password_hash', type: 'String (Bcrypt)' },
      { name: 'role', type: 'Super Admin | Analyst' },
      { name: 'created_at', type: 'Timestamp' },
    ],
  },
];

export default function DatabaseDiagramModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-6xl bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-4 border-b border-slate-800 sticky top-0 bg-slate-900 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Database size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Complete Database ER Diagram</h2>
              <p className="text-xs text-slate-400">All 11 Database Tables, Schemas, Foreign Keys & Relationships</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Relationships Map Summary */}
        <div className="my-5 p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col gap-2">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
            <LinkIcon size={14} /> Relational Schema Mappings (ER Text Notation)
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-xs font-mono text-slate-300">
            <div className="p-2 bg-slate-900 rounded-lg">USERS 1 ─── ∞ CALL_LOGS</div>
            <div className="p-2 bg-slate-900 rounded-lg">USERS 1 ─── ∞ SMS_LOGS</div>
            <div className="p-2 bg-slate-900 rounded-lg">USERS 1 ─── ∞ LINK_SCANS</div>
            <div className="p-2 bg-slate-900 rounded-lg">USERS 1 ─── ∞ WHATSAPP_SCANS</div>
            <div className="p-2 bg-slate-900 rounded-lg">USERS 1 ─── ∞ JOB_SCAM_CHECKS</div>
            <div className="p-2 bg-slate-900 rounded-lg">USERS 1 ─── ∞ IMAGE_SCANS</div>
            <div className="p-2 bg-slate-900 rounded-lg">USERS 1 ─── ∞ REPORTED_NUMBERS</div>
            <div className="p-2 bg-slate-900 rounded-lg text-emerald-400">REPORTED_NUMBERS ∞ ── 1 GLOBAL_SPAM_DB</div>
          </div>
        </div>

        {/* 11 Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TABLES.map((table, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:border-slate-700 transition-all flex flex-col">
              <div className={`p-3 bg-gradient-to-r ${table.color} flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  <Table size={16} className="text-white" />
                  <span className="font-bold text-xs tracking-wide text-white">{table.name}</span>
                </div>
                {table.badge && (
                  <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded-full text-white font-medium">
                    {table.badge}
                  </span>
                )}
              </div>

              <div className="p-3 flex flex-col gap-1 text-xs">
                {table.fields.map((f, fIdx) => (
                  <div key={fIdx} className="flex justify-between items-center py-1 border-b border-slate-900 last:border-none font-mono">
                    <div className="flex items-center gap-1.5">
                      {f.isKey && <Key size={11} className="text-amber-400" />}
                      {f.isFk && <LinkIcon size={11} className="text-blue-400" />}
                      <span className={`${f.isKey ? 'text-amber-300 font-bold' : f.isFk ? 'text-blue-300' : 'text-slate-200'}`}>
                        {f.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500">{f.type}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
