"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function ResultsPage() {
  return (
    <main className="aura-container min-h-screen pt-20">
      <div className="flex flex-col gap-12">
        {/* Header Sekcja */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-all group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm uppercase tracking-widest font-bold">Back to Search</span>
            </Link>
            <h1 className="text-6xl font-black text-white leading-none">
              Found <span className="gradient-text">Deals</span>
            </h1>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-4 rounded-3xl">
            <Sparkles className="text-indigo-400 w-5 h-5" />
            <p className="text-slate-300 font-medium">We found the best prices for you!</p>
          </div>
        </div>

        {}
    
      </div>
    </main>
  );
}