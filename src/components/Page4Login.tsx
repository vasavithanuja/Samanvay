import React, { useState } from 'react';
import { useResource } from '../context/ResourceContext';
import { Phone, Lock, ArrowRight, UserPlus, Sparkles, Building, CheckCircle2, ShieldAlert } from 'lucide-react';
import { UserRole } from '../types';
import { SamanvayLogo } from './SamanvayLogo';
import { SoftBrandBackground } from './SoftBrandBackground';

export const Page4Login: React.FC = () => {
  const { loginUser, role, setRole, language } = useResource();
  const isTe = language === 'te';

  const [identifier, setIdentifier] = useState('contact@karunacare.org');
  const [password, setPassword] = useState('••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(identifier, role);
  };

  const handleQuickLogin = (selectedRole: UserRole, defaultId: string) => {
    setRole(selectedRole);
    loginUser(defaultId, selectedRole);
  };

  const getRoleDisplayName = () => {
    if (role === 'donor' || role === 'provider') return isTe ? 'ప్రదాత' : 'Donor';
    if (role === 'volunteer') return isTe ? 'వాలంటీర్' : 'Volunteer';
    if (role === 'admin') return 'Admin';
    return isTe ? 'సంస్థ / ఆశ్రమం' : 'Organization / Care Home';
  };

  return (
    <SoftBrandBackground intensity="subtle" className="min-h-[85vh]">
      <div className="p-6 max-w-md mx-auto space-y-6">
        {/* Title & Subtitle with Logo */}
        <div className="text-center space-y-2 pt-2 flex flex-col items-center">
          <SamanvayLogo size="lg" />
          <div className="space-y-0.5">
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight font-['Noto_Sans_Telugu',sans-serif]">
              {isTe ? 'సమన్వయ్ లాగిన్' : `Login as ${getRoleDisplayName()}`}
            </h1>
            <p className="text-xs text-slate-600 font-medium">
              “Connect Available Resources With Verified Needs”
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          {/* Mobile / Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>{isTe ? 'మొబైల్ నంబర్ / ఇమెయిల్' : 'Mobile number / Email'}</span>
            </label>
            <input
              id="login-identifier"
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="e.g. 9849012345 or contact@karunacare.org"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-blue-600" />
              <span>{isTe ? 'పాస్‌వర్డ్' : 'Password'}</span>
            </label>
            <input
              id="login-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Primary Login Button */}
          <div className="pt-2">
            <button
              id="login-submit-btn"
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3.5 px-6 rounded-2xl shadow-md shadow-blue-600/25 flex items-center justify-center space-x-2 text-sm transition-all transform active:scale-[0.99] cursor-pointer"
            >
              <span>{isTe ? 'లాగిన్' : `Login to ${getRoleDisplayName()} Dashboard`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Create new account Button */}
          <div>
            <button
              id="login-create-account-btn"
              type="button"
              onClick={() => loginUser(identifier, role)}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-2xl flex items-center justify-center space-x-2 text-sm transition-all cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-slate-500" />
              <span>{isTe ? 'కొత్త ఖాతా సృష్టించండి' : 'Create new account'}</span>
            </button>
          </div>
        </form>

        {/* Evaluator Quick 1-Tap Login Shortcuts for ALL 4 roles */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider justify-center">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>{isTe ? 'డెమో ప్రదర్శన కోసం త్వరిత లాగిన్' : 'Demo 1-Tap Role Logins'}</span>
          </div>

          <div className="grid grid-cols-1 gap-2 text-xs">
            {/* 1. Donor */}
            <button
              type="button"
              onClick={() => handleQuickLogin('donor', 'donor.trust@carenetwork.org')}
              className="w-full p-2.5 rounded-2xl border border-teal-200 bg-teal-50/80 hover:bg-teal-100/80 text-teal-900 font-medium flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">📦</span>
                <div>
                  <div className="font-bold">ABC Educational Trust</div>
                  <div className="text-[10px] text-teal-700">Role: Donor (Add Resources & Fulfill Needs)</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-teal-600" />
            </button>

            {/* 2. Organization */}
            <button
              type="button"
              onClick={() => handleQuickLogin('organization', 'contact@karunacare.org')}
              className="w-full p-2.5 rounded-2xl border border-blue-200 bg-blue-50/80 hover:bg-blue-100/80 text-blue-900 font-medium flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">🏠</span>
                <div>
                  <div className="font-bold">Karuna Care Home (Bhimavaram)</div>
                  <div className="text-[10px] text-blue-600">Role: Organization / Orphanage (Post Needs)</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </button>

            {/* 3. Volunteer */}
            <button
              type="button"
              onClick={() => handleQuickLogin('volunteer', 'ravi.volunteer@care.org')}
              className="w-full p-2.5 rounded-2xl border border-indigo-200 bg-indigo-50/80 hover:bg-indigo-100/80 text-indigo-900 font-medium flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">🚚</span>
                <div>
                  <div className="font-bold">Ravi Kumar Varma (Volunteer Driver)</div>
                  <div className="text-[10px] text-indigo-700">Role: Volunteer (Pickup Tasks & Deliveries)</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-indigo-600" />
            </button>

            {/* 4. Admin */}
            <button
              type="button"
              onClick={() => handleQuickLogin('admin', 'admin.desk@samanvay.gov.in')}
              className="w-full p-2.5 rounded-2xl border border-purple-200 bg-purple-50/80 hover:bg-purple-100/80 text-purple-900 font-medium flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">🛡️</span>
                <div>
                  <div className="font-bold">State Mission Authority</div>
                  <div className="text-[10px] text-purple-700">Role: Admin (Verification, Users & System Audit)</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-purple-600" />
            </button>
          </div>
        </div>
      </div>
    </SoftBrandBackground>
  );
};
