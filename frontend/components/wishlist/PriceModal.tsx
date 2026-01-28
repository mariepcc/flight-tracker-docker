"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  TrendingDown,
  Clock,
  Calendar as CalIcon,
  MapPin,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PriceChart } from "./PriceChart";

export default function PriceModal({ isOpen, onClose, data }: any) {
  const lastUpdate =
    data?.price_history?.length > 0
      ? data.price_history[data.price_history.length - 1].fetched_at
      : "Just now";

  const formatDuration = (min: number) => {
    const hours = Math.floor(min / 60);
    const minutes = min % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <AnimatePresence>
      {isOpen && data && (
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
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

            <div className="flex justify-between items-start mb-10">
              <div className="space-y-4">
                {" "}
                {/* Zwiększony odstęp tutaj */}
                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-indigo-500 bg-indigo-500/10 px-3 py-1 rounded-full">
                  Flight Details
                </span>
                <div>
                  <h2 className="text-3xl font-black text-white leading-tight flex items-center gap-4">
                    <span>{data.origin_code}</span>
                    <span className="text-slate-700 font-light">→</span>
                    <span>{data.destination_code}</span>
                  </h2>
                  <p className="text-sm text-slate-500 mt-1 font-medium">
                    {data.origin_airport} — {data.destination_airport}
                  </p>
                </div>
              </div>

              <Button
                variant="ghost"
                onClick={onClose}
                className="rounded-full hover:bg-white/10 text-white h-10 w-10 p-0"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <p className="text-[10px] text-slate-500 uppercase font-bold mb-1 flex items-center gap-1">
                  <CalIcon className="w-3 h-3 text-indigo-400" /> Date
                </p>
                <p className="text-sm font-bold text-white">
                  {data.departure_date}
                </p>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <p className="text-[10px] text-slate-500 uppercase font-bold mb-1 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-indigo-400" /> Duration
                </p>
                <p className="text-sm font-bold text-white">
                  {formatDuration(data.duration)}
                </p>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <p className="text-[10px] text-slate-500 uppercase font-bold mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-indigo-400" /> Connection
                </p>
                <p className="text-sm font-bold text-white">
                  {data.stop_airports && data.stop_airports !== ""
                    ? data.stop_airports
                    : "Direct Flight"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                <p className="text-xs text-slate-500 uppercase font-bold mb-2">
                  Current Price
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white">
                    {data.price}
                  </span>
                  <span className="text-sm font-bold text-indigo-500">PLN</span>
                </div>
              </div>
              <div className="bg-indigo-500/10 rounded-3xl p-6 border border-indigo-500/20">
                <p className="text-xs text-indigo-400 uppercase font-bold mb-2 font-mono tracking-wider">
                  Status
                </p>
                <p className="text-2xl font-black text-indigo-400 flex items-center gap-3">
                  Best Deal <TrendingDown className="w-6 h-6" />
                </p>
              </div>
            </div>

            <div className="w-full bg-white/5 rounded-3xl p-6 border border-white/5">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-500" />
                  <p className="text-xs text-slate-400 uppercase font-black tracking-widest">
                    Price History
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-[10px] text-slate-500 font-bold uppercase">
                    Last update:{" "}
                    <span className="text-slate-300">{lastUpdate}</span>
                  </p>
                </div>
              </div>
              <div className="h-48 w-full">
                <PriceChart data={data.price_history} />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
