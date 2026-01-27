"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingDown, Clock, Calendar as CalIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PriceChart } from './PriceChart';

interface PriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    city: string;
    currentPrice: number;
    lastUpdate: string;
    date: string;
  };
}

export default function PriceModal({ isOpen, onClose, data }: PriceModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-card w-full max-w-2xl p-8 relative z-10 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500" />
            
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-black text-white mb-2">{data.city}</h2>
                <div className="flex gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1"><CalIcon className="w-4 h-4"/> {data.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4"/> Updated: {data.lastUpdate}</span>
                </div>
              </div>
              <Button variant="ghost" onClick={onClose} className="rounded-full hover:bg-white/10 text-white">
                <X className="w-6 h-6" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <p className="text-xs text-slate-500 uppercase mb-1">Current Price</p>
                <p className="text-2xl font-bold text-white">{data.currentPrice} PLN</p>
              </div>
              <div className="bg-indigo-500/10 rounded-2xl p-4 border border-indigo-500/20">
                <p className="text-xs text-indigo-400 uppercase mb-1">Status</p>
                <p className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
                  Best Deal <TrendingDown className="w-5 h-5" />
                </p>
              </div>
            </div>

            <div className="h-62.5 w-full mt-4 bg-white/5 rounded-3xl p-4 border border-white/5">
              <PriceChart />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}