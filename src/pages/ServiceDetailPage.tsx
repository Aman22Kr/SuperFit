import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Clock, Flame, Check, Dumbbell, Calendar, Heart, ShieldCheck } from 'lucide-react';
import { SERVICES } from '../data/gymData';
import { useApp } from '../context/AppContext';
import { AdSection } from '../components/layout/AdSection';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart, selectedBranch, isFavorite, toggleFavorite } = useApp();

  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const relatedServices = SERVICES.filter((s) => s.id !== service.id).slice(0, 3);
  const favorited = isFavorite(service.id);

  return (
    <div className="w-full">
      {/* Breadcrumb Bar */}
      <div className="bg-neutral-950 border-b border-neutral-900 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Programs</span>
          </Link>

          <button
            type="button"
            onClick={() => toggleFavorite(service.id)}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-rose-500 transition-colors"
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{favorited ? 'Saved to Favorites' : 'Save Program'}</span>
          </button>
        </div>
      </div>

      {/* Main Detail Header Hero */}
      <section className="relative py-14 sm:py-20 px-4 sm:px-6 bg-neutral-950 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-rose-400 bg-rose-950/60 border border-rose-900/60 px-2.5 py-1 rounded uppercase tracking-wider">
                {service.category} Discipline
              </span>
              <span className="text-neutral-400 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded">
                Intensity: {service.intensity}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black italic uppercase text-white tracking-tight">
              {service.title}
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
              {service.shortDesc}
            </p>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap gap-6 py-3 border-y border-neutral-800 text-xs font-mono text-neutral-300">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-neutral-400" />
                <span>Duration: <strong>{service.duration}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-500" />
                <span>Burn Rate: <strong>{service.caloriesBurned}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neutral-400" />
                <span>Available: <strong>Thane & Dombivli</strong></span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() =>
                  addToCart({
                    title: `Trial Pass: ${service.title}`,
                    type: 'daypass',
                    price: 0,
                    branch: selectedBranch,
                    details: `1-Day Trial Session for ${service.title}`,
                  })
                }
                className="px-8 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-rose-900/40 cursor-pointer"
              >
                Book Free Trial Session
              </button>

              <Link
                to="/membership"
                className="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800 font-semibold text-xs uppercase tracking-wider rounded-xl text-center transition-colors"
              >
                View Membership Plans
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl relative aspect-[4/3]">
              <img
                src={service.image}
                alt={service.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="font-mono bg-black/60 px-2 py-1 rounded backdrop-blur-md">
                  SuperFit Certified Facility
                </span>
                <span className="font-semibold text-rose-400">
                  Daily Guided Batches
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep-dive content blocks */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          {/* Detailed Editorial Narrative */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black italic uppercase text-white tracking-tight">
              PROGRAM OVERVIEW & METHODOLOGY
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          {/* Key Clinical & Fitness Benefits */}
          <div className="space-y-4">
            <h3 className="text-lg font-black uppercase italic text-white tracking-tight">
              KEY PHYSIOLOGICAL BENEFITS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="p-3.5 bg-neutral-900/60 rounded-xl border border-neutral-800/80 flex items-start gap-2.5"
                >
                  <Check className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span className="text-xs text-neutral-300 leading-normal">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment Deployed */}
          <div className="space-y-4">
            <h3 className="text-lg font-black uppercase italic text-white tracking-tight">
              COMMERCIAL APPARATUS & EQUIPMENT
            </h3>
            <div className="p-5 bg-neutral-900/50 rounded-xl border border-neutral-800">
              <div className="flex flex-wrap gap-2">
                {service.equipmentUsed.map((eq, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono text-neutral-200 bg-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-800 flex items-center gap-1.5"
                  >
                    <Dumbbell className="w-3.5 h-3.5 text-rose-400" />
                    <span>{eq}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info Card */}
        <div className="space-y-6">
          <div className="p-6 bg-neutral-900/70 rounded-2xl border border-neutral-800 space-y-5">
            <h3 className="text-base font-bold text-white">Who Is This Program For?</h3>
            <div className="space-y-2">
              {service.suitableFor.map((aud, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{aud}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-neutral-800 space-y-2">
              <h4 className="text-xs font-mono uppercase text-rose-400">Class Timings & Access</h4>
              <p className="text-xs text-neutral-400">{service.scheduleSlot}</p>
            </div>

            <div className="pt-3 border-t border-neutral-800">
              <Link
                to="/schedule"
                className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-lg block text-center transition-colors"
              >
                Check Weekly Schedule
              </Link>
            </div>
          </div>

          {/* Contact or Booking teaser */}
          <div className="p-6 bg-gradient-to-br from-rose-950/40 via-neutral-900 to-neutral-950 rounded-2xl border border-rose-900/40 text-center space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Want 1-on-1 Guidance?
            </h4>
            <p className="text-xs text-neutral-400">
              Pair {service.title} with a dedicated coach to accelerate your timeline.
            </p>
            <Link
              to="/trainers"
              className="inline-block px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase rounded-lg transition-colors"
            >
              Browse Coaches
            </Link>
          </div>
        </div>
      </section>

      {/* Related programs */}
      <section className="py-14 px-4 sm:px-6 bg-neutral-950 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-black italic uppercase text-white mb-6">
            EXPLORE COMPLEMENTARY DISCIPLINES
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((rel) => (
              <Link
                key={rel.id}
                to={`/services/${rel.slug}`}
                className="p-5 bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-800 rounded-xl transition-colors block group"
              >
                <div className="text-[10px] font-mono uppercase text-rose-400 mb-1">{rel.category}</div>
                <h4 className="text-base font-bold text-white group-hover:text-rose-400 transition-colors">
                  {rel.title}
                </h4>
                <p className="text-xs text-neutral-400 line-clamp-2 mt-1">{rel.shortDesc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Ad Section */}
      <AdSection />
    </div>
  );
};
