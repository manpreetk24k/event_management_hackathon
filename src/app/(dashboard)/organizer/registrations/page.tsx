"use client";

import { motion } from 'framer-motion';
import { Download, Users, Search } from 'lucide-react';
import { useState } from 'react';

const ATTENDEES = [
  { name: 'Priya Sharma',    email: 'priya@example.com',  date: 'Mar 19, 2026', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100' },
  { name: 'Alex Johnson',    email: 'alex@example.com',   date: 'Mar 18, 2026', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100' },
  { name: 'Maria Chen',      email: 'maria@example.com',  date: 'Mar 17, 2026', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100' },
  { name: 'Sam Williams',    email: 'sam@example.com',    date: 'Mar 16, 2026', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100' },
  { name: 'Rahul Nair',      email: 'rahul@example.com',  date: 'Mar 15, 2026', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100' },
];

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const itemVariants = { hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 280 } } };

export default function EventRegistrationsViewPage() {
  const [search, setSearch] = useState('');
  const filtered = ATTENDEES.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-1">Event Registrations</h1>
          <p className="text-neutral-400 text-sm">Global Tech Conference 2026</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-2xl transition-all"
        >
          <Download className="w-4 h-4" /> Export CSV
        </motion.button>
      </div>

      {/* Real-time Count Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 p-5 bg-[#0f1526] rounded-2xl border border-white/5 mb-6"
      >
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">455 <span className="text-base font-normal text-neutral-500">/ 500 registered</span></p>
          <p className="text-xs text-emerald-400 font-medium mt-0.5">● Live count</p>
        </div>
        <div className="ml-auto flex-1 max-w-xs hidden sm:block">
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: '91%' }} transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
          </div>
          <p className="text-xs text-neutral-500 mt-1 text-right">91% filled</p>
        </div>
      </motion.div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
        <input type="text" placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" />
      </div>

      {/* Table */}
      <div className="bg-[#0f1526] rounded-2xl border border-white/5 overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-4 px-6 py-4 border-b border-white/5 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          <span>#</span>
          <span>Attendee</span>
          <span className="hidden sm:block">Email</span>
          <span>Registered On</span>
        </div>
        <motion.div variants={containerVariants} initial="hidden" animate="show">
          {filtered.map((att, i) => (
            <motion.div key={att.email} variants={itemVariants}
              className="grid grid-cols-[auto_1fr_1fr_1fr] gap-4 px-6 py-4 items-center border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors"
            >
              <span className="text-sm text-neutral-600 font-mono w-6">{String(i + 1).padStart(2, '0')}</span>
              <div className="flex items-center gap-3 min-w-0">
                <img src={att.avatar} alt={att.name} className="w-8 h-8 rounded-full object-cover border border-white/10 flex-shrink-0" />
                <span className="text-sm font-medium text-white truncate">{att.name}</span>
              </div>
              <span className="hidden sm:block text-sm text-neutral-400 truncate">{att.email}</span>
              <span className="text-sm text-neutral-400">{att.date}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
