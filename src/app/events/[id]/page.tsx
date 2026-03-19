"use client";

import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Users, ChevronLeft, Share2, Heart, CheckCircle2, Wifi } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const EVENT = {
  id: 'e1',
  title: 'Global Tech Conference 2026',
  organizer: 'TechWorld Inc.',
  organizerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop',
  date: 'October 24, 2026',
  time: '09:00 AM – 06:00 PM',
  location: 'Moscone Center, San Francisco, CA',
  category: 'Technology',
  price: '$299',
  totalSeats: 500,
  registeredCount: 455,
  image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
  description: `Join the world's leading tech innovators, product leaders, and startup founders for an electrifying two-day conference packed with keynotes, hands-on workshops, product reveals, and unparalleled networking opportunities.\n\nWhether you're a seasoned engineer, a first-time founder, or an investor looking for the next big thing, the Global Tech Conference 2026 is where the future gets built.`,
  highlights: ['20+ World-class speakers', 'Live product demos & launches', 'Networking dinner & afterparty', 'Workshop tracks: AI, Cloud, Web3']
};

export default function EventDetailPage() {
  const [registered, setRegistered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const seatsLeft = EVENT.totalSeats - EVENT.registeredCount;
  const fillPercent = (EVENT.registeredCount / EVENT.totalSeats) * 100;

  return (
    <div className="max-w-6xl mx-auto pb-16">
      {/* Back Navigation */}
      <Link
        href="/events"
        className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors mb-8 group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Events
      </Link>

      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-72 md:h-96 rounded-3xl overflow-hidden mb-10"
      >
        <img src={EVENT.image} alt={EVENT.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-black/20 to-transparent" />

        {/* Badges */}
        <div className="absolute top-5 left-5 flex gap-3">
          <span className="px-3 py-1 bg-blue-600 rounded-full text-xs font-bold text-white shadow-lg">{EVENT.category}</span>
          {seatsLeft < 50 && (
            <span className="px-3 py-1 bg-rose-600 rounded-full text-xs font-bold text-white shadow-lg animate-pulse">Almost Full!</span>
          )}
        </div>

        {/* Actions */}
        <div className="absolute top-5 right-5 flex gap-2">
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`p-2.5 rounded-full backdrop-blur-md border transition-all ${isSaved ? 'bg-rose-500/80 border-rose-400' : 'bg-black/40 border-white/20 hover:bg-white/10'}`}
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-white text-white' : 'text-white'}`} />
          </button>
          <button className="p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:bg-white/10 transition-all">
            <Share2 className="w-5 h-5 text-white" />
          </button>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column — Event Details */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="lg:col-span-2 space-y-8"
        >
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white leading-tight mb-4">{EVENT.title}</h1>
            <div className="flex items-center gap-3">
              <img src={EVENT.organizerAvatar} alt={EVENT.organizer} className="w-8 h-8 rounded-full object-cover border border-white/20" />
              <span className="text-sm text-neutral-400">Organized by <span className="text-white font-medium">{EVENT.organizer}</span></span>
            </div>
          </div>

          {/* Info Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Calendar, label: 'Date', value: EVENT.date, color: 'text-blue-400' },
              { icon: Clock, label: 'Time', value: EVENT.time, color: 'text-purple-400' },
              { icon: MapPin, label: 'Location', value: EVENT.location, color: 'text-rose-400' },
              { icon: Wifi, label: 'Format', value: 'In-Person', color: 'text-emerald-400' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className={`w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center flex-shrink-0 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-white">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">About this Event</h2>
            <div className="text-sm text-neutral-400 leading-7 whitespace-pre-line">{EVENT.description}</div>
          </div>

          {/* Highlights */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">What&#39;s Included</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EVENT.highlights.map(h => (
                <div key={h} className="flex items-center gap-3 text-sm text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  {h}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column — Registration Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="lg:col-span-1"
        >
          <div className="sticky top-28 p-6 bg-[#0f1526] rounded-3xl border border-white/10 shadow-[0_8px_40px_-12px_rgba(59,130,246,0.2)]">
            <div className="text-3xl font-bold text-white mb-1">{EVENT.price}</div>
            <p className="text-xs text-neutral-500 uppercase tracking-wider mb-6">Per person</p>

            {/* Real-time seat count */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="text-white font-medium">{EVENT.registeredCount}</span>
                  <span className="text-neutral-500">/ {EVENT.totalSeats} registered</span>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${seatsLeft < 50 ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                  {seatsLeft} left
                </span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${fillPercent}%` }}
                  transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                />
              </div>
            </div>

            {/* Register Button */}
            {registered ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full py-4 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center justify-center gap-2 text-emerald-400 font-semibold"
              >
                <CheckCircle2 className="w-5 h-5" />
                You&#39;re Registered!
              </motion.div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setRegistered(true)}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/30 text-base"
              >
                Register Now
              </motion.button>
            )}

            {/* Add to Calendar */}
            <button className="w-full mt-3 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 rounded-2xl transition-all text-sm font-medium">
              Add to Calendar
            </button>

            <p className="text-xs text-neutral-600 text-center mt-4">Free cancellation up to 48 hrs before event</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
