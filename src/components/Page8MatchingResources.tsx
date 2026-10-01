import React from 'react';
import { useResource } from '../context/ResourceContext';
import { MapPin, CheckCircle2, ArrowRight, Sparkles, Building, Info } from 'lucide-react';
import { AvailableResource } from '../types';

export const Page8MatchingResources: React.FC = () => {
  const { needDraft, availableResources, selectMatchToConfirm, language } = useResource();
  const isTe = language === 'te';

  // Filter available resources matching draft category or title
  const matches = availableResources.filter(
    (r) => r.category === needDraft.category || r.title.toLowerCase().includes(needDraft.title.toLowerCase())
  ).slice(0, 2);

  const matchedItems: AvailableResource[] = matches.length > 0 ? matches : availableResources.slice(0, 2);

  return (
    <div className="p-4 sm:p-6 max-w-md mx-auto space-y-6 pb-20">
      {/* Progress: Category ✓ Details ✓ Match ● Done ○ */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200/60">
        <span className="text-emerald-600 font-bold">Category ✓</span>
        <span>→</span>
        <span className="text-emerald-600 font-bold">Details ✓</span>
        <span>→</span>
        <span className="text-blue-600 font-bold">Match ●</span>
        <span>→</span>
        <span>Done ○</span>
      </div>

      {/* Title & Count */}
      <div className="space-y-1">
        <h1 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight">
          Matching Resources
        </h1>
        <div className="flex items-center gap-1.5 text-sm font-bold text-blue-600">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>We found {matchedItems.length} matches</span>
        </div>
      </div>

      {/* Visual Matching Communication: Orphanage Need ↔ Available Resource */}
      <div className="bg-blue-50/70 border border-blue-200/70 rounded-2xl p-3.5 flex items-center justify-between text-xs text-blue-900">
        <div className="space-y-0.5">
          <span className="text-[10px] uppercase font-bold text-blue-500">Your Orphanage Need</span>
          <div className="font-extrabold text-slate-900">
            {needDraft.quantity} {needDraft.title}
          </div>
        </div>
        <div className="px-2.5 py-1 bg-white text-blue-600 font-bold rounded-xl shadow-2xs text-xs border border-blue-200">
          ↔
        </div>
        <div className="space-y-0.5 text-right">
          <span className="text-[10px] uppercase font-bold text-emerald-600">Verified Providers</span>
          <div className="font-extrabold text-slate-900">Nearby Surplus</div>
        </div>
      </div>

      {/* Cards List */}
      <div className="space-y-4">
        {matchedItems.map((item, idx) => {
          const isFirstGoodMatch = idx === 0;
          const badgeText = isFirstGoodMatch ? 'Good Match' : 'Partial Match';
          const qtyToRequest = Math.min(needDraft.quantity, item.availableQuantity);

          return (
            <div
              key={item.id}
              className={`bg-white rounded-3xl p-5 border-2 transition-all space-y-4 shadow-xs ${
                isFirstGoodMatch
                  ? 'border-blue-500 ring-4 ring-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Top Row: Title & Badge */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-xl">📚</span>
                  <h3 className="text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-bold text-slate-800">{item.providerName}</span>
                    <span>• {item.providerType}</span>
                  </div>
                </div>

                {/* Badge: Good Match vs Partial Match */}
                <span
                  className={`text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                    isFirstGoodMatch
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}
                >
                  {badgeText}
                </span>
              </div>

              {/* Stats: Available quantity and distance */}
              <div className="bg-slate-50 rounded-2xl p-3 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] font-semibold">Available</span>
                  <span className="font-bold text-slate-900 text-sm">
                    {item.availableQuantity} {item.unit} available
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-semibold">Distance</span>
                  <span className="font-bold text-slate-900 text-sm flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>{item.distanceKm} km away</span>
                  </span>
                </div>
              </div>

              {/* Action Button: Request X Notebooks */}
              <button
                id={`btn-request-match-${item.id}`}
                onClick={() => selectMatchToConfirm(item, qtyToRequest)}
                className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                  isFirstGoodMatch
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                <span>
                  {isTe
                    ? `${qtyToRequest} ${item.unit}ను అభ్యర్థించండి`
                    : `Request ${qtyToRequest} ${item.unit}`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
