import "./globals.css";
import React from 'react';
import Navbar from '@/components/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#050811] text-neutral-100 font-sans selection:bg-blue-500/30">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full">
          {children}
        </main>
      </body>
    </html>
  );
}
