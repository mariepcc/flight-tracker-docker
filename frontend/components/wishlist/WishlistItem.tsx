"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WishlistItem({
  origin_code,
  destination_code,
  price,
  date,
  onShowDetails,
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card p-6 flex items-center justify-between group hover:bg-white/5 transition-colors"
    >
      <div className="flex items-center gap-6">
        <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
          <Bell className="w-5 h-5 text-indigo-500" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">
            {origin_code} - {destination_code}
          </h3>
          <p className="text-sm text-slate-500">{date}</p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="text-right">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">
            Latest Price
          </p>
          <p className="text-2xl font-black text-white">{price} PLN</p>
        </div>
        <Button
          onClick={onShowDetails}
          className="glow-button py-2 px-4 h-auto text-sm flex gap-2"
        >
          Details <ArrowUpRight className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}
