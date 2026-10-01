import React, { useState } from 'react';
import { useResource } from '../context/ResourceContext';
import { ArrowLeft, Globe, RefreshCw, ShieldCheck, User } from 'lucide-react';
import { UserRole } from '../types';
import { SamanvayLogo } from './SamanvayLogo';

export const TopHeader: React.FC = () => {
  const { screen, goBack, language, setLanguage, role, setRole, navigate } = useResource();
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  // Do not show header on Splash screen
  if (screen === 'splash') {
    return null;
  }

  const isTe = language === 'te';
  const showBack = !['home', 'provider_home', 'volunteer_home', 'donor_dashboard', 'admin_dashboard', 'language'].includes(screen);

  const getRoleLabel = () => {
    if (role === 'donor' || role === 'provider') return isTe ? 'ప్రదాత (Donor)' : 'Donor';
    if (role === 'organization' || role === 'orphanage') return isTe ? 'సంస్థ (Org)' : 'Organization';
    if (role === 'volunteer') return isTe ? 'వాలంటీర్' : 'Volunteer';
    if (role === 'admin') return 'Admin Portal';
    return 'User';
  };

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setShowRoleSwitcher(false);
    if (newRole === 'donor' || newRole === 'provider') navigate('donor_dashboard');
    else if (newRole === 'organization' || newRole === 'orphanage') navigate('home');
    else if (newRole === 'volunteer') navigate('volunteer_home');
    else if (newRole === 'admin') navigate('admin_dashboard');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-2xs max-w-md mx-auto">
      {/* Top Banner Notice: Zero Money Guarantee */}
      <div className="bg-blue-50/90 border-b border-blue-100/60 px-3 py-1 flex items-center justify-between text-[11px] text-blue-800">
        <span className="flex items-center gap-1 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>{isTe ? 'కేవలం ఉచిత వస్తువుల మార్పిడి • డబ్బు లేదు' : 'Physical Resources Only • No Money Involved'}</span>
        </span>
        <button
          onClick={() => setLanguage(isTe ? 'en' : 'te')}
          className="text-[10px] font-bold text-blue-700 hover:text-blue-900 bg-white px-2 py-0.5 rounded-full border border-blue-200 cursor-pointer flex items-center gap-0.5"
        >
          <Globe className="w-3 h-3" />
          <span>{isTe ? 'English' : 'తెలుగు'}</span>
        </button>
      </div>

      <div className="h-14 px-4 flex items-center justify-between">
        {/* Left: Back button or Logo */}
        <div className="flex items-center space-x-2">
          {showBack ? (
            <button
              onClick={goBack}
              className="p-2 -ml-2 rounded-xl text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer flex items-center gap-1"
              aria-label="Go Back"
            >
              <ArrowLeft className="w-5 h-5 text-slate-800" />
              <span className="text-xs font-semibold text-slate-600 hidden sm:inline">
                {isTe ? 'వెనుకకు' : 'Back'}
              </span>
            </button>
          ) : (
            <div
              onClick={() => {
                if (role === 'donor' || role === 'provider') navigate('donor_dashboard');
                else if (role === 'organization' || role === 'orphanage') navigate('home');
                else if (role === 'volunteer') navigate('volunteer_home');
                else if (role === 'admin') navigate('admin_dashboard');
              }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <SamanvayLogo size="sm" />
              <div>
                <span className="font-display font-extrabold text-base text-slate-900 tracking-tight block leading-tight font-['Noto_Sans_Telugu',sans-serif]">
                  సమన్వయ్
                </span>
                <span className="text-[10px] text-teal-800 font-semibold block -mt-0.5 tracking-wide">
                  Samanvay
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Center / Right: Role Badge & Evaluator Switcher */}
        <div className="relative flex items-center space-x-1.5">
          <button
            onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
            className="flex items-center space-x-1 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 transition-colors border border-slate-200/80 cursor-pointer"
            title="Switch demo user role"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                role === 'admin' ? 'bg-purple-600' : 'bg-emerald-500'
              }`}
            />
            <span>{getRoleLabel()}</span>
            <RefreshCw className="w-3 h-3 text-slate-400 ml-0.5" />
          </button>

          {/* Quick Role Dropdown */}
          {showRoleSwitcher && (
            <div className="absolute top-10 right-0 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 text-xs space-y-1 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {isTe ? 'పాత్రను మార్చండి' : 'Switch Role View'}
              </div>

              {/* 1. Donor */}
              <button
                onClick={() => handleRoleChange('donor')}
                className={`w-full text-left p-2 rounded-xl flex items-center gap-2 transition-colors cursor-pointer ${
                  role === 'donor' || role === 'provider' ? 'bg-teal-50 text-teal-800 font-bold' : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span>📦</span>
                <div>
                  <div className="font-semibold">{isTe ? 'దాత / ప్రదాత (Donor)' : 'Donor'}</div>
                  <div className="text-[10px] text-slate-400">Share resources & track donations</div>
                </div>
              </button>

              {/* 2. Organization */}
              <button
                onClick={() => handleRoleChange('organization')}
                className={`w-full text-left p-2 rounded-xl flex items-center gap-2 transition-colors cursor-pointer ${
                  role === 'organization' || role === 'orphanage' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span>🏠</span>
                <div>
                  <div className="font-semibold">{isTe ? 'సంస్థ / ఆశ్రమం (Org)' : 'Organization / Care Home'}</div>
                  <div className="text-[10px] text-slate-400">Post needs & receive items</div>
                </div>
              </button>

              {/* 3. Volunteer */}
              <button
                onClick={() => handleRoleChange('volunteer')}
                className={`w-full text-left p-2 rounded-xl flex items-center gap-2 transition-colors cursor-pointer ${
                  role === 'volunteer' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span>🚚</span>
                <div>
                  <div className="font-semibold">{isTe ? 'వాలంటీర్ (Volunteer)' : 'Volunteer'}</div>
                  <div className="text-[10px] text-slate-400">Pickup & safe delivery</div>
                </div>
              </button>

              {/* 4. Admin */}
              <button
                onClick={() => handleRoleChange('admin')}
                className={`w-full text-left p-2 rounded-xl flex items-center gap-2 transition-colors cursor-pointer ${
                  role === 'admin' ? 'bg-purple-50 text-purple-800 font-bold' : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span>🛡️</span>
                <div>
                  <div className="font-semibold">Admin Command Portal</div>
                  <div className="text-[10px] text-slate-400">Verification, users & audit</div>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
