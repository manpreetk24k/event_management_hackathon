"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Clock, Filter, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Mock Events Data
const MOCK_EVENTS = [
  {
    id: 'e1',
    title: 'Global Tech Conference 2026',
    date: 'Oct 24, 2026',
    time: '09:00 AM',
    location: 'San Francisco, CA',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop',
    seatsRemaining: 45,
    totalSeats: 500,
    price: '$299'
  },
  {
    id: 'e2',
    title: 'Design Leadership Summit',
    date: 'Nov 12, 2026',
    time: '10:00 AM',
    location: 'New York, NY',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=800&auto=format&fit=crop',
    seatsRemaining: 12,
    totalSeats: 150,
    price: 'Free'
  },
  {
    id: 'e3',
    title: 'Future of AI Workshop',
    date: 'Dec 05, 2026',
    time: '13:00 PM',
    location: 'Virtual / Online',
    category: 'Workshop',
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=800&auto=format&fit=crop',
    seatsRemaining: 80,
    totalSeats: 200,
    price: '$49'
  },
  {
    id: 'e4',
    title: 'Indie Music Festival',
    date: 'Dec 18, 2026',
    time: '16:00 PM',
    location: 'Austin, TX',
    category: 'Music',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800&auto=format&fit=crop',
    seatsRemaining: 2,
    totalSeats: 1000,
    price: '$120'
  }
];

const CATEGORIES = ['All', 'Technology', 'Design', 'Music', 'Workshop'];

export default function EventListingPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Container variants for stagger animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="w-full pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Discover Events</h1>
          <p className="text-neutral-400">Explore and register for upcoming events around the world.</p>
        </div>
        
        {/* Mobile Search - Visible only on small screens */}
        <div className="relative lg:hidden w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input 
            type="text" 
            placeholder="Search events..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
        <div className="flex bg-white/5 p-1 rounded-xl overflow-x-auto w-full sm:w-auto no-scrollbar border border-white/5">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === category 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <button className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 rounded-xl transition-colors text-sm font-medium">
          <Filter className="w-4 h-4" />
          More Filters
        </button>
      </div>

      {/* Events Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {MOCK_EVENTS.map((event) => (
          <motion.div 
            key={event.id}
            variants={itemVariants}
            className="group relative flex flex-col bg-[#0f1526] rounded-2xl border border-white/5 overflow-hidden hover:border-blue-500/30 hover:shadow-[0_8px_32px_-8px_rgba(59,130,246,0.3)] transition-all duration-300"
          >
            {/* Image Banner */}
            <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1526] via-transparent to-transparent z-10" />
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                <span className="text-xs font-semibold text-white tracking-wide">{event.category}</span>
              </div>
              
              {/* Price Badge */}
              <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-blue-600 rounded-full shadow-lg">
                <span className="text-xs font-bold text-white tracking-wide">{event.price}</span>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">
                {event.title}
              </h3>
              
              <div className="space-y-2 mb-6 text-sm text-neutral-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span>{event.date}</span>
                  <span className="mx-1">•</span>
                  <Clock className="w-4 h-4 text-neutral-500" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-400" />
                  <span className="truncate">{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>{event.seatsRemaining} seats left</span>
                  <span className="text-xs text-neutral-600">/ {event.totalSeats}</span>
                </div>
              </div>

              {/* Progress Bar for seats */}
              <div className="mt-auto mb-5">
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${event.seatsRemaining < 20 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                    style={{ width: `${(event.seatsRemaining / event.totalSeats) * 100}%` }}
                  />
                </div>
                {event.seatsRemaining < 20 && (
                  <span className="text-[10px] text-rose-400 font-medium uppercase mt-2 block tracking-wider">Fast filling!</span>
                )}
              </div>

              {/* CTA Button */}
              <Link href={`/events/${event.id}`} className="w-full block">
                <button className="w-full py-2.5 bg-white/5 hover:bg-blue-600 text-white font-medium rounded-xl border border-white/10 hover:border-transparent transition-all flex items-center justify-center gap-2 group/btn">
                  View Details
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination (Mock) */}
      <div className="flex justify-center mt-12 gap-2">
        <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-600 text-white font-medium shadow-lg">1</button>
        <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-white transition-colors">2</button>
        <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-white transition-colors">3</button>
        <div className="w-10 h-10 flex items-center justify-center text-neutral-500">...</div>
      </div>
    </div>
  );
}
