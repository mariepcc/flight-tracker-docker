"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function PriceChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#ffffff10"
          vertical={false}
        />
        <XAxis dataKey="fetched_at" hide={true} />
        <YAxis hide={true} domain={["dataMin - 50", "dataMax + 50"]} />
        <Tooltip
          labelStyle={{
            color: "#94a3b8",
            marginBottom: "4px",
            fontSize: "12px",
          }}
          contentStyle={{
            backgroundColor: "#0f172a",
            border: "1px solid #ffffff10",
            borderRadius: "12px",
            fontSize: "14px",
          }}
          itemStyle={{ color: "#818cf8", fontWeight: "bold" }}
          formatter={(value: any) => [`${value} PLN`, "Price"]}
          labelFormatter={(label) => `Fetched: ${label}`}
        />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#818cf8"
          strokeWidth={4}
          dot={{ r: 4, fill: "#818cf8", strokeWidth: 2, stroke: "#0f172a" }}
          activeDot={{ r: 6, strokeWidth: 0 }}
          animationDuration={1000}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
