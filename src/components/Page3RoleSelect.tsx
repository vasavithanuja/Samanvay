import React from 'react';
import { useResource } from '../context/ResourceContext';
import { ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { UserRole } from '../types';
import { SamanvayLogo } from './SamanvayLogo';
import { SoftBrandBackground } from './SoftBrandBackground';

export const Page3RoleSelect: React.FC = () => {
  const { setRole, navigate, language } = useResource();
  const isTe = language === 'te';

  const handleRoleSelect = (role: UserRole) => {
    setRole(role);
    navigate('login');
  };

  return (
    <SoftBrandBackground intensity="subtle" className="min-h-[85vh]">
      <div className="p-6 max-w-md mx-auto space-y-6">
        {/* Title */}
        <div className="text-center space-y-1.5 pt-2 flex flex-col items-center">
          <SamanvayLogo size="md" />
          <h1 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight">
            {isTe ? 'మీరు యాప్‌ను ఎలా ఉపయోగించాలనుకుంటున్నారు?' : 'Select Your Role in Samanvay'}
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            {isTe ? 'క్రింది మూడు పాత్రల్లో ఒకదాన్ని ఎంచుకోండి' : 'Choose your role to access your dedicated dashboard & profile'}
          </p>
        </div>

        {/* Exactly 3 Primary Cards: Donor, Organization / Orphanage, Volunteer */}
        <div className="space-y-3.5">
          {/* Card 1: 📦 DONOR */}
          <button
            id="role-card-donor"
            onClick={() => handleRoleSelect('donor')}
            className="w-full bg-white hover:bg-teal-50/50 active:bg-teal-50 border-2 border-slate-200 hover:border-teal-500 rounded-3xl p-5 text-left transition-all shadow-xs hover:shadow-md flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-100/70 text-teal-800 flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition-transform">
                📦
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {isTe ? 'దాత / ప్రదాత (Donor)' : 'Donor'}
                  </h3>
                  <span className="text-[10px] font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full">
                    Resource Provider
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  “Share available resources with verified organizations”
                </p>
                {isTe && (
                  <p className="text-[11px] text-teal-700 font-medium">
                    కాలేజీలు, సంస్థలు, పౌరుల మిగులు సామాగ్రిని అందించండి
                  </p>
                )}
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-teal-600 group-hover:text-white text-slate-400 flex items-center justify-center transition-colors shrink-0 ml-2">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>

          {/* Card 2: 🏠 ORGANIZATION / ORPHANAGE */}
          <button
            id="role-card-organization"
            onClick={() => handleRoleSelect('organization')}
            className="w-full bg-white hover:bg-blue-50/50 active:bg-blue-50 border-2 border-slate-200 hover:border-blue-500 rounded-3xl p-5 text-left transition-all shadow-xs hover:shadow-md flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-100/70 text-blue-700 flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition-transform">
                🏠
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {isTe ? 'సంస్థ / ఆశ్రమం (Organization)' : 'Organization / Orphanage'}
                  </h3>
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                    Beneficiary
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  “Find available resources for your verified needs”
                </p>
                {isTe && (
                  <p className="text-[11px] text-blue-600 font-medium">
                    ఆశ్రమాలు, సంక్షేమ గృహాల అవసరాలను పోస్ట్ చేసి పొందండి
                  </p>
                )}
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-400 flex items-center justify-center transition-colors shrink-0 ml-2">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>

          {/* Card 3: 🚚 VOLUNTEER */}
          <button
            id="role-card-volunteer"
            onClick={() => handleRoleSelect('volunteer')}
            className="w-full bg-white hover:bg-indigo-50/50 active:bg-indigo-50 border-2 border-slate-200 hover:border-indigo-500 rounded-3xl p-5 text-left transition-all shadow-xs hover:shadow-md flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100/70 text-indigo-700 flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition-transform">
                🚚
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                    {isTe ? 'వాలంటీర్ (Volunteer)' : 'Volunteer'}
                  </h3>
                  <span className="text-[10px] font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                    Delivery Partner
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  “Help move resources safely from donors to organizations”
                </p>
                {isTe && (
                  <p className="text-[11px] text-indigo-700 font-medium">
                    వస్తువులను పికప్ చేసి ఆశ్రమాలకు ఉచితంగా చేర్చండి
                  </p>
                )}
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white text-slate-400 flex items-center justify-center transition-colors shrink-0 ml-2">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>

        {/* Assurance banner */}
        <div className="bg-slate-100/80 rounded-2xl p-3.5 text-center text-xs text-slate-600">
          <span className="font-semibold text-slate-700">
            {isTe ? 'గమనిక:' : 'Friendly note:'}
          </span>{' '}
          {isTe
            ? 'ఈ యాప్‌లో డబ్బు లావాదేవీలు ఉండవు. కేవలం వస్తువుల సర్క్యులేషన్ మాత్రమే.'
            : 'Samanvay connects resources directly without any monetary exchange.'}
        </div>

        {/* Separate Administrative Area link */}
        <div className="pt-2 text-center border-t border-slate-200/80">
          <button
            onClick={() => handleRoleSelect('admin')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-purple-700 transition-colors cursor-pointer py-1 px-3 rounded-full hover:bg-purple-50"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Administrator Access Portal</span>
          </button>
        </div>
      </div>
    </SoftBrandBackground>
  );
};
