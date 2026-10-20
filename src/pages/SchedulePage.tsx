import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Check, Filter } from 'lucide-react';
import { SCHEDULE_CLASSES } from '../data/gymData';
import { useApp } from '../context/AppContext';
import { AdSection } from '../components/layout/AdSection';

export const SchedulePage: React.FC = () => {
  const { addToCart, selectedBranch, setSelectedBranch } = useApp();
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const categories = ['all', 'Yoga', 'Aerobics', 'Zumba', 'HIIT', 'Strength'];

  const filteredClasses = SCHEDULE_CLASSES.filter((c) => {
    const matchesDay = c.days.includes(selectedDay as any);
    const matchesCat = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesBranch = c.branch === 'Both' || c.branch === selectedBranch;
    return matchesDay && matchesCat && matchesBranch;
  });

  return (
    <div className="w-full">
      {/* Page Header */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-neutral-950 border-b border-neutral-900 text-center">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-block text-xs font-mono uppercase tracking-widest text-rose-500 bg-rose-950/40 px-3 py-1 rounded border border-rose-900/40">
            Class Timetable
          </div>
          <h1 className="text-4xl sm:text-6xl font-black italic uppercase text-white tracking-tight">
            WEEKLY TRAINING SCHEDULE
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto">
            Live instructor-led morning and evening batches across our Thane and Dombivli studios. Reserve your spot or check workout timings.
          </p>

          {/* Branch switcher inside schedule */}
          <div className="pt-2 flex justify-center">
            <div className="inline-flex items-center gap-1 bg-neutral-900 p-1 rounded-xl border border-neutral-800">
              <button
                type="button"
                onClick={() => setSelectedBranch('Thane')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors ${
                  selectedBranch === 'Thane'
                    ? 'bg-rose-600 text-white shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Thane West Club
              </button>
              <button
                type="button"
                onClick={() => setSelectedBranch('Dombivli')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors ${
                  selectedBranch === 'Dombivli'
                    ? 'bg-rose-600 text-white shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Dombivli East Club
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Day of Week Selector */}
      <section className="sticky top-18 z-30 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-900 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {days.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedDay === day
                  ? 'bg-white text-neutral-950 font-bold shadow'
                  : 'text-neutral-400 hover:text-white bg-neutral-900/70 border border-neutral-800'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </section>

      {/* Main Schedule Content */}
      <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Filter className="w-4 h-4 text-rose-500" />
            <span className="font-mono uppercase">Discipline Filter:</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-rose-600 text-white font-bold'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {cat === 'all' ? 'All Classes' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule Grid */}
        {filteredClasses.length === 0 ? (
          <div className="text-center py-16 bg-neutral-900/30 rounded-2xl border border-neutral-800 text-neutral-500 space-y-2">
            <Calendar className="w-8 h-8 mx-auto text-neutral-600" />
            <p className="text-sm">No group classes scheduled for {selectedDay} in this category.</p>
            <p className="text-xs text-neutral-600">The general gym floor and cardio arena remain open 6:00 AM – 11:00 PM.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((item) => (
              <div
                key={item.id}
                className="p-6 bg-neutral-900/70 border border-neutral-800 rounded-2xl flex flex-col justify-between hover:border-neutral-700 transition-colors space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono uppercase bg-rose-950/60 text-rose-400 border border-rose-900/50 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-neutral-500" />
                      {item.time}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black uppercase italic text-white">{item.title}</h3>
                    <div className="text-xs text-neutral-400 mt-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-rose-500" />
                      <span>Coach: {item.trainer}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-2 border-t border-neutral-800">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-neutral-500" />
                      {item.room} · {item.branch} Club
                    </span>
                    <span className="text-emerald-400 font-medium">Spots Available</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    addToCart({
                      title: `Class Pass: ${item.title} (${item.time})`,
                      type: 'daypass',
                      price: 0,
                      branch: item.branch === 'Both' ? selectedBranch : item.branch,
                      details: `${selectedDay} batch with Coach ${item.trainer}`,
                    })
                  }
                  className="w-full py-2 bg-neutral-800 hover:bg-rose-600 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Reserve Free Spot
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Operating Hours Callout */}
        <div className="p-6 bg-neutral-950 rounded-2xl border border-neutral-900 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-neutral-400">
          <div>
            <h4 className="text-sm font-bold text-white uppercase mb-2">Thane Club Open Hours</h4>
            <p>Monday – Saturday: 6:00 AM – 11:00 PM</p>
            <p>Sunday: 6:00 AM – 9:00 PM</p>
            <p className="text-neutral-500 mt-1">Agrasen Towers, Kolbad Rd, Khopat, Thane (W)</p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white uppercase mb-2">Dombivli Club Open Hours</h4>
            <p>Monday – Saturday: 6:00 AM – 10:30 PM</p>
            <p>Sunday: 6:30 AM – 8:30 PM</p>
            <p className="text-neutral-500 mt-1">Sai Plaza, Manpada Road, Dombivli (E)</p>
          </div>
        </div>
      </section>

      {/* Ad Section at bottom */}
      <AdSection />
    </div>
  );
};
