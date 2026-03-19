"use client";

import { motion } from 'framer-motion';
import { User, Mail, Lock, Camera, Save } from 'lucide-react';
import { useState } from 'react';

export default function UserProfilePage() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatarPreview(URL.createObjectURL(file));
  };

  return (
    <div className="w-full max-w-2xl mx-auto pb-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-1">My Profile</h1>
        <p className="text-neutral-400 text-sm">Manage your account details and password.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#0f1526] rounded-3xl border border-white/5 p-8 space-y-8"
      >
        {/* Avatar */}
        <div className="flex items-center gap-6">
          <div className="relative group flex-shrink-0">
            <label htmlFor="avatar-upload" className="cursor-pointer block">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/10">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100"
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-blue-600 rounded-full border-2 border-[#0f1526] flex items-center justify-center">
                <Camera className="w-3.5 h-3.5 text-white" />
              </div>
            </label>
            <input id="avatar-upload" type="file" accept="image/*" className="sr-only" onChange={handleAvatarChange} />
          </div>
          <div>
            <p className="text-white font-semibold text-lg">Alex Mitchell</p>
            <p className="text-neutral-500 text-sm">Attendee · Member since 2024</p>
          </div>
        </div>

        <div className="h-px bg-white/5" />

        {/* Profile Form */}
        <form className="space-y-5" onSubmit={e => e.preventDefault()}>
          <h2 className="text-sm font-bold text-neutral-300 uppercase tracking-wider">Personal Information</h2>

          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-blue-400 transition-colors" />
              <input type="text" defaultValue="Alex Mitchell"
                className="w-full bg-black/30 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-blue-400 transition-colors" />
              <input type="email" defaultValue="alex@example.com"
                className="w-full bg-black/30 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg shadow-blue-600/20 transition-all"
          >
            <Save className="w-4 h-4" /> Save Changes
          </motion.button>
        </form>

        <div className="h-px bg-white/5" />

        {/* Password Change Form */}
        <form className="space-y-5" onSubmit={e => e.preventDefault()}>
          <h2 className="text-sm font-bold text-neutral-300 uppercase tracking-wider">Change Password</h2>
          {(['Current Password', 'New Password', 'Confirm New Password'] as const).map(label => (
            <div key={label} className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">{label}</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-blue-400 transition-colors" />
                <input type="password" placeholder="••••••••"
                  className="w-full bg-black/30 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" />
              </div>
            </div>
          ))}
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 font-semibold rounded-2xl transition-all"
          >
            <Lock className="w-4 h-4" /> Update Password
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
