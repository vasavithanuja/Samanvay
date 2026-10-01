import React, { useState } from 'react';
import { useResource } from '../context/ResourceContext';
import { MapPin, Building, ArrowRight, Sparkles, Filter, Search } from 'lucide-react';
import { AvailableResource } from '../types';

export const Page9Marketplace: React.FC = () => {
  const { availableResources, selectMatchToConfirm, language } = useResource();
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [query, setQuery] = useState('');
  const isTe = language === 'te';

  const filterChips = ['All', 'Books', 'Clothes', 'Food', 'School'];

  const filteredResources = availableResources.filter((res) => {
    const matchesCategory =
      selectedCategoryFilter === 'All' ||
      (selectedCategoryFilter === 'School' && (res.category === 'School Supplies' || res.title.toLowerCase().includes('school'))) ||
      res.category.toLowerCase().includes(selectedCategoryFilter.toLowerCase());

    const matchesQuery =
      query === '' ||
      res.title.toLowerCase().includes(query.toLowerCase()) ||
      res.providerName.toLowerCase().includes(query.toLowerCase());

    return matchesCategory && matchesQuery;
  });

  return (
    <div
      className="p-4 sm:p-6 max-w-md mx-auto space-y-5 pb-36 sm:pb-44"
      style={{ paddingBottom: 'calc(9.5rem + env(safe-area-inset-bottom, 16px))' }}
    >
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight">
          Available Resources
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          {isTe ? 'సమీప ప్రదాతల వద్ద ఉన్న భౌతిక వనరులు' : 'Physical resources shared by colleges, NGOs, and community groups'}
        </p>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
        {filterChips.map((chip) => {
          const isSelected = selectedCategoryFilter === chip;
          return (
            <button
              key={chip}
              onClick={() => setSelectedCategoryFilter(chip)}
              className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {chip === 'All' && isTe ? 'అన్నీ' : chip === 'Books' && isTe ? 'పుస్తకాలు' : chip === 'Clothes' && isTe ? 'దుస్తులు' : chip === 'Food' && isTe ? 'ఆహారం' : chip === 'School' && isTe ? 'పాఠశాల' : chip}
            </button>
          );
        })}
      </div>

      {/* Section: Near Your Orphanage */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>Near Your Orphanage</span>
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            Bhimavaram Area
          </span>
        </div>

        {/* Resource Cards */}
        <div className="space-y-3.5">
          {filteredResources.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-3xl p-4.5 shadow-2xs hover:shadow-xs transition-all space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl p-1 bg-slate-100 rounded-xl">
                    {item.category === 'School Supplies' ? '📚' : item.category === 'Clothes' ? '👕' : item.category === 'Food' ? '🍚' : '🎒'}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">
                      {item.title}
                    </h3>
                    <p className="text-xs font-bold text-blue-600">
                      {item.availableQuantity} {item.unit} available
                    </p>
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-medium text-slate-700">{item.providerName}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-full">
                    <MapPin className="w-3 h-3 text-blue-600" />
                    <span>{item.distanceKm} km away</span>
                  </span>
                </div>
              </div>

              {/* View & Request Button */}
              <button
                id={`btn-view-request-${item.id}`}
                onClick={() => selectMatchToConfirm(item, Math.min(50, item.availableQuantity))}
                className="w-full bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 font-bold py-3 px-4 rounded-2xl text-xs flex items-center justify-center space-x-1.5 transition-all cursor-pointer group"
              >
                <span>{isTe ? 'చూడండి & అభ్యర్థించండి' : 'View & Request'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Safe bottom spacer ensuring last cards appear well above fixed bottom navigation */}
      <div className="h-10 sm:h-14 w-full shrink-0 pointer-events-none" aria-hidden="true" />
    </div>
  );
};
