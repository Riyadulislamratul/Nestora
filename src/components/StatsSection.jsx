import React from 'react';
import { Award, Globe2, Shield, Landmark } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      icon: <Landmark size={22} className="text-gold-primary" />,
      value: "$4.8B+",
      label: "Prime Global Transactions",
      sub: "Over 12 years of curated discreet closings"
    },
    {
      icon: <Shield size={22} className="text-gold-primary" />,
      value: "99.4%",
      label: "Discreet Off-Market Rate",
      sub: "Guaranteed client privacy & strict NDAs"
    },
    {
      icon: <Globe2 size={22} className="text-gold-primary" />,
      value: "14",
      label: "Private Office Hubs",
      sub: "Los Angeles, New York, London, Tokyo, Como"
    },
    {
      icon: <Award size={22} className="text-gold-primary" />,
      value: "#1",
      label: "Bespoke Architectural Brokerage",
      sub: "Voted Premier Luxury Agency 2024-2025"
    }
  ];

  return (
    <section id="stats" className="py-10 sm:py-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="p-6 sm:p-7 rounded-3xl glass-card border border-white/15 hover:border-gold-primary/50 flex flex-col items-center text-center transition-all hover:-translate-y-2 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl glass-pill-gold flex items-center justify-center mb-4 shadow-md shadow-gold-primary/20">
              {stat.icon}
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-bold gold-text mb-1.5">{stat.value}</div>
            <div className="text-sm font-semibold text-white mb-1">{stat.label}</div>
            <div className="text-xs text-zinc-400">{stat.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
