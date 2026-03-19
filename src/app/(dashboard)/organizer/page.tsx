"use client";

import { motion } from 'framer-motion';
import {
  CalendarRange, Users, TrendingUp, Clock, PlusCircle,
  Eye, Pencil, Trash2, ArrowUpRight, ChevronRight
} from 'lucide-react';
import Link from 'next/link';

const STATS = [
  { label: 'Total Events', value: '12', icon: CalendarRange, delta: '+2 this month', color: 'from-blue-500 to-indigo-500', shadow: 'shadow-blue-500/20' },
  { label: 'Total Registrations', value: '1,248', icon: Users, delta: '+87 this week', color: 'from-purple-500 to-pink-500', shadow: 'shadow-purple-500/20' },
  { label: 'Upcoming Events', value: '5', icon: Clock, delta: '3 within 30 days', color: 'from-amber-500 to-orange-500', shadow: 'shadow-amber-500/20' },
  { label: 'Conversion Rate', value: '74%', icon: TrendingUp, delta: '+6% vs last month', color: 'from-emerald-500 to-teal-500', shadow: 'shadow-emerald-500/20' },
];

const RECENT_REGISTRATIONS = [
  { name: 'Priya Sharma', event: 'Global Tech Conference', date: 'Mar 19, 2026', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100' },
  { name: 'Alex Johnson', event: 'Design Leadership Summit', date: 'Mar 18, 2026', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100' },
  { name: 'Maria Chen', event: 'Future of AI Workshop', date: 'Mar 17, 2026', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100' },
  { name: 'Sam Williams', event: 'Global Tech Conference', date: 'Mar 17, 2026', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100' },
  { name: 'Rahul Nair', event: 'Indie Music Festival', date: 'Mar 16, 2026', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100' },
];

const QUICK_EVENTS = [
  { title: 'Global Tech Conference 2026', status: 'Published', registrations: 455, total: 500, date: 'Oct 24' },
  { title: 'Design Leadership Summit', status: 'Published', registrations: 138, total: 150, date: 'Nov 12' },
  { title: 'Future of AI Workshop', status: 'Draft', registrations: 0, total: 200, date: 'Dec 05' },
];

const statusColor: Record<string, string> = {
  Published: 'bg-emerald-500/20 text-emerald-400',
  Draft: 'bg-amber-500/20 text-amber-400',
  Past: 'bg-neutral-500/20 text-neutral-400',
};

export default function OrganizerDashboard() {
  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } } };

  return (
    <div className="w-full pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-1">Organizer Dashboard</h1>
          <p className="text-neutral-400 text-sm">Welcome back, Alex. Here's what's happening.</p>
        </div>
        <Link href="/organizer/events/create">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-2xl shadow-lg shadow-blue-600/30 transition-all"
          >
            <PlusCircle className="w-5 h-5" />
            Create Event
          </motion.button>
        </Link>
      </div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10"
      >
        {STATS.map((stat) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className={`relative p-6 bg-[#0f1526] rounded-2xl border border-white/5 overflow-hidden shadow-xl ${stat.shadow}`}
          >
            {/* Glowing background orb */}
            <div className={`absolute -bottom-6 -right-6 w-28 h-28 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-2xl`} />

            <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-md`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-3xl font-bold text-white tracking-tight mb-1">{stat.value}</p>
            <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider mb-2">{stat.label}</p>
            <div className="flex items-center gap-1 text-xs text-emerald-400">
              <ArrowUpRight className="w-3 h-3" />
              {stat.delta}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Grid: Recent Registrations + Quick Events */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Recent Registrations Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-3 bg-[#0f1526] rounded-2xl border border-white/5 overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <h2 className="text-base font-bold text-white">Recent Registrations</h2>
            <Link href="/organizer/registrations" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {RECENT_REGISTRATIONS.map((reg) => (
              <div key={reg.name} className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition-colors">
                <img src={reg.avatar} alt={reg.name} className="w-9 h-9 rounded-full object-cover border border-white/10 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{reg.name}</p>
                  <p className="text-xs text-neutral-500 truncate">{reg.event}</p>
                </div>
                <span className="text-xs text-neutral-500 flex-shrink-0">{reg.date}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions + My Events Mini-list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-[#0f1526] rounded-2xl border border-white/5 overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <h2 className="text-base font-bold text-white">My Events</h2>
            <Link href="/organizer/events" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {QUICK_EVENTS.map((ev) => (
              <div key={ev.title} className="p-5 hover:bg-white/5 transition-colors">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-sm font-medium text-white line-clamp-1">{ev.title}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{ev.date}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${statusColor[ev.status]}`}>
                    {ev.status}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-neutral-500 mb-1">
                    <span>{ev.registrations} registered</span>
                    <span>{ev.total} seats</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: `${(ev.registrations / ev.total) * 100}%` }} />
                  </div>
                </div>
                {/* Action icons */}
                <div className="flex items-center gap-2">
                  <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-400/10 text-neutral-400 hover:text-rose-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
