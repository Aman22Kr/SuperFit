import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Flame, Clock, Zap } from 'lucide-react';
import { SERVICES } from '../data/gymData';
import { useApp } from '../context/AppContext';
import { AdSection } from '../components/layout/AdSection';

export const ServicesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const { isFavorite, toggleFavorite } = useApp();

  const categories = [
    { id: 'all', label: 'All Programs' },
    { id: 'strength', label: 'Strength & Iron' },
    { id: 'cardio', label: 'Cardio & Endurance' },
    { id: 'dance', label: 'Aerobics & Zumba' },
    { id: 'wellness', label: 'Yoga & Personal Training' },
    { id: 'recovery', label: 'Recovery & Steam' },
  ];

  const filteredServices = SERVICES.filter((s) => {
    const matchesCat = activeCategory === 'all' || s.category === activeCategory;
    const matchesSearch =
      !searchFilter ||
      s.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.shortDesc.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full">
      {/* Page Header */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-neutral-950 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-block text-xs font-mono uppercase tracking-widest text-rose-500 bg-rose-950/40 px-3 py-1 rounded border border-rose-900/40">
            Training Disciplines
          </div>
          <h1 className="text-4xl sm:text-6xl font-black italic uppercase text-white tracking-tight">
            WORKOUT PROGRAMS & CLASSES
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto">
            From competition barbell training to sweat-drenching step aerobics and mindful power yoga. Choose your discipline and train under certified coaches.
          </p>

          {/* Search bar inside programs */}
          <div className="max-w-md mx-auto pt-4">
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter by keyword (e.g. Yoga, Kettlebell, Fat burn)..."
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-18 z-30 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-900 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-rose-600 text-white font-bold shadow-md shadow-rose-950'
                  : 'text-neutral-400 hover:text-white bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Grid of Programs */}
      <section className="py-14 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const favorited = isFavorite(service.id);
            return (
              <div
                key={service.id}
                className="bg-neutral-900/70 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-neutral-700 transition-all group"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-rose-400 uppercase tracking-wide border border-neutral-800">
                      {service.intensity}
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleFavorite(service.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-neutral-400 hover:text-rose-500 transition-colors"
                      title={favorited ? 'Remove from saved' : 'Save program'}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          favorited ? 'fill-rose-500 text-rose-500' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-black uppercase italic text-white group-hover:text-rose-400 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                      {service.shortDesc}
                    </p>

                    <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 pt-3 border-t border-neutral-800/80">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-neutral-500" />
                        <span>{service.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-rose-500" />
                        <span>{service.caloriesBurned}</span>
                      </div>
                    </div>

                    {/* Top benefit bullets */}
                    <div className="space-y-1.5 pt-2">
                      {service.benefits.slice(0, 2).map((b, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-neutral-400">
                          <Zap className="w-3 h-3 text-rose-500 shrink-0" />
                          <span className="line-clamp-1">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/services/${service.slug}`}
                    className="w-full py-2.5 bg-neutral-800 hover:bg-rose-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <span>View Full Program Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Ad Section at bottom */}
      <AdSection />
    </div>
  );
};
