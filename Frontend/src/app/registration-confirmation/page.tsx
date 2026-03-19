"use client";

import { motion } from 'framer-motion';
import { CheckCircle2, CalendarPlus, ListOrdered, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function RegistrationConfirmationPage() {
  const event = {
    title: 'Global Tech Conference 2026',
    date: 'October 24, 2026',
    time: '09:00 AM – 06:00 PM',
    location: 'Moscone Center, San Francisco, CA',
    price: '$299',
    confirmationId: 'EVT-2026-00487',
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
        className="w-full max-w-lg p-8 bg-[#0f1526] rounded-3xl border border-white/5 shadow-2xl text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/30 to-teal-500/30 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        </motion.div>

        <h1 className="text-3xl font-bold text-white mb-2">You're Registered! 🎉</h1>
        <p className="text-neutral-400 text-sm mb-8">
          Your spot has been confirmed. See you there!
        </p>

        {/* Event Summary */}
        <div className="text-left bg-white/5 rounded-2xl p-6 border border-white/5 mb-8 space-y-3">
          <h2 className="text-sm font-bold text-neutral-300 uppercase tracking-wider mb-4">Event Summary</h2>
          {[
            { label: 'Event', value: event.title },
            { label: 'Date', value: event.date },
            { label: 'Time', value: event.time },
            { label: 'Location', value: event.location },
            { label: 'Ticket', value: event.price },
            { label: 'Confirmation ID', value: event.confirmationId },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-start gap-4">
              <span className="text-xs text-neutral-500 uppercase tracking-wide flex-shrink-0">{label}</span>
              <span className="text-sm text-white text-right">{value}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 font-semibold rounded-2xl transition-all text-sm">
            <CalendarPlus className="w-4 h-4" /> Add to Calendar
          </button>
          <Link href="/registrations" className="flex-1">
            <button className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/30 transition-all text-sm">
              <ListOrdered className="w-4 h-4" /> View My Events <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
