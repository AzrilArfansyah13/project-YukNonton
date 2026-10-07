import React from 'react';
import { Outlet } from 'react-router-dom';

const CinemaLayout = () => {
  return (
    <div className="min-h-screen bg-[#0A1128] text-white relative overflow-hidden font-sans selection:bg-[#FFC000] selection:text-[#0A1128]">
      {/* Background Projector Light Effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200vw] h-[100vh] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-[#111D3B]/50 to-[#0A1128] opacity-70 blur-3xl mix-blend-screen"></div>
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[100vw] h-[150vh] bg-gradient-to-b from-white/5 to-transparent origin-top rotate-12 blur-2xl"></div>
      </div>

      {/* Header/Nav */}
      <header className="relative z-10 w-full p-6 flex justify-between items-center border-b border-white/5 bg-[#0A1128]/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FFC000] to-yellow-600 flex items-center justify-center shadow-[0_0_15px_rgba(255,192,0,0.4)]">
            <span className="font-serif font-black text-[#0A1128] text-xl leading-none">Y</span>
          </div>
          <h1 className="text-xl font-serif font-bold tracking-widest uppercase">
            Yuk<span className="text-[#FFC000]">Nonton</span>
          </h1>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 pt-8 pb-12 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default CinemaLayout;
