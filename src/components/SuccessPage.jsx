import React from 'react';

const formatIDR = (price) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
};

const SuccessPage = ({
  isOpen,
  isVisible,
  customerName,
  movie,
  time,
  seats,
  popcorn,
  beverage,
  totalPrice,
  onBookAnother,
}) => {
  if (!isOpen) return null;

  const hasPopcorn = popcorn && popcorn.flavor && popcorn.size;
  const hasBeverage = beverage && beverage.flavor && beverage.size;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ease-out ${
        isVisible ? 'bg-black/70 backdrop-blur-md' : 'bg-black/0 backdrop-blur-0'
      }`}
      onClick={onBookAnother}
    >
      <div
        className={`bg-[#111D3B] border border-white/10 rounded-2xl p-8 max-w-lg w-full text-center shadow-2xl relative overflow-hidden transition-all duration-500 ease-out ${
          isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-8'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#FFC000] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

        {/* Gold Checkmark */}
        <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-[#FFC000] to-yellow-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(255,192,0,0.35)] relative z-10">
          <svg className="w-10 h-10 text-[#0A1128]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-serif font-bold text-white mb-2 relative z-10">Booking Confirmed!</h2>
        <p className="text-gray-400 mb-8 relative z-10">Enjoy your cinematic experience, {customerName}.</p>

        {/* Summary Card */}
        <div className="bg-[#0A1128] rounded-xl p-6 text-left space-y-4 border border-gray-600 relative z-10">
          <div className="flex justify-between border-b border-gray-700 pb-3">
            <span className="text-gray-500 uppercase text-xs font-bold tracking-wider">Movie</span>
            <span className="font-bold text-white">{movie?.title}</span>
          </div>
          <div className="flex justify-between border-b border-gray-700 pb-3">
            <span className="text-gray-500 uppercase text-xs font-bold tracking-wider">Time</span>
            <span className="font-mono text-white">{time}</span>
          </div>
          <div className="flex justify-between border-b border-gray-700 pb-3">
            <span className="text-gray-500 uppercase text-xs font-bold tracking-wider">Seats</span>
            <span className="font-mono text-white">{seats.join(', ')}</span>
          </div>

          {(hasPopcorn || hasBeverage) && (
            <div className="flex justify-between border-b border-gray-700 pb-3">
              <span className="text-gray-500 uppercase text-xs font-bold tracking-wider self-start pt-0.5">Snacks &<br/>Beverages</span>
              <div className="text-right space-y-1">
                {hasPopcorn && (
                  <div className="font-mono text-white text-sm">🍿 {popcorn.flavor} ({popcorn.size})</div>
                )}
                {hasBeverage && (
                  <div className="font-mono text-white text-sm">🥤 {beverage.flavor} ({beverage.size})</div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-1">
            <span className="text-gray-500 uppercase text-xs font-bold tracking-wider">Total Paid</span>
            <span className="font-mono font-bold text-[#FFC000] text-xl">{formatIDR(totalPrice)}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 relative z-10">
          <button
            onClick={onBookAnother}
            className="inline-block px-10 py-3 rounded-xl bg-gradient-to-r from-[#FFC000] to-yellow-600 text-[#0A1128] font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_25px_rgba(255,192,0,0.5)] hover:scale-[1.03] transition-all duration-300"
          >
            Book Another
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
