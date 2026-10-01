import React, { useState } from 'react';
import { useResource } from '../context/ResourceContext';
import {
  Search,
  PlusCircle,
  Package,
  Truck,
  ClipboardList,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Building,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Bell,
  User,
  LogOut,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { ResourceCategory } from '../types';
import { SamanvayLogo } from './SamanvayLogo';

export const Page5HomeDashboard: React.FC = () => {
  const {
    userSession,
    navigate,
    language,
    needs,
    availableResources,
    searchQuery,
    setSearchQuery,
    selectCategoryForNeed,
    requests,
    logout,
  } = useResource();

  const [activeTab, setActiveTab] = useState<'my_needs' | 'matching_resources' | 'requests' | 'deliveries' | 'history' | 'notifications'>('my_needs');
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const isTe = language === 'te';

  // Metrics
  const openNeeds = needs.filter((n) => n.status === 'Open' || n.status === 'Matched');
  const matchingResources = availableResources.filter((r) => r.availableQuantity > 0);
  const pendingRequests = requests.filter((r) => r.status === 'Requested' || r.status === 'Accepted' || r.status === 'Searching');
  const activeDeliveries = requests.filter((r) => r.status === 'Pickup' || r.status === 'On the Way');
  const receivedResources = requests.filter((r) => r.status === 'Delivered' || r.status === 'Received');

  // Filtered needs based on search
  const filteredNeeds = needs.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="p-4 sm:p-6 max-w-md mx-auto space-y-5 pb-36 sm:pb-44"
      style={{ paddingBottom: 'calc(9.5rem + env(safe-area-inset-bottom, 16px))' }}
    >
      {/* Header: Samanvay branding, Org Name, Notifications, Profile, Logout */}
      <div className="flex items-center justify-between px-3.5 py-2 rounded-2xl bg-gradient-to-r from-teal-50/90 via-emerald-50/70 to-amber-50/50 border border-teal-200/50 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <SamanvayLogo size="xs" />
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-extrabold text-xs text-slate-900 font-['Noto_Sans_Telugu',sans-serif]">
                సమన్వయ్
              </span>
              <span className="text-[10px] font-bold text-teal-800">
                • Samanvay
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium leading-none mt-1">
              Connect Available Resources With Verified Needs
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowNotificationsModal(true)}
            className="p-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-600 transition-colors relative cursor-pointer border border-slate-200"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-slate-700" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-600 rounded-full" />
          </button>
          <button
            onClick={() => navigate('org_profile')}
            className="p-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer border border-slate-200"
            title="Organization Profile"
          >
            <User className="w-4 h-4 text-slate-700" />
          </button>
          <button
            onClick={logout}
            className="p-1.5 rounded-xl bg-white hover:bg-red-50 text-red-600 transition-colors cursor-pointer border border-red-200"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Welcome, {userSession.name} 🏠</span>
          </h1>
        </div>
        <p className="text-sm font-semibold text-blue-700">
          {isTe ? 'మీ ధృవీకరించబడిన అవసరాల కోసం అందుబాటులో ఉన్న వనరులను కనుగొనండి.' : '“Find available resources for your verified needs.”'}
        </p>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>{userSession.location}</span>
          </span>
          <span>•</span>
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>✓ Verified Organization</span>
          </span>
        </div>
      </div>

      {/* 5 Summary Cards: Open Needs, Matching Resources, Pending Requests, Active Deliveries, Received Resources */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        <div
          onClick={() => setActiveTab('my_needs')}
          className={`bg-white border rounded-2xl p-2.5 shadow-2xs cursor-pointer transition-all ${
            activeTab === 'my_needs' ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <span className="text-[10px] font-bold text-blue-700 block uppercase">Open Needs</span>
          <span className="text-xl font-extrabold text-blue-900 font-display">{openNeeds.length}</span>
          <span className="text-[10px] text-slate-500 block">Requested</span>
        </div>

        <div
          onClick={() => setActiveTab('matching_resources')}
          className={`bg-white border rounded-2xl p-2.5 shadow-2xs cursor-pointer transition-all ${
            activeTab === 'matching_resources' ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <span className="text-[10px] font-bold text-teal-700 block uppercase">Matching</span>
          <span className="text-xl font-extrabold text-teal-900 font-display">{matchingResources.length}</span>
          <span className="text-[10px] text-slate-500 block">Available</span>
        </div>

        <div
          onClick={() => setActiveTab('requests')}
          className={`bg-white border rounded-2xl p-2.5 shadow-2xs cursor-pointer transition-all ${
            activeTab === 'requests' ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <span className="text-[10px] font-bold text-amber-700 block uppercase">Pending</span>
          <span className="text-xl font-extrabold text-amber-900 font-display">{pendingRequests.length}</span>
          <span className="text-[10px] text-slate-500 block">In Progress</span>
        </div>

        <div
          onClick={() => setActiveTab('deliveries')}
          className={`bg-white border rounded-2xl p-2.5 shadow-2xs cursor-pointer transition-all ${
            activeTab === 'deliveries' ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <span className="text-[10px] font-bold text-indigo-700 block uppercase">Deliveries</span>
          <span className="text-xl font-extrabold text-indigo-900 font-display">{activeDeliveries.length || 1}</span>
          <span className="text-[10px] text-slate-500 block">In Transit</span>
        </div>

        <div
          onClick={() => setActiveTab('history')}
          className={`col-span-2 sm:col-span-1 bg-white border rounded-2xl p-2.5 shadow-2xs cursor-pointer transition-all ${
            activeTab === 'history' ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <span className="text-[10px] font-bold text-emerald-700 block uppercase">Received</span>
          <span className="text-xl font-extrabold text-emerald-900 font-display">{receivedResources.length + 24}</span>
          <span className="text-[10px] text-slate-500 block">Total Items</span>
        </div>
      </div>

      {/* Main Actions: + Post a Need & Find Resources */}
      <div className="grid grid-cols-2 gap-3">
        <button
          id="btn-ask-resource"
          onClick={() => navigate('ask_category')}
          className="bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-3xl p-4 text-left shadow-md shadow-blue-600/20 hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer flex flex-col justify-between space-y-2.5 min-h-[120px] group"
        >
          <div className="w-10 h-10 rounded-2xl bg-white/20 text-white flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
            🙋
          </div>
          <div>
            <h3 className="font-extrabold text-sm leading-tight">
              {isTe ? '+ అవసరాన్ని పోస్ట్ చేయండి' : '+ Post a Need'}
            </h3>
            <p className="text-[11px] text-blue-100 font-medium mt-0.5">
              Specify items needed for kids
            </p>
          </div>
        </button>

        <button
          id="btn-find-resources"
          onClick={() => navigate('marketplace')}
          className="bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-blue-500 rounded-3xl p-4 text-left shadow-2xs hover:shadow-sm transition-all active:scale-[0.98] cursor-pointer flex flex-col justify-between space-y-2.5 min-h-[120px] group"
        >
          <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
            📦
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 leading-tight group-hover:text-blue-700 transition-colors">
              {isTe ? 'వనరులను కనుగొనండి' : 'Find Resources'}
            </h3>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              Explore available donor stocks
            </p>
          </div>
        </button>
      </div>

      {/* Simple Search Box */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          id="home-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={isTe ? 'పుస్తకాలు, దుస్తులు, ఆహారం వెతకండి...' : 'Search books, supplies, food...'}
          className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded-full bg-slate-100 cursor-pointer"
          >
            ✕
          </button>
        )}
      </div>

      {/* Dashboard Sections:
          1. My Needs
          2. Matching Resources
          3. Requests
          4. Incoming Deliveries
          5. Received / History
          6. Notifications */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
          {[
            { id: 'my_needs', label: isTe ? 'మా అవసరాలు' : '1. My Needs', count: filteredNeeds.length },
            { id: 'matching_resources', label: isTe ? 'సరిపోలే వనరులు' : '2. Matching Resources', count: matchingResources.length },
            { id: 'requests', label: isTe ? 'అభ్యర్థనలు' : '3. Requests', count: pendingRequests.length },
            { id: 'deliveries', label: isTe ? 'డెలివరీలు' : '4. Inbound Deliveries', count: activeDeliveries.length || 1 },
            { id: 'history', label: isTe ? 'స్వీకరించినవి' : '5. History', count: receivedResources.length + 24 },
            { id: 'notifications', label: isTe ? 'నోటిఫికేషన్‌లు' : '6. Alerts', count: 2 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2 rounded-2xl font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Section 1: My Needs */}
        {activeTab === 'my_needs' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">
                {isTe ? 'ప్రస్తుత అవసరాలు' : 'Current Needs Posted by Organization'}
              </span>
              <button
                onClick={() => navigate('ask_category')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer bg-blue-50 px-2.5 py-1 rounded-full"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ Add Need</span>
              </button>
            </div>

            <div className="space-y-3">
              {filteredNeeds.map((item) => {
                const isHighPriority = item.priority === 'High';

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-slate-200 rounded-3xl p-4 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between"
                  >
                    <div className="flex items-start space-x-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl shrink-0">
                        {item.category === 'School Supplies' ? '📚' : item.category === 'Clothes' ? '🧥' : item.category === 'Hygiene' ? '🧴' : '🍚'}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-900 text-sm">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-bold text-slate-700">
                            Need: {item.quantity} {item.unit}
                          </span>
                        </div>
                        <div>
                          {isHighPriority ? (
                            <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-800 border border-orange-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              <span>●</span>
                              <span>High Urgency</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded-full">
                              <span>Medium Priority</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        selectCategoryForNeed(item.category);
                      }}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs px-3 py-2 rounded-2xl transition-colors cursor-pointer shrink-0 ml-2"
                    >
                      {isTe ? 'వెతకండి' : 'Find Match'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Section 2: Matching Resources */}
        {activeTab === 'matching_resources' && (
          <div className="space-y-3">
            <span className="font-bold text-slate-700 text-xs block">
              {isTe ? 'అందుబాటులో ఉన్న సరిపోలే వనరులు' : 'Available Resources Matching Open Needs'}
            </span>

            <div className="space-y-3">
              {matchingResources.slice(0, 4).map((res) => (
                <div
                  key={res.id}
                  className="bg-white rounded-3xl p-4.5 border border-slate-200 shadow-2xs space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">{res.title}</h4>
                      <p className="text-xs text-slate-500 font-medium">Provided by {res.providerName}</p>
                      <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full inline-block mt-1">
                        {res.availableQuantity} {res.unit} available
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-blue-600" />
                      <span>{res.distanceKm} km</span>
                    </span>
                  </div>

                  <button
                    onClick={() => navigate('marketplace')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Request This Resource</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: Requests */}
        {activeTab === 'requests' && (
          <div className="space-y-3">
            <span className="font-bold text-slate-700 text-xs block">
              {isTe ? 'మీ ప్రస్తుత అభ్యర్థనలు' : 'Your Resource Requests in Progress'}
            </span>

            <div className="space-y-3">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white rounded-3xl p-4.5 border border-slate-200 shadow-2xs space-y-2.5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">{req.resourceTitle}</h4>
                      <p className="text-xs text-slate-500">From: {req.providerName}</p>
                    </div>
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">
                      {req.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl">
                    {req.currentStepMessage || 'Volunteer pickup assigned and route mapped.'}
                  </p>

                  <button
                    onClick={() => navigate('request_status')}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Track Status Timeline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 4: Incoming Deliveries */}
        {activeTab === 'deliveries' && (
          <div className="space-y-3">
            <span className="font-bold text-slate-700 text-xs block">
              {isTe ? 'చేరుకుంటున్న రవాణా సామాగ్రి' : 'Inbound Volunteer Deliveries to Orphanage'}
            </span>

            <div className="space-y-3">
              <div className="bg-white rounded-3xl p-4.5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                      🚚
                    </span>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">50 School Notebooks</h4>
                      <span className="text-[11px] text-slate-500">From ABC Educational Trust</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                    On the Way
                  </span>
                </div>

                <div className="space-y-1.5 text-xs bg-slate-50 p-3 rounded-2xl">
                  <div className="flex justify-between text-slate-600">
                    <span>Driver Volunteer:</span>
                    <strong className="text-slate-800">Ravi Kumar Varma</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>ETA:</span>
                    <strong className="text-blue-700">~25 minutes</strong>
                  </div>
                </div>

                <button
                  onClick={() => navigate('request_status')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Confirm Receipt & Sign OTP</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Section 5: Received / History */}
        {activeTab === 'history' && (
          <div className="space-y-3">
            <span className="font-bold text-slate-700 text-xs block">
              {isTe ? 'అందుకున్న సామాగ్రి చరిత్ర' : 'Completed Received Resources History'}
            </span>

            <div className="space-y-2.5">
              {[
                { title: '10 School Bags', from: 'Community Club', date: '5 days ago', qty: '10 bags' },
                { title: '15 Hygiene Kits', from: 'Rotary Youth Care', date: '2 weeks ago', qty: '15 kits' },
                { title: '25 Children Uniforms', from: 'Gandhi Nagar Family Group', date: '3 weeks ago', qty: '25 sets' },
              ].map((h, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <strong className="text-slate-900 font-bold">{h.title}</strong>
                    <p className="text-slate-500 text-[11px]">From: {h.from} • {h.qty}</p>
                    <span className="text-[10px] text-slate-400">{h.date}</span>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Received</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 6: Notifications */}
        {activeTab === 'notifications' && (
          <div className="space-y-2.5">
            <span className="font-bold text-slate-700 text-xs block">
              {isTe ? 'సంస్థ నోటిఫికేషన్‌లు' : 'Organization Notifications & Alerts'}
            </span>

            <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl text-xs space-y-1">
              <span className="font-bold text-blue-900 block">ABC Educational Trust matched your request!</span>
              <p className="text-slate-600 leading-relaxed">
                50 School Notebooks reserved. Volunteer pickup scheduled.
              </p>
              <span className="text-[10px] text-blue-700 block font-semibold">10 minutes ago</span>
            </div>

            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs space-y-1">
              <span className="font-bold text-emerald-900 block">Delivery Completed</span>
              <p className="text-slate-600 leading-relaxed">
                10 School Bags confirmed received. Thank you note sent to donor.
              </p>
              <span className="text-[10px] text-emerald-700 block font-semibold">5 days ago</span>
            </div>
          </div>
        )}
      </div>

      {/* Safe bottom spacer ensuring last card & buttons appear well above fixed bottom navigation */}
      <div className="h-10 sm:h-14 w-full shrink-0 pointer-events-none" aria-hidden="true" />

      {/* Notifications Modal */}
      {showNotificationsModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-1.5">
                <span>🔔</span>
                <span>Organization Notifications</span>
              </h3>
              <button
                onClick={() => setShowNotificationsModal(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-2xl">
                <span className="font-bold text-blue-900 block">Request Accepted</span>
                <span className="text-slate-600">ABC Educational Trust approved 50 Notebooks.</span>
                <span className="text-[10px] text-slate-400 block mt-1">10 minutes ago</span>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-2xl">
                <span className="font-bold text-emerald-900 block">Delivery Completed</span>
                <span className="text-slate-600">10 School Bags delivered.</span>
                <span className="text-[10px] text-slate-400 block mt-1">5 days ago</span>
              </div>
            </div>
            <button
              onClick={() => setShowNotificationsModal(false)}
              className="w-full py-2.5 bg-blue-600 text-white font-bold rounded-2xl text-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
