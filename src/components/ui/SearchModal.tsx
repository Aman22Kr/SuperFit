import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Dumbbell, User, CreditCard, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SERVICES, TRAINERS, MEMBERSHIP_PLANS } from '../../data/gymData';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen } = useApp();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'programs' | 'trainers' | 'plans'>('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsSearchOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const matchingServices = SERVICES.filter((s) => {
    if (!normalizedQuery) return true;
    return (
      s.title.toLowerCase().includes(normalizedQuery) ||
      s.shortDesc.toLowerCase().includes(normalizedQuery) ||
      s.category.toLowerCase().includes(normalizedQuery) ||
      s.benefits.some((b) => b.toLowerCase().includes(normalizedQuery))
    );
  });

  const matchingTrainers = TRAINERS.filter((t) => {
    if (!normalizedQuery) return true;
    return (
      t.name.toLowerCase().includes(normalizedQuery) ||
      t.role.toLowerCase().includes(normalizedQuery) ||
      t.specialties.some((sp) => sp.toLowerCase().includes(normalizedQuery))
    );
  });

  const matchingPlans = MEMBERSHIP_PLANS.filter((p) => {
    if (!normalizedQuery) return true;
    return (
      p.title.toLowerCase().includes(normalizedQuery) ||
      p.period.toLowerCase().includes(normalizedQuery) ||
      p.features.some((f) => f.toLowerCase().includes(normalizedQuery))
    );
  });

  const hasAnyResults =
    (activeCategory === 'all' && (matchingServices.length > 0 || matchingTrainers.length > 0 || matchingPlans.length > 0)) ||
    (activeCategory === 'programs' && matchingServices.length > 0) ||
    (activeCategory === 'trainers' && matchingTrainers.length > 0) ||
    (activeCategory === 'plans' && matchingPlans.length > 0);

  const handleSelect = (path: string) => {
    setIsSearchOpen(false);
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md">
      <div
        className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header */}
        <div className="p-4 border-b border-neutral-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search workouts (e.g., Zumba, Power Yoga, Strength, Trainer, VIP Plan)..."
            className="w-full bg-transparent text-white placeholder-neutral-500 text-sm focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="text-xs font-mono uppercase bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-2 py-1 rounded"
          >
            ESC
          </button>
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-2 px-4 py-2 bg-neutral-950/50 border-b border-neutral-800 text-xs overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-rose-600 text-white font-medium'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            All Results
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('programs')}
            className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap ${
              activeCategory === 'programs'
                ? 'bg-rose-600 text-white font-medium'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            Programs ({matchingServices.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('trainers')}
            className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap ${
              activeCategory === 'trainers'
                ? 'bg-rose-600 text-white font-medium'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            Trainers ({matchingTrainers.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('plans')}
            className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap ${
              activeCategory === 'plans'
                ? 'bg-rose-600 text-white font-medium'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            Memberships ({matchingPlans.length})
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 overflow-y-auto space-y-6 flex-1">
          {!hasAnyResults && (
            <div className="text-center py-12 text-neutral-500">
              <p className="text-sm">No matches found for &ldquo;{query}&rdquo;.</p>
              <p className="text-xs text-neutral-600 mt-1">Try searching for &quot;Yoga&quot;, &quot;Aerobics&quot;, &quot;Thane&quot;, or &quot;Vikram&quot;</p>
            </div>
          )}

          {/* Programs */}
          {(activeCategory === 'all' || activeCategory === 'programs') && matchingServices.length > 0 && (
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-2 flex items-center gap-1.5">
                <Dumbbell className="w-3.5 h-3.5 text-rose-500" />
                <span>Fitness Programs & Classes</span>
              </div>
              <div className="space-y-1.5">
                {matchingServices.map((svc) => (
                  <div
                    key={svc.id}
                    onClick={() => handleSelect(`/services/${svc.slug}`)}
                    className="p-2.5 rounded-lg bg-neutral-950/40 hover:bg-neutral-800/80 border border-neutral-800/60 cursor-pointer flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-rose-400 transition-colors">
                        {svc.title}
                      </h4>
                      <p className="text-xs text-neutral-400 line-clamp-1">{svc.shortDesc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 ml-3" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trainers */}
          {(activeCategory === 'all' || activeCategory === 'trainers') && matchingTrainers.length > 0 && (
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-rose-500" />
                <span>Certified Coaches</span>
              </div>
              <div className="space-y-1.5">
                {matchingTrainers.map((tr) => (
                  <div
                    key={tr.id}
                    onClick={() => handleSelect(`/trainers`)}
                    className="p-2.5 rounded-lg bg-neutral-950/40 hover:bg-neutral-800/80 border border-neutral-800/60 cursor-pointer flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-rose-400 transition-colors">
                        {tr.name} · <span className="text-xs text-neutral-400 font-normal">{tr.role}</span>
                      </h4>
                      <p className="text-xs text-neutral-500">{tr.specialties.join(' · ')}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 ml-3" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Plans */}
          {(activeCategory === 'all' || activeCategory === 'plans') && matchingPlans.length > 0 && (
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-2 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-rose-500" />
                <span>Membership Options</span>
              </div>
              <div className="space-y-1.5">
                {matchingPlans.map((pl) => (
                  <div
                    key={pl.id}
                    onClick={() => handleSelect(`/membership`)}
                    className="p-2.5 rounded-lg bg-neutral-950/40 hover:bg-neutral-800/80 border border-neutral-800/60 cursor-pointer flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-white group-hover:text-rose-400 transition-colors">
                          {pl.title}
                        </h4>
                        <span className="text-xs font-mono font-bold text-rose-400">
                          ₹{pl.totalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 line-clamp-1">{pl.tagline}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 ml-3" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
