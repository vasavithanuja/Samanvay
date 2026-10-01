import React, { useState } from 'react';
import { useResource } from '../context/ResourceContext';
import {
  Truck,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Edit3,
  Save,
  Clock,
  CheckCircle2,
  Calendar,
  LogOut,
  ChevronRight,
  Navigation,
} from 'lucide-react';
import { SamanvayLogo } from './SamanvayLogo';

export const VolunteerProfile: React.FC = () => {
  const { userSession, updateUserProfile, navigate, logout, language, volunteerTasks } = useResource();
  const isTe = language === 'te';

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userSession.name || 'Ravi Kumar Varma',
    email: userSession.email || 'ravi.volunteer@care.org',
    phone: userSession.phone || '+91 94401 56789',
    location: userSession.location || 'Bhimavaram Central, West Godavari',
    availability: userSession.availability || 'Weekdays & Weekends (8 AM - 7 PM)',
    preferredServiceArea: userSession.preferredServiceArea || 'Bhimavaram Care Circle (15 km radius)',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      availability: formData.availability,
      preferredServiceArea: formData.preferredServiceArea,
    });
    setIsEditing(false);
  };

  const completedCount = volunteerTasks.filter((t) => t.status === 'Delivered').length + 12;
  const activeCount = volunteerTasks.filter((t) => t.status === 'Accepted' || t.status === 'Picked Up').length;

  return (
    <div
      className="p-4 sm:p-6 max-w-md mx-auto space-y-5 pb-36 sm:pb-44"
      style={{ paddingBottom: 'calc(9.5rem + env(safe-area-inset-bottom, 16px))' }}
    >
      {/* Header & Brand */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
            {isTe ? 'వాలంటీర్ ప్రొఫైల్' : 'Volunteer Profile'}
          </span>
          <h1 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight mt-1">
            {userSession.name}
          </h1>
        </div>
        <button
          onClick={() => navigate('volunteer_home')}
          className="text-xs font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-2xl cursor-pointer"
        >
          {isTe ? 'డ్యాష్‌బోర్డ్' : 'Dashboard'}
        </button>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4 relative overflow-hidden">
        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center space-x-3.5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-3xl shadow-md shadow-indigo-500/20 font-bold">
              🚚
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <h2 className="text-lg font-extrabold text-slate-900 leading-tight">
                  {userSession.name}
                </h2>
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              </div>
              <div className="text-xs font-semibold text-indigo-800 bg-indigo-50 px-2.5 py-0.5 rounded-full inline-block border border-indigo-200">
                Delivery Volunteer (Two-Wheeler & Light Van)
              </div>
              <div className="text-[11px] font-medium text-emerald-700 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>✓ Verified Community Volunteer</span>
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
                {isTe ? 'పూర్తి పేరు' : 'Full Name'}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
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
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
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
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {isTe ? 'స్థలం / ప్రాంతం' : 'Location'}
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {isTe ? 'అందుబాటు సమయం' : 'Availability'}
              </label>
              <input
                type="text"
                required
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                placeholder="e.g. Weekdays & Weekends (8 AM - 7 PM)"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {isTe ? 'ప్రాధాన్య సేవా ప్రాంతం' : 'Preferred Service Area'}
              </label>
              <input
                type="text"
                required
                value={formData.preferredServiceArea}
                onChange={(e) => setFormData({ ...formData, preferredServiceArea: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                placeholder="e.g. Bhimavaram Care Circle (15 km radius)"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-indigo-600/20"
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
                <Mail className="w-3.5 h-3.5 text-indigo-600" />
                <span>Email:</span>
              </span>
              <span className="font-semibold text-slate-800">{userSession.email || 'ravi.volunteer@care.org'}</span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1.5 text-slate-500">
                <Phone className="w-3.5 h-3.5 text-indigo-600" />
                <span>Phone:</span>
              </span>
              <span className="font-semibold text-slate-800">{userSession.phone || '+91 94401 56789'}</span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1.5 text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                <span>Location:</span>
              </span>
              <span className="font-semibold text-slate-800">{userSession.location}</span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1.5 text-slate-500">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>Availability:</span>
              </span>
              <span className="font-semibold text-slate-800">{userSession.availability || 'Weekdays & Weekends (8 AM - 7 PM)'}</span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1.5 text-slate-500">
                <Navigation className="w-3.5 h-3.5 text-indigo-600" />
                <span>Service Area:</span>
              </span>
              <span className="font-semibold text-slate-800">{userSession.preferredServiceArea || 'Bhimavaram Care Circle (15 km)'}</span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1.5 text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verification:</span>
              </span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                ✓ ID Verified Volunteer Driver
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Summary Impact Cards */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-indigo-50 border border-indigo-200/80 rounded-2xl p-3 text-center">
          <div className="text-xl font-extrabold text-indigo-800 font-display">
            {completedCount}
          </div>
          <div className="text-[11px] font-bold text-indigo-700 mt-0.5">
            {isTe ? 'పూర్తయినవి' : 'Completed'}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200/80 rounded-2xl p-3 text-center">
          <div className="text-xl font-extrabold text-blue-800 font-display">
            {activeCount || 1}
          </div>
          <div className="text-[11px] font-bold text-blue-700 mt-0.5">
            {isTe ? 'యాక్టివ్' : 'In Transit'}
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-3 text-center">
          <div className="text-xl font-extrabold text-emerald-800 font-display">
            86 km
          </div>
          <div className="text-[11px] font-bold text-emerald-700 mt-0.5">
            {isTe ? 'రవాణా దూరం' : 'KM Served'}
          </div>
        </div>
      </div>

      {/* Quick Navigation Menu */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs divide-y divide-slate-100 overflow-hidden text-sm">
        <button
          onClick={() => navigate('volunteer_home')}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center space-x-3">
            <span className="text-xl">🚚</span>
            <div>
              <span className="font-bold text-slate-800 block">
                {isTe ? 'వాలంటీర్ డ్యాష్‌బోర్డ్' : 'Volunteer Dashboard'}
              </span>
              <span className="text-[11px] text-slate-400">View tasks, progress deliveries</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => navigate('delivery_task')}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center space-x-3">
            <span className="text-xl">📍</span>
            <div>
              <span className="font-bold text-slate-800 block">
                {isTe ? 'ప్రస్తుత డెలివరీ టాస్క్' : 'Active Delivery Route'}
              </span>
              <span className="text-[11px] text-slate-400">Step-by-step pickup and drop navigation</span>
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
