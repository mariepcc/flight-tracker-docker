"use client";

import React, { useState } from "react";
import SearchForm from "@/components/search/SearchForm";
import SingleFlightResult from "@/components/results/SingleFlightResult";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function Home() {
  const [result, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  interface SearchFormData {
    origin: string;
    destination: string;
    date: string;
  }

  const handleSearch = async (searchData: SearchFormData) => {
    console.log("Dane wylotu:", searchData);
    setResults(null);
    setLoading(true);

    try {
      const response = await axios.get("http://localhost:8000/get-flights", {
        params: searchData,
      });
      setResults(response.data);
      console.log("Otrzymane dane:", response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto min-h-screen pt-20 pb-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-7xl md:text-8xl font-black mb-2 tracking-tighter italic leading-[1.3] py-4">
          <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-rose-600/80 bg-clip-text text-transparent">
            FLY
          </span>
          <span className="bg-linear-to-r from-rose-600/80 via-purple-500 to-indigo-500 bg-clip-text text-transparent ml-4">
            SMARTER.
          </span>
        </h1>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em] italic opacity-80">
          Precision Travel Intelligence
        </p>
      </motion.div>

      <div className="w-full space-y-6">
        <div className="glass-card p-px bg-linear-to-br from-indigo-500/40 via-purple-500/40 to-rose-900/40 shadow-2xl">
          <div className="bg-[#05070a] rounded-[1.9rem] p-8">
            <SearchForm onSearch={handleSearch} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {loading && (
            <div className="flex flex-col items-center py-16 gap-4">
              <div className="w-10 h-10 border-2 border-indigo-500/20 border-t-rose-800 rounded-full animate-spin" />
              <p className="text-indigo-400 text-[9px] font-black uppercase tracking-[0.4em] animate-pulse">
                Syncing Fares
              </p>
            </div>
          )}

          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <SingleFlightResult flight={result} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
