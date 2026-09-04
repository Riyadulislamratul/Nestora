import React from 'react';
import { Award, Globe2, Shield, Landmark } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      icon: <Landmark size={24} className="text-gold" />,
      value: "$4.8B+",
      label: "Prime Global Transactions",
      sub: "Over 12 years of curated discreet closings"
    },
    {
      icon: <Shield size={24} className="text-gold" />,
      value: "99.4%",
      label: "Discreet Off-Market Rate",
      sub: "Guaranteed client privacy & strict NDAs"
    },
    {
      icon: <Globe2 size={24} className="text-gold" />,
      value: "14",
      label: "Private Office Hubs",
      sub: "Los Angeles, New York, London, Tokyo, Como"
    },
    {
      icon: <Award size={24} className="text-gold" />,
      value: "#1",
      label: "Bespoke Architectural Brokerage",
      sub: "Voted Premier Luxury Agency 2024-2025"
    }
  ];

  return (
    <section id="stats" className="stats-section">
      <div className="stats-container">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card glass-panel">
              <div className="stat-icon-wrap">
                {stat.icon}
              </div>
              <div className="stat-number gold-text">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-sub">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
