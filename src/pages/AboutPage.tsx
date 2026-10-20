import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, ShieldCheck, HeartPulse, Award, ArrowRight, MapPin, Users } from 'lucide-react';
import { BRANCHES } from '../data/gymData';
import { AdSection } from '../components/layout/AdSection';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-neutral-950 border-b border-neutral-900 text-center">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-block text-xs font-mono uppercase tracking-widest text-rose-500 bg-rose-950/40 px-3 py-1 rounded border border-rose-900/40">
            Our Fitness Heritage
          </div>
          <h1 className="text-4xl sm:text-6xl font-black italic uppercase text-white tracking-tight">
            THE SUPERFIT STORY
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto">
            From our founding roots as Fun & Fit Gym in Thane and Dombivli, our mission has remained unchanged: making high-caliber fitness, science-backed coaching, and authentic wellness accessible to everyone.
          </p>
        </div>
      </section>

      {/* Story Narrative & Philosophy */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-rose-400">Evolution & Purpose</span>
            <h2 className="text-3xl font-black italic uppercase text-white tracking-tight">
              FROM COMMUNITY GYM TO REGIONAL FITNESS LEADER
            </h2>
          </div>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            SuperFit was established with a clear realization: traditional neighborhood gyms often lacked scientific structure, while commercial franchise gyms felt cold and intimidating. We engineered a space where high-level Olympic lifters and first-time fitness seekers train shoulder-to-shoulder with mutual respect.
          </p>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Over the past decade, we expanded our footprint across Thane West at Agrasen Towers and Dombivli East at Sai Plaza. Every club features certified coaches who teach proper anatomical lifting mechanics, dedicated aerobics floors for high-calorie group dance, and serene power yoga lofts.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-800">
            <div>
              <div className="text-3xl font-black font-athletic text-white">10+</div>
              <div className="text-xs text-neutral-400">Years of Heritage</div>
            </div>
            <div>
              <div className="text-3xl font-black font-athletic text-white">100%</div>
              <div className="text-xs text-neutral-400">Certified Trainers</div>
            </div>
            <div>
              <div className="text-3xl font-black font-athletic text-white">2 Clubs</div>
              <div className="text-xs text-neutral-400">Thane & Dombivli</div>
            </div>
          </div>
        </div>

        {/* Core Pillars Card */}
        <div className="lg:col-span-5 bg-neutral-900/70 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <h3 className="text-xl font-black italic uppercase text-white">THE FOUR SUPERFIT PILLARS</h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 shrink-0 mt-0.5">
                <Dumbbell className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Biomechanical Precision</h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  We coach lifting pathways that protect your spine, knees, and shoulders while maximizing hypertrophy.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 shrink-0 mt-0.5">
                <HeartPulse className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Holistic Energy & Cardio</h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Sweat-drenching step aerobics, Zumba dance parties, and high-intensity interval turf challenges.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Sanitation & Hygiene First</h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Round-the-clock wipe downs, antimicrobial air filtration, and pristine locker suites.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 shrink-0 mt-0.5">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Real InBody Diagnostics</h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Track skeletal muscle mass, visceral fat, and hydration metrics month over month.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branch details spotlight */}
      <section className="py-16 px-4 sm:px-6 bg-neutral-950 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-rose-500">Dual Club Access</span>
            <h2 className="text-3xl font-black italic uppercase text-white tracking-tight">
              OUR LOCATIONS & AMENITIES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BRANCHES.map((b) => (
              <div
                key={b.id}
                className="p-8 bg-neutral-900/60 rounded-2xl border border-neutral-800 space-y-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-black italic uppercase text-white">{b.name}</h3>
                    <p className="text-xs text-neutral-400 mt-1">{b.address}, {b.landmark}</p>
                  </div>
                  <span className="text-xs font-mono bg-rose-950 text-rose-400 px-2 py-1 rounded border border-rose-900">
                    {b.city}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-neutral-300 font-mono">
                  <div>Hotline: <a href={`tel:${b.phone}`} className="text-rose-400">{b.phone}</a></div>
                  <div>Email: {b.email}</div>
                  <div>Mon–Sat: {b.hoursWeekday}</div>
                  <div>Sunday: {b.hoursWeekend}</div>
                </div>

                <div className="space-y-2 pt-2 border-t border-neutral-800">
                  <div className="text-[11px] font-mono uppercase text-neutral-500">Club Highlights:</div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-neutral-300">
                    {b.facilities.map((fac, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                        <span>{fac}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400 hover:text-white"
                  >
                    <span>Get Directions & Branch Tour</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Section at bottom */}
      <AdSection />
    </div>
  );
};
