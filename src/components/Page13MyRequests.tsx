import React, { useState } from 'react';
import { useResource } from '../context/ResourceContext';
import { ArrowRight, Clock, CheckCircle2, Search, Truck, MapPin } from 'lucide-react';

export const Page13MyRequests: React.FC = () => {
  const { requests, viewRequestDetails, navigate, language } = useResource();
  const [filter, setFilter] = useState<'All' | 'Accepted' | 'Searching' | 'Completed'>('All');
  const isTe = language === 'te';

  const filtered = requests.filter((r) => {
    if (filter === 'All') return true;
    if (filter === 'Accepted') return r.status === 'Accepted' || r.status === 'Pickup' || r.status === 'On the Way';
    if (filter === 'Searching') return r.status === 'Searching' || r.status === 'Requested';
    if (filter === 'Completed') return r.status === 'Delivered' || r.status === 'Received';
    return true;
  });

  return (
    <div
      className="p-4 sm:p-6 max-w-md mx-auto space-y-5 pb-36 sm:pb-44"
      style={{ paddingBottom: 'calc(9.5rem + env(safe-area-inset-bottom, 16px))' }}
    >
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight">
          My Requests
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          {isTe ? 'ఆశ్రమం కోరిన వనరుల స్థితి' : 'Track ongoing and completed resource requests'}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-1.5 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold">
        {(['All', 'Accepted', 'Searching', 'Completed'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`flex-1 py-2 rounded-xl transition-all cursor-pointer text-center ${
              filter === tab
                ? 'bg-white text-blue-700 shadow-2xs font-extrabold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab === 'All' && (isTe ? 'అన్నీ' : 'All')}
            {tab === 'Accepted' && (isTe ? 'ఆమోదం' : 'Accepted')}
            {tab === 'Searching' && (isTe ? 'వెతుకుతోంది' : 'Searching')}
            {tab === 'Completed' && (isTe ? 'పూర్తయింది' : 'Completed')}
          </button>
        ))}
      </div>

      {/* Cards List */}
      <div className="space-y-4">
        {filtered.map((req) => {
          const isAccepted = req.status === 'Accepted' || req.status === 'Pickup' || req.status === 'On the Way';
          const isSearching = req.status === 'Searching' || req.status === 'Requested';
          const isCompleted = req.status === 'Delivered' || req.status === 'Received';

          return (
            <div
              key={req.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-3.5 hover:shadow-xs transition-all"
            >
              {/* Header with visual status badge */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400">
                    {req.category}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    {req.resourceTitle}
                  </h3>
                </div>

                {isAccepted && (
                  <span className="bg-blue-100 text-blue-800 text-[11px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1 border border-blue-200">
                    <span>●</span>
                    <span>Accepted</span>
                  </span>
                )}

                {isSearching && (
                  <span className="bg-amber-100 text-amber-800 text-[11px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1 border border-amber-200">
                    <span>Searching</span>
                  </span>
                )}

                {isCompleted && (
                  <span className="bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1 border border-emerald-200">
                    <span>✓ Completed</span>
                  </span>
                )}
              </div>

              {/* Route or Age */}
              <div className="bg-slate-50 rounded-2xl p-3 text-xs space-y-1">
                {isAccepted && (
                  <>
                    <div className="text-slate-700 font-bold">
                      {req.providerName} → {req.orphanageName}
                    </div>
                    <div className="text-slate-500 font-medium flex items-center gap-1">
                      <span>Current stage:</span>
                      <span className="font-bold text-blue-600">Pickup</span>
                    </div>
                  </>
                )}

                {isSearching && (
                  <div className="text-slate-500 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Posted {req.createdAt}</span>
                  </div>
                )}

                {isCompleted && (
                  <div className="text-emerald-700 flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Delivered {req.createdAt}</span>
                  </div>
                )}
              </div>

              {/* Action Button: Track vs View Request */}
              {isAccepted ? (
                <button
                  id={`btn-track-req-${req.id}`}
                  onClick={() => viewRequestDetails(req)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-2xl text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <Truck className="w-4 h-4" />
                  <span>{isTe ? 'ట్రాక్ చేయండి' : 'Track'}</span>
                </button>
              ) : isSearching ? (
                <button
                  id={`btn-view-req-${req.id}`}
                  onClick={() => viewRequestDetails(req)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-2xl text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <span>{isTe ? 'అభ్యర్థన చూడండి' : 'View Request'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => viewRequestDetails(req)}
                  className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold py-2.5 px-4 rounded-2xl text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <span>{isTe ? 'రసీదు వివరాలు చూడండి' : 'View Receipt'}</span>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Safe bottom spacer ensuring last cards appear well above fixed bottom navigation */}
      <div className="h-10 sm:h-14 w-full shrink-0 pointer-events-none" aria-hidden="true" />
    </div>
  );
};
