import React from 'react';
import { ViewState } from '../types';

interface HeroProps {
  onNavigate: (view: ViewState) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen pt-20 flex flex-col items-center justify-center overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
          Redescubra o <br />
          <span className="gradient-text">Potencial da Sua Coroa</span>
        </h1>

        <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
          Experimente a fusão da tradição ancestral com a inteligência artificial.
          Visualize tranças complexas, cortes geométricos e texturas naturais antes do primeiro corte.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-6 w-full justify-center">
          <button 
            onClick={() => onNavigate('styler')}
            className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold rounded-lg text-lg tracking-wide transition-all transform hover:scale-105"
          >
            TESTAR ESTILIZADOR
          </button>
          <button 
            onClick={() => onNavigate('booking')}
            className="px-8 py-4 border border-gray-600 hover:border-white text-white font-bold rounded-lg text-lg tracking-wide transition-all"
          >
            AGENDAR HORÁRIO
          </button>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-yellow-500/50 transition-colors">
            <h3 className="text-yellow-400 text-2xl font-bold mb-3">Visualização com IA</h3>
            <p className="text-gray-400">Pré-visualize cortes complexos na sua própria foto.</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-yellow-500/50 transition-colors">
            <h3 className="text-yellow-400 text-2xl font-bold mb-3">Afrocêntrico</h3>
            <p className="text-gray-400">Especializado em textura, volume e estilos tradicionais.</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-yellow-500/50 transition-colors">
            <h3 className="text-yellow-400 text-2xl font-bold mb-3">Agendamento Pro</h3>
            <p className="text-gray-400">Agendamento simples com os melhores estilistas.</p>
          </div>
        </div>
      </main>
    </div>
  );
};