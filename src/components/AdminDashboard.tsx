import React, { useState } from 'react';
import { useResource } from '../context/ResourceContext';
import {
  ShieldAlert,
  ShieldCheck,
  Users,
  Package,
  HeartHandshake,
  Truck,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  ArrowRight,
  LogOut,
  Bell,
  UserCheck,
  FileText,
  AlertTriangle,
  FolderTree,
  Activity,
  User,
  Sparkles,
} from 'lucide-react';
import { SamanvayLogo } from './SamanvayLogo';

export const AdminDashboard: React.FC = () => {
  const {
    userSession,
    navigate,
    logout,
    language,
    needs,
    availableResources,
    requests,
    volunteerTasks,
    categories,
    organizationVerifications,
    verifyOrganization,
    userAccounts,
    toggleUserVerification,
    auditLogs,
    addAuditLog,
  } = useResource();

  const [activeSection, setActiveSection] = useState<
    'verification' | 'users' | 'resources' | 'needs' | 'deliveries' | 'categories' | 'audit'
  >('verification');

  const [searchTerm, setSearchTerm] = useState('');
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const isTe = language === 'te';

  // Counts
  const registeredDonorsCount = userAccounts.filter((u) => u.role === 'donor').length + 40;
  const registeredOrgsCount = organizationVerifications.length + 24;
  const registeredVolunteersCount = userAccounts.filter((u) => u.role === 'volunteer').length + 62;
  const activeResourcesCount = availableResources.length;
  const openNeedsCount = needs.filter((n) => n.status === 'Open' || n.status === 'Matched').length;
  const activeDeliveriesCount = volunteerTasks.filter((t) => t.status === 'Accepted' || t.status === 'Picked Up').length;
  const completedDeliveriesCount = requests.filter((r) => r.status === 'Delivered' || r.status === 'Received').length + 154;

  return (
    <div
      className="p-4 sm:p-6 max-w-md mx-auto space-y-5 pb-36 sm:pb-44"
      style={{ paddingBottom: 'calc(9.5rem + env(safe-area-inset-bottom, 16px))' }}
    >
      {/* Header: Samanvay, Admin profile, Notifications, Logout */}
      <div className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-900 via-slate-900 to-indigo-950 text-white border border-purple-800 shadow-md">
        <div className="flex items-center gap-2.5">
          <SamanvayLogo size="xs" />
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-extrabold text-xs text-white font-['Noto_Sans_Telugu',sans-serif]">
                సమన్వయ్
              </span>
              <span className="text-[10px] font-bold text-purple-200">
                • Samanvay Admin
              </span>
            </div>
            <p className="text-[10px] text-purple-300 font-medium leading-none mt-1">
              State Social Impact Mission Portal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowNotificationsModal(true)}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors relative cursor-pointer"
            title="System Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full" />
          </button>
          <button
            onClick={() => navigate('admin_profile')}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Admin Profile"
          >
            <User className="w-4 h-4" />
          </button>
          <button
            onClick={logout}
            className="p-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/40 text-red-200 transition-colors cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Admin Title & Authority Badge */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Admin Command Center</span>
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-bold">
              Protected Area
            </span>
          </h1>
        </div>
        <p className="text-xs text-slate-500 font-medium">
          Monitor system metrics, review verification credentials, and inspect activity logs.
        </p>
      </div>

      {/* 7 Summary Cards (Registered Donors, Orgs, Volunteers, Active Resources, Open Needs, Active Deliveries, Completed Deliveries) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="bg-white border border-slate-200 rounded-2xl p-2.5 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 block uppercase">Donors</span>
          <span className="text-lg font-extrabold text-teal-700 font-display">{registeredDonorsCount}</span>
          <span className="text-[10px] text-slate-500 block">Registered</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-2.5 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 block uppercase">Organizations</span>
          <span className="text-lg font-extrabold text-blue-700 font-display">{registeredOrgsCount}</span>
          <span className="text-[10px] text-slate-500 block">Care Homes / NGOs</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-2.5 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 block uppercase">Volunteers</span>
          <span className="text-lg font-extrabold text-indigo-700 font-display">{registeredVolunteersCount}</span>
          <span className="text-[10px] text-slate-500 block">Verified Drivers</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-2.5 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 block uppercase">Resources</span>
          <span className="text-lg font-extrabold text-emerald-700 font-display">{activeResourcesCount}</span>
          <span className="text-[10px] text-slate-500 block">Active Stock</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-2.5 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 block uppercase">Open Needs</span>
          <span className="text-lg font-extrabold text-amber-700 font-display">{openNeedsCount}</span>
          <span className="text-[10px] text-slate-500 block">Awaiting Match</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-2.5 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 block uppercase">In Transit</span>
          <span className="text-lg font-extrabold text-indigo-700 font-display">{activeDeliveriesCount}</span>
          <span className="text-[10px] text-slate-500 block">Live Deliveries</span>
        </div>

        <div className="col-span-2 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-2.5 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-emerald-800 block uppercase">Completed Deliveries</span>
            <span className="text-xl font-extrabold text-emerald-900 font-display">{completedDeliveriesCount}</span>
          </div>
          <span className="text-2xl">🎉</span>
        </div>
      </div>

      {/* Admin 7 Sections Navigation Bar */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
          {[
            { id: 'verification', label: '1. Org Verification' },
            { id: 'users', label: '2. Users' },
            { id: 'resources', label: '3. Resources' },
            { id: 'needs', label: '4. Needs' },
            { id: 'deliveries', label: '5. Deliveries' },
            { id: 'categories', label: '6. Categories' },
            { id: 'audit', label: '7. Audit / Activity' },
          ].map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id as any)}
              className={`px-3 py-2 rounded-2xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeSection === sec.id
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>

        {/* Section 1: Organization Verification */}
        {activeSection === 'verification' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">
                Organization Verification & Accreditations ({organizationVerifications.length})
              </span>
              <span className="text-[11px] text-purple-700 font-semibold">Government Certified</span>
            </div>

            <div className="space-y-3">
              {organizationVerifications.map((org) => (
                <div
                  key={org.id}
                  className="bg-white rounded-3xl p-4.5 border border-slate-200 shadow-2xs space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">{org.orgName}</h4>
                      <p className="text-xs text-slate-500">{org.orgType}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5 font-mono">{org.certificateNumber}</p>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        org.status === 'Verified'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : org.status === 'Pending'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-purple-100 text-purple-800 border border-purple-200'
                      }`}
                    >
                      {org.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-2xl">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Contact Person</span>
                      <strong className="text-slate-800">{org.contactPerson}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Phone Line</span>
                      <strong className="text-slate-800">{org.phone}</strong>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-400 block text-[10px]">Location Address</span>
                      <strong className="text-slate-800">{org.location}</strong>
                    </div>
                  </div>

                  {/* Verification Actions */}
                  <div className="flex gap-2 pt-1">
                    {org.status !== 'Verified' ? (
                      <button
                        onClick={() => verifyOrganization(org.id, 'Verified')}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve Verification</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => verifyOrganization(org.id, 'Needs Review')}
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Flag for Review</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 2: Users */}
        {activeSection === 'users' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">Platform Users Directory</span>
              <span className="text-slate-400 text-[11px]">Donors • Orgs • Volunteers</span>
            </div>

            <div className="space-y-2.5">
              {userAccounts.map((u) => (
                <div
                  key={u.id}
                  className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs flex items-center justify-between text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-slate-900 font-bold text-sm">{u.name}</strong>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.2 rounded-full uppercase ${
                          u.role === 'donor'
                            ? 'bg-teal-100 text-teal-800'
                            : u.role === 'organization'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-indigo-100 text-indigo-800'
                        }`}
                      >
                        {u.role}
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px]">{u.email} • {u.location}</p>
                    <p className="text-slate-400 text-[10px]">Joined: {u.joinedDate}</p>
                  </div>

                  <button
                    onClick={() => toggleUserVerification(u.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer transition-colors ${
                      u.isVerified
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {u.isVerified ? '✓ Verified' : 'Unverified'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: Resources */}
        {activeSection === 'resources' && (
          <div className="space-y-3">
            <span className="font-bold text-slate-700 text-xs block">Active Resources Across Network</span>
            <div className="space-y-2.5">
              {availableResources.map((res) => (
                <div
                  key={res.id}
                  className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-slate-900 text-sm">{res.title}</h4>
                    <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                      {res.availableQuantity} {res.unit}
                    </span>
                  </div>
                  <p className="text-slate-500">Provider: <strong className="text-slate-700">{res.providerName}</strong> ({res.providerType})</p>
                  <p className="text-slate-400 text-[11px]">Location: {res.location}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 4: Needs */}
        {activeSection === 'needs' && (
          <div className="space-y-3">
            <span className="font-bold text-slate-700 text-xs block">Open Needs Submitted by Organizations</span>
            <div className="space-y-2.5">
              {needs.map((nd) => (
                <div
                  key={nd.id}
                  className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-slate-900 text-sm">{nd.title}</h4>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        nd.priority === 'High' ? 'bg-orange-100 text-orange-800' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {nd.priority} Priority
                    </span>
                  </div>
                  <p className="text-slate-600">
                    Required: <strong>{nd.quantity} {nd.unit}</strong> by {nd.orphanageName}
                  </p>
                  <p className="text-slate-400 text-[11px]">Need by: {nd.needBy} • Status: {nd.status}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 5: Deliveries */}
        {activeSection === 'deliveries' && (
          <div className="space-y-3">
            <span className="font-bold text-slate-700 text-xs block">Live Volunteer Deliveries Tracking</span>
            <div className="space-y-2.5">
              {volunteerTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 font-bold">{task.resourceTitle}</strong>
                    <span className="font-bold bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded-full text-[10px]">
                      {task.status}
                    </span>
                  </div>
                  <div className="text-slate-600 space-y-0.5 text-[11px]">
                    <p><strong>From:</strong> {task.fromName}</p>
                    <p><strong>To:</strong> {task.toName}</p>
                    <p><strong>Volunteer:</strong> {task.volunteerName || 'Ravi Kumar (Volunteer)'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 6: Categories */}
        {activeSection === 'categories' && (
          <div className="space-y-3">
            <span className="font-bold text-slate-700 text-xs block">System Resource Categories</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {categories.map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-2xl p-3 border border-slate-200 shadow-2xs space-y-1"
                >
                  <span className="text-xl block">{c.icon}</span>
                  <strong className="text-slate-900 block font-bold">{c.nameEn}</strong>
                  <span className="text-slate-500 text-[11px] block">{c.nameTe}</span>
                  <span className="text-[10px] text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded font-mono">
                    Unit: {c.defaultUnit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 7: Audit / Activity */}
        {activeSection === 'audit' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">Real-time Platform Audit Log</span>
              <span className="text-purple-700 font-semibold text-[11px]">Live Security Stream</span>
            </div>

            <div className="space-y-2">
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="bg-white rounded-2xl p-3 border border-slate-200 shadow-2xs space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 font-bold">{log.action}</strong>
                    <span className="text-[10px] text-slate-400 font-mono">{log.timestamp}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">{log.details}</p>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] text-slate-400">
                    <span>Performed by: {log.performedBy}</span>
                    <span className="font-semibold uppercase text-purple-700">{log.role}</span>
                  </div>
                </div>
              ))}
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
                <span>System Security Alerts</span>
              </h3>
              <button
                onClick={() => setShowNotificationsModal(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-purple-50 border border-purple-100 rounded-2xl">
                <span className="font-bold text-purple-900 block">Pending NGO Verification</span>
                <span className="text-slate-600">Sneha Child Shelter Home submitted renewal certificate.</span>
                <span className="text-[10px] text-slate-400 block mt-1">Today 09:30 AM</span>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-2xl">
                <span className="font-bold text-emerald-900 block">System Integrity Check</span>
                <span className="text-slate-600">All resource allocations verified balanced.</span>
                <span className="text-[10px] text-slate-400 block mt-1">Today 06:00 AM</span>
              </div>
            </div>
            <button
              onClick={() => setShowNotificationsModal(false)}
              className="w-full py-2.5 bg-purple-700 text-white font-bold rounded-2xl text-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
