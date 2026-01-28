"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Plane, Search } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-100 px-6 py-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between glass-card px-6 py-3 border-white/5 bg-black/40 backdrop-blur-2xl">
        {}
        <Link href="/" className="flex items-center group">
          <div className="bg-white/10 rounded-xl p-2.5 group-hover:bg-indigo-500 transition-all duration-500">
            <Plane className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
          </div>
        </Link>

        {}
        <div className="flex items-center gap-2">
          <Link href="/">
            <div
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                pathname === "/"
                  ? "bg-white/10 text-white"
                  : "text-slate-500 hover:text-white"
              }`}
            >
              <Search className="w-4 h-4" />
              Search
            </div>
          </Link>

          <Link href="/wishlist">
            <div
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 relative group/item ${
                pathname === "/wishlist"
                  ? "bg-indigo-600 text-white shadow-[0_0_25px_rgba(79,70,229,0.4)]"
                  : "bg-white/5 text-slate-500 hover:text-white hover:bg-white/10"
              }`}
            >
              <Heart
                className={`w-4 h-4 transition-transform group-hover/item:scale-110 ${
                  pathname === "/wishlist" ? "fill-white" : ""
                }`}
              />
              Tracked Flights
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
