import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Dumbbell, Shield, Activity, Github } from 'lucide-react';
import { BRANCHES } from '../../data/gymData';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { animationSpeed, setAnimationSpeed } = useApp();

  return (
    <footer className="w-full bg-neutral-950 border-t border-neutral-900 text-neutral-400">
      {/* Upper footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand & Mission */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-rose-600 flex items-center justify-center text-white">
              <Dumbbell className="w-5 h-5 -rotate-45" />
            </div>
            <span className="text-2xl font-black italic tracking-wider text-white uppercase">
              SUPER<span className="text-rose-500">FIT</span>
            </span>
          </div>
          <p className="text-sm text-neutral-400 leading-relaxed max-w-md">
            SuperFit is premier fitness club in Thane and Dombivli. Built on science-based progressive training, certified coaching, modern strength rigs, and community-driven group fitness.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-neutral-400">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-rose-500" />
              <span>Certified Coaches</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-rose-500" />
              <span>InBody Diagnostics</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Github className="w-4 h-4 text-neutral-300" />
              <a
                href="https://github.com/Aman22kr"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors underline underline-offset-4"
              >
                GitHub: Aman22kr
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-200">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/services" className="hover:text-white transition-colors">Fitness Programs</Link></li>
            <li><Link to="/membership" className="hover:text-white transition-colors">Membership Plans</Link></li>
            <li><Link to="/schedule" className="hover:text-white transition-colors">Class Timetable</Link></li>
            <li><Link to="/trainers" className="hover:text-white transition-colors">Certified Trainers</Link></li>
            <li><Link to="/calculator" className="hover:text-white transition-colors">BMI & Calorie Tool</Link></li>
            <li><Link to="/gallery" className="hover:text-white transition-colors">Facility Gallery</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About Our Story</Link></li>
          </ul>
        </div>

        {/* Thane Branch */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-rose-400">Thane West Club</h4>
          <div className="text-xs space-y-2 text-neutral-400">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
              <span>{BRANCHES[0].address}, {BRANCHES[0].landmark}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-neutral-500 shrink-0" />
              <a href="tel:+919594291976" className="hover:text-rose-400 font-mono">{BRANCHES[0].phone}</a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-neutral-500 shrink-0" />
              <span>{BRANCHES[0].email}</span>
            </p>
            <p className="flex items-center gap-2 text-neutral-400">
              <Clock className="w-4 h-4 text-neutral-500 shrink-0" />
              <span>{BRANCHES[0].hoursWeekday}</span>
            </p>
          </div>
        </div>

        {/* Dombivli Branch */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-rose-400">Dombivli East Club</h4>
          <div className="text-xs space-y-2 text-neutral-400">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
              <span>{BRANCHES[1].address}, {BRANCHES[1].landmark}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-neutral-500 shrink-0" />
              <a href="tel:+919820543210" className="hover:text-rose-400 font-mono">{BRANCHES[1].phone}</a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-neutral-500 shrink-0" />
              <span>{BRANCHES[1].email}</span>
            </p>
            <p className="flex items-center gap-2 text-neutral-400">
              <Clock className="w-4 h-4 text-neutral-500 shrink-0" />
              <span>{BRANCHES[1].hoursWeekday}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Persistence and Animation Setting Bar */}
      <div className="border-t border-neutral-900 bg-neutral-950/80 px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© {new Date().getFullYear()} SuperFit Fitness Club. Recreated from Fun & Fit.</span>
            <span className="hidden sm:inline text-neutral-700">·</span>
            <span className="text-[11px] text-neutral-400">
              Client-side persistent demo using browser LocalStorage. No live payments or server auth required.
            </span>
          </div>

          {/* Quick Settings: Animation Speed Control */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase text-neutral-400">Animation:</span>
            <div className="flex items-center bg-neutral-900 rounded p-0.5 border border-neutral-800">
              {(['NORMAL', 'SLOW', 'FAST', 'OFF'] as const).map((speed) => (
                <button
                  key={speed}
                  type="button"
                  onClick={() => setAnimationSpeed(speed)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                    animationSpeed === speed
                      ? 'bg-rose-600 text-white font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {speed}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
