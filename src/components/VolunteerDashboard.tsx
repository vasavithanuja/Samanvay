import React, { useState } from 'react';
import { useResource } from '../context/ResourceContext';
import {
  Truck,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Clock,
  Package,
  Building,
  Bell,
  User,
  LogOut,
  Navigation,
  ChevronRight,
  Check,
} from 'lucide-react';
import { SamanvayLogo } from './SamanvayLogo';

export const VolunteerDashboard: React.FC = () => {
  const {
    userSession,
    volunteerTasks,
    acceptTaskAsVolunteer,
    progressVolunteerStep,
    language,
    navigate,
    logout,
  } = useResource();

  const [activeTab, setActiveTab] = useState<'available' | 'accepted' | 'active_delivery' | 'completed' | 'notifications'>('available');
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const isTe = language === 'te';

  // Task filtering
  const availableTasks = volunteerTasks.filter((t) => t.status === 'Available');
  const acceptedTasks = volunteerTasks.filter((t) => t.status === 'Accepted');
  const activeDeliveries = volunteerTasks.filter((t) => t.status === 'Picked Up');
  const completedDeliveries = volunteerTasks.filter((t) => t.status === 'Delivered');

  return (
    <div
      className="p-4 sm:p-6 max-w-md mx-auto space-y-5 pb-36 sm:pb-44"
      style={{ paddingBottom: 'calc(9.5rem + env(safe-area-inset-bottom, 16px))' }}
    >
      {/* Header: Samanvay branding, Volunteer Name, Notifications, Profile, Logout */}
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
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-indigo-600 rounded-full" />
          </button>
          <button
            onClick={() => navigate('volunteer_profile')}
            className="p-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer border border-slate-200"
            title="Volunteer Profile"
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
            <span>Welcome, {userSession.name} 🚚</span>
          </h1>
        </div>
        <p className="text-sm font-semibold text-indigo-700">
          {isTe ? 'వనరులను ప్రదాతల నుండి సంస్థలకు సురక్షితంగా చేర్చడంలో సహాయపడండి.' : '“Help move resources safely from donors to organizations.”'}
        </p>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-indigo-600" />
            <span>{userSession.location}</span>
          </span>
          <span>•</span>
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Delivery Volunteer</span>
          </span>
        </div>
      </div>

      {/* 4 Summary Cards: Available Pickup Tasks, Accepted Tasks, Active Deliveries, Completed Deliveries */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {/* 1. Available Pickup Tasks */}
        <div
          onClick={() => setActiveTab('available')}
          className={`bg-white border rounded-2xl p-3 shadow-2xs cursor-pointer transition-all ${
            activeTab === 'available' ? 'border-indigo-500 ring-2 ring-indigo-100' : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-indigo-700 mb-1">
            <Truck className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase bg-indigo-50 px-1.5 py-0.5 rounded text-indigo-800">
              Open
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-display">
            {availableTasks.length}
          </div>
          <div className="text-[11px] font-bold text-slate-600">
            {isTe ? 'అందుబాటులో ఉన్న టాస్క్‌లు' : 'Available Pickups'}
          </div>
        </div>

        {/* 2. Accepted Tasks */}
        <div
          onClick={() => setActiveTab('accepted')}
          className={`bg-white border rounded-2xl p-3 shadow-2xs cursor-pointer transition-all ${
            activeTab === 'accepted' ? 'border-indigo-500 ring-2 ring-indigo-100' : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-amber-700 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase bg-amber-50 px-1.5 py-0.5 rounded text-amber-800">
              Assigned
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-display">
            {acceptedTasks.length}
          </div>
          <div className="text-[11px] font-bold text-slate-600">
            {isTe ? 'అంగీకరించినవి' : 'Accepted Tasks'}
          </div>
        </div>

        {/* 3. Active Deliveries */}
        <div
          onClick={() => setActiveTab('active_delivery')}
          className={`bg-white border rounded-2xl p-3 shadow-2xs cursor-pointer transition-all ${
            activeTab === 'active_delivery' ? 'border-indigo-500 ring-2 ring-indigo-100' : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-blue-700 mb-1">
            <Navigation className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase bg-blue-50 px-1.5 py-0.5 rounded text-blue-800">
              Transit
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-display">
            {activeDeliveries.length || (acceptedTasks.length > 0 ? 1 : 0)}
          </div>
          <div className="text-[11px] font-bold text-slate-600">
            {isTe ? 'యాక్టివ్ డెలివరీలు' : 'Active Deliveries'}
          </div>
        </div>

        {/* 4. Completed Deliveries */}
        <div
          onClick={() => setActiveTab('completed')}
          className={`bg-white border rounded-2xl p-3 shadow-2xs cursor-pointer transition-all ${
            activeTab === 'completed' ? 'border-indigo-500 ring-2 ring-indigo-100' : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-emerald-700 mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase bg-emerald-50 px-1.5 py-0.5 rounded text-emerald-800">
              Done
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-display">
            {completedDeliveries.length + 12}
          </div>
          <div className="text-[11px] font-bold text-slate-600">
            {isTe ? 'పూర్తయినవి' : 'Completed'}
          </div>
        </div>
      </div>

      {/* Main Action Banner: View Available Pickup Tasks */}
      <button
        onClick={() => setActiveTab('available')}
        className="w-full bg-gradient-to-br from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white p-4 rounded-3xl shadow-md shadow-indigo-600/20 flex items-center justify-between cursor-pointer group"
      >
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-white/20 text-white flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
            🚚
          </div>
          <div className="text-left">
            <h3 className="font-extrabold text-base leading-tight">
              {isTe ? 'అందుబాటులో ఉన్న పికప్ టాస్క్‌లు చూడండి' : 'View Available Pickup Tasks'}
            </h3>
            <p className="text-xs text-indigo-100 font-medium mt-0.5">
              {availableTasks.length} open deliveries waiting for volunteer pickup
            </p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
          <ArrowRight className="w-4 h-4" />
        </div>
      </button>

      {/* Dashboard Sections:
          1. Available Pickup Tasks
          2. Accepted Tasks
          3. Active Deliveries
          4. Completed Deliveries
          5. Notifications */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
          {[
            { id: 'available', label: isTe ? 'పికప్‌లు' : '1. Available Tasks', count: availableTasks.length },
            { id: 'accepted', label: isTe ? 'నా టాస్క్‌లు' : '2. Accepted Tasks', count: acceptedTasks.length },
            { id: 'active_delivery', label: isTe ? 'రవాణాలో' : '3. Active Deliveries', count: activeDeliveries.length || (acceptedTasks.length > 0 ? 1 : 0) },
            { id: 'completed', label: isTe ? 'చరిత్ర' : '4. Completed', count: completedDeliveries.length + 12 },
            { id: 'notifications', label: isTe ? 'నోటిఫికేషన్‌లు' : '5. Alerts', count: 2 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2 rounded-2xl font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs'
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

        {/* Section 1: Available Pickup Tasks */}
        {activeTab === 'available' && (
          <div className="space-y-3">
            <span className="font-bold text-slate-700 text-xs block">
              {isTe ? 'పికప్ చేయడానికి సిద్ధంగా ఉన్న వస్తువులు' : 'Available Pickup Tasks Nearby'}
            </span>

            <div className="space-y-3.5">
              {availableTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-4 hover:shadow-xs transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                        Task #{task.id}
                      </span>
                      <h3 className="font-extrabold text-slate-900 text-base mt-1">
                        {task.resourceTitle}
                      </h3>
                      <div className="text-xs font-bold text-indigo-700">
                        Quantity: {task.quantity} {task.unit}
                      </div>
                    </div>

                    {task.priority === 'High' ? (
                      <span className="bg-orange-100 text-orange-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-orange-200">
                        High Urgency
                      </span>
                    ) : (
                      <span className="bg-slate-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded-full">
                        Normal
                      </span>
                    )}
                  </div>

                  {/* Route: Donor Pickup & Organization Drop-off */}
                  <div className="bg-slate-50 rounded-2xl p-3.5 space-y-2 text-xs">
                    <div className="flex items-start justify-between">
                      <div className="space-y-0.5">
                        <span className="text-slate-400 font-semibold block text-[10px] uppercase">Donor Pickup:</span>
                        <strong className="text-slate-800 text-sm block">{task.fromName}</strong>
                        <p className="text-slate-500 text-[11px]">{task.pickupLocation}</p>
                      </div>
                    </div>

                    <div className="flex items-start justify-between pt-2 border-t border-slate-200/60">
                      <div className="space-y-0.5">
                        <span className="text-slate-400 font-semibold block text-[10px] uppercase">Organization Drop:</span>
                        <strong className="text-slate-800 text-sm block">{task.toName}</strong>
                        <p className="text-slate-500 text-[11px]">{task.dropLocation}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/60 font-semibold text-slate-600">
                      <span>Total Distance:</span>
                      <span className="flex items-center gap-1 font-bold text-slate-900">
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        <span>{task.distanceKm} km</span>
                      </span>
                    </div>
                  </div>

                  {/* Accept Task Action */}
                  <button
                    id={`btn-volunteer-accept-${task.id}`}
                    onClick={() => acceptTaskAsVolunteer(task.id)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-extrabold py-3 px-4 rounded-2xl text-xs flex items-center justify-center space-x-1.5 shadow-sm shadow-indigo-600/20 cursor-pointer"
                  >
                    <Truck className="w-4 h-4" />
                    <span>{isTe ? 'టాస్క్‌ను స్వీకరించండి (Accept Task)' : 'Accept Pickup Task'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 2: Accepted Tasks */}
        {activeTab === 'accepted' && (
          <div className="space-y-3">
            <span className="font-bold text-slate-700 text-xs block">
              {isTe ? 'మీరు అంగీకరించిన డెలివరీలు' : 'Tasks Accepted by You'}
            </span>

            {acceptedTasks.length === 0 ? (
              <div className="bg-white rounded-3xl p-6 text-center border border-slate-200 text-slate-500 text-xs">
                No currently accepted tasks. Select an available pickup task above.
              </div>
            ) : (
              acceptedTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-3xl p-4.5 border border-indigo-200 shadow-2xs space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">{task.resourceTitle}</h4>
                      <p className="text-xs text-slate-500">To: {task.toName}</p>
                    </div>
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      Ready for Pickup
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl text-xs space-y-1">
                    <p className="text-slate-600"><strong>Pickup:</strong> {task.pickupLocation}</p>
                    <p className="text-slate-600"><strong>Drop:</strong> {task.dropLocation}</p>
                  </div>

                  {/* Step progression buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => progressVolunteerStep(task.id)}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Mark as Picked Up</span>
                    </button>
                    <button
                      onClick={() => navigate('delivery_task')}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-3 rounded-xl text-xs cursor-pointer"
                    >
                      View Map
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Section 3: Active Deliveries */}
        {activeTab === 'active_delivery' && (
          <div className="space-y-3">
            <span className="font-bold text-slate-700 text-xs block">
              {isTe ? 'ప్రస్తుతం రవాణాలో ఉన్నవి' : 'In-Transit Deliveries'}
            </span>

            <div className="bg-white rounded-3xl p-4.5 border-2 border-indigo-500 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold">
                    🚚
                  </span>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">50 School Notebooks</h4>
                    <span className="text-[11px] text-indigo-700 font-bold">Picked up from ABC College</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                  On the Way
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl text-xs space-y-1">
                <p className="text-slate-600"><strong>Destination:</strong> Karuna Care Home, Ward 12, Bhimavaram</p>
                <p className="text-slate-600"><strong>Contact at Orphanage:</strong> Sister Mary (+91 98490 12345)</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => progressVolunteerStep(volunteerTasks[0]?.id || 'vtask-1')}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark as Delivered</span>
                </button>
                <button
                  onClick={() => navigate('delivery_task')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-3 rounded-xl text-xs cursor-pointer"
                >
                  Route Info
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Section 4: Completed Deliveries */}
        {activeTab === 'completed' && (
          <div className="space-y-3">
            <span className="font-bold text-slate-700 text-xs block">
              {isTe ? 'పూర్తయిన డెలివరీల చరిత్ర' : 'Completed Volunteer Deliveries History'}
            </span>

            <div className="space-y-2.5">
              {[
                { title: '10 School Bags', to: 'Karuna Care Home', from: 'Community Club', date: '5 days ago', km: '11 km' },
                { title: '15 Hygiene Kits', to: 'Bhimavaram Child Shelter', from: 'Rotary Youth Care', date: '2 weeks ago', km: '6 km' },
                { title: '25 Children Dresses', to: 'Ananda Nilayam Old Age & Child Haven', from: 'Gandhi Nagar Family', date: '3 weeks ago', km: '5 km' },
              ].map((c, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <strong className="text-slate-900 font-bold">{c.title}</strong>
                    <p className="text-slate-500 text-[11px]">{c.from} → {c.to}</p>
                    <span className="text-[10px] text-slate-400">{c.date} • {c.km} driven</span>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Delivered</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 5: Notifications */}
        {activeTab === 'notifications' && (
          <div className="space-y-2.5">
            <span className="font-bold text-slate-700 text-xs block">
              {isTe ? 'వాలంటీర్ నోటిఫికేషన్‌లు' : 'Volunteer Alerts & Announcements'}
            </span>

            <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-2xl text-xs space-y-1">
              <span className="font-bold text-indigo-900 block">New Urgent Pickup Nearby!</span>
              <p className="text-slate-600 leading-relaxed">
                50 School Notebooks ready at ABC College for Karuna Care Home.
              </p>
              <span className="text-[10px] text-indigo-700 block font-semibold">20 minutes ago</span>
            </div>

            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs space-y-1">
              <span className="font-bold text-emerald-900 block">Volunteer Milestone Achieved!</span>
              <p className="text-slate-600 leading-relaxed">
                You have completed 12 volunteer deliveries and covered over 85 km for community care homes.
              </p>
              <span className="text-[10px] text-emerald-700 block font-semibold">1 day ago</span>
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
                <span>Volunteer Notifications</span>
              </h3>
              <button
                onClick={() => setShowNotificationsModal(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-2xl">
                <span className="font-bold text-indigo-900 block">Pickup Requested</span>
                <span className="text-slate-600">New delivery task available in Bhimavaram center.</span>
                <span className="text-[10px] text-slate-400 block mt-1">Today 10:00 AM</span>
              </div>
            </div>
            <button
              onClick={() => setShowNotificationsModal(false)}
              className="w-full py-2.5 bg-indigo-600 text-white font-bold rounded-2xl text-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
