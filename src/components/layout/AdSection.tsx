import React, { useState } from 'react';
import { ADS } from '../../data/gymData';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const AdSection: React.FC = () => {
  const [activeAdIndex, setActiveAdIndex] = useState(0);
  const ad = ADS[activeAdIndex];

  return (
    <section aria-label="Sponsored Partner" className="w-full bg-neutral-900/60 border-y border-neutral-800/80 py-5 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0 text-rose-500">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-wider uppercase bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded">
                Partner Sponsor
              </span>
              <span className="text-xs font-semibold text-neutral-200">{ad.brand}</span>
              <span className="text-neutral-500 hidden sm:inline">·</span>
              <span className="text-xs text-rose-400 hidden sm:inline flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 inline" /> {ad.highlight}
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1 max-w-2xl">
              {ad.tagline}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end shrink-0">
          <div className="text-[11px] font-mono text-neutral-400 bg-neutral-950/80 px-2.5 py-1 rounded border border-neutral-800">
            {ad.linkText}
          </div>
          <button
            type="button"
            onClick={() => setActiveAdIndex((prev) => (prev + 1) % ADS.length)}
            className="text-xs font-medium text-white bg-rose-600 hover:bg-rose-500 px-3.5 py-1.5 rounded transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <span>{ad.ctaText}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </section>
  );
};
