import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Shield, Award, Users, ChevronRight, Check } from 'lucide-react';
import { SERVICES, MEMBERSHIP_PLANS, TRAINERS, TESTIMONIALS, ASSET_IMAGES } from '../data/gymData';
import { useApp } from '../context/AppContext';
import { AdSection } from '../components/layout/AdSection';

export const HomePage: React.FC = () => {
  const { addToCart, selectedBranch } = useApp();

  const featuredServices = SERVICES.slice(0, 4);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-neutral-900">
        {/* Background Image with Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={ASSET_IMAGES.hero}
            alt="SuperFit High-Performance Gym Floor"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-neutral-950/40 to-neutral-950/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-rose-400 bg-rose-950/60 border border-rose-800/60 px-3 py-1.5 rounded-md">
              <Flame className="w-4 h-4 text-rose-500 animate-pulse" />
              <span>Thane & Dombivli’s Premier Fitness Clubs</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black italic uppercase tracking-tight text-white leading-none text-balance">
              TRAIN HARDER. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-rose-400 to-amber-400">
                LIVE FITTER.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Recharge your strength and stamina at SuperFit. World-class Olympic lifting rigs, high-energy aerobics, authentic power yoga, and certified personal coaching built for your transformation.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                type="button"
                onClick={() =>
                  addToCart({
                    title: '1-Day Free Club Pass',
                    type: 'daypass',
                    price: 0,
                    branch: selectedBranch,
                    details: 'Full gym floor and cardio zone trial access',
                  })
                }
                className="w-full sm:w-auto px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-rose-900/40 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Claim Free 1-Day Pass</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                to="/services"
                className="w-full sm:w-auto px-7 py-4 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <span>Explore All Programs</span>
              </Link>
            </div>

            {/* Metric proof points */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-neutral-800/80 text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-black font-athletic text-white tracking-tight">12,000+</div>
                <div className="text-xs text-neutral-400">Members Transformed</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black font-athletic text-white tracking-tight">20+</div>
                <div className="text-xs text-neutral-400">Certified Trainers</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black font-athletic text-white tracking-tight">2 Clubs</div>
                <div className="text-xs text-neutral-400">Thane & Dombivli</div>
              </div>
            </div>
          </div>

          {/* Quick branch card */}
          <div className="w-full lg:w-96 bg-neutral-900/80 border border-neutral-800/90 rounded-2xl p-6 backdrop-blur-md shadow-2xl text-left space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="text-xs font-mono uppercase text-rose-400 tracking-wider">Today&apos;s Schedule</span>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                Open 6:00 AM – 11:00 PM
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800/80">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-white">Power Yoga Sunrise</span>
                  <span className="font-mono text-neutral-400">06:30 AM</span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-0.5">Studio 1 · Trainer Ananya</p>
              </div>

              <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800/80">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-white">Step Cardio Aerobics</span>
                  <span className="font-mono text-neutral-400">07:30 AM</span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-0.5">Studio 1 · Trainer Priya</p>
              </div>

              <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800/80">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-white">Evening Zumba Party</span>
                  <span className="font-mono text-neutral-400">07:30 PM</span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-0.5">Studio 1 · High Energy Dance</p>
              </div>
            </div>

            <Link
              to="/schedule"
              className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium rounded-lg text-center flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>View Full Weekly Timetable</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Facilities & Features Bento Grid */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-rose-500">World-Class Facilities</span>
          <h2 className="text-3xl sm:text-5xl font-black italic uppercase text-white tracking-tight">
            ENGINEERED FOR PEAK PERFORMANCE
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Every square foot at SuperFit is purposefully designed. From high-impact Olympic turf to quiet mindfulness yoga lofts and restorative steam suites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Strength */}
          <div className="md:col-span-2 group relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/60 min-h-[360px] flex flex-col justify-end p-8">
            <img
              src={ASSET_IMAGES.strength}
              alt="SuperFit Strength Arena"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
            <div className="relative z-10 space-y-2">
              <div className="text-xs font-mono text-rose-400 uppercase tracking-wider">Heavy Iron Arena</div>
              <h3 className="text-2xl sm:text-3xl font-black italic uppercase text-white">
                Olympic Barbells & Power Racks
              </h3>
              <p className="text-sm text-neutral-300 max-w-lg">
                Dumbbells up to 50kg, competition benches, dual cable towers, and shock-absorbing rubber lifting platforms.
              </p>
              <div className="pt-2">
                <Link
                  to="/services/strength-training"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-400 hover:text-rose-300"
                >
                  <span>Explore Strength Arena</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Cardio Studio */}
          <div className="group relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/60 min-h-[360px] flex flex-col justify-end p-8">
            <img
              src={ASSET_IMAGES.cardio}
              alt="Cardio Studio Floor"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
            <div className="relative z-10 space-y-2">
              <div className="text-xs font-mono text-rose-400 uppercase tracking-wider">Endurance Zone</div>
              <h3 className="text-xl sm:text-2xl font-black italic uppercase text-white">
                Biometric Cardio Deck
              </h3>
              <p className="text-xs text-neutral-300">
                Curved runners, rowing machines, and assault bikes with real-time biometric telemetry.
              </p>
              <div className="pt-2">
                <Link
                  to="/services/cardio-conditioning"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-400 hover:text-rose-300"
                >
                  <span>View Cardio Equipment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 3: Group Aerobics & Yoga */}
          <div className="group relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/60 min-h-[360px] flex flex-col justify-end p-8">
            <img
              src={ASSET_IMAGES.yoga}
              alt="Group Aerobics and Power Yoga Studio"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
            <div className="relative z-10 space-y-2">
              <div className="text-xs font-mono text-rose-400 uppercase tracking-wider">Group Studios</div>
              <h3 className="text-xl sm:text-2xl font-black italic uppercase text-white">
                Aerobics, Zumba & Yoga
              </h3>
              <p className="text-xs text-neutral-300">
                Acoustically insulated sprung hardwood floors, state-of-the-art sound, and panoramic mirrors.
              </p>
              <div className="pt-2">
                <Link
                  to="/services/power-yoga"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-400 hover:text-rose-300"
                >
                  <span>View Group Schedule</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 4: Coaches & Science */}
          <div className="md:col-span-2 rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-rose-500" />
                <span className="text-xs font-mono uppercase tracking-wider text-rose-400">
                  Certified Guidance
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black italic uppercase text-white">
                Personalized Coaching & InBody Scans
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-xl">
                We eliminate guesswork. Every member undergoes movement screening and segmental body composition scanning to identify muscle asymmetries, basal metabolic rate, and visceral fat levels.
              </p>
            </div>
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-neutral-800">
              <div>
                <div className="text-sm font-bold text-white">InBody 270</div>
                <div className="text-xs text-neutral-500">Body Fat & Muscle Scans</div>
              </div>
              <div>
                <div className="text-sm font-bold text-white">Custom Macros</div>
                <div className="text-xs text-neutral-500">Dietitian Guided</div>
              </div>
              <div>
                <div className="text-sm font-bold text-white">Steam & Sauna</div>
                <div className="text-xs text-neutral-500">Post-Workout Recovery</div>
              </div>
              <div>
                <div className="text-sm font-bold text-white">Locker Suites</div>
                <div className="text-xs text-neutral-500">Hot Showers & Storage</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gym Tour Section WITH REQUIRED BLANK SQUARE SPACE */}
      {/* "If there is an area for a YouTube video link or thumbnail that takes you to YouTube, just put a blank square space there." */}
      <section className="py-16 px-4 sm:px-6 bg-neutral-950 border-y border-neutral-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-rose-500">Virtual Club Tour</span>
            <h2 className="text-3xl sm:text-4xl font-black italic uppercase text-white tracking-tight">
              EXPERIENCE THE SUPERFIT ATMOSPHERE
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Step inside our Thane and Dombivli club environments. Witness the high-energy group studio, the heavy dumbbell rack, and our restorative steam rooms before your first visit.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs text-neutral-300">
                  Fully sanitized equipment maintained daily with hospital-grade antimicrobial standards
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs text-neutral-300">
                  High-airflow ventilation and air filtration keeping training arenas cool and fresh
                </span>
              </div>
            </div>
            <div className="pt-2">
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg border border-neutral-800 transition-colors"
              >
                <span>View Complete Photo Gallery</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Prompt instruction: Blank square space where YouTube video link/thumbnail would be */}
          <div className="flex justify-center">
            <div
              aria-label="Gym video space"
              className="w-full max-w-[420px] aspect-square bg-neutral-900/40 border-2 border-dashed border-neutral-800 rounded-2xl flex flex-col items-center justify-center p-6 text-center shadow-inner"
            >
              <div className="w-12 h-12 rounded-lg bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-neutral-500 mb-3">
                <div className="w-0 h-0 border-y-6 border-y-transparent border-l-10 border-l-neutral-400 ml-1" />
              </div>
              <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                Video Presentation Area
              </div>
              <div className="text-[11px] text-neutral-600 mt-1 max-w-xs">
                (Blank video space designated for local tour display)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs Section */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-rose-500">Core Disciplines</span>
            <h2 className="text-3xl sm:text-4xl font-black italic uppercase text-white tracking-tight mt-1">
              SIGNATURE FITNESS PROGRAMS
            </h2>
          </div>
          <Link
            to="/services"
            className="text-xs font-bold uppercase tracking-wider text-rose-400 hover:text-rose-300 flex items-center gap-1 shrink-0"
          >
            <span>View All 8 Programs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service) => (
            <div
              key={service.id}
              className="bg-neutral-900/70 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-neutral-700 transition-colors group"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-rose-400 uppercase tracking-wide border border-neutral-800">
                    {service.category}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-black uppercase italic text-white group-hover:text-rose-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {service.shortDesc}
                  </p>
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-2 border-t border-neutral-800/80">
                    <span>{service.duration}</span>
                    <span>{service.caloriesBurned}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  to={`/services/${service.slug}`}
                  className="w-full py-2 bg-neutral-800 hover:bg-rose-600 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Membership Plans Snapshot */}
      <section className="py-20 px-4 sm:px-6 bg-neutral-900/30 border-y border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-rose-500">Transparent Pricing</span>
            <h2 className="text-3xl sm:text-4xl font-black italic uppercase text-white tracking-tight">
              JOIN SUPERFIT TODAY
            </h2>
            <p className="text-sm text-neutral-400">
              No hidden initiation fees. Flexible month-to-month or discounted multi-month transformation packages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {MEMBERSHIP_PLANS.slice(1, 4).map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-7 flex flex-col justify-between transition-all ${
                  plan.popular
                    ? 'bg-neutral-900 border-2 border-rose-500 shadow-2xl shadow-rose-950/40 md:-translate-y-2'
                    : 'bg-neutral-900/60 border border-neutral-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow">
                    Most Popular Choice
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-black italic uppercase text-white">{plan.title}</h3>
                    <p className="text-xs text-neutral-400 mt-1">{plan.tagline}</p>
                  </div>

                  <div className="py-2 border-y border-neutral-800">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black font-athletic text-white">
                        ₹{plan.totalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-neutral-400">/ {plan.period}</span>
                    </div>
                    <div className="text-[11px] font-mono text-rose-400 mt-0.5">
                      (Approx. ₹{plan.monthlyEquivalent}/mo)
                    </div>
                  </div>

                  <ul className="space-y-2 text-xs text-neutral-300">
                    {plan.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() =>
                      addToCart({
                        title: plan.title,
                        type: 'membership',
                        price: plan.totalPrice,
                        branch: selectedBranch,
                        details: `${plan.period} Membership`,
                      })
                    }
                    className={`w-full py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer ${
                      plan.popular
                        ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/50'
                        : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                    }`}
                  >
                    Select {plan.title.split(' ')[0]}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/membership"
              className="text-xs font-semibold text-neutral-400 hover:text-white underline underline-offset-4"
            >
              Compare all 5 plans including Annual VIP & Day Pass →
            </Link>
          </div>
        </div>
      </section>

      {/* Trainers Spotlight */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-rose-500">Elite Faculty</span>
            <h2 className="text-3xl sm:text-4xl font-black italic uppercase text-white tracking-tight mt-1">
              MEET YOUR HEAD COACHES
            </h2>
          </div>
          <Link
            to="/trainers"
            className="text-xs font-bold uppercase tracking-wider text-rose-400 hover:text-rose-300 flex items-center gap-1 shrink-0"
          >
            <span>View All Trainers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRAINERS.slice(0, 3).map((trainer) => (
            <div
              key={trainer.id}
              className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-rose-400 bg-rose-950/50 px-2 py-0.5 rounded border border-rose-900/50">
                    {trainer.experience}
                  </span>
                  <span className="text-xs text-neutral-400">{trainer.branch} Club</span>
                </div>
                <div>
                  <h3 className="text-xl font-black italic uppercase text-white">{trainer.name}</h3>
                  <p className="text-xs text-neutral-400 font-medium">{trainer.role}</p>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">{trainer.bio}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {trainer.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono text-neutral-300 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  addToCart({
                    title: `Free Assessment with Coach ${trainer.name}`,
                    type: 'assessment',
                    price: 0,
                    branch: trainer.branch === 'Both' ? selectedBranch : trainer.branch,
                    details: '1-on-1 30-min technique and movement evaluation',
                  })
                }
                className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Book Free Assessment
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Member Testimonials */}
      <section className="py-16 px-4 sm:px-6 bg-neutral-950 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-rose-500">Real Results</span>
            <h2 className="text-3xl font-black italic uppercase text-white tracking-tight">
              COMMUNITY VOICES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-6 bg-neutral-900/40 rounded-2xl border border-neutral-800/80 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-900/40 px-2.5 py-1 rounded inline-block">
                    Result: {t.result}
                  </div>
                  <p className="text-sm text-neutral-300 italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="pt-3 border-t border-neutral-800/80">
                  <div className="text-sm font-bold text-white">{t.name}</div>
                  <div className="text-xs text-neutral-500">{t.role} · {t.branch}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Smaller Ad section at the bottom of the page */}
      <AdSection />
    </div>
  );
};
