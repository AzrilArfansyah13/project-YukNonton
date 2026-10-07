import React, { useState } from 'react';
import SeatPicker from './SeatPicker';
import TicketPreview from './TicketPreview';

const movies = [
  { id: 1, title: 'Oppenheimer', price: 45000 },
  { id: 2, title: 'Spider-Man: Brand New Day', price: 50000 },
  { id: 3, title: 'Interstellar (Re-issue)', price: 40000 },
];

const showTimes = ['14:00', '17:30', '21:00'];

const popcornFlavors = ['Sweet Caramel', 'Salty Butter', 'Caramel-Cheese Mix'];
const popcornSizes = [
  { label: 'Regular', price: 35000 },
  { label: 'Large', price: 50000 },
];

const beverageFlavors = ['Coca-Cola', 'Lemon Tea', 'Mineral Water'];
const beverageSizes = [
  { label: 'Regular', price: 15000 },
  { label: 'Large', price: 25000 },
];

const formatIDR = (price) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
};

const BookingPage = () => {
  const [isAction, setIsAction] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(movies[0]);
  const [selectedTime, setSelectedTime] = useState(showTimes[0]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [customerName, setCustomerName] = useState('');

  // F&B States
  const [popcorn, setPopcorn] = useState({ flavor: '', size: '' });
  const [beverage, setBeverage] = useState({ flavor: '', size: '' });

  const [animStage, setAnimStage] = useState('idle'); // 'idle', 'flying', 'tearing', 'done'
  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // controls CSS transition in

  const seatPrice = selectedMovie ? selectedMovie.price * selectedSeats.length : 0;

  const getPopcornPrice = () => {
    if (!popcorn.size) return 0;
    return popcornSizes.find(s => s.label === popcorn.size)?.price || 0;
  };

  const getBeveragePrice = () => {
    if (!beverage.size) return 0;
    return beverageSizes.find(s => s.label === beverage.size)?.price || 0;
  };

  const totalPrice = seatPrice + getPopcornPrice() + getBeveragePrice();

  const handleSeatToggle = (seatId) => {
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(s => s !== seatId)
        : [...prev, seatId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSeats.length === 0 || !customerName) {
      alert('Please enter your name and select at least one seat.');
      return;
    }

    // 1. Trigger ticket flying to center
    setAnimStage('flying');

    // 2. After flying finishes (~0.8s), start tear animation
    setTimeout(() => {
      setAnimStage('tearing');
      
      // 3. After tearing finishes (~0.7s), mount modal then trigger fade-in
      setTimeout(() => {
        setAnimStage('done');
        setShowModal(true);
        // Small delay so the DOM mounts before we toggle the CSS transition class
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setModalVisible(true);
          });
        });
      }, 700);
    }, 800);
  };

  const handleBookAnother = () => {
    // Close modal with fade-out first
    setModalVisible(false);
    setTimeout(() => {
      setShowModal(false);
      // Reset all form state
      setAnimStage('idle');
      setSelectedMovie(movies[0]);
      setSelectedTime(showTimes[0]);
      setSelectedSeats([]);
      setCustomerName('');
      setPopcorn({ flavor: '', size: '' });
      setBeverage({ flavor: '', size: '' });
    }, 400);
  };

  // Build F&B summary for modal
  const hasPopcorn = popcorn.flavor && popcorn.size;
  const hasBeverage = beverage.flavor && beverage.size;

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto min-h-[calc(100vh-4rem)] p-4 lg:p-8">

      {/* Director's Clapperboard — Toggle Switch */}
      <div
        className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12 mx-auto w-fit cursor-pointer group select-none z-20"
        onClick={() => setIsAction(prev => !prev)}
      >
        <div className="relative w-40 h-28 bg-[#050914] border-2 border-[#FFC000] rounded-md shadow-[0_0_15px_rgba(255,192,0,0.15)] flex flex-col justify-end overflow-visible group-hover:border-yellow-400 transition-colors">
          {/* Top hinged stick */}
          <div
            className={`absolute top-0 left-0 w-full h-7 bg-[#050914] border-2 border-[#FFC000] rounded-sm flex overflow-hidden z-10 transition-transform duration-300 ease-in-out
              ${isAction ? 'rotate-0' : '-rotate-[25deg]'}
            `}
            style={{ transformOrigin: '0% 100%' }}
          >
            <div className="w-1/4 h-full bg-[#FFC000] -skew-x-12 transform -translate-x-3"></div>
            <div className="w-1/4 h-full bg-[#FFC000] -skew-x-12 transform ml-3"></div>
            <div className="w-1/4 h-full bg-[#FFC000] -skew-x-12 transform ml-3"></div>
            <div className="w-1/4 h-full bg-[#FFC000] -skew-x-12 transform ml-3"></div>
            <div className="w-1/4 h-full bg-[#FFC000] -skew-x-12 transform ml-3"></div>
          </div>
          {/* Bottom stationary stick */}
          <div className="absolute top-7 left-0 w-full h-7 bg-[#050914] border-2 border-[#FFC000] rounded-sm flex overflow-hidden">
            <div className="w-1/4 h-full bg-[#FFC000] -skew-x-12 transform -translate-x-3"></div>
            <div className="w-1/4 h-full bg-[#FFC000] -skew-x-12 transform ml-3"></div>
            <div className="w-1/4 h-full bg-[#FFC000] -skew-x-12 transform ml-3"></div>
            <div className="w-1/4 h-full bg-[#FFC000] -skew-x-12 transform ml-3"></div>
            <div className="w-1/4 h-full bg-[#FFC000] -skew-x-12 transform ml-3"></div>
          </div>
          <div className="text-center pb-3 text-[#FFC000] font-mono font-bold text-sm uppercase tracking-widest mt-14 opacity-90">
            SCENE 1
          </div>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <div className={`font-serif font-black text-3xl transition-all duration-500
            ${isAction
              ? 'text-[#FFC000] drop-shadow-[0_0_20px_rgba(255,192,0,0.8)]'
              : 'text-gray-400 group-hover:text-gray-200'}
          `}>
            {isAction ? 'Action!' : 'Ready?'}
          </div>
          <p className={`text-xs mt-1 transition-colors duration-500 ${isAction ? 'text-[#FFC000]/60' : 'text-gray-500'}`}>
            {isAction ? 'Click clapperboard to close' : 'Click clapperboard to start'}
          </p>
        </div>
      </div>

      {/* Form + Ticket Area */}
      <div className={`flex flex-col lg:flex-row w-full gap-8 transition-all duration-700 ease-out
        ${!isAction
          ? 'opacity-30 blur-[3px] pointer-events-none scale-[0.98]'
          : 'opacity-100 blur-0 pointer-events-auto scale-100'}
      `}>
        {/* Form Panel */}
        <div className={`flex-1 bg-[#111D3B] rounded-2xl p-6 lg:p-8 border border-white/10 relative z-10 transition-shadow duration-700
          ${isAction ? 'shadow-[0_0_60px_rgba(255,192,0,0.12)]' : 'shadow-2xl'}
        `}>
          <h1 className="text-3xl font-serif font-bold mb-8 text-white border-b border-white/10 pb-4">
            <span className="text-[#FFC000]">Book Your Ticket</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Guest Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">Guest Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full bg-[#0A1128] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFC000] focus:ring-1 focus:ring-[#FFC000] transition-colors"
                required
              />
            </div>

            {/* Movie Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Select Feature</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {movies.map(movie => (
                  <div
                    key={movie.id}
                    onClick={() => setSelectedMovie(movie)}
                    className={`cursor-pointer rounded-xl p-4 border transition-all duration-300
                      ${selectedMovie?.id === movie.id
                        ? 'bg-gradient-to-br from-[#FFC000]/20 to-transparent border-[#FFC000] shadow-[0_0_15px_rgba(255,192,0,0.3)]'
                        : 'border-gray-600 bg-[#0A1128] hover:border-gray-400'}
                    `}
                  >
                    <h3 className="font-bold text-white">{movie.title}</h3>
                    <p className="text-[#FFC000] text-sm mt-1 font-mono">{formatIDR(movie.price)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Select Showtime</label>
              <div className="flex flex-wrap gap-3">
                {showTimes.map(time => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`px-6 py-2 rounded-full font-mono text-sm font-semibold transition-all
                      ${selectedTime === time
                        ? 'bg-[#FFC000] text-[#0A1128] shadow-[0_0_15px_rgba(255,192,0,0.4)]'
                        : 'bg-[#0A1128] text-gray-300 border border-gray-600 hover:border-gray-400'}
                    `}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Seat Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Select Seats</label>
              <div className="bg-[#0A1128] rounded-xl p-6 border border-gray-600">
                <SeatPicker selectedSeats={selectedSeats} onSeatToggle={handleSeatToggle} />
              </div>
            </div>

            {/* F&B Section */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Snacks & Beverages</label>
              <div className="space-y-6 bg-[#0A1128] rounded-xl p-6 border border-gray-600">
                {/* Popcorn */}
                <div className="border-b border-gray-700 pb-6">
                  <h4 className="font-bold text-white mb-4">🍿 Popcorn</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Flavor</p>
                      <div className="flex flex-wrap gap-2">
                        {popcornFlavors.map(flavor => (
                          <button key={flavor} type="button"
                            onClick={() => setPopcorn(prev => ({ ...prev, flavor: prev.flavor === flavor ? '' : flavor }))}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-all border ${popcorn.flavor === flavor ? 'bg-[#FFC000] text-[#0A1128] border-[#FFC000]' : 'bg-[#111D3B] text-gray-300 border-gray-600 hover:border-[#FFC000]/50'}`}
                          >{flavor}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Size</p>
                      <div className="flex flex-wrap gap-2">
                        {popcornSizes.map(size => (
                          <button key={size.label} type="button"
                            onClick={() => setPopcorn(prev => ({ ...prev, size: prev.size === size.label ? '' : size.label }))}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-all border ${popcorn.size === size.label ? 'bg-[#FFC000] text-[#0A1128] border-[#FFC000]' : 'bg-[#111D3B] text-gray-300 border-gray-600 hover:border-[#FFC000]/50'}`}
                          >{size.label} - {formatIDR(size.price)}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Beverages */}
                <div>
                  <h4 className="font-bold text-white mb-4">🥤 Beverages</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Flavor</p>
                      <div className="flex flex-wrap gap-2">
                        {beverageFlavors.map(flavor => (
                          <button key={flavor} type="button"
                            onClick={() => setBeverage(prev => ({ ...prev, flavor: prev.flavor === flavor ? '' : flavor }))}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-all border ${beverage.flavor === flavor ? 'bg-[#FFC000] text-[#0A1128] border-[#FFC000]' : 'bg-[#111D3B] text-gray-300 border-gray-600 hover:border-[#FFC000]/50'}`}
                          >{flavor}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Size</p>
                      <div className="flex flex-wrap gap-2">
                        {beverageSizes.map(size => (
                          <button key={size.label} type="button"
                            onClick={() => setBeverage(prev => ({ ...prev, size: prev.size === size.label ? '' : size.label }))}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-all border ${beverage.size === size.label ? 'bg-[#FFC000] text-[#0A1128] border-[#FFC000]' : 'bg-[#111D3B] text-gray-300 border-gray-600 hover:border-[#FFC000]/50'}`}
                          >{size.label} - {formatIDR(size.price)}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={animStage !== 'idle' || selectedSeats.length === 0 || !customerName}
              className={`w-full py-4 rounded-xl font-bold text-lg uppercase tracking-widest transition-all duration-300 relative overflow-hidden group
                ${(selectedSeats.length === 0 || !customerName)
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#FFC000] to-yellow-600 text-[#0A1128] shadow-[0_0_20px_rgba(255,192,0,0.5)] hover:shadow-[0_0_30px_rgba(255,192,0,0.8)] hover:scale-[1.02]'}
              `}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {animStage !== 'idle' ? 'Processing...' : `Book Now - ${formatIDR(totalPrice)}`}
              </span>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-30 group-hover:animate-shine" />
            </button>
          </form>
        </div>

        {/* Ticket Preview Panel */}
        <div className="flex-1 sticky top-8 h-fit lg:h-auto z-20">
          <TicketPreview
            customerName={customerName}
            movie={selectedMovie?.title}
            seats={selectedSeats}
            time={selectedTime}
            price={totalPrice}
            popcorn={popcorn}
            beverage={beverage}
            animStage={animStage}
          />
        </div>
      </div>

      {/* ========== Confirmation Modal ========== */}
      {showModal && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ease-out
            ${modalVisible ? 'bg-black/70 backdrop-blur-md' : 'bg-black/0 backdrop-blur-0'}
          `}
          onClick={handleBookAnother}
        >
          <div
            className={`bg-[#111D3B] border border-white/10 rounded-2xl p-8 max-w-lg w-full text-center shadow-2xl relative overflow-hidden transition-all duration-500 ease-out
              ${modalVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-8'}
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative glow behind checkmark */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#FFC000] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

            {/* Gold Checkmark Icon */}
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
                <span className="font-bold text-white">{selectedMovie?.title}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-3">
                <span className="text-gray-500 uppercase text-xs font-bold tracking-wider">Time</span>
                <span className="font-mono text-white">{selectedTime}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-3">
                <span className="text-gray-500 uppercase text-xs font-bold tracking-wider">Seats</span>
                <span className="font-mono text-white">{selectedSeats.join(', ')}</span>
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

            {/* Book Another Button */}
            <div className="mt-8 relative z-10">
              <button
                onClick={handleBookAnother}
                className="inline-block px-10 py-3 rounded-xl bg-gradient-to-r from-[#FFC000] to-yellow-600 text-[#0A1128] font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_25px_rgba(255,192,0,0.5)] hover:scale-[1.03] transition-all duration-300"
              >
                Book Another
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
