"use client";

import { motion } from 'framer-motion';
import { CalendarRange, Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative bg-[#0a0f1d] overflow-hidden text-neutral-100 font-sans p-6">
      {/* Background orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] z-0"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
        className="relative z-10 text-center max-w-md"
      >
        {/* Logo */}
        <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-blue-500/30">
          <CalendarRange className="w-8 h-8 text-white" />
        </div>

        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          className="text-8xl font-black bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-400 leading-none mb-4"
        >
          404
        </motion.div>

        <h1 className="text-2xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-neutral-400 text-sm leading-relaxed mb-10">
          Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <Link href="/events">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/30 transition-all"
          >
            <Home className="w-4 h-4" />
            Go Back Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
