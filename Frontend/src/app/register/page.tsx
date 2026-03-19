"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, CalendarRange, ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState<'attendee' | 'organizer'>('attendee');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Registering as ${role}...`);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative bg-[#0a0f1d] overflow-hidden text-neutral-100 font-sans py-12">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2670&auto=format&fit=crop')" }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900/60 via-purple-900/40 to-[#0a0f1d]/90" />
      
      {/* Animated glowing orbs */}
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

      {/* Register Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[480px] p-8 sm:p-10 mx-4 rounded-[2rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] my-8"
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
            Join EventHub
          </h1>
          <p className="text-sm text-neutral-400">
            Create an account to start your journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300 pl-1 uppercase tracking-wider">Full Name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-blue-400 transition-colors">
                <User className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                placeholder="John Doe"
                required
                className="w-full bg-black/30 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
              />
            </div>
          </div>

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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300 pl-1 uppercase tracking-wider">Password</label>
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
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300 pl-1 uppercase tracking-wider">Confirm Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-blue-400 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  required
                  className="w-full bg-black/30 border border-white/10 rounded-xl py-3.5 pl-11 pr-12 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-500 hover:text-neutral-300 focus:outline-none transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Role Dropdown */}
          <div className="space-y-1.5 relative">
            <label className="text-xs font-medium text-neutral-300 pl-1 uppercase tracking-wider">I am joining as an</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between text-left bg-black/30 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              >
                <span className="capitalize">{role}</span>
                <ChevronDown className={`w-5 h-5 text-neutral-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute mt-2 w-full bg-[#111827] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-20">
                  <button
                    type="button"
                    onClick={() => { setRole('attendee'); setIsDropdownOpen(false); }}
                    className="w-full text-left px-4 py-3 text-white hover:bg-white/5 transition-colors"
                  >
                    Attendee <span className="text-neutral-500 text-sm ml-2">(Browse & Register for Events)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setRole('organizer'); setIsDropdownOpen(false); }}
                    className="w-full text-left px-4 py-3 text-white hover:bg-white/5 transition-colors border-t border-white/5"
                  >
                    Organizer <span className="text-neutral-500 text-sm ml-2">(Create & Manage Events)</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-4">
            <button 
              type="submit"
              className="w-full relative flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl py-3.5 transition-all shadow-lg shadow-blue-600/20 group"
            >
              Create Account
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-neutral-400">
            Already have an account?{' '}
            <Link href="/" className="font-semibold text-white hover:text-blue-400 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
