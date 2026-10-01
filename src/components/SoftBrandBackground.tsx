import React from 'react';

interface SoftBrandBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  intensity?: 'subtle' | 'hero';
}

export const SoftBrandBackground: React.FC<SoftBrandBackgroundProps> = ({
  children,
  className = '',
  intensity = 'subtle',
}) => {
  return (
    <div className={`relative bg-[#FAF8F5] text-slate-800 overflow-hidden ${className}`}>
      {/* Background Graphic Canvas (Non-interactive) */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        {/* 1. Gentle Ambient Gradient Glows */}
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gradient-to-br from-teal-200/25 via-emerald-100/20 to-transparent blur-3xl"
        />
        <div
          className="absolute top-1/3 -left-28 w-72 h-72 rounded-full bg-gradient-to-tr from-amber-100/30 via-teal-50/20 to-transparent blur-3xl"
        />
        <div
          className="absolute -bottom-20 right-0 w-88 h-88 rounded-full bg-gradient-to-tl from-emerald-200/20 via-teal-100/15 to-transparent blur-3xl"
        />

        {/* 2. Soft Curved Waves & Organic Shapes */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 400 800"
          fill="none"
        >
          {/* Gentle Upper Wave */}
          <path
            d="M -20 120 C 80 160, 240 70, 420 140 L 420 -20 L -20 -20 Z"
            fill="url(#wave-teal-soft)"
            opacity={intensity === 'hero' ? '0.6' : '0.35'}
          />

          {/* Gentle Mid-Lower Wave */}
          <path
            d="M -20 620 C 140 580, 260 670, 420 610 L 420 820 L -20 820 Z"
            fill="url(#wave-green-soft)"
            opacity={intensity === 'hero' ? '0.5' : '0.3'}
          />

          {/* Subtle connecting wave contour */}
          <path
            d="M -10 320 Q 200 410 410 300"
            stroke="url(#contour-grad)"
            strokeWidth="1.2"
            opacity="0.3"
            strokeDasharray="4 4"
          />

          {/* Corner Botanical / Leaf Sprigs - Top Right */}
          <g transform="translate(340, 20) rotate(25)" opacity={intensity === 'hero' ? '0.28' : '0.18'}>
            {/* Stem */}
            <path d="M 0 60 Q 25 30 45 0" stroke="#0f766e" strokeWidth="1.5" strokeLinecap="round" />
            {/* Leaves */}
            <path d="M 12 45 C 10 35, 22 30, 25 38 C 28 46, 18 50, 12 45 Z" fill="#14b8a6" />
            <path d="M 24 30 C 26 20, 38 18, 40 26 C 42 34, 30 36, 24 30 Z" fill="#22c55e" />
            <path d="M 38 12 C 40 2, 52 4, 52 12 C 52 20, 42 20, 38 12 Z" fill="#10b981" />
          </g>

          {/* Corner Botanical / Leaf Sprigs - Bottom Left */}
          <g transform="translate(10, 720) rotate(-35)" opacity={intensity === 'hero' ? '0.28' : '0.18'}>
            {/* Stem */}
            <path d="M 0 60 Q 20 30 35 0" stroke="#0f766e" strokeWidth="1.5" strokeLinecap="round" />
            {/* Leaves */}
            <path d="M 8 46 C 4 36, 16 32, 20 40 C 24 48, 14 52, 8 46 Z" fill="#14b8a6" />
            <path d="M 18 32 C 18 22, 30 20, 32 28 C 34 36, 24 38, 18 32 Z" fill="#22c55e" />
            <path d="M 28 14 C 30 4, 42 6, 42 14 C 42 22, 32 22, 28 14 Z" fill="#10b981" />
          </g>

          <defs>
            <linearGradient id="wave-teal-soft" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ccfbf1" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#d1fae5" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FAF8F5" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="wave-green-soft" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#d1fae5" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#e6fffa" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FAF8F5" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="contour-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#0d9488" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
