import React, { useState, useRef } from 'react';
import { generateHairstylePreview } from '../services/geminiService';
import { STYLE_PRESETS } from '../constants';

export const NeuralStyler: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Remove data URL prefix for API if needed, but Gemini handles it or we process in service
        // Keeping full string for preview
        setImage(base64String);
        setResultImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!image) return;

    let finalPrompt = customPrompt;
    if (selectedStyle) {
      const preset = STYLE_PRESETS.find(s => s.id === selectedStyle);
      if (preset) finalPrompt = preset.prompt + (customPrompt ? ` ${customPrompt}` : '');
    }

    if (!finalPrompt) {
      setError("Por favor selecione um estilo ou descreva o que você deseja.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Split base64 header
      const base64Data = image.split(',')[1];
      const result = await generateHairstylePreview(base64Data, finalPrompt);
      setResultImage(result);
    } catch (err: any) {
      setError(err.message || "Erro ao gerar estilo. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4 gradient-text">Estilizador Neural</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">Carregue sua foto e deixe nossa IA aplicar estilos ancestrais e futuristas na sua coroa.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-[#1a1a1a] border border-dashed border-gray-700 rounded-2xl p-8 text-center hover:border-yellow-500 transition-colors cursor-pointer"
               onClick={() => fileInputRef.current?.click()}>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange} 
            />
            {image ? (
              <img src={image} alt="Upload" className="max-h-64 mx-auto rounded-lg object-contain" />
            ) : (
              <div className="py-12">
                <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-300 font-medium">Clique para carregar uma foto</p>
                <p className="text-gray-500 text-sm mt-2">Recomendado: Rosto bem iluminado de frente</p>
              </div>
            )}
          </div>

          <div>
             <label className="block text-yellow-400 font-bold mb-3 text-sm tracking-wide uppercase">Escolha um Estilo</label>
             <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
               {STYLE_PRESETS.map(style => (
                 <button
                   key={style.id}
                   onClick={() => setSelectedStyle(style.id)}
                   className={`p-3 text-sm rounded-lg border transition-all ${
                     selectedStyle === style.id
                     ? 'bg-yellow-500 text-black border-yellow-500 font-bold'
                     : 'bg-[#0f0f0f] text-gray-300 border-gray-800 hover:border-gray-600'
                   }`}
                 >
                   {style.label}
                 </button>
               ))}
             </div>
          </div>

          <div>
            <label className="block text-yellow-400 font-bold mb-3 text-sm tracking-wide uppercase">Ou descreva detalhes (Opcional)</label>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Ex: Adicionar miçangas douradas nas pontas, clarear um pouco o tom..."
              className="w-full bg-[#0f0f0f] border border-gray-800 rounded-lg p-4 text-white focus:border-yellow-500 focus:outline-none h-24 resize-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!image || loading}
            className={`w-full py-4 rounded-lg font-bold text-lg uppercase tracking-wider flex items-center justify-center gap-3 ${
              !image || loading
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-400 hover:to-yellow-500 shadow-lg shadow-yellow-900/20'
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processando...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                Gerar Estilo
              </>
            )}
          </button>
          
          {error && <p className="text-red-400 text-center bg-red-900/20 p-3 rounded-lg border border-red-900/50">{error}</p>}
        </div>

        {/* Result Section */}
        <div className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[500px]">
          {resultImage ? (
            <div className="relative group w-full h-full flex items-center justify-center">
              <img src={resultImage} alt="Generated Style" className="max-h-[600px] w-full object-contain rounded-lg shadow-2xl" />
              <div className="absolute bottom-4 right-4 flex gap-2">
                 <a href={resultImage} download="cida-black-style.png" className="bg-black/80 hover:bg-black text-white p-3 rounded-full backdrop-blur-sm transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                 </a>
              </div>
            </div>
          ) : (
            <div className="text-center opacity-50">
               <div className="w-32 h-32 rounded-full bg-gray-800 mx-auto mb-6 flex items-center justify-center">
                  <span className="text-4xl">✨</span>
               </div>
               <h3 className="text-xl font-medium text-white mb-2">Seu novo visual aparecerá aqui</h3>
               <p className="text-gray-500">A mágica acontece em alguns segundos.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};