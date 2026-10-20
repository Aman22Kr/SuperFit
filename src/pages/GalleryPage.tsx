import React, { useState } from 'react';
import { ASSET_IMAGES } from '../data/gymData';
import { AdSection } from '../components/layout/AdSection';
import { Maximize2, Shield } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'strength' | 'cardio' | 'studio' | 'steam'>('all');
  const [selectedImg, setSelectedImg] = useState<{ src: string; title: string; desc: string } | null>(null);

  const galleryItems = [
    {
      id: 'g1',
      category: 'strength',
      title: 'Olympic Free Weight Arena',
      desc: 'Competition-grade barbell stations, rubber drop platforms, and calibrated dumbbells.',
      src: ASSET_IMAGES.strength,
      facility: 'Thane & Dombivli',
    },
    {
      id: 'g2',
      category: 'cardio',
      title: 'Biometric Cardio & Endurance Zone',
      desc: 'Commercial curved motorless treadmills, assault air bikes, and rowing stations.',
      src: ASSET_IMAGES.cardio,
      facility: 'Panoramic Windows Suite',
    },
    {
      id: 'g3',
      category: 'studio',
      title: 'Sunlit Aerobics & Power Yoga Studio',
      desc: 'Sprung maple wood floors, full-length mirror wall, acoustic sound engineering.',
      src: ASSET_IMAGES.yoga,
      facility: 'Studio 1',
    },
    {
      id: 'g4',
      category: 'strength',
      title: 'Full Facility Main Training Floor',
      desc: 'Central turf sprint track with integrated sled push lanes and dumbbell racks.',
      src: ASSET_IMAGES.hero,
      facility: 'Main Athletic Deck',
    },
  ];

  const filteredItems = galleryItems.filter(
    (item) => activeFilter === 'all' || item.category === activeFilter
  );

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-neutral-950 border-b border-neutral-900 text-center">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-block text-xs font-mono uppercase tracking-widest text-rose-500 bg-rose-950/40 px-3 py-1 rounded border border-rose-900/40">
            Visual Experience
          </div>
          <h1 className="text-4xl sm:text-6xl font-black italic uppercase text-white tracking-tight">
            FACILITIES & CLUB GALLERY
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto">
            Take a look through our training zones, modern equipment, and dedicated group class studios across Thane and Dombivli.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-18 z-30 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-900 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Spaces' },
            { id: 'strength', label: 'Strength Arena' },
            { id: 'cardio', label: 'Cardio Deck' },
            { id: 'studio', label: 'Yoga & Aerobics Studio' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeFilter === tab.id
                  ? 'bg-rose-600 text-white font-bold shadow'
                  : 'text-neutral-400 hover:text-white bg-neutral-900/60 border border-neutral-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImg({ src: item.src, title: item.title, desc: item.desc })}
              className="group relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 cursor-pointer aspect-[16/10]"
            >
              <img
                src={item.src}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute top-4 right-4 p-2 rounded-lg bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              <div className="absolute bottom-6 left-6 right-6 space-y-1.5">
                <div className="text-[10px] font-mono uppercase tracking-wider text-rose-400">
                  {item.facility}
                </div>
                <h3 className="text-xl sm:text-2xl font-black italic uppercase text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-300 line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal Lightbox */}
      {selectedImg && (
        <div
          onClick={() => setSelectedImg(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="relative aspect-[16/10]">
              <img
                src={selectedImg.src}
                alt={selectedImg.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-white">{selectedImg.title}</h3>
                <p className="text-xs text-neutral-400 mt-1">{selectedImg.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImg(null)}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-mono uppercase rounded-lg border border-neutral-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ad Section at bottom */}
      <AdSection />
    </div>
  );
};
