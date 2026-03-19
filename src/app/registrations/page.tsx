"use client";

import { motion } from 'framer-motion';
import { Calendar, MapPin, XCircle, Clock } from 'lucide-react';
import Link from 'next/link';

const MY_REGISTRATIONS = [
  { id: 'e1', title: 'Global Tech Conference 2026', date: 'Oct 24, 2026', time: '09:00 AM', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=400', status: 'Upcoming' },
  { id: 'e2', title: 'Design Leadership Summit', date: 'Nov 12, 2026', time: '10:00 AM', location: 'New York, NY', image: 'https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=400', status: 'Upcoming' },
  { id: 'e6', title: 'UX Research Workshop', date: 'Feb 5, 2026', time: '09:00 AM', location: 'Chicago, IL', image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=400', status: 'Past' },
];

const statusStyle: Record<string, string> = {
  Upcoming:  'bg-blue-500/20 text-blue-400 border-blue-500/20',
  Past:      'bg-neutral-500/20 text-neutral-400 border-neutral-500/10',
  Cancelled: 'bg-rose-500/20 text-rose-400 border-rose-500/20',
};

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 22 } } };

export default function MyRegistrationsPage() {
  return (
    <div className="w-full pb-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-1">My Registrations</h1>
        <p className="text-neutral-400 text-sm">All events you have registered for.</p>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
        {MY_REGISTRATIONS.map(ev => (
          <motion.div
            key={ev.id}
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 bg-[#0f1526] rounded-2xl border border-white/5 hover:border-blue-500/20 group transition-all"
          >
            {/* Thumbnail */}
            <div className="w-full sm:w-28 h-28 rounded-xl overflow-hidden flex-shrink-0">
              <img src={ev.image} alt={ev.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${statusStyle[ev.status]}`}>{ev.status}</span>
              </div>
              <h3 className="text-base font-bold text-white line-clamp-1 mb-2 group-hover:text-blue-400 transition-colors">{ev.title}</h3>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-400">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-blue-400" />{ev.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-purple-400" />{ev.time}</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-rose-400" />{ev.location}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex sm:flex-col gap-2 flex-shrink-0 sm:items-end">
              <Link href={`/events/${ev.id}`}>
                <button className="px-4 py-2 text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 rounded-xl transition-all">
                  View Event
                </button>
              </Link>
              {ev.status === 'Upcoming' && (
                <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 rounded-xl transition-all">
                  <XCircle className="w-3.5 h-3.5" /> Cancel
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
