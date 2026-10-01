import React from 'react';
import { useResource } from '../context/ResourceContext';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { SamanvayLogo } from './SamanvayLogo';
import { SoftBrandBackground } from './SoftBrandBackground';

export const Page1Splash: React.FC = () => {
  const { navigate, language } = useResource();
  const isTe = language === 'te';

  return (
    <SoftBrandBackground intensity="hero" className="min-h-[88vh] flex flex-col justify-between">
      <div className="flex-1 flex flex-col justify-between items-center text-center p-6 max-w-md mx-auto w-full">
        {/* Top subtle badge */}
        <div className="pt-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-50/90 border border-teal-200/60 text-teal-800 text-xs font-semibold shadow-2xs backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>
              {isTe ? 'ఉచిత వనరుల పంపిణీ వేదిక' : 'Zero-Money Resource Circulation'}
            </span>
          </div>
        </div>

        {/* Main Hero & Brand Section */}
        <div className="space-y-6 my-auto max-w-sm w-full py-4">
          {/* Prominent Logo Symbol & Brand Lockup */}
          <SamanvayLogo
            size="xl"
            showLockup={true}
            tagline={true}
            orientation="vertical"
          />

          {/* 3 Value Pillars */}
          <div className="bg-white/80 backdrop-blur-xs rounded-3xl p-4.5 border border-emerald-900/10 shadow-sm text-left space-y-2.5 text-xs text-slate-700">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0">
                ✓
              </span>
              <span className="font-medium">
                {isTe
                  ? 'డబ్బు లేదు • కేవలం భౌతిక వస్తువులు మాత్రమే'
                  : '100% Free • Only physical items, zero money'}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-[10px] shrink-0">
                ✓
              </span>
              <span className="font-medium">
                {isTe
                  ? 'అవసరం ↔ లభ్యత వేగవంతమైన అనుసంధానం'
                  : 'Direct Available Resources ↔ Verified Needs'}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-[10px] shrink-0">
                ✓
              </span>
              <span className="font-medium">
                {isTe
                  ? 'స్వచ్ఛంద కార్యకర్తల ద్వారా ఉచిత రవాణా'
                  : 'Volunteer pickup & verified delivery receipt'}
              </span>
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="w-full pb-6 space-y-3">
          <button
            id="splash-get-started-btn"
            onClick={() => navigate('language')}
            className="w-full bg-gradient-to-r from-teal-700 via-teal-800 to-emerald-800 hover:from-teal-800 hover:to-emerald-900 active:scale-[0.98] text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg shadow-teal-900/20 flex items-center justify-center space-x-2 text-base transition-all cursor-pointer"
          >
            <span>{isTe ? 'ప్రారంభించండి' : 'Get Started'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
            <span>
              {isTe
                ? 'సురక్షితమైనది మరియు ధృవీకరించబడినది'
                : 'Trustworthy • Verified Care Network'}
            </span>
          </div>
        </div>
      </div>
    </SoftBrandBackground>
  );
};
