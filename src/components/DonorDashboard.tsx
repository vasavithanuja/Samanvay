import React, { useState } from 'react';
import { useResource } from '../context/ResourceContext';
import {
  Package,
  PlusCircle,
  Search,
  ClipboardList,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Building,
  MapPin,
  Bell,
  User,
  LogOut,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { SamanvayLogo } from './SamanvayLogo';

export const DonorDashboard: React.FC = () => {
  const {
    userSession,
    navigate,
    language,
    needs,
    availableResources,
    requests,
    offerResourceForNeed,
    logout,
  } = useResource();

  const [activeTab, setActiveTab] = useState<'my_resources' | 'incoming_requests' | 'active_deliveries' | 'completed' | 'notifications'>('my_resources');
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const isTe = language === 'te';

  // Donor resources
  const myResources = availableResources.filter(
    (r) => r.providerName.toLowerCase().includes(userSession.name.toLowerCase()) || r.providerName.includes('College') || r.providerName.includes('Trust')
  );

  // Incoming & active requests
  const incomingRequests = requests.filter(
    (r) => (r.providerName.includes('College') || r.providerName.includes(userSession.name) || r.providerName.includes('Trust')) &&
           (r.status === 'Requested' || r.status === 'Accepted' || r.status === 'Pickup')
  );

  const activeDeliveries = requests.filter(
    (r) => (r.providerName.includes('College') || r.providerName.includes(userSession.name) || r.providerName.includes('Trust')) &&
           (r.status === 'Pickup' || r.status === 'On the Way')
  );

  const completedDonations = requests.filter(
    (r) => (r.providerName.includes('College') || r.providerName.includes(userSession.name) || r.providerName.includes('Trust')) &&
           (r.status === 'Delivered' || r.status === 'Received')
  );

  const reservedQuantity = myResources.reduce((acc, curr) => acc + (curr.reservedQuantity || 50), 0);

  return (
    <div
      className="p-4 sm:p-6 max-w-md mx-auto space-y-5 pb-36 sm:pb-44"
      style={{ paddingBottom: 'calc(9.5rem + env(safe-area-inset-bottom, 16px))' }}
    >
      {/* Samanvay Header */}
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

        {/* Quick Header Actions: Notifications, Profile, Logout */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowNotificationsModal(true)}
            className="p-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-600 transition-colors relative cursor-pointer border border-slate-200"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-slate-700" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-teal-600 rounded-full" />
          </button>
          <button
            onClick={() => navigate('donor_profile')}
            className="p-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer border border-slate-200"
            title="Donor Profile"
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
          <h1 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
            <span>Welcome, {userSession.name} 📦</span>
          </h1>
        </div>
        <p className="text-sm font-semibold text-teal-700">
          {isTe ? 'అందుబాటులో ఉన్న వనరులను ధృవీకరించబడిన సంస్థలతో పంచుకోండి.' : '“Share available resources with verified organizations.”'}
        </p>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-teal-600" />
            <span>{userSession.location}</span>
          </span>
          <span>•</span>
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Donor</span>
          </span>
        </div>
      </div>

      {/* Four Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {/* 1. Active Resources */}
        <div
          onClick={() => setActiveTab('my_resources')}
          className={`bg-white border rounded-2xl p-3 shadow-2xs cursor-pointer transition-all ${
            activeTab === 'my_resources' ? 'border-teal-500 ring-2 ring-teal-100' : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-teal-700 mb-1">
            <Package className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase bg-teal-50 px-1.5 py-0.5 rounded text-teal-800">
              Active
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-display">
            {myResources.length || 3}
          </div>
          <div className="text-[11px] font-bold text-slate-600">
            {isTe ? 'యాక్టివ్ వనరులు' : 'Active Resources'}
          </div>
        </div>

        {/* 2. Pending Requests */}
        <div
          onClick={() => setActiveTab('incoming_requests')}
          className={`bg-white border rounded-2xl p-3 shadow-2xs cursor-pointer transition-all ${
            activeTab === 'incoming_requests' ? 'border-teal-500 ring-2 ring-teal-100' : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-amber-700 mb-1">
            <ClipboardList className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase bg-amber-50 px-1.5 py-0.5 rounded text-amber-800">
              Requests
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-display">
            {incomingRequests.length || 1}
          </div>
          <div className="text-[11px] font-bold text-slate-600">
            {isTe ? 'పెండింగ్ అభ్యర్థనలు' : 'Pending Requests'}
          </div>
        </div>

        {/* 3. Reserved Quantity */}
        <div
          onClick={() => setActiveTab('active_deliveries')}
          className={`bg-white border rounded-2xl p-3 shadow-2xs cursor-pointer transition-all ${
            activeTab === 'active_deliveries' ? 'border-teal-500 ring-2 ring-teal-100' : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-blue-700 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase bg-blue-50 px-1.5 py-0.5 rounded text-blue-800">
              Reserved
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-display">
            {reservedQuantity}
          </div>
          <div className="text-[11px] font-bold text-slate-600">
            {isTe ? 'రిజర్వ్ అయినవి' : 'Reserved Qty'}
          </div>
        </div>

        {/* 4. Completed Donations */}
        <div
          onClick={() => setActiveTab('completed')}
          className={`bg-white border rounded-2xl p-3 shadow-2xs cursor-pointer transition-all ${
            activeTab === 'completed' ? 'border-teal-500 ring-2 ring-teal-100' : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-emerald-700 mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase bg-emerald-50 px-1.5 py-0.5 rounded text-emerald-800">
              Completed
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-display">
            {completedDonations.length + 3}
          </div>
          <div className="text-[11px] font-bold text-slate-600">
            {isTe ? 'పూర్తయిన దానాలు' : 'Completed'}
          </div>
        </div>
      </div>

      {/* Main Actions: + Add Resource / Add Availability & View Matching Needs */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => navigate('provider_post')}
          className="bg-gradient-to-br from-teal-600 to-emerald-700 hover:from-teal-700 hover:to-emerald-800 text-white rounded-3xl p-4 text-left shadow-md shadow-teal-600/20 hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer flex flex-col justify-between space-y-2.5 min-h-[120px] group"
        >
          <div className="w-10 h-10 rounded-2xl bg-white/20 text-white flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
            ➕
          </div>
          <div>
            <h3 className="font-extrabold text-sm leading-tight">
              {isTe ? '+ వనరును జోడించండి' : '+ Add Resource / Availability'}
            </h3>
            <p className="text-[11px] text-teal-100 font-medium mt-0.5">
              Share physical surplus goods
            </p>
          </div>
        </button>

        <button
          onClick={() => navigate('provider_needs')}
          className="bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-teal-500 rounded-3xl p-4 text-left shadow-2xs hover:shadow-sm transition-all active:scale-[0.98] cursor-pointer flex flex-col justify-between space-y-2.5 min-h-[120px] group"
        >
          <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
            🎯
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 leading-tight group-hover:text-teal-700 transition-colors">
              {isTe ? 'సరిపోలే అవసరాలు' : 'View Matching Needs'}
            </h3>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              Fulfill open orphanage requests
            </p>
          </div>
        </button>
      </div>

      {/* Dashboard Section Tabs:
          1. My Resources
          2. Incoming Requests
          3. Active Deliveries
          4. Completed Donations
          5. Notifications */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
          {[
            { id: 'my_resources', label: isTe ? 'నా వనరులు' : '1. My Resources', count: myResources.length },
            { id: 'incoming_requests', label: isTe ? 'అభ్యర్థనలు' : '2. Requests', count: incomingRequests.length },
            { id: 'active_deliveries', label: isTe ? 'డెలివరీలు' : '3. Deliveries', count: activeDeliveries.length },
            { id: 'completed', label: isTe ? 'చరిత్ర' : '4. History', count: completedDonations.length + 3 },
            { id: 'notifications', label: isTe ? 'నోటిఫికేషన్‌లు' : '5. Alerts', count: 2 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2 rounded-2xl font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-teal-600 text-white shadow-xs'
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

        {/* Tab 1: My Resources */}
        {activeTab === 'my_resources' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">
                {isTe ? 'మీరు పోస్ట్ చేసిన వనరులు' : 'Resources Posted by You'}
              </span>
              <button
                onClick={() => navigate('provider_post')}
                className="text-teal-700 font-bold hover:underline cursor-pointer"
              >
                + Add Another
              </button>
            </div>

            <div className="space-y-3">
              {myResources.map((res) => {
                const totalQty = res.availableQuantity + (res.reservedQuantity || 50);
                const reserved = res.reservedQuantity || 50;
                const remaining = res.availableQuantity;

                return (
                  <div
                    key={res.id}
                    className="bg-white rounded-3xl p-4.5 border border-slate-200 shadow-2xs space-y-3 hover:shadow-xs transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">
                            {res.category === 'School Supplies' ? '🎒' : res.category === 'Books' ? '📚' : res.category === 'Clothes' ? '👕' : '🧴'}
                          </span>
                          <h4 className="font-extrabold text-slate-900 text-base leading-tight">
                            {res.title}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">
                          Category: {res.category} • Condition: {res.condition}
                        </p>
                      </div>

                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {remaining > 0 ? 'Active' : 'Allocated'}
                      </span>
                    </div>

                    {/* Quantity Grid: Available, Reserved, Remaining */}
                    <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-2xl text-xs text-center border border-slate-100">
                      <div>
                        <span className="text-slate-400 block text-[10px] font-semibold uppercase">Total Posted</span>
                        <span className="font-extrabold text-slate-900">{totalQty} {res.unit}</span>
                      </div>
                      <div>
                        <span className="text-amber-600 block text-[10px] font-semibold uppercase">Reserved</span>
                        <span className="font-extrabold text-amber-700">{reserved} {res.unit}</span>
                      </div>
                      <div>
                        <span className="text-teal-700 block text-[10px] font-semibold uppercase">Remaining</span>
                        <span className="font-extrabold text-teal-800">{remaining} {res.unit}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-teal-600" />
                        <span>{res.location}</span>
                      </span>
                      <button
                        onClick={() => navigate('marketplace')}
                        className="font-bold text-teal-700 hover:text-teal-900 flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>View Public Listing</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Incoming Requests */}
        {activeTab === 'incoming_requests' && (
          <div className="space-y-3">
            <span className="font-bold text-slate-700 text-xs block">
              {isTe ? 'సంస్థల నుండి వచ్చిన అభ్యర్థనలు' : 'Requests from Verified Organizations'}
            </span>

            {incomingRequests.length === 0 ? (
              <div className="bg-white rounded-3xl p-6 text-center border border-slate-200 text-slate-500 text-xs">
                No pending requests right now. Organizations will request matching resources when needed.
              </div>
            ) : (
              incomingRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white rounded-3xl p-4.5 border border-slate-200 shadow-2xs space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                        {req.id}
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-base mt-1">
                        {req.resourceTitle}
                      </h4>
                      <p className="text-xs font-semibold text-slate-600 flex items-center gap-1 mt-0.5">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        <span>Requested by: <strong className="text-slate-900">{req.orphanageName}</strong></span>
                      </p>
                    </div>

                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
                      {req.status}
                    </span>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-3 text-xs space-y-1">
                    <p className="text-slate-600">
                      <strong>Pickup arrangement:</strong> {req.currentStepMessage || 'Volunteer pickup assigned.'}
                    </p>
                    <p className="text-slate-500 text-[11px]">
                      Volunteer: {req.volunteerName || 'Ravi Kumar (Volunteer)'}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate('request_status')}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>View Request & Delivery Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Active Deliveries */}
        {activeTab === 'active_deliveries' && (
          <div className="space-y-3">
            <span className="font-bold text-slate-700 text-xs block">
              {isTe ? 'ప్రస్తుత రవాణా స్థితి' : 'Active Volunteer Deliveries'}
            </span>

            <div className="space-y-3">
              {activeDeliveries.map((del) => (
                <div
                  key={del.id}
                  className="bg-white rounded-3xl p-4.5 border border-slate-200 shadow-2xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                        🚚
                      </span>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm">
                          {del.resourceTitle}
                        </h4>
                        <span className="text-[11px] text-slate-500">Destination: {del.orphanageName}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      In Transit
                    </span>
                  </div>

                  <div className="space-y-2 text-xs bg-slate-50 p-3 rounded-2xl">
                    <div className="flex justify-between text-slate-600">
                      <span>Assigned Volunteer:</span>
                      <strong className="text-slate-800">{del.volunteerName || 'Ravi Kumar Varma'}</strong>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Distance:</span>
                      <strong className="text-slate-800">{del.distanceKm} km</strong>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Current Status:</span>
                      <strong className="text-blue-700">{del.currentStepMessage}</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('request_status')}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Track Live Delivery</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Completed Donations */}
        {activeTab === 'completed' && (
          <div className="space-y-3">
            <span className="font-bold text-slate-700 text-xs block">
              {isTe ? 'పూర్తయిన దానాల చరిత్ర' : 'Completed Donation History'}
            </span>

            <div className="space-y-3">
              {[
                {
                  id: 'don-c1',
                  title: '50 School Notebooks',
                  recipient: 'Karuna Care Home',
                  date: 'Yesterday, 4:30 PM',
                  volunteer: 'Ravi Kumar Varma',
                  status: 'Verified Received',
                },
                {
                  id: 'don-c2',
                  title: '15 School Backpacks',
                  recipient: 'Bhimavaram Child Shelter',
                  date: '18 Sep 2026',
                  volunteer: 'Suresh Varma',
                  status: 'Verified Received',
                },
                {
                  id: 'don-c3',
                  title: '20 Stationery Kits',
                  recipient: 'Ananda Nilayam Old Age & Child Haven',
                  date: '10 Sep 2026',
                  volunteer: 'Community Youth Volunteer',
                  status: 'Verified Received',
                },
              ].map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-3xl p-4 border border-slate-200 shadow-2xs space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">{c.title}</h4>
                      <p className="text-xs text-slate-500 font-medium">To: {c.recipient}</p>
                    </div>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{c.status}</span>
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-100">
                    <span>Delivered by {c.volunteer}</span>
                    <span>{c.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Notifications */}
        {activeTab === 'notifications' && (
          <div className="space-y-2.5">
            <span className="font-bold text-slate-700 text-xs block">
              {isTe ? 'ప్రదాత నోటిఫికేషన్‌లు' : 'Donor Notifications & Activity'}
            </span>

            <div className="p-3.5 bg-teal-50 border border-teal-200 rounded-2xl text-xs space-y-1">
              <span className="font-bold text-teal-900 block">Karuna Care Home requested your 50 Notebooks!</span>
              <p className="text-slate-600 leading-relaxed">
                A volunteer pickup task has been automatically scheduled for tomorrow morning.
              </p>
              <span className="text-[10px] text-teal-700 block font-semibold">15 minutes ago</span>
            </div>

            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs space-y-1">
              <span className="font-bold text-emerald-900 block">Thank You! Delivery confirmed</span>
              <p className="text-slate-600 leading-relaxed">
                Karuna Care Home confirmed receipt of 15 School Bags. Digital acknowledgment issued.
              </p>
              <span className="text-[10px] text-emerald-700 block font-semibold">2 days ago</span>
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
                <span>Donor Notifications</span>
              </h3>
              <button
                onClick={() => setShowNotificationsModal(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-teal-50 border border-teal-100 rounded-2xl">
                <span className="font-bold text-teal-900 block">Request Accepted</span>
                <span className="text-slate-600">Volunteer assigned for 50 Notebooks pickup.</span>
                <span className="text-[10px] text-slate-400 block mt-1">Today 10:15 AM</span>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-2xl">
                <span className="font-bold text-emerald-900 block">Donation Completed</span>
                <span className="text-slate-600">Verified received by orphanage director.</span>
                <span className="text-[10px] text-slate-400 block mt-1">Yesterday</span>
              </div>
            </div>
            <button
              onClick={() => setShowNotificationsModal(false)}
              className="w-full py-2.5 bg-teal-600 text-white font-bold rounded-2xl text-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
