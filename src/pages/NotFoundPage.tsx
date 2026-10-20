import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, ArrowLeft, Home, Compass } from 'lucide-react';
import { AdSection } from '../components/layout/AdSection';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="w-full min-h-[70vh] flex flex-col justify-between">
      <div className="py-20 px-4 sm:px-6 max-w-3xl mx-auto text-center space-y-6 my-auto">
        <div className="w-16 h-16 rounded-2xl bg-rose-600/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto">
          <Dumbbell className="w-8 h-8 -rotate-45" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono uppercase text-rose-500 tracking-widest">
            Error 404 · Route Not Found
          </div>
          <h1 className="text-4xl sm:text-6xl font-black italic uppercase text-white tracking-tight">
            WORKOUT MISSED THE REP
          </h1>
          <p className="text-sm text-neutral-400 max-w-md mx-auto">
            The page you are looking for has moved or does not exist. Let&apos;s get you back on track to crushing your goals.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <Link
            to="/"
            className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            to="/services"
            className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800 font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Programs</span>
          </Link>
        </div>
      </div>

      <AdSection />
    </div>
  );
};
