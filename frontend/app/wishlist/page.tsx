"use client";

import React, { useState, useEffect } from "react";
import WishlistItem from "@/components/wishlist/WishlistItem";
import PriceModal from "@/components/wishlist/PriceModal";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

export default function WishlistPage() {
  const [trackedFlights, setTrackedFlights] = useState<any[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<any>(null);

  const getWishlist = async () => {
    try {
      const response = await axios.get("http://localhost:8000/tracked-flights");
      setTrackedFlights(response.data);
      console.log("Fetched wishlist:", response.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      return [];
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <main className="aura-container min-h-screen pt-20">
      <div className="mb-12 space-y-2">
        <h1 className="text-5xl font-black text-white">
          My <span className="gradient-text">Wishlist</span>
        </h1>
        <p className="text-slate-400 text-lg">
          Tracked flights and their real-time price changes.
        </p>
      </div>

      {trackedFlights.length > 0 ? (
        <div className="grid gap-4">
          {trackedFlights.map((item) => (
            <WishlistItem
              key={item.id}
              origin_code={item.origin_code}
              destination_code={item.destination_code}
              destination_airport={item.destination_airport}
              origin_airport={item.origin_airport}
              duration={item.duration}
              departure_time={item.departure_time}
              arrival_time={item.arrival_time}
              price={item.price}
              price_history={item.price_history}
              date={item.departure_date}
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
          <p className="text-slate-500 text-xl font-medium">
            Your wishlist is empty. Start exploring!
          </p>
        </motion.div>
      )}

      <PriceModal
        isOpen={!!selectedFlight}
        onClose={() => setSelectedFlight(null)}
        data={selectedFlight}
      />
    </main>
  );
}
