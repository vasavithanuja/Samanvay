import React from 'react';
import { useResource } from '../context/ResourceContext';
import { Building, MapPin, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

export const ProviderFindNeeds: React.FC = () => {
  const { needs, offerResourceForNeed, language } = useResource();
  const isTe = language === 'te';

  return (
    <div className="p-4 sm:p-6 max-w-md mx-auto space-y-5 pb-24">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight">
          Orphanage Needs
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          {isTe ? 'అనాథాశ్రమాలు కోరిన వస్తువులను చూడండి మరియు ఆఫర్ చేయండి' : 'See what verified orphanages in Bhimavaram currently require'}
        </p>
      </div>

      <div className="space-y-3.5">
        {needs.map((need) => (
          <div
            key={need.id}
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-3.5 hover:shadow-xs transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400">
                  {need.category}
                </span>
                <h3 className="font-extrabold text-slate-900 text-base">
                  {need.quantity} {need.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-slate-600 font-medium">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-bold text-slate-800">{need.orphanageName}</span>
                </div>
              </div>

              {need.priority === 'High' && (
                <span className="bg-orange-100 text-orange-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-orange-200">
                  High Priority
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-2xl">
              “{need.description}”
            </p>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>Bhimavaram (~8 km)</span>
              </span>
              <span className="text-[11px] font-semibold text-slate-400">
                Need by: {need.needBy}
              </span>
            </div>

            <button
              onClick={() => offerResourceForNeed(need)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-4 rounded-2xl text-xs flex items-center justify-center space-x-1.5 shadow-sm shadow-emerald-600/20 cursor-pointer"
            >
              <span>{isTe ? 'ఈ వనరును ఆఫర్ చేయండి' : 'Offer This Resource'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
