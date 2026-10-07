import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const formatIDR = (price) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
};

const SuccessPage = () => {
  const location = useLocation();
  const { movie, seats, time, customerName, totalPrice, popcorn, beverage } = location.state || {};

  if (!movie) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-[#FFC000] mb-4">Booking Not Found</h2>
        <Link to="/" className="text-white hover:underline">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] animate-fade-in-up">
      <div className="bg-[#111D3B] border border-white/10 rounded-2xl p-8 max-w-lg w-full text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#FFC000] rounded-full blur-[80px] opacity-20"></div>
        
        <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-[#FFC000] to-yellow-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,192,0,0.3)]">
          <svg className="w-10 h-10 text-[#0A1128]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h2 className="text-3xl font-serif font-bold text-white mb-2">Booking Confirmed!</h2>
        <p className="text-gray-300 mb-8">Enjoy your cinematic experience, {customerName}.</p>
        
        <div className="bg-[#0A1128] rounded-xl p-6 text-left space-y-4 border border-gray-600">
          <div className="flex justify-between border-b border-gray-600 pb-2">
            <span className="text-gray-400 uppercase text-xs font-bold tracking-wider">Movie</span>
            <span className="font-bold text-white">{movie}</span>
          </div>
          <div className="flex justify-between border-b border-gray-600 pb-2">
            <span className="text-gray-400 uppercase text-xs font-bold tracking-wider">Time</span>
            <span className="font-mono text-white">{time}</span>
          </div>
          <div className="flex justify-between border-b border-gray-600 pb-2">
            <span className="text-gray-400 uppercase text-xs font-bold tracking-wider">Seats</span>
            <span className="font-mono text-white">{seats.join(', ')}</span>
          </div>
          
          {( (popcorn && popcorn.flavor && popcorn.size) || (beverage && beverage.flavor && beverage.size) ) && (
            <div className="flex justify-between border-b border-gray-600 pb-2">
              <span className="text-gray-400 uppercase text-xs font-bold tracking-wider">Snacks & Beverages</span>
              <div className="text-right">
                {popcorn && popcorn.flavor && popcorn.size && (
                  <div className="font-mono text-white text-sm">🍿 {popcorn.flavor} ({popcorn.size})</div>
                )}
                {beverage && beverage.flavor && beverage.size && (
                  <div className="font-mono text-white text-sm mt-1">🥤 {beverage.flavor} ({beverage.size})</div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-2">
            <span className="text-gray-400 uppercase text-xs font-bold tracking-wider">Total Paid</span>
            <span className="font-mono font-bold text-[#FFC000] text-xl">{formatIDR(totalPrice)}</span>
          </div>
        </div>

        <div className="mt-8">
          <Link 
            to="/" 
            className="inline-block px-8 py-3 rounded-xl bg-gray-700 text-white font-bold uppercase tracking-widest text-sm hover:bg-gray-600 transition-colors border border-gray-500"
          >
            Book Another
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
