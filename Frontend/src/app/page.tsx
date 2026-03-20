"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, CalendarRange, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'organizer' | 'attendee'>('attendee');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'organizer') {
      router.push('/organizer');
    } else {
      router.push('/events');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative bg-[#0a0f1d] overflow-hidden text-neutral-100 font-sans">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2670&auto=format&fit=crop')" }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900/60 via-purple-900/40 to-[#0a0f1d]/90" />
      
      {/* Animated glowing orbs for extra premium dynamic design */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] z-0"
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] z-0"
      />

      {/* Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[420px] p-8 sm:p-10 mx-4 rounded-[2rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-14 h-14 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-500/30"
          >
            <CalendarRange className="w-7 h-7 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            EventHub
          </h1>
          <p className="text-sm text-neutral-400">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Role Toggle */}
        <div className="flex p-1 bg-black/40 rounded-xl mb-8 backdrop-blur-sm border border-white/5">
          <button
            onClick={() => setRole('attendee')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
              role === 'attendee' 
                ? 'bg-white/10 text-white shadow-sm' 
                : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5'
            }`}
          >
            Attendee
          </button>
          <button
            onClick={() => setRole('organizer')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
              role === 'organizer' 
                ? 'bg-white/10 text-white shadow-sm' 
                : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5'
            }`}
          >
            Organizer
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300 pl-1 uppercase tracking-wider">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-blue-400 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <input 
                type="email" 
                placeholder="hello@example.com"
                required
                className="w-full bg-black/30 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center pl-1 pr-1">
              <label className="text-xs font-medium text-neutral-300 uppercase tracking-wider">Password</label>
              <Link href="/forgot-password" className="text-xs text-blue-400 hover:text-blue-300 focus:outline-none transition-colors">
                Forgot?
              </Link>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-blue-400 transition-colors">
                <Lock className="w-5 h-5" />
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                required
                className="w-full bg-black/30 border border-white/10 rounded-xl py-3.5 pl-11 pr-12 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-500 hover:text-neutral-300 focus:outline-none transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-2">
            <button 
              type="submit"
              className="w-full relative flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl py-3.5 transition-all shadow-lg shadow-blue-600/20 group"
            >
              Sign In
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-neutral-400">
            Don't have an account?{' '}
            <Link href="/register" className="font-semibold text-white hover:text-blue-400 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
