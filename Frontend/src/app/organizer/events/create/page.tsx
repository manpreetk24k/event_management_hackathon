"use client";

import { motion } from 'framer-motion';
import { Image as ImageIcon, ChevronLeft, Save, Send, Calendar, Clock, MapPin, Users, Tag, FileText } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const CATEGORIES = ['Technology', 'Design', 'Music', 'Workshop', 'Business', 'Health', 'Sports', 'Education'];

export default function CreateEventPage() {
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCoverPreview(URL.createObjectURL(file));
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <Link href="/organizer/events" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors border border-white/5">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">Create Event</h1>
          <p className="text-neutral-400 text-sm">Fill in the details to publish a new event.</p>
        </div>
      </div>

      {/* Glassmorphic form card */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#0f1526] rounded-3xl border border-white/5 p-8 space-y-8"
        onSubmit={e => { e.preventDefault(); console.log('Event submitted'); }}
      >

        {/* Cover Image Upload */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Cover Image</label>
          <label
            htmlFor="cover-upload"
            className="relative flex items-center justify-center w-full h-52 rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-blue-500/50 transition-all cursor-pointer overflow-hidden group"
          >
            {coverPreview ? (
              <>
                <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover absolute inset-0" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-medium text-sm">Change Image</span>
                </div>
              </>
            ) : (
              <div className="text-center">
                <ImageIcon className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
                <p className="text-sm text-neutral-500">Click to upload a cover image</p>
                <p className="text-xs text-neutral-600 mt-1">PNG, JPG, WEBP up to 5MB</p>
              </div>
            )}
            <input id="cover-upload" type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
          </label>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" /> Event Title
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Global Tech Conference 2026"
            className="w-full bg-black/30 border border-white/10 rounded-xl py-3.5 px-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
        </div>

        {/* Description (Rich Text Placeholder) */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" /> Description
          </label>
          {/* Toolbar */}
          <div className="flex items-center gap-2 px-3 py-2 bg-black/30 border border-white/10 border-b-0 rounded-t-xl">
            {['B', 'I', 'U'].map(f => (
              <button key={f} type="button" className={`w-7 h-7 text-sm font-${f === 'B' ? 'bold' : f === 'I' ? 'italic underline' : 'normal'} text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors`}>{f}</button>
            ))}
            <div className="w-px h-4 bg-white/10 mx-1" />
            {['H1', 'H2', '—'].map(f => (
              <button key={f} type="button" className="px-2 h-7 text-xs text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">{f}</button>
            ))}
          </div>
          <textarea
            rows={5}
            required
            placeholder="Describe your event. What will attendees experience?"
            className="w-full bg-black/30 border border-white/10 rounded-b-xl pt-3 pb-3 px-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none leading-relaxed"
          />
        </div>

        {/* Date & Time Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" /> Start Date & Time
            </label>
            <input
              type="datetime-local"
              required
              className="w-full bg-black/30 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all [color-scheme:dark]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" /> End Date & Time
            </label>
            <input
              type="datetime-local"
              required
              className="w-full bg-black/30 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all [color-scheme:dark]"
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5" /> Location
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Moscone Center, San Francisco or Virtual"
            className="w-full bg-black/30 border border-white/10 rounded-xl py-3.5 px-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
        </div>

        {/* Category & Max Attendees Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
              <Tag className="w-3.5 h-3.5" /> Category
            </label>
            <select
              required
              className="w-full bg-black/30 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none [color-scheme:dark]"
            >
              <option value="" disabled selected>Select a category</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-3.5 h-3.5" /> Max Attendees
            </label>
            <input
              type="number"
              min="1"
              required
              placeholder="e.g. 500"
              className="w-full bg-black/30 border border-white/10 rounded-xl py-3.5 px-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5" />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 font-semibold rounded-2xl transition-all"
          >
            <Save className="w-4 h-4" /> Save as Draft
          </motion.button>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/30 transition-all"
          >
            <Send className="w-4 h-4" /> Publish Event
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}
