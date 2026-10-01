import React from 'react';

interface SamanvayLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
  className?: string;
  showLockup?: boolean;
  tagline?: boolean;
  orientation?: 'vertical' | 'horizontal';
  animated?: boolean;
}

export const SamanvayLogoSymbol: React.FC<{ size?: number; className?: string }> = ({
  size = 56,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-label="సమన్వయ్ - Samanvay Logo"
    >
      <defs>
        {/* Soft Radial Aura */}
        <radialGradient id="sm-aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.18" />
          <stop offset="70%" stopColor="#22c55e" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#0f766e" stopOpacity="0" />
        </radialGradient>

        {/* Deep Teal to Turquoise Gradient */}
        <linearGradient id="sm-teal-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0f766e" />
          <stop offset="50%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>

        {/* Warm Orange / Golden Sun Accent Gradient */}
        <linearGradient id="sm-warm-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="60%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>

        {/* Fresh Green Leaf Gradient */}
        <linearGradient id="sm-leaf-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#15803d" />
          <stop offset="50%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>

        {/* Protective Arc Gradient */}
        <linearGradient id="sm-arc-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0d9488" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.85" />
          <stop offset="85%" stopColor="#22c55e" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#15803d" stopOpacity="0.4" />
        </linearGradient>

        {/* Shadow for hands */}
        <filter id="sm-soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#0f766e" floodOpacity="0.16" />
        </filter>
      </defs>

      {/* 1. Subtle Glow Aura Backdrop */}
      <circle cx="60" cy="60" r="54" fill="url(#sm-aura)" />

      {/* 2. Protective Circular Arc of Connection */}
      <path
        d="M 23 66 C 21 44, 38 23, 60 22 C 81 21, 99 38, 98 64"
        stroke="url(#sm-arc-grad)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeDasharray="1.5 0.5"
      />

      {/* Outer subtle orbital ring dot */}
      <circle cx="23" cy="66" r="2.2" fill="#0d9488" />

      {/* 3. Fresh Green Leaf Elements (Growth, Hope & Sustainability) */}
      {/* Primary Leaf */}
      <path
        d="M 68 22 C 69 13, 80 11, 84 15 C 88 19, 81 27, 72 26 C 70 26, 68 24, 68 22 Z"
        fill="url(#sm-leaf-grad)"
        filter="url(#sm-soft-shadow)"
      />
      {/* Secondary Companion Leaf */}
      <path
        d="M 76 25 C 79 19, 88 20, 89 24 C 90 28, 83 31, 78 28 Z"
        fill="#22c55e"
        opacity="0.9"
      />
      {/* Delicate Leaf Spine */}
      <path
        d="M 69 23 Q 77 19 83 16"
        stroke="#dcfce7"
        strokeWidth="0.8"
        strokeLinecap="round"
      />

      {/* 4. Central Community (People Helping People) */}
      <g id="sm-community" filter="url(#sm-soft-shadow)">
        {/* Left Community Member */}
        <circle cx="46" cy="50" r="4.2" fill="#0d9488" />
        <path
          d="M 40 68 C 40 59, 44 56, 46 56 C 48 56, 52 59, 52 68 Z"
          fill="#0f766e"
          opacity="0.9"
        />

        {/* Right Community Member */}
        <circle cx="74" cy="50" r="4.2" fill="#16a34a" />
        <path
          d="M 68 68 C 68 59, 72 56, 74 56 C 76 56, 80 59, 80 68 Z"
          fill="#15803d"
          opacity="0.9"
        />

        {/* Center Key Member (Elevated, Warm Amber - Hope & Dignity) */}
        <circle cx="60" cy="43" r="5.2" fill="url(#sm-warm-grad)" />
        <path
          d="M 52 68 C 52 56, 57 52, 60 52 C 63 52, 68 56, 68 68 Z"
          fill="url(#sm-teal-grad)"
        />
        {/* Connection bridge linking the 3 community members */}
        <path
          d="M 46 64 Q 60 62 74 64"
          stroke="#fef08a"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.8"
        />
      </g>

      {/* 5. Two Supportive Open Hands (Cradling & Lifting Care) */}
      <g id="sm-hands" filter="url(#sm-soft-shadow)">
        {/* Left Supportive Hand: Rises from bottom-left and curves up to support */}
        <path
          d="M 22 84 C 23 93, 33 99, 46 99 C 55 99, 58 95, 59 90 C 59 86, 55 83, 49 83 C 40 83, 35 79, 34 71 C 34 68, 32 68, 30 70 C 27 73, 22 77, 22 84 Z"
          fill="url(#sm-teal-grad)"
        />
        {/* Left Hand Inner Palm Gesture Contour */}
        <path
          d="M 28 80 C 33 88, 42 93, 53 92"
          stroke="#5eead4"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Right Supportive Hand: Rises from bottom-right, meeting in supportive harmony */}
        <path
          d="M 98 84 C 97 93, 87 99, 74 99 C 65 99, 62 95, 61 90 C 61 86, 65 83, 71 83 C 80 83, 85 79, 86 71 C 86 68, 88 68, 90 70 C 93 73, 98 77, 98 84 Z"
          fill="#0d9488"
        />
        {/* Right Hand Inner Palm Contour */}
        <path
          d="M 92 80 C 87 88, 78 93, 67 92"
          stroke="#2dd4bf"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Base Unity Knot: Where supportive hands join together */}
        <path
          d="M 52 94 C 57 96, 63 96, 68 94 C 66 98, 54 98, 52 94 Z"
          fill="#0f766e"
        />
      </g>

      {/* 6. Spark of Care (Small Golden Starlet / Resource Sparkle) */}
      <circle cx="60" cy="30" r="1.8" fill="#fbbf24" />
    </svg>
  );
};

export const SamanvayLogo: React.FC<SamanvayLogoProps> = ({
  size = 'md',
  className = '',
  showLockup = false,
  tagline = true,
  orientation = 'vertical',
}) => {
  // Numeric mapping
  const pxSize =
    typeof size === 'number'
      ? size
      : size === 'xs'
      ? 28
      : size === 'sm'
      ? 36
      : size === 'md'
      ? 48
      : size === 'lg'
      ? 72
      : size === 'xl'
      ? 96
      : 120; // 2xl

  if (!showLockup) {
    return <SamanvayLogoSymbol size={pxSize} className={className} />;
  }

  if (orientation === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-2.5 ${className}`}>
        <SamanvayLogoSymbol size={pxSize} />
        <div className="flex flex-col text-left">
          <span className="text-slate-900 font-extrabold text-base leading-tight tracking-tight font-['Noto_Sans_Telugu',sans-serif]">
            సమన్వయ్
          </span>
          <span className="text-xs font-semibold text-teal-800 tracking-wide font-sans -mt-0.5">
            Samanvay
          </span>
          {tagline && (
            <span className="text-[10px] text-slate-500 font-medium leading-none mt-0.5">
              Connect Available Resources With Verified Needs
            </span>
          )}
        </div>
      </div>
    );
  }

  // Vertical centered lockup
  return (
    <div className={`flex flex-col items-center text-center space-y-3 ${className}`}>
      {/* 1. Logo Symbol Prominently at the Top/Center */}
      <div className="relative group p-2">
        <SamanvayLogoSymbol size={pxSize} className="transition-transform duration-300 group-hover:scale-105" />
      </div>

      {/* 2. Below the symbol: "సమన్వయ్" in bold, elegant Telugu typeface */}
      <div className="space-y-1">
        <h1
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-['Noto_Sans_Telugu',sans-serif]"
          style={{ letterSpacing: '-0.02em' }}
        >
          సమన్వయ్
        </h1>

        {/* 3. Below it: "Samanvay" in clean modern English typeface */}
        <div className="text-base sm:text-lg font-bold tracking-wider uppercase text-teal-800 font-sans">
          Samanvay
        </div>

        {/* 4. Below the name: Tagline (smaller and subtle) */}
        {tagline && (
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xs mx-auto leading-relaxed pt-1">
            Connect Available Resources<br />With Verified Needs
          </p>
        )}
      </div>
    </div>
  );
};
