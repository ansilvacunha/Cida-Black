import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Booking } from './components/Booking';
import { NeuralStyler } from './components/NeuralStyler';
import { ViewState } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <Navbar currentView={currentView} onChangeView={setCurrentView} />
      
      {currentView === 'home' && <Hero onNavigate={setCurrentView} />}
      {currentView === 'booking' && <Booking />}
      {currentView === 'styler' && <NeuralStyler />}
      
      <footer className="py-8 border-t border-gray-900 mt-auto text-center text-gray-600 text-sm">
        <p>© 2024 Cida Black. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;