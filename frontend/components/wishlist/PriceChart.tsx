"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: '21 Jan', price: 400 },
  { day: '22 Jan', price: 380 },
  { day: '23 Jan', price: 450 },
  { day: '24 Jan', price: 320 },
  { day: '25 Jan', price: 290 },
  { day: '26 Jan', price: 240 },
];

export function PriceChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
        <XAxis 
          dataKey="day" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#64748b', fontSize: 12 }} 
          dy={10}
        />
        <YAxis 
          hide={true} 
          domain={['dataMin - 50', 'dataMax + 50']} 
        />
        <Tooltip 
          contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px' }}
          itemStyle={{ color: '#818cf8', fontWeight: 'bold' }}
        />
        <Line 
          type="monotone" 
          dataKey="price" 
          stroke="#818cf8" 
          strokeWidth={4} 
          dot={{ r: 4, fill: '#818cf8', strokeWidth: 2, stroke: '#0f172a' }}
          activeDot={{ r: 8, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}