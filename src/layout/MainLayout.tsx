import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { LoadingScreen } from '../components/LoadingScreen';

export const MainLayout: React.FC = () => {
  const [showLoading, setShowLoading] = useState(true);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#020817] text-[#eafbff] flex flex-col selection:bg-cyan-400 selection:text-slate-950">
      {showLoading && <LoadingScreen onComplete={() => setShowLoading(false)} />}
      <Header />
      <main className="flex-1 w-full relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
