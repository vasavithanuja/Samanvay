import React from 'react';
import { useResource } from '../context/ResourceContext';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { SamanvayLogo } from './SamanvayLogo';
import { SoftBrandBackground } from './SoftBrandBackground';

export const Page2Language: React.FC = () => {
  const { language, setLanguage, navigate } = useResource();

  const handleSelect = (selectedLang: 'en' | 'te') => {
    setLanguage(selectedLang);
    navigate('role_select');
  };

  return (
    <SoftBrandBackground intensity="subtle" className="min-h-[85vh]">
      <div className="min-h-[80vh] flex flex-col justify-between p-6 max-w-md mx-auto">
        {/* Header with Logo */}
        <div className="pt-4 space-y-2 text-center flex flex-col items-center">
          <SamanvayLogo size="md" />
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
            Choose Language
          </h1>
          <p className="text-sm font-semibold text-teal-800">
            “భాషను ఎంచుకోండి”
          </p>
          <p className="text-xs text-slate-500">
            Select your preferred language to proceed
          </p>
        </div>

      {/* Two Large Choices */}
      <div className="space-y-4 my-auto">
        {/* English Card */}
        <button
          id="select-lang-en"
          onClick={() => handleSelect('en')}
          className={`w-full p-5 rounded-3xl border-2 text-left transition-all flex items-center justify-between cursor-pointer group shadow-xs ${
            language === 'en'
              ? 'border-blue-600 bg-blue-50/60 shadow-md ring-4 ring-blue-50'
              : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇬🇧</span>
              <span className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                English
              </span>
            </div>
            <p className="text-xs text-slate-500 pl-8">
              Simple English with clear visual guides
            </p>
          </div>

          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            language === 'en' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
          }`}>
            {language === 'en' ? <CheckCircle2 className="w-5 h-5" /> : <ArrowRight className="w-4 h-4" />}
          </div>
        </button>

        {/* Telugu Card */}
        <button
          id="select-lang-te"
          onClick={() => handleSelect('te')}
          className={`w-full p-5 rounded-3xl border-2 text-left transition-all flex items-center justify-between cursor-pointer group shadow-xs ${
            language === 'te'
              ? 'border-blue-600 bg-blue-50/60 shadow-md ring-4 ring-blue-50'
              : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇮🇳</span>
              <span className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-display">
                తెలుగు
              </span>
            </div>
            <p className="text-xs text-slate-500 pl-8">
              తెలుగు సూచనలతో కూడిన సులభమైన ఉపయోగం
            </p>
          </div>

          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            language === 'te' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
          }`}>
            {language === 'te' ? <CheckCircle2 className="w-5 h-5" /> : <ArrowRight className="w-4 h-4" />}
          </div>
        </button>
      </div>

      {/* Footer info */}
      <div className="text-center pb-6">
        <p className="text-xs text-slate-400">
          You can change the language anytime from the top bar.
        </p>
      </div>
    </div>
    </SoftBrandBackground>
  );
};
