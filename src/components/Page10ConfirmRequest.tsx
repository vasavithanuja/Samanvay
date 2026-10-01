import React from 'react';
import { useResource } from '../context/ResourceContext';
import { Building, MapPin, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const Page10ConfirmRequest: React.FC = () => {
  const { selectedMatch, userSession, confirmCurrentRequest, language } = useResource();
  const isTe = language === 'te';

  const resourceTitle = selectedMatch?.resource.title || 'School Notebooks';
  const quantity = selectedMatch?.requestedQty || 50;
  const unit = selectedMatch?.resource.unit || 'notebooks';
  const providerName = selectedMatch?.resource.providerName || 'ABC College';
  const distanceKm = selectedMatch?.resource.distanceKm || 8;

  const handleConfirm = () => {
    confirmCurrentRequest();
  };

  return (
    <div className="p-4 sm:p-6 max-w-md mx-auto space-y-6 pb-20">
      {/* Title */}
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight">
          Confirm Request
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          {isTe ? 'అభ్యర్థన వివరాలను తనిఖీ చేసి నిర్ధారించండి' : 'Please review and confirm your resource request'}
        </p>
      </div>

      {/* Clean Summary Card */}
      <div className="bg-white rounded-3xl p-6 border-2 border-blue-500 shadow-sm space-y-5 ring-4 ring-blue-50">
        <div className="flex items-center space-x-3.5 pb-4 border-b border-slate-100">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-3xl shrink-0">
            📚
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 leading-tight">
              {quantity} {resourceTitle}
            </h2>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
              {unit} allocated
            </span>
          </div>
        </div>

        {/* Transfer details: From, For, Distance */}
        <div className="space-y-3.5 text-sm">
          <div className="flex items-start justify-between">
            <span className="text-slate-500 font-medium">{isTe ? 'ప్రదాత:' : 'From:'}</span>
            <div className="text-right">
              <span className="font-extrabold text-slate-900 block">{providerName}</span>
              <span className="text-xs text-slate-500">Resource Provider</span>
            </div>
          </div>

          <div className="flex items-start justify-between">
            <span className="text-slate-500 font-medium">{isTe ? 'స్వీకర్త:' : 'For:'}</span>
            <div className="text-right">
              <span className="font-extrabold text-slate-900 block">{userSession.name}</span>
              <span className="text-xs text-slate-500">{userSession.location}</span>
            </div>
          </div>

          <div className="flex items-start justify-between pt-2 border-t border-slate-100">
            <span className="text-slate-500 font-medium">{isTe ? 'దూరం:' : 'Distance:'}</span>
            <div className="text-right flex items-center gap-1 font-bold text-slate-900">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>{distanceKm} km</span>
            </div>
          </div>
        </div>
      </div>

      {/* Important Information Box */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-4.5 text-amber-950 flex items-start space-x-3 shadow-2xs">
        <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-extrabold text-xs uppercase tracking-wider text-amber-900">
            {isTe ? 'ముఖ్యమైన సమాచారం' : 'Zero-Money Guarantee'}
          </h4>
          <p className="text-xs font-semibold leading-relaxed">
            **No money is involved. This request is only for transferring the physical resource.**
          </p>
          {isTe && (
            <p className="text-[11px] text-amber-800">
              ఎటువంటి చెల్లింపులు లేదా విరాళాలు అవసరం లేదు. కేవలం వస్తువుల బదిలీ మాత్రమే.
            </p>
          )}
        </div>
      </div>

      {/* Primary Button: Confirm Resource Request */}
      <div className="pt-2">
        <button
          id="btn-confirm-resource-request"
          onClick={handleConfirm}
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg shadow-blue-600/25 flex items-center justify-center space-x-2 text-base transition-all transform active:scale-[0.99] cursor-pointer"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>{isTe ? 'వనరుల అభ్యర్థనను నిర్ధారించండి' : 'Confirm Resource Request'}</span>
        </button>
      </div>
    </div>
  );
};
