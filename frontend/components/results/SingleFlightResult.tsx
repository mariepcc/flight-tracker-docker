"use client";

import React, { useState } from "react";
import { Heart, Plane, Clock, TrendingDown } from "lucide-react";

export default function SingleFlightResult({ flight }: { flight: any }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="glass-card p-px bg-linear-to-br from-rose-900/40 via-purple-500/40 to-indigo-500/40">
      <div className="bg-[#05070a] rounded-[1.9rem] p-8 md:p-10 relative overflow-hidden">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="flex items-center gap-1.5 text-[9px] font-black text-emerald-400 uppercase tracking-widest">
                <TrendingDown className="w-3 h-3" /> Best Price
              </span>
            </div>
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
              {flight.departure_date}
            </span>
          </div>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-3 rounded-xl bg-white/3 hover:bg-white/8 transition-all"
          >
            <Heart
              className={`w-5 h-5 transition-all duration-500 ${isFavorite ? "fill-rose-800 text-rose-800 scale-110" : "text-slate-700"}`}
            />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex flex-1 items-center justify-between w-full lg:max-w-3xl">
            <div className="flex-1 basis-0 text-left">
              <h3 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter leading-none mb-1">
                {flight.origin_code || flight.origin_airport}
              </h3>
              <p className="text-xl font-black text-indigo-500 tracking-tighter">
                {flight.departure_time}
              </p>
            </div>

            <div className="flex-[1.5] flex flex-col items-center px-4">
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 whitespace-nowrap">
                <Clock className="w-3 h-3 text-purple-500" /> {flight.duration}
              </div>
              <div className="w-full h-px bg-white/10 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#05070a] px-4">
                  <Plane className="w-4 h-4 text-purple-500 rotate-90" />
                </div>
              </div>
              <span className="mt-2 text-[8px] text-slate-600 font-bold tracking-[0.3em] uppercase">
                {flight.flight_number}
              </span>
            </div>

            <div className="flex-1 basis-0 text-right">
              <h3 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter leading-none mb-1">
                {flight.destination_code || flight.destination_airport}
              </h3>
              <p className="text-xl font-black text-rose-900/80 tracking-tighter">
                {flight.arrival_time}
              </p>
            </div>
          </div>

          <div className="hidden lg:block w-px h-16 bg-white/5" />

          <div className="flex flex-col items-center lg:items-end min-w-[120px]">
            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">
              Total
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-6xl font-black text-white italic tracking-tighter leading-none">
                {flight.price}
              </span>
              <span className="text-rose-900/80 font-black text-lg italic uppercase tracking-tighter">
                {flight.currency || "pln"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
