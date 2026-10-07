import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CinemaLayout from './components/CinemaLayout';
import BookingPage from './components/BookingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CinemaLayout />}>
          <Route index element={<BookingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
