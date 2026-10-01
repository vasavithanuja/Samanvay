import React from 'react';
import { useResource } from '../context/ResourceContext';
import { ResourceCategory } from '../types';
import { ArrowRight } from 'lucide-react';

export const Page6AskCategory: React.FC = () => {
  const { categories, selectCategoryForNeed, language } = useResource();
  const isTe = language === 'te';

  return (
    <div className="p-4 sm:p-6 max-w-md mx-auto space-y-6 pb-20">
      {/* Step Indicator */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200/60">
        <span className="text-blue-600 font-bold">1. Category ●</span>
        <span>→</span>
        <span>2. Details ○</span>
        <span>→</span>
        <span>3. Match ○</span>
        <span>→</span>
        <span>4. Done ○</span>
      </div>

      {/* Title & Subtitle */}
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight">
          What do you need?
        </h1>
        <p className="text-sm font-semibold text-blue-600">
          “ఒక category ఎంచుకోండి”
        </p>
        <p className="text-xs text-slate-500">
          Choose the type of physical resource required for the orphanage
        </p>
      </div>

      {/* Large Category Cards Grid */}
      <div className="grid grid-cols-2 gap-3.5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            id={`cat-card-${cat.id.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => selectCategoryForNeed(cat.id)}
            className="bg-white hover:bg-blue-50/60 active:bg-blue-50 border-2 border-slate-200 hover:border-blue-400 rounded-3xl p-4.5 text-center transition-all shadow-2xs hover:shadow-xs active:scale-[0.98] cursor-pointer group flex flex-col items-center justify-center space-y-2 min-h-[125px]"
          >
            <div className="w-13 h-13 rounded-2xl bg-slate-100 group-hover:bg-white text-3xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
              {cat.icon}
            </div>
            <div>
              <div className="font-extrabold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">
                {cat.nameEn}
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                {cat.nameTe}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Reminder Banner */}
      <div className="bg-blue-50/80 border border-blue-100 rounded-2xl p-3.5 text-center text-xs text-blue-800">
        <span className="font-bold">100% Free Resource Network:</span> No costs, no payment, no sponsorship requests. Only physical goods reach the children.
      </div>
    </div>
  );
};
