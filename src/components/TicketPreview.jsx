import React, { useRef, useState } from 'react';

const formatIDR = (price) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
};

const TicketPreview = ({ customerName, movie, seats, time, price, popcorn, beverage, isTorn }) => {
  const ticketRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ticketRef.current || isTorn) return;
    const rect = ticketRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="flex-1 flex justify-center items-center p-8 perspective-1000">
      <div 
        ref={ticketRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-80 max-w-full drop-shadow-2xl transition-transform duration-200 ease-out preserve-3d"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        <div className="bg-[#F9F6EE] text-gray-900 rounded-t-xl p-6 relative overflow-hidden shadow-inner">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FFC000] to-yellow-600"></div>
          
          <div className="text-center mb-6">
            <h3 className="font-bold tracking-widest text-sm text-gray-500 uppercase mb-1">Admit One</h3>
            <h2 className="text-2xl font-black font-serif leading-tight">{movie || 'Select Movie'}</h2>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Guest</p>
              <p className="font-medium font-mono text-lg truncate border-b border-gray-300 pb-1">{customerName || 'Your Name'}</p>
            </div>
            
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Time</p>
                <p className="font-medium font-mono text-lg">{time || '--:--'}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase font-semibold">Seats</p>
                <p className="font-medium font-mono text-lg">{seats.length > 0 ? seats.join(', ') : '--'}</p>
              </div>
            </div>

            {/* Display F&B if selected */}
            {( (popcorn && popcorn.flavor && popcorn.size) || (beverage && beverage.flavor && beverage.size) ) && (
              <div className="pt-2 border-t border-gray-300">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Snacks & Beverages</p>
                {popcorn && popcorn.flavor && popcorn.size && (
                  <p className="font-medium font-mono text-xs truncate">🍿 {popcorn.flavor} ({popcorn.size})</p>
                )}
                {beverage && beverage.flavor && beverage.size && (
                  <p className="font-medium font-mono text-xs truncate mt-1">🥤 {beverage.flavor} ({beverage.size})</p>
                )}
              </div>
            )}
          </div>

          <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-[#0A1128] rounded-full"></div>
          <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-[#0A1128] rounded-full"></div>
        </div>

        {!isTorn && (
          <div className="w-full flex items-center justify-between px-3 bg-[#F9F6EE] relative z-10">
            <div className="w-full border-t-2 border-dashed border-gray-400"></div>
          </div>
        )}

        <div 
          className={`bg-[#F9F6EE] text-gray-900 rounded-b-xl p-6 relative overflow-hidden shadow-inner transition-all duration-1000 origin-top
            ${isTorn ? 'translate-y-20 rotate-6 opacity-0' : 'translate-y-0 rotate-0 opacity-100'}
          `}
        >
          <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#0A1128] rounded-full"></div>
          <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#0A1128] rounded-full"></div>

          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Total Price</p>
              <p className="font-black text-xl lg:text-2xl text-[#0A1128] font-mono whitespace-nowrap">{formatIDR(price)}</p>
            </div>
            <div className="flex gap-1 h-12 opacity-80 mix-blend-multiply ml-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-black" style={{ width: `${Math.max(1, Math.random() * 4)}px` }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPreview;
