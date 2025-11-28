import React, { useState } from 'react';
import { PROFESSIONALS, TIME_SLOTS } from '../constants';

export const Booking: React.FC = () => {
  const [selectedProfessional, setSelectedProfessional] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8 border-b border-gray-800 pb-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">RESERVE SEU TRONO</h2>
          <p className="text-gray-400">Garanta seu horário com nossos especialistas.</p>
        </div>
        <button className="hidden md:block px-4 py-2 text-xs font-semibold tracking-wider text-yellow-400 border border-gray-700 rounded hover:bg-gray-800 transition-colors">
          MUDAR VISÃO: CLIENTE
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Professionals */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-yellow-400 font-bold uppercase tracking-wide text-sm mb-4">Selecione o Profissional</h3>
          {PROFESSIONALS.map((pro) => (
            <div 
              key={pro.id}
              onClick={() => setSelectedProfessional(pro.id)}
              className={`p-6 rounded-lg cursor-pointer transition-all border ${
                selectedProfessional === pro.id 
                  ? 'bg-purple-900/20 border-purple-500 ring-1 ring-purple-500' 
                  : 'bg-[#1a1a1a] border-transparent hover:bg-[#222]'
              }`}
            >
              <h4 className="text-xl font-bold text-white">{pro.name}</h4>
              <p className="text-gray-400 text-xs mt-1 uppercase tracking-wide">{pro.specialty}</p>
            </div>
          ))}
        </div>

        {/* Right Column: Date & Time */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Date Selection */}
          <div className="bg-[#0f0f0f] border border-gray-800 p-8 rounded-xl">
             <h3 className="text-yellow-400 font-bold uppercase tracking-wide text-sm mb-4 flex items-center gap-2">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
               Selecione a Data
             </h3>
             <input 
               type="date" 
               className="w-full bg-[#1a1a1a] border border-gray-700 text-white p-4 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
               value={selectedDate}
               onChange={(e) => setSelectedDate(e.target.value)}
             />
          </div>

          {/* Time Selection */}
          <div className="bg-[#0f0f0f] border border-gray-800 p-8 rounded-xl">
             <h3 className="text-yellow-400 font-bold uppercase tracking-wide text-sm mb-4 flex items-center gap-2">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               Horários Disponíveis
             </h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {TIME_SLOTS.map((slot, idx) => (
                  <button
                    key={idx}
                    disabled={!slot.available}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`py-4 rounded-lg text-lg font-medium transition-all ${
                      !slot.available 
                        ? 'opacity-20 cursor-not-allowed bg-gray-800 text-gray-500' 
                        : selectedTime === slot.time 
                          ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' 
                          : 'bg-[#1a1a1a] text-white hover:bg-[#252525] border border-gray-800'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
             </div>
          </div>
          
          <div className="flex justify-end">
            <button 
              disabled={!selectedProfessional || !selectedDate || !selectedTime}
              className={`px-8 py-4 rounded-lg font-bold uppercase tracking-wider transition-all ${
                 !selectedProfessional || !selectedDate || !selectedTime
                 ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                 : 'bg-green-600 hover:bg-green-500 text-white shadow-lg'
              }`}
            >
              Confirmar Agendamento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};