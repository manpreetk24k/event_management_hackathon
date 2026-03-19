"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Search, User, LogOut, Settings, CalendarRange, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Events', path: '/events' },
    { name: 'My Registrations', path: '/registrations' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0a0f1d]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Navigation */}
          <div className="flex items-center gap-10">
            <Link href="/events" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <CalendarRange className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">EventHub</span>
            </Link>

            <div className="hidden md:flex space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link 
                    key={link.name} 
                    href={link.path}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? 'text-white' : 'text-neutral-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div 
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Search Icon (Mobile) or Search Bar */}
            <div className="hidden lg:flex relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-blue-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Search events..." 
                className="w-64 bg-black/40 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>

            {/* Notification Bell */}
            <button className="relative p-2 text-neutral-400 hover:text-white transition-colors rounded-full hover:bg-white/5">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-[#0a0f1d]" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-1 pr-2 rounded-full border border-white/10 hover:bg-white/5 transition-all focus:outline-none"
              >
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" 
                  alt="User avatar" 
                  className="w-8 h-8 rounded-full object-cover border border-white/20"
                />
                <span className="text-sm font-medium text-white hidden sm:block">Alex M.</span>
                <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-56 bg-[#0f1526] border border-white/10 rounded-2xl shadow-2xl py-2 z-50"
                  >
                    <div className="px-4 py-3 border-b border-white/5 mb-1">
                      <p className="text-sm font-medium text-white">Alex Mitchell</p>
                      <p className="text-xs text-neutral-500 truncate">alex@example.com</p>
                    </div>
                    <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors">
                      <User className="w-4 h-4 mr-3 text-neutral-400" />
                      My Profile
                    </Link>
                    <Link href="/settings" className="flex items-center px-4 py-2 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors">
                      <Settings className="w-4 h-4 mr-3 text-neutral-400" />
                      Settings
                    </Link>
                    <div className="h-px bg-white/5 my-1 mx-2"></div>
                    <Link href="/" className="flex items-center px-4 py-2 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-400/10 transition-colors">
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign out
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
