import React from 'react';

const rows = ['A', 'B', 'C'];
const cols = [1, 2, 3, 4, 5, 6, 7, 8];

const SeatPicker = ({ selectedSeats, onSeatToggle }) => {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-6 mt-6">
      <div className="w-full flex flex-col items-center gap-2">
        <div className="w-3/4 h-2 bg-gradient-to-b from-gray-300 to-transparent rounded-t-[50%] opacity-50 shadow-[0_0_20px_rgba(255,255,255,0.5)]"></div>
        <span className="text-gray-400 text-xs tracking-widest uppercase font-medium">Screen</span>
      </div>

      <div className="flex flex-col gap-4 w-full items-center">
        {rows.map((row) => (
          <div key={row} className="flex gap-3 items-center">
            <span className="text-gray-400 w-4 font-mono text-sm">{row}</span>
            <div className="flex gap-2">
              {cols.map((col) => {
                const seatId = `${row}${col}`;
                const isSelected = selectedSeats.includes(seatId);
                const isOccupied = seatId === 'B4' || seatId === 'C7';

                return (
                  <button
                    key={seatId}
                    type="button"
                    disabled={isOccupied}
                    onClick={() => onSeatToggle(seatId)}
                    className={`w-8 h-8 rounded-t-lg rounded-b-sm transition-all duration-300 flex items-center justify-center text-xs font-mono font-semibold
                      ${isOccupied ? 'bg-[#E50914] cursor-not-allowed shadow-[inset_0_-2px_0_rgba(0,0,0,0.5)] text-black/20' : 
                        isSelected ? 'bg-[#FFC000] shadow-[0_0_10px_#FFC000] text-[#0A1128] scale-110' : 
                        'bg-gray-600 hover:bg-gray-500 text-transparent hover:text-white/50 cursor-pointer shadow-[inset_0_-2px_0_rgba(0,0,0,0.3)]'}
                    `}
                    aria-label={`Seat ${seatId}`}
                  >
                    {isSelected ? seatId : ''}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-6 mt-4 text-xs text-gray-300 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-t-sm bg-gray-600"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-t-sm bg-[#FFC000] shadow-[0_0_5px_#FFC000]"></div>
          <span className="text-white">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-t-sm bg-[#E50914]"></div>
          <span>Occupied</span>
        </div>
      </div>
    </div>
  );
};

export default SeatPicker;
