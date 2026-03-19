"use client";

import { motion } from 'framer-motion';
import { Bell, CheckCheck } from 'lucide-react';
import { useState } from 'react';

const NOTIFICATIONS = [
  { id: 1, title: 'Registration Confirmed!', message: 'You are now registered for Global Tech Conference 2026.', time: '2 min ago', read: false, type: 'success' },
  { id: 2, title: 'Event Reminder', message: 'Design Leadership Summit starts in 3 days. Don\'t forget to prepare!', time: '1 hr ago', read: false, type: 'reminder' },
  { id: 3, title: 'Deadline Alert', message: 'Registration for Future of AI Workshop closes in 24 hours.', time: '5 hr ago', read: false, type: 'alert' },
  { id: 4, title: 'Event Updated', message: 'The venue for Indie Music Festival has been updated. Check the new location.', time: '2 days ago', read: true, type: 'info' },
  { id: 5, title: 'New Event Near You', message: 'A new Tech Workshop has been published in San Francisco!', time: '3 days ago', read: true, type: 'info' },
];

const typeStyle: Record<string, string> = {
  success: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400',
  reminder: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
  alert: 'bg-amber-500/20 border-amber-500/30 text-amber-400',
  info: 'bg-purple-500/20 border-purple-500/30 text-purple-400',
};

const typeDot: Record<string, string> = {
  success: 'bg-emerald-400',
  reminder: 'bg-blue-400',
  alert: 'bg-amber-400',
  info: 'bg-purple-400',
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const markAllRead = () => setNotifications(n => n.map(notif => ({ ...notif, read: true })));
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="w-full max-w-2xl mx-auto pb-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-1">Notifications</h1>
          {unreadCount > 0 && <p className="text-sm text-neutral-400">{unreadCount} unread notification{unreadCount > 1 ? 's' : ''}</p>}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            <CheckCheck className="w-4 h-4" /> Mark all as read
          </button>
        )}
      </div>

      {/* List */}
      <div className="space-y-3">
        {notifications.map((notif, i) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, type: 'spring', stiffness: 280 }}
            className={`relative flex items-start gap-4 p-5 rounded-2xl border transition-all ${notif.read ? 'bg-[#0f1526] border-white/5 opacity-60' : 'bg-[#0f1526] border-white/10'}`}
          >
            {/* Type icon */}
            <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center border ${typeStyle[notif.type]}`}>
              <Bell className="w-4 h-4" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className={`text-sm font-semibold ${notif.read ? 'text-neutral-300' : 'text-white'}`}>{notif.title}</p>
                {!notif.read && <span className={`w-2 h-2 rounded-full flex-shrink-0 ${typeDot[notif.type]}`} />}
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">{notif.message}</p>
              <p className="text-xs text-neutral-600 mt-2">{notif.time}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {notifications.every(n => n.read) && (
        <div className="text-center py-12 text-neutral-500">
          <CheckCheck className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">You're all caught up!</p>
        </div>
      )}
    </div>
  );
}
