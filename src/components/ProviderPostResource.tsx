import React, { useState } from 'react';
import { useResource } from '../context/ResourceContext';
import { ResourceCategory } from '../types';
import { Package, Upload, MapPin, CheckCircle2, ArrowRight, Sparkles, Building } from 'lucide-react';

export const ProviderPostResource: React.FC = () => {
  const { categories, addProviderResource, userSession, language, navigate } = useResource();
  const isTe = language === 'te';

  const [category, setCategory] = useState<ResourceCategory>('School Supplies');
  const [title, setTitle] = useState('');
  const [quantity, setQuantity] = useState<number>(50);
  const [unit, setUnit] = useState('notebooks');
  const [condition, setCondition] = useState('Brand New');
  const [location, setLocation] = useState('ABC College Campus Road, Bhimavaram');
  const [description, setDescription] = useState('Surplus physical stock from annual youth event inventory.');
  const [hasPhoto, setHasPhoto] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProviderResource({
      title: title || `${quantity} ${category}`,
      category,
      providerName: userSession.name,
      providerType: 'Educational Institution',
      availableQuantity: quantity,
      unit,
      distanceKm: 8,
      location,
      condition,
      description,
      badge: 'Good Match',
    });
  };

  return (
    <div className="p-4 sm:p-6 max-w-md mx-auto space-y-6 pb-20">
      {/* Title */}
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight">
          Share a Resource
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          {isTe ? 'అనాథాశ్రమాలకు ఉపయోగపడే మిగులు సామాగ్రిని పోస్ట్ చేయండి' : 'Post physical items available for orphanages to receive'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
        {/* 1. Category Selection */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">
            1. {isTe ? 'కేటగిరీ ఎంచుకోండి' : 'Select Resource Category'}
          </label>
          <div className="grid grid-cols-4 gap-2">
            {categories.slice(0, 8).map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setCategory(cat.id);
                  setUnit(cat.defaultUnit);
                }}
                className={`p-2 rounded-2xl border text-center transition-all cursor-pointer ${
                  category === cat.id
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-100'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <div className="text-xl">{cat.icon}</div>
                <div className="text-[10px] truncate mt-0.5">{cat.nameEn}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Resource Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">
            2. {isTe ? 'వనరు పేరు' : 'Resource Name'}
          </label>
          <input
            id="provider-input-name"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. 200-Page Ruled School Notebooks"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        {/* 3. Quantity & Unit */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              3. {isTe ? 'పరిమాణం' : 'Quantity'}
            </label>
            <input
              id="provider-input-qty"
              type="number"
              min="1"
              required
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-800"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              {isTe ? 'యూనిట్' : 'Unit'}
            </label>
            <input
              type="text"
              required
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm"
            />
          </div>
        </div>

        {/* 4. Upload Photo */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">
            4. {isTe ? 'ఫోటో జోడించండి' : 'Photo of Items'}
          </label>
          <div
            onClick={() => setHasPhoto(!hasPhoto)}
            className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-2xl p-4 text-center cursor-pointer bg-slate-50/50 transition-colors"
          >
            {hasPhoto ? (
              <div className="flex items-center justify-center space-x-2 text-emerald-700 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>items_sample_photo.jpg attached</span>
              </div>
            ) : (
              <div className="space-y-1">
                <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                <span className="text-xs text-slate-500 font-medium block">
                  Click to attach photo of physical resources
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 5. Add Condition */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">
            5. {isTe ? 'వస్తువుల పరిస్థితి' : 'Condition'}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['Brand New', 'Gently Used', 'Good Condition'].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCondition(c)}
                className={`py-2 px-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                  condition === c
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* 6. Location */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">
            6. {isTe ? 'పికప్ లొకేషన్' : 'Pickup Location'}
          </label>
          <input
            id="provider-input-location"
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm"
          />
        </div>

        {/* 7. Primary Button: Post Resource */}
        <div className="pt-2">
          <button
            id="btn-post-resource-submit"
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg shadow-emerald-600/25 flex items-center justify-center space-x-2 text-sm transition-all transform active:scale-[0.99] cursor-pointer"
          >
            <Package className="w-4 h-4" />
            <span>{isTe ? 'వనరును పోస్ట్ చేయండి' : 'Post Resource to Care Network'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
