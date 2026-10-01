import React from 'react';
import { useResource } from '../context/ResourceContext';
import { CheckCircle2 } from 'lucide-react';

export const FloatingToast: React.FC = () => {
  const { toast } = useResource();

  if (!toast) return null;

  return (
    <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 max-w-sm w-11/12 animate-in fade-in slide-in-from-top-3 duration-200">
      <div className="bg-slate-900/95 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-2.5 text-xs font-semibold backdrop-blur-xs border border-slate-700">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="flex-1">{toast}</span>
      </div>
    </div>
  );
};
