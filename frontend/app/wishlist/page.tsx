"use client";

import React, { useState } from 'react';
import WishlistItem from '@/components/wishlist/WishlistItem';
import PriceModal from '@/components/wishlist/PriceModal';
import { Heart} from 'lucide-react';
import { motion } from 'framer-motion';

export default function WishlistPage() {
  const [selectedFlight, setSelectedFlight] = useState<any>(null);

  // Dane testowe - potem zastąpimy je danymi z Twojego backendu
  const dummyWishlist = [
    { id: 1, city: "Barcelona", currentPrice: 240, lastUpdate: "2h ago", date: "12 Mar 2026" },
    { id: 2, city: "Rome", currentPrice: 180, lastUpdate: "5m ago", date: "15 Mar 2026" }
  ];

  return (
    <main className="aura-container min-h-screen pt-20">
      <div className="mb-12 space-y-2">
        <h1 className="text-5xl font-black text-white">My <span className="gradient-text">Wishlist</span></h1>
        <p className="text-slate-400 text-lg">Tracked flights and their real-time price changes.</p>
      </div>

      {dummyWishlist.length > 0 ? (
        <div className="grid gap-4">
          {dummyWishlist.map((item) => (
            <WishlistItem 
              key={item.id} 
              city={item.city}
              currentPrice={item.currentPrice}
              lastUpdate={item.lastUpdate}
              date={item.date}
              onShowDetails={() => setSelectedFlight(item)} 
            />
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-20 text-center space-y-6"
        >
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
            <Heart className="w-10 h-10 text-slate-700" />
          </div>
          <p className="text-slate-500 text-xl font-medium">Your wishlist is empty. Start exploring!</p>
        </motion.div>
      )}

      {/* Modal z wykresem cen */}
      <PriceModal 
        isOpen={!!selectedFlight} 
        onClose={() => setSelectedFlight(null)} 
        data={selectedFlight} 
      />
    </main>
  );
}