import React, { useState } from 'react';
import {
  Search,
  X,
  ShieldCheck,
  PhoneCall,
  Globe,
  ExternalLink,
  Copy,
  Check,
  Building2,
  Package,
  CreditCard,
  ShoppingBag,
  ShieldAlert,
} from 'lucide-react';

const VERIFIED_ENTITIES = [
  {
    name: 'State Bank of India (SBI)',
    category: 'Banking',
    helpline: '1800 1234 / 1800 2100',
    website: 'https://onlinesbi.sbi',
    fraudNote: 'SBI never calls asking for YONO username, MPIN, or OTP.',
    icon: <CreditCard size={18} color="#3b82f6" />,
  },
  {
    name: 'HDFC Bank',
    category: 'Banking',
    helpline: '1800 1600 / 1800 2600',
    website: 'https://hdfcbank.com',
    fraudNote: 'Official SMS always comes from sender ID ending with "HDFCBK".',
    icon: <CreditCard size={18} color="#3b82f6" />,
  },
  {
    name: 'ICICI Bank',
    category: 'Banking',
    helpline: '1800 1080',
    website: 'https://icicibank.com',
    fraudNote: 'Never share iMobile activation codes with anyone.',
    icon: <CreditCard size={18} color="#3b82f6" />,
  },
  {
    name: 'Punjab National Bank (PNB)',
    category: 'Banking',
    helpline: '1800 180 2222',
    website: 'https://pnbindia.in',
    fraudNote: 'Do not click unauthorized KYC links sent via WhatsApp.',
    icon: <CreditCard size={18} color="#3b82f6" />,
  },
  {
    name: 'Axis Bank',
    category: 'Banking',
    helpline: '1860 419 5555',
    website: 'https://axisbank.com',
    fraudNote: 'Axis Bank executives never ask for Netbanking passwords.',
    icon: <CreditCard size={18} color="#3b82f6" />,
  },
  {
    name: 'FedEx Express India',
    category: 'Courier & Logistics',
    helpline: '1800 419 4339',
    website: 'https://fedex.com/in',
    fraudNote: 'FedEx NEVER demands customs fines over Google Pay or Skype.',
    icon: <Package size={18} color="#f59e0b" />,
  },
  {
    name: 'Blue Dart Express',
    category: 'Courier & Logistics',
    helpline: '1860 233 1234',
    website: 'https://bluedart.com',
    fraudNote: 'Do not pay Rs 5 re-delivery fees via unknown links.',
    icon: <Package size={18} color="#f59e0b" />,
  },
  {
    name: 'India Post (Speed Post)',
    category: 'Courier & Logistics',
    helpline: '1800 266 6868',
    website: 'https://indiapost.gov.in',
    fraudNote: 'Fake SMS claiming "Address missing, pay Rs 25" are malicious.',
    icon: <Package size={18} color="#f59e0b" />,
  },
  {
    name: 'Amazon India',
    category: 'E-Commerce',
    helpline: '1800 3000 9009',
    website: 'https://amazon.in',
    fraudNote: 'Amazon never offers "Part-Time Review Jobs" on Telegram.',
    icon: <ShoppingBag size={18} color="#10b981" />,
  },
  {
    name: 'National Cyber Crime Portal',
    category: 'Government Emergency',
    helpline: '1930 (Toll-Free 24x7)',
    website: 'https://cybercrime.gov.in',
    fraudNote: 'Direct portal to report financial fraud and freeze stolen funds.',
    icon: <ShieldAlert size={18} color="#ef4444" />,
  },
];

export default function VerifiedDirectoryModal({ onClose }) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [copiedNumber, setCopiedNumber] = useState('');

  const filtered = VERIFIED_ENTITIES.filter((entity) => {
    const matchesQuery =
      entity.name.toLowerCase().includes(query.toLowerCase()) ||
      entity.category.toLowerCase().includes(query.toLowerCase()) ||
      entity.helpline.includes(query);
    const matchesCat = selectedCategory === 'ALL' || entity.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesQuery && matchesCat;
  });

  const handleCopy = (num) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(''), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl text-white relative max-h-[90vh] overflow-y-auto font-sans">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <ShieldCheck size={26} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">Verified Customer Care & Helpline Directory</h2>
            <p className="text-xs text-slate-400">
              Stop calling fake phone numbers found on Google search. Always use these 100% verified official contacts.
            </p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="my-4 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search size={14} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search Bank, Courier, or Helpline (e.g. SBI, HDFC, FedEx, Amazon)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto">
            {['ALL', 'Banking', 'Courier', 'E-Commerce', 'Government'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
                  selectedCategory === cat ? 'bg-emerald-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {filtered.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-950/90 rounded-2xl border border-slate-800/90 flex flex-col justify-between gap-3 shadow-md hover:border-emerald-500/40 transition-all">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <h4 className="text-xs font-black text-white">{item.name}</h4>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-emerald-400">
                    {item.category}
                  </span>
                </div>

                {/* Helpline with Copy */}
                <div className="mt-3 p-2.5 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PhoneCall size={14} className="text-emerald-400" />
                    <span className="text-xs font-black text-white font-mono">{item.helpline}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(item.helpline)}
                    className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                    title="Copy Helpline Number"
                  >
                    {copiedNumber === item.helpline ? <Check size={13} color="#34d399" /> : <Copy size={13} />}
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  <strong className="text-red-400">Safety Tip:</strong> {item.fraudNote}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-[11px]">
                <a
                  href={item.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
                >
                  <Globe size={12} /> {item.website.replace('https://', '')}
                </a>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck size={12} /> Verified by ScamGuard
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
