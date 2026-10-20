import React from 'react';
import { Award, CheckCircle, MapPin, Calendar, Dumbbell } from 'lucide-react';
import { TRAINERS } from '../data/gymData';
import { useApp } from '../context/AppContext';
import { AdSection } from '../components/layout/AdSection';

export const TrainersPage: React.FC = () => {
  const { addToCart, selectedBranch } = useApp();

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-neutral-950 border-b border-neutral-900 text-center">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-block text-xs font-mono uppercase tracking-widest text-rose-500 bg-rose-950/40 px-3 py-1 rounded border border-rose-900/40">
            Certified Coaching Faculty
          </div>
          <h1 className="text-4xl sm:text-6xl font-black italic uppercase text-white tracking-tight">
            MEET THE SUPERFIT COACHES
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto">
            Our fitness trainers and sports dietitians hold globally accredited credentials. No gimmicks, just biomechanically sound coaching to help you hit your goals safely.
          </p>
        </div>
      </section>

      {/* Trainers Showcase */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TRAINERS.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-neutral-900/70 border border-neutral-800 rounded-2xl overflow-hidden p-6 sm:p-8 flex flex-col justify-between hover:border-neutral-700 transition-colors space-y-6"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono text-rose-400 bg-rose-950/60 border border-rose-900/60 px-2.5 py-1 rounded uppercase">
                    {trainer.experience}
                  </span>
                  <span className="text-xs text-neutral-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{trainer.branch} Club</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black italic uppercase text-white">
                    {trainer.name}
                  </h3>
                  <div className="text-xs font-semibold text-rose-500 mt-0.5">{trainer.role}</div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {trainer.bio}
                </p>

                {/* Certifications */}
                <div className="space-y-1.5 pt-2">
                  <div className="text-[11px] font-mono uppercase text-neutral-400 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Credentials & Accreditations</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trainer.certifications.map((cert, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono bg-neutral-950 text-neutral-300 px-2.5 py-1 rounded border border-neutral-800 flex items-center gap-1.5"
                      >
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                        <span>{cert}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Specialties */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono uppercase text-neutral-400 flex items-center gap-1">
                    <Dumbbell className="w-3.5 h-3.5 text-rose-400" />
                    <span>Core Focus Areas</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {trainer.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-neutral-800/80 text-neutral-300 px-2.5 py-1 rounded"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() =>
                    addToCart({
                      title: `Free 1-on-1 Assessment with ${trainer.name}`,
                      type: 'assessment',
                      price: 0,
                      branch: trainer.branch === 'Both' ? selectedBranch : trainer.branch,
                      details: `Movement screening & consultation with ${trainer.name}`,
                    })
                  }
                  className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-rose-950"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Free 1-on-1 Assessment</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ad Section at bottom */}
      <AdSection />
    </div>
  );
};
