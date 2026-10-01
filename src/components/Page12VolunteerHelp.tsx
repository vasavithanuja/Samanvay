import React from 'react';
import { useResource } from '../context/ResourceContext';
import { MapPin, Truck, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Page12VolunteerHelp: React.FC = () => {
  const { volunteerTasks, acceptTaskAsVolunteer, language } = useResource();
  const isTe = language === 'te';

  return (
    <div
      className="p-4 sm:p-6 max-w-md mx-auto space-y-5 pb-36 sm:pb-44"
      style={{ paddingBottom: 'calc(9.5rem + env(safe-area-inset-bottom, 16px))' }}
    >
      {/* Title & Subtitle */}
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight">
          Volunteer Help
        </h1>
        <p className="text-sm font-semibold text-blue-600">
          “డబ్బు కాదు — కేవలం సహాయం”
        </p>
        <p className="text-xs text-slate-500">
          {isTe ? 'వనరులను ఒక ప్రదేశం నుండి ఆశ్రమానికి చేరవేయండి' : 'Simple physical transport tasks • No money handled'}
        </p>
      </div>

      {/* Volunteer Principle Banner */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-600 flex items-center gap-2">
        <span className="text-lg">🚚</span>
        <div>
          <span className="font-bold text-slate-800">Volunteer Responsibility:</span>{' '}
          Pickup → Transport → Delivery → Confirmation.
        </div>
      </div>

      {/* List of Delivery Tasks */}
      <div className="space-y-4">
        {volunteerTasks.map((task, idx) => {
          const isFirst = idx === 0;

          return (
            <div
              key={task.id}
              className={`bg-white rounded-3xl p-5 border-2 transition-all space-y-4 shadow-xs ${
                isFirst
                  ? 'border-blue-500 ring-4 ring-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Task Header & Priority */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2.5">
                  <span className="text-2xl">📦</span>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">
                      Pick up {task.quantity} {task.resourceTitle.toLowerCase().replace(/pick up|\d+/g, '').trim()}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      <span>{task.distanceKm} km route</span>
                    </div>
                  </div>
                </div>

                {task.priority === 'High' && (
                  <span className="bg-orange-100 text-orange-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-orange-200">
                    High Priority
                  </span>
                )}
              </div>

              {/* Route: From & To */}
              <div className="bg-slate-50 rounded-2xl p-3.5 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-semibold">{isTe ? 'పికప్:' : 'From:'}</span>
                  <span className="font-extrabold text-slate-800">{task.fromName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-semibold">{isTe ? 'డ్రాప్:' : 'To:'}</span>
                  <span className="font-extrabold text-slate-800">{task.toName}</span>
                </div>
              </div>

              {/* Action Button: Accept Delivery Task */}
              <button
                id={`btn-accept-task-${task.id}`}
                onClick={() => acceptTaskAsVolunteer(task.id)}
                className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                  isFirst
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>
                  {isFirst
                    ? (isTe ? 'డెలివరీ టాస్క్‌ను స్వీకరించండి' : 'Accept Delivery Task')
                    : (isTe ? 'టాస్క్ వివరాలు చూడండి' : 'View Task')}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Safe bottom spacer ensuring last card & buttons appear well above fixed bottom navigation */}
      <div className="h-10 sm:h-14 w-full shrink-0 pointer-events-none" aria-hidden="true" />
    </div>
  );
};
