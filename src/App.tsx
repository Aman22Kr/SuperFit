import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/ui/SearchModal';
import { CartDrawer } from './components/ui/CartDrawer';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { MembershipPage } from './pages/MembershipPage';
import { SchedulePage } from './pages/SchedulePage';
import { TrainersPage } from './pages/TrainersPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top automatically when route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#0a0a0c] text-neutral-100 font-sans selection:bg-rose-500 selection:text-white">
          <Navbar />
          <main className="flex-1 w-full">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
              <Route path="/membership" element={<MembershipPage />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/trainers" element={<TrainersPage />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />

          {/* Global Modals & Drawers */}
          <SearchModal />
          <CartDrawer />
        </div>
      </HashRouter>
    </AppProvider>
  );
}
