import React from 'react';
import { useResource } from '../context/ResourceContext';
import { CheckCircle2, Home, HeartHandshake, ShieldCheck, ArrowRight } from 'lucide-react';

export const Page15DeliveredSuccess: React.FC = () => {
  const { navigate, userSession, role, language } = useResource();
  const isTe = language === 'te';

  const handleBackHome = () => {
    if (role === 'orphanage') navigate('home');
    else if (role === 'provider') navigate('provider_home');
    else navigate('volunteer_home');
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-between items-center text-center p-6 max-w-md mx-auto">
      {/* Top spacing */}
      <div className="pt-4"></div>

      {/* Main Success Content */}
      <div className="space-y-6 my-auto max-w-sm w-full">
        {/* Large Success Icon */}
        <div className="w-24 h-24 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-5xl mx-auto ring-8 ring-emerald-50 shadow-xl shadow-emerald-500/20">
          📦
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
            Delivered Successfully
          </h1>
          <p className="text-base font-bold text-emerald-700">
            “ABC Orphanage received 50 notebooks.”
          </p>
          {isTe && (
            <p className="text-xs text-slate-500">
              “వనరులు సురక్షితంగా ఆశ్రమానికి చేరాయి మరియు రసీదు ధృవీకరించబడింది.”
            </p>
          )}
        </div>

        {/* Completion Details Card */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-3.5 text-left text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Resource:</span>
            <span className="font-extrabold text-slate-900 text-sm">School Notebooks</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Quantity:</span>
            <span className="font-extrabold text-slate-900 text-sm">50</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Provider:</span>
            <span className="font-extrabold text-slate-900 text-sm">ABC College</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Status:</span>
            <span className="font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Received</span>
            </span>
          </div>
        </div>

        {/* Gratitude & Zero Money Reassurance */}
        <div className="bg-slate-50 rounded-2xl p-3.5 text-xs text-slate-500 flex items-center justify-center gap-2">
          <HeartHandshake className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Zero money involved • Verified physical transfer complete</span>
        </div>
      </div>

      {/* Button: Back to Home */}
      <div className="w-full pb-6">
        <button
          id="btn-back-to-home"
          onClick={handleBackHome}
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg shadow-blue-600/25 flex items-center justify-center space-x-2 text-base transition-all transform active:scale-[0.99] cursor-pointer"
        >
          <Home className="w-5 h-5" />
          <span>{isTe ? 'హోమ్‌కు తిరిగి వెళ్ళండి' : 'Back to Home'}</span>
        </button>
      </div>
    </div>
  );
};
