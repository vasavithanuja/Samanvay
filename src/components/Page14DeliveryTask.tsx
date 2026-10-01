import React from 'react';
import { useResource } from '../context/ResourceContext';
import { MapPin, Building, CheckCircle2, ArrowRight, PackageCheck, Truck } from 'lucide-react';

export const Page14DeliveryTask: React.FC = () => {
  const { activeVolunteerTask, progressVolunteerStep, language } = useResource();
  const isTe = language === 'te';

  const task = activeVolunteerTask;
  const isPickedUp = task?.status === 'Picked Up';

  const handleAction = () => {
    if (task) {
      progressVolunteerStep(task.id);
    }
  };

  return (
    <div
      className="p-4 sm:p-6 max-w-md mx-auto space-y-6 pb-36 sm:pb-44"
      style={{ paddingBottom: 'calc(9.5rem + env(safe-area-inset-bottom, 16px))' }}
    >
      {/* Title */}
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight">
          Delivery Task
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          {isTe ? 'వాలంటీర్ రవాణా టాస్క్' : 'Volunteer physical resource pickup & delivery'}
        </p>
      </div>

      {/* Task Summary Card */}
      <div className="bg-white rounded-3xl p-5 border-2 border-blue-500 shadow-sm space-y-4 ring-4 ring-blue-50">
        <div className="flex items-center space-x-3.5 pb-3 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-2xl shrink-0">
            📦
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 leading-tight">
              {task?.resourceTitle || '50 School Notebooks'}
            </h2>
            <span className="text-xs font-semibold text-blue-600">
              {task?.distanceKm || 8} km total route
            </span>
          </div>
        </div>

        {/* Pickup & Drop Points */}
        <div className="space-y-3 text-xs">
          <div className="flex items-start space-x-2.5">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
              P
            </span>
            <div className="space-y-0.5">
              <span className="text-slate-400 font-semibold block uppercase text-[10px]">
                {isTe ? 'పికప్ ప్రదేశం' : 'Pickup:'}
              </span>
              <span className="font-extrabold text-slate-900 text-sm block">
                {task?.fromName || 'ABC College'}
              </span>
              <p className="text-slate-500">
                {task?.pickupLocation || 'Main Administrative Block, Bhimavaram'}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2.5 pt-2 border-t border-slate-100">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
              D
            </span>
            <div className="space-y-0.5">
              <span className="text-slate-400 font-semibold block uppercase text-[10px]">
                {isTe ? 'డ్రాప్ ప్రదేశం' : 'Drop:'}
              </span>
              <span className="font-extrabold text-slate-900 text-sm block">
                {task?.toName || 'ABC Orphanage'}
              </span>
              <p className="text-slate-500">
                {task?.dropLocation || 'Ward 12, Gandhi Road, Bhimavaram'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Simple Steps */}
      <div className="space-y-3">
        <h3 className="text-base font-extrabold text-slate-900">
          3 Simple Steps
        </h3>

        <div className="space-y-3">
          {/* Step 1 */}
          <div className={`p-4 rounded-2xl border transition-all flex items-center space-x-3.5 ${
            isPickedUp ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-blue-200 ring-2 ring-blue-50'
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-sm shrink-0 ${
              isPickedUp ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'
            }`}>
              {isPickedUp ? '✓' : '1'}
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">
                Reach pickup place
              </div>
              <div className="text-xs text-slate-500">
                Visit {task?.fromName || 'ABC College'}
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className={`p-4 rounded-2xl border transition-all flex items-center space-x-3.5 ${
            isPickedUp ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200'
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-sm shrink-0 ${
              isPickedUp ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              {isPickedUp ? '✓' : '2'}
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">
                Collect the resource
              </div>
              <div className="text-xs text-slate-500">
                Receive {task?.quantity || 50} physical items
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white flex items-center space-x-3.5">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-extrabold text-sm shrink-0">
              3
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">
                Deliver to orphanage
              </div>
              <div className="text-xs text-slate-500">
                Hand over to {task?.toName || 'ABC Orphanage'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="pt-2">
        {!isPickedUp ? (
          <button
            id="btn-mark-as-picked-up"
            onClick={handleAction}
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg shadow-blue-600/25 flex items-center justify-center space-x-2 text-base transition-all transform active:scale-[0.99] cursor-pointer"
          >
            <PackageCheck className="w-5 h-5" />
            <span>{isTe ? 'సేకరించినట్లు గుర్తించండి (Mark as Picked Up)' : 'Mark as Picked Up'}</span>
          </button>
        ) : (
          <button
            id="btn-mark-as-delivered"
            onClick={handleAction}
            className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg shadow-emerald-600/25 flex items-center justify-center space-x-2 text-base transition-all transform active:scale-[0.99] cursor-pointer animate-bounce"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{isTe ? 'చేరినట్లు గుర్తించండి (Mark as Delivered)' : 'Mark as Delivered'}</span>
          </button>
        )}
      </div>

      {/* Safe bottom spacer ensuring last action button appears well above fixed bottom navigation */}
      <div className="h-10 sm:h-14 w-full shrink-0 pointer-events-none" aria-hidden="true" />
    </div>
  );
};
