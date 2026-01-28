"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Calendar as CalendarIcon,
  MapPin,
  Search,
  PlaneTakeoff,
  Plane,
} from "lucide-react";
import { format } from "date-fns";

export default function SearchForm({
  onSearch,
}: {
  onSearch: (data: any) => void;
}) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<Date>();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch({
          origin,
          destination,
          date: date ? format(date, "yyyy-MM-dd") : "",
        });
      }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative group">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-500 z-20" />
          <Input
            placeholder="LHR"
            maxLength={3}
            className="h-14 bg-white/3 border-white/5 pl-12 text-lg font-black uppercase tracking-tighter focus:bg-white/[0.07] rounded-2xl transition-all border-b border-b-indigo-500/30"
            value={origin}
            onChange={(e) => setOrigin(e.target.value.toUpperCase())}
            required
          />
        </div>

        <div className="relative group">
          <PlaneTakeoff className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-800 z-20" />
          <Input
            placeholder="CDG"
            maxLength={3}
            className="h-14 bg-white/3 border-white/5 pl-12 text-lg font-black uppercase tracking-tighter focus:bg-white/[0.07] rounded-2xl transition-all border-b border-b-rose-800/30"
            value={destination}
            onChange={(e) => setDestination(e.target.value.toUpperCase())}
            required
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={`h-14 justify-start text-left font-black rounded-2xl bg-white/3 border-white/5 hover:bg-white/[0.07] border-b border-b-purple-500/30 px-5 transition-all ${
                !date ? "text-slate-500" : ""
              }`}
            >
              <CalendarIcon className="mr-3 h-4 w-4 text-purple-500" />
              <span className="text-lg tracking-tighter uppercase">
                {date ? format(date, "MMM dd, yyyy") : "SELECT DATE"}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 bg-[#0a0c10] border-white/10"
            align="start"
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className="p-4"
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button
        type="submit"
        className="w-full h-16 rounded-2xl bg-linear-to-r from-indigo-600 via-purple-600 to-rose-900/80 hover:brightness-110 active:scale-[0.98] active:shadow-[0_0_30px_rgba(79,70,229,0.4)] transition-all duration-200 shadow-lg group relative overflow-hidden"
      >
        <div className="relative flex items-center justify-center gap-3">
          <Plane className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          <span className="text-sm font-black uppercase tracking-[0.2em] italic">
            Search For The Best Flight
          </span>
        </div>
      </Button>
    </form>
  );
}
