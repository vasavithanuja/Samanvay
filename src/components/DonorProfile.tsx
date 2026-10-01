import React, { useState } from 'react';
import { useResource } from '../context/ResourceContext';
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Edit3,
  Save,
  X,
  Package,
  Clock,
  CheckCircle2,
  ArrowRight,
  LogOut,
  Bell,
  ChevronRight,
  Heart,
  TrendingUp,
} from 'lucide-react';
import { SamanvayLogo } from './SamanvayLogo';

export const DonorProfile: React.FC = () => {
  const { userSession, updateUserProfile, navigate, logout, language, availableResources, requests } = useResource();
  const isTe = language === 'te';

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userSession.name || 'ABC Educational Trust',
    email: userSession.email || 'donor.trust@carenetwork.org',
    phone: userSession.phone || '+91 98480 23456',
    location: userSession.location || 'College Campus Road, Bhimavaram',
    donorType: userSession.donorType || 'College / Institution',
  });

  const myResources = availableResources.filter(
    (r) => r.providerName.toLowerCase().includes(userSession.name.toLowerCase()) || r.providerName.includes('College')
  );
  const myCompletedRequests = requests.filter(
    (r) => (r.status === 'Delivered' || r.status === 'Received') && (r.providerName.includes('College') || r.providerName.includes(userSession.name))
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      donorType: formData.donorType,
    });
    setIsEditing(false);
  };

  return (
    <div
      className="p-4 sm:p-6 max-w-md mx-auto space-y-5 pb-36 sm:pb-44"
      style={{ paddingBottom: 'calc(9.5rem + env(safe-area-inset-bottom, 16px))' }}
    >
      {/* Header & Brand */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
            {isTe ? 'ప్రదాత ప్రొఫైల్' : 'Donor Profile'}
          </span>
          <h1 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight mt-1">
            {isTe ? 'దాత వివరాలు' : 'Donor Profile & Settings'}
          </h1>
        </div>
        <button
          onClick={() => navigate('donor_dashboard')}
          className="text-xs font-bold text-teal-700 hover:text-teal-900 bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-2xl cursor-pointer"
        >
          {isTe ? 'డ్యాష్‌బోర్డ్' : 'Dashboard'}
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50/50 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center space-x-3.5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center text-3xl shadow-md shadow-teal-500/20 font-bold">
              🏛️
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <h2 className="text-lg font-extrabold text-slate-900 leading-tight">
                  {userSession.name}
                </h2>
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              </div>
              <div className="text-xs font-semibold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full inline-block border border-teal-200">
                {userSession.donorType || 'College / Institution'}
              </div>
              <div className="text-[11px] font-medium text-emerald-700 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{isTe ? 'ధృవీకరించబడిన దాత (Verified)' : '✓ Verified Social Impact Donor'}</span>
              </div>
            </div>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              title="Edit Profile"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View / Edit Mode */}
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-3 pt-2 border-t border-slate-100">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {isTe ? 'పూర్తి పేరు / సంస్థ పేరు' : 'Full Name / Organization'}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {isTe ? 'ప్రదాత రకం' : 'Donor Type'}
              </label>
              <select
                value={formData.donorType}
                onChange={(e) => setFormData({ ...formData, donorType: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              >
                <option value="College / Institution">College / Institution</option>
                <option value="Individual Donor">Individual Donor</option>
                <option value="Corporate / Company CSR">Corporate / Company CSR</option>
                <option value="Community Group / NGO">Community Group / NGO</option>
                <option value="Family Trust">Family Trust</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {isTe ? 'ఇమెయిల్' : 'Email Address'}
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {isTe ? 'ఫోన్ నంబర్' : 'Phone Number'}
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {isTe ? 'స్థలం / చిరునామా' : 'Location / Address'}
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-teal-600/20"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isTe ? 'సేవ్ చేయండి' : 'Save Changes'}</span>
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-xl text-xs cursor-pointer"
              >
                {isTe ? 'రద్దు' : 'Cancel'}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1.5 text-slate-500">
                <Mail className="w-3.5 h-3.5 text-teal-600" />
                <span>Email:</span>
              </span>
              <span className="font-semibold text-slate-800">{userSession.email || 'donor.trust@carenetwork.org'}</span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1.5 text-slate-500">
                <Phone className="w-3.5 h-3.5 text-teal-600" />
                <span>Phone:</span>
              </span>
              <span className="font-semibold text-slate-800">{userSession.phone || '+91 98480 23456'}</span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1.5 text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                <span>Location:</span>
              </span>
              <span className="font-semibold text-slate-800">{userSession.location}</span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1.5 text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verification:</span>
              </span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                ✓ Verified State Partner
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Summary Impact Cards */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-teal-50 border border-teal-200/80 rounded-2xl p-3 text-center">
          <div className="text-xl font-extrabold text-teal-800 font-display">
            {myResources.length || 2}
          </div>
          <div className="text-[11px] font-bold text-teal-700 mt-0.5">
            {isTe ? 'యాక్టివ్ వనరులు' : 'Active Resources'}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3 text-center">
          <div className="text-xl font-extrabold text-amber-800 font-display">
            50
          </div>
          <div className="text-[11px] font-bold text-amber-700 mt-0.5">
            {isTe ? 'రిజర్వ్ చేయబడినవి' : 'Reserved Qty'}
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-3 text-center">
          <div className="text-xl font-extrabold text-emerald-800 font-display">
            {myCompletedRequests.length || 1}
          </div>
          <div className="text-[11px] font-bold text-emerald-700 mt-0.5">
            {isTe ? 'పూర్తయిన దానాలు' : 'Completed'}
          </div>
        </div>
      </div>

      {/* Quick Navigation Menu */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs divide-y divide-slate-100 overflow-hidden text-sm">
        <button
          onClick={() => navigate('donor_dashboard')}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center space-x-3">
            <span className="text-xl">📊</span>
            <div>
              <span className="font-bold text-slate-800 block">
                {isTe ? 'ప్రదాత డ్యాష్‌బోర్డ్' : 'Donor Dashboard'}
              </span>
              <span className="text-[11px] text-slate-400">Resource metrics & overview</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => navigate('provider_post')}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center space-x-3">
            <span className="text-xl">➕</span>
            <div>
              <span className="font-bold text-slate-800 block">
                {isTe ? '+ కొత్త వనరును జోడించండి' : '+ Add Resource / Availability'}
              </span>
              <span className="text-[11px] text-slate-400">Share items you have for care homes</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => navigate('provider_needs')}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center space-x-3">
            <span className="text-xl">🎯</span>
            <div>
              <span className="font-bold text-slate-800 block">
                {isTe ? 'సంస్థల అవసరాలు చూడండి' : 'View Matching Needs'}
              </span>
              <span className="text-[11px] text-slate-400">Browse what verified orphanages need</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => navigate('my_requests')}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center space-x-3">
            <span className="text-xl">📋</span>
            <div>
              <span className="font-bold text-slate-800 block">
                {isTe ? 'ఇన్‌కమింగ్ అభ్యర్థనలు' : 'Incoming Requests & Deliveries'}
              </span>
              <span className="text-[11px] text-slate-400">Track pickups and status</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Logout & Footer */}
      <div className="space-y-3 pt-1">
        <button
          onClick={logout}
          className="w-full py-3 px-4 rounded-2xl border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>{isTe ? 'లాగ్ అవుట్' : 'Log Out'}</span>
        </button>

        <div className="pt-2 text-center flex flex-col items-center space-y-1">
          <SamanvayLogo size="xs" />
          <div className="text-xs font-bold text-slate-800 font-['Noto_Sans_Telugu',sans-serif]">
            సమన్వయ్ • Samanvay
          </div>
          <p className="text-[10px] text-slate-500 max-w-xs leading-tight">
            Connect Available Resources With Verified Needs
          </p>
        </div>
      </div>

      {/* Safe bottom spacer ensuring last elements appear well above fixed bottom navigation */}
      <div className="h-10 sm:h-14 w-full shrink-0 pointer-events-none" aria-hidden="true" />
    </div>
  );
};
