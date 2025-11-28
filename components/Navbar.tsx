import React from 'react';
import { ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onChangeView }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center cursor-pointer" onClick={() => onChangeView('home')}>
            <div className="bg-yellow-500 p-2 rounded-md mr-3">
              {/* Icone de Garfo/Pente Afro (Afro Pick) */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="2" width="2" height="9" rx="1" />
                <rect x="10" y="2" width="2" height="9" rx="1" />
                <rect x="14" y="2" width="2" height="9" rx="1" />
                <rect x="18" y="2" width="2" height="9" rx="1" />
                <path d="M4 10H22V14C22 15.1046 21.1046 16 20 16H14.5V20C14.5 21.1046 13.6046 22 12.5 22H11.5C10.3954 22 9.5 21.1046 9.5 20V16H4C2.89543 16 2 15.1046 2 14V12C2 10.8954 2.89543 10 4 10Z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white tracking-wider">CIDA <span className="text-yellow-400">BLACK</span></span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => onChangeView('home')}
              className={`${currentView === 'home' ? 'text-yellow-400' : 'text-gray-300 hover:text-white'} flex items-center gap-2 font-medium transition-colors`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              INÍCIO
            </button>
            <button 
              onClick={() => onChangeView('styler')}
              className={`${currentView === 'styler' ? 'text-yellow-400' : 'text-gray-300 hover:text-white'} flex items-center gap-2 font-medium transition-colors`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              ESTILIZADOR NEURAL
            </button>
            <button 
              onClick={() => onChangeView('booking')}
              className={`${currentView === 'booking' ? 'bg-yellow-500 text-black' : 'text-gray-300 hover:text-white'} px-4 py-2 rounded-full font-bold flex items-center gap-2 transition-all`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              AGENDAMENTO
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};