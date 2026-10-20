import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, Dumbbell } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cart, setIsCartOpen, setIsSearchOpen, selectedBranch, setSelectedBranch } = useApp();

  const navLinks = [
    { label: 'Programs', path: '/services' },
    { label: 'Memberships', path: '/membership' },
    { label: 'Schedule', path: '/schedule' },
    { label: 'Trainers', path: '/trainers' },
    { label: 'About', path: '/about' },
  ];

  const secondaryLinks = [
    { label: 'Fitness Calculator', path: '/calculator' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
  ];

  const totalCartCount = cart.length;

  return (
    <>
      {/* Top micro bar for branch selector & operating hotline */}
      <div className="w-full bg-neutral-950 border-b border-neutral-900 text-neutral-400 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-neutral-500 hidden sm:inline">Active Club:</span>
            <div className="flex items-center gap-1 bg-neutral-900 p-0.5 rounded border border-neutral-800">
              <button
                type="button"
                onClick={() => setSelectedBranch('Thane')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  selectedBranch === 'Thane'
                    ? 'bg-neutral-800 text-white font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Thane (W)
              </button>
              <button
                type="button"
                onClick={() => setSelectedBranch('Dombivli')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  selectedBranch === 'Dombivli'
                    ? 'bg-neutral-800 text-white font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Dombivli (E)
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden md:inline text-neutral-400">
              Hours: 6:00 AM – 11:00 PM Daily
            </span>
            <a
              href="tel:+919594291976"
              className="text-rose-400 hover:text-rose-300 font-mono transition-colors"
            >
              +91 95942 91976
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar strictly obeying Top Bar Contract */}
      <header className="sticky top-0 z-40 w-full bg-neutral-950/95 backdrop-blur-md border-b border-neutral-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 h-18">
          {/* Zone 1: Single text element wordmark */}
          <Link
            to="/"
            className="text-2xl font-black italic tracking-wider text-white uppercase whitespace-nowrap shrink-0 flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded bg-rose-600 flex items-center justify-center text-white transform group-hover:scale-105 transition-transform">
              <Dumbbell className="w-5 h-5 -rotate-45" />
            </div>
            <span>
              SUPER<span className="text-rose-500">FIT</span>
            </span>
          </Link>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                    isActive
                      ? 'border-rose-500 text-white font-semibold'
                      : 'border-transparent text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              to="/calculator"
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                location.pathname === '/calculator'
                  ? 'border-rose-500 text-white font-semibold'
                  : 'border-transparent text-neutral-400 hover:border-neutral-700'
              }`}
            >
              BMI Tool
            </Link>
          </nav>

          {/* Zone 3: 1 primary action button + affordances */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Global Search Affordance */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search workouts, trainers, or plans"
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart / Booking Drawer Affordance */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label="View booking cart"
              className="relative p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center font-mono">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Primary Action Button */}
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors shadow-lg shadow-rose-900/30 whitespace-nowrap shrink-0"
            >
              Book Free Trial
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-neutral-950 border-b border-neutral-800 px-6 py-6 space-y-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium py-1.5 transition-colors ${
                    location.pathname === link.path
                      ? 'text-rose-500 font-semibold'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-neutral-900 my-2" />
              {secondaryLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm py-1 transition-colors ${
                    location.pathname === link.path
                      ? 'text-rose-500 font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 flex items-center justify-center text-xs font-bold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors"
              >
                Book Free Trial
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
