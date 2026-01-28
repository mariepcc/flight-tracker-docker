"use client";

import React, { useState } from "react";
import SearchForm from "@/components/search/SearchForm";
import SingleFlightResult from "@/components/results/SingleFlightResult";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function Home() {
  const [result, setResults] = useState<any>(null);
  const [searchDate, setsearchDate] = useState("");
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
    setsearchDate(searchData.date);

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
    <main className="max-w-4xl mx-auto min-h-screen pt-20 pb-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center mb-16 w-full overflow-visible"
      >
        <div className="w-full flex justify-center">
          {" "}
          <h1 className="text-2xl sm:text-2xl md:text-[10rem] font-black mb-4 tracking-tighter leading-none py-10 px-6 overflow-visible whitespace-nowrap">
            <span className="inline-block bg-linear-to-r from-indigo-500 via-purple-500 to-rose-600/80 bg-clip-text text-transparent">
              FLY SMARTER
            </span>
          </h1>
        </div>

        <p className="text-slate-500 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] italic opacity-80 max-w-3xl leading-relaxed mt-4">
          Finding the best daily flight deals powered by Google Flights
          Intelligence
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
              <SingleFlightResult flight={result} departure_date={searchDate} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
