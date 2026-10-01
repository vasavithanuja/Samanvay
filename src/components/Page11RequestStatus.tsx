import React from 'react';
import { useResource } from '../context/ResourceContext';
import { CheckCircle2, Truck, ArrowRight, Clock, MapPin, Building, ShieldCheck } from 'lucide-react';

export const Page11RequestStatus: React.FC = () => {
  const { activeRequest, navigate, language } = useResource();
  const isTe = language === 'te';

  const title = activeRequest?.resourceTitle || '50 School Notebooks';
  const providerName = activeRequest?.providerName || 'ABC College';
  const orphanageName = activeRequest?.orphanageName || 'ABC Orphanage';
  const distanceKm = activeRequest?.distanceKm || 8;

  // Visual tracking stepper:
  // ✓ Requested
  // ✓ Accepted
  // ● Pickup
  // ○ Delivered

  return (
    <div className="p-4 sm:p-6 max-w-md mx-auto space-y-6 pb-20">
      {/* Title */}
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight">
          Request Status
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          {isTe ? 'వనరుల ట్రాకింగ్ వివరాలు' : 'Live physical resource circulation tracker'}
        </p>
      </div>

      {/* Success Banner */}
      <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-5 text-center space-y-2 shadow-xs">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto ring-4 ring-emerald-50">
          ✅
        </div>
        <h2 className="text-xl font-extrabold text-emerald-950">
          {isTe ? 'అభ్యర్థన ఆమోదించబడింది' : 'Request Accepted'}
        </h2>
        <p className="text-xs font-semibold text-emerald-800">
          “50 notebooks are reserved for your orphanage.”
        </p>
        {isTe && (
          <p className="text-[11px] text-emerald-700">
            వస్తువులు మీ ఆశ్రమం కోసం రిజర్వ్ చేయబడ్డాయి.
          </p>
        )}
      </div>

      {/* Visual Tracking Stepper */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="font-extrabold text-slate-900 text-sm">
            {title}
          </span>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            In Progress
          </span>
        </div>

        {/* Stepper Timeline */}
        <div className="space-y-4 relative pl-3">
          {/* Vertical connecting line */}
          <div className="absolute left-[23px] top-3 bottom-3 w-0.5 bg-slate-200"></div>

          {/* Step 1: Requested */}
          <div className="flex items-start space-x-3 relative z-10">
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
              ✓
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                Requested
              </div>
              <div className="text-[11px] text-slate-500">
                Orphanage submitted request
              </div>
            </div>
          </div>

          {/* Step 2: Accepted */}
          <div className="flex items-start space-x-3 relative z-10">
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
              ✓
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                Accepted
              </div>
              <div className="text-[11px] text-slate-500">
                {providerName} confirmed availability
              </div>
            </div>
          </div>

          {/* Step 3: Pickup (Active) */}
          <div className="flex items-start space-x-3 relative z-10">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 ring-4 ring-blue-100 shadow-xs animate-pulse">
              ●
            </div>
            <div>
              <div className="text-xs font-extrabold text-blue-700">
                Pickup
              </div>
              <div className="text-[11px] text-blue-600 font-medium">
                Arranging volunteer to collect
              </div>
            </div>
          </div>

          {/* Step 4: Delivered */}
          <div className="flex items-start space-x-3 relative z-10">
            <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 text-slate-400 flex items-center justify-center text-xs font-bold shrink-0">
              ○
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400">
                Delivered
              </div>
              <div className="text-[11px] text-slate-400">
                Physical handover to orphanage
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Step Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-4.5 space-y-1">
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
          Next step
        </span>
        <p className="text-xs font-bold text-slate-800">
          “Volunteer pickup is being arranged.”
        </p>
        <p className="text-[11px] text-slate-500">
          Pickup from {providerName} (8 km away) and drop at {orphanageName}.
        </p>
      </div>

      {/* Primary Action Button: Find Delivery Volunteer */}
      <div className="space-y-2">
        <button
          id="btn-find-delivery-volunteer"
          onClick={() => navigate('volunteer_help')}
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg shadow-blue-600/25 flex items-center justify-center space-x-2 text-sm transition-all transform active:scale-[0.99] cursor-pointer"
        >
          <Truck className="w-4 h-4" />
          <span>{isTe ? 'డెలివరీ వాలంటీర్‌ను కనుగొనండి' : 'Find Delivery Volunteer'}</span>
        </button>

        <button
          onClick={() => navigate('home')}
          className="w-full py-2.5 text-xs font-bold text-slate-500 hover:text-slate-700 text-center cursor-pointer"
        >
          {isTe ? 'హోమ్‌కు తిరిగి వెళ్ళండి' : 'Back to Home'}
        </button>
      </div>
    </div>
  );
};
