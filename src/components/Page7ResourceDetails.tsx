import React from 'react';
import { useResource } from '../context/ResourceContext';
import { ArrowRight, Calendar, AlertCircle, FileText, Hash, Tag } from 'lucide-react';

export const Page7ResourceDetails: React.FC = () => {
  const { needDraft, updateNeedDraft, findMatchesForDraft, language } = useResource();
  const isTe = language === 'te';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    findMatchesForDraft();
  };

  return (
    <div className="p-4 sm:p-6 max-w-md mx-auto space-y-6 pb-20">
      {/* Progress Indicator: 1 Category → 2 Details → 3 Match → 4 Done */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200/60">
        <span className="text-emerald-600 font-bold">1. Category ✓</span>
        <span>→</span>
        <span className="text-blue-600 font-bold">2. Details ●</span>
        <span>→</span>
        <span>3. Match ○</span>
        <span>→</span>
        <span>4. Done ○</span>
      </div>

      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight">
          Resource Details
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Category: <span className="font-bold text-blue-600">{needDraft.category}</span>
        </p>
      </div>

      {/* Form with required fields */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
        {/* Field 1: Resource Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-blue-600" />
            <span>{isTe ? 'వనరు పేరు' : 'Resource name'}</span>
          </label>
          <input
            id="input-resource-name"
            type="text"
            required
            value={needDraft.title}
            onChange={(e) => updateNeedDraft({ title: e.target.value })}
            placeholder="e.g. School Notebooks"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Field 2: How many? (Quantity & Unit) */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-blue-600" />
              <span>{isTe ? 'ఎన్ని కావాలి?' : 'How many?'}</span>
            </label>
            <input
              id="input-resource-qty"
              type="number"
              min="1"
              required
              value={needDraft.quantity}
              onChange={(e) => updateNeedDraft({ quantity: parseInt(e.target.value) || 1 })}
              placeholder="e.g. 50"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-800"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              {isTe ? 'కొలత / యూనిట్' : 'Unit'}
            </label>
            <input
              id="input-resource-unit"
              type="text"
              required
              value={needDraft.unit}
              onChange={(e) => updateNeedDraft({ unit: e.target.value })}
              placeholder="e.g. notebooks / sets"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Field 3: Priority (High, Medium, Low) */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>{isTe ? 'ప్రాధాన్యత' : 'Priority'}</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['High', 'Medium', 'Low'] as const).map((p) => {
              const isSelected = needDraft.priority === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => updateNeedDraft({ priority: p })}
                  className={`py-2.5 px-3 rounded-2xl text-xs font-bold border-2 transition-all cursor-pointer ${
                    isSelected
                      ? p === 'High'
                        ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-xs'
                        : 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        {/* Field 4: Need by Date */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>{isTe ? 'ఎప్పటిలోగా కావాలి?' : 'Need by:'}</span>
          </label>
          <input
            id="input-need-by-date"
            type="date"
            required
            value={needDraft.needBy}
            onChange={(e) => updateNeedDraft({ needBy: e.target.value })}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Field 5: Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>{isTe ? 'వివరణ' : 'Description'}</span>
          </label>
          <textarea
            id="input-need-desc"
            rows={3}
            value={needDraft.description}
            onChange={(e) => updateNeedDraft({ description: e.target.value })}
            placeholder="Example: For children aged 8–15"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
          />
        </div>

        {/* Primary Action Button: Find Matching Resources → */}
        <div className="pt-2">
          <button
            id="btn-find-matching-resources"
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-4 px-6 rounded-2xl shadow-md shadow-blue-600/25 flex items-center justify-center space-x-2 text-sm transition-all transform active:scale-[0.99] cursor-pointer"
          >
            <span>{isTe ? 'సరిపోయే వనరులను కనుగొనండి →' : 'Find Matching Resources →'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
