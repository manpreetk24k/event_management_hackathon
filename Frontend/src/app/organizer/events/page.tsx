"use client";

import { motion } from 'framer-motion';
import { PlusCircle, Eye, Pencil, Trash2, Search, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const EVENTS = [
  { id: 'e1', title: 'Global Tech Conference 2026', category: 'Technology', date: 'Oct 24, 2026', registrations: 455, totalSeats: 500, status: 'Published' },
  { id: 'e2', title: 'Design Leadership Summit', category: 'Design', date: 'Nov 12, 2026', registrations: 138, totalSeats: 150, status: 'Published' },
  { id: 'e3', title: 'Future of AI Workshop', category: 'Workshop', date: 'Dec 05, 2026', registrations: 0, totalSeats: 200, status: 'Draft' },
  { id: 'e4', title: 'Indie Music Festival', category: 'Music', date: 'Dec 18, 2026', registrations: 980, totalSeats: 1000, status: 'Published' },
  { id: 'e5', title: 'Cloud & DevOps Bootcamp', category: 'Technology', date: 'Jan 10, 2027', registrations: 0, totalSeats: 120, status: 'Draft' },
  { id: 'e6', title: 'UX Research Workshop', category: 'Design', date: 'Feb 5, 2027', registrations: 72, totalSeats: 80, status: 'Past' },
];

const statusStyle: Record<string, string> = {
  Published: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20',
  Draft:     'bg-amber-500/20  text-amber-400  border-amber-500/20',
  Past:      'bg-neutral-500/20 text-neutral-400 border-neutral-500/20',
};

export default function MyEventsPage() {
  const [search, setSearch] = useState('');

  const filtered = EVENTS.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.category.toLowerCase().includes(search.toLowerCase())
  );

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const itemVariants = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="w-full pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-1">My Events</h1>
          <p className="text-neutral-400 text-sm">Manage all events you have created.</p>
        </div>
        <Link href="/organizer/events/create">
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-2xl shadow-lg shadow-blue-600/30"
          >
            <PlusCircle className="w-5 h-5" /> Create Event
          </motion.button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
        <input
          type="text"
          placeholder="Search by event name or category..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
        />
      </div>

      {/* Table */}
      <div className="bg-[#0f1526] rounded-2xl border border-white/5 overflow-hidden">
        {/* Table Head */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-6 py-4 border-b border-white/5 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          <span>Event</span>
          <span className="hidden sm:block">Date</span>
          <span className="hidden md:block">Registrations</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        <motion.div variants={containerVariants} initial="hidden" animate="show">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-neutral-500">No events found</div>
          ) : (
            filtered.map(ev => (
              <motion.div
                key={ev.id}
                variants={itemVariants}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-6 py-5 items-center border-b border-white/5 hover:bg-white/[0.03] transition-colors last:border-b-0 group"
              >
                {/* Title + Category */}
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1">{ev.title}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">{ev.category}</p>
                </div>

                {/* Date */}
                <span className="hidden sm:block text-sm text-neutral-400">{ev.date}</span>

                {/* Registrations + mini progress */}
                <div className="hidden md:block">
                  <p className="text-sm text-white mb-1">{ev.registrations} <span className="text-neutral-500">/ {ev.totalSeats}</span></p>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      style={{ width: `${(ev.registrations / ev.totalSeats) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Status badge */}
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border w-fit ${statusStyle[ev.status]}`}>
                  {ev.status}
                </span>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link href={`/events/${ev.id}`}>
                    <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors" title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                  </Link>
                  <Link href={`/organizer/events/${ev.id}/edit`}>
                    <button className="p-2 rounded-xl bg-white/5 hover:bg-blue-500/20 text-neutral-400 hover:text-blue-400 transition-colors" title="Edit">
                      <Pencil className="w-4 h-4" />
                    </button>
                  </Link>
                  <button className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>

      {/* Registrations link */}
      <div className="mt-6 flex justify-end">
        <Link href="/organizer" className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors gap-1">
          Back to Dashboard <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
