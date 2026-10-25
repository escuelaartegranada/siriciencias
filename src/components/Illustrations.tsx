import React from 'react';

// Polished, kid-friendly vector illustrations tailored for 2º Primaria
export const StomachIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#FEF3C7" />
    {/* Esophagus */}
    <path d="M46 15V32C46 34 48 36 50 36C52 36 54 34 54 32V15" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" />
    {/* Stomach Body */}
    <path
      d="M48 35C35 38 25 48 25 62C25 78 38 88 54 88C72 88 82 74 82 58C82 46 74 38 64 38C58 38 54 41 50 45"
      fill="#F87171"
      stroke="#DC2626"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* Duodenum exit */}
    <path d="M60 76C66 80 72 82 78 78C82 75 84 70 82 65" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" />
    {/* Friendly highlight and blush */}
    <ellipse cx="40" cy="55" rx="4" ry="7" fill="#FCA5A5" transform="rotate(-20 40 55)" />
    <circle cx="68" cy="52" r="3" fill="#FECACA" />
    <path d="M42 66Q48 72 54 66" stroke="#B91C1C" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const LungsIllustration: React.FC<{ className?: string; inflated?: boolean }> = ({ className = 'w-16 h-16', inflated = false }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#E0F2FE" />
    {/* Trachea with cartilage rings */}
    <path d="M50 14V42" stroke="#38BDF8" strokeWidth="7" strokeLinecap="round" />
    <line x1="46" y1="20" x2="54" y2="20" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
    <line x1="46" y1="26" x2="54" y2="26" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
    <line x1="46" y1="32" x2="54" y2="32" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
    {/* Bronchi branches */}
    <path d="M50 42L36 52M50 42L64 52" stroke="#0284C7" strokeWidth="5" strokeLinecap="round" />
    {/* Left Lung */}
    <path
      d={inflated 
        ? "M36 46C20 48 14 62 16 78C18 89 32 91 42 85C46 76 46 54 36 46Z"
        : "M36 48C24 50 18 62 20 74C22 84 32 86 40 80C43 72 43 54 36 48Z"
      }
      fill="#FDA4AF"
      stroke="#E11D48"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    {/* Right Lung */}
    <path
      d={inflated
        ? "M64 46C80 48 86 62 84 78C82 89 68 91 58 85C54 76 54 54 64 46Z"
        : "M64 48C76 50 82 62 80 74C78 84 68 86 60 80C57 72 57 54 64 48Z"
      }
      fill="#FDA4AF"
      stroke="#E11D48"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    {/* Air sparkles */}
    {inflated && (
      <>
        <circle cx="28" cy="66" r="3" fill="#38BDF8" />
        <circle cx="72" cy="66" r="3" fill="#38BDF8" />
      </>
    )}
  </svg>
);

export const HeartIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#FFE4E6" />
    {/* Aorta arch and vena cava */}
    <path d="M42 28V16C42 14 45 12 48 12C52 12 55 14 55 18V28" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" />
    <path d="M58 24V14" stroke="#3B82F6" strokeWidth="5" strokeLinecap="round" />
    <path d="M35 24V17" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
    {/* Main Heart Muscle */}
    <path
      d="M50 36C42 26 24 28 22 46C20 62 36 74 50 88C64 74 80 62 78 46C76 28 58 26 50 36Z"
      fill="#E11D48"
      stroke="#BE123C"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* Coronary arteries decoration */}
    <path d="M48 42L44 54M44 54L38 60M44 54L48 64" stroke="#FDA4AF" strokeWidth="2.5" strokeLinecap="round" />
    {/* Heartbeat pulse shine */}
    <path d="M60 44C66 48 68 54 66 60" stroke="#FECDD3" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const KidneysIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#F0FDFA" />
    {/* Vena & Artery in center */}
    <line x1="47" y1="18" x2="47" y2="82" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
    <line x1="53" y1="18" x2="53" y2="82" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" />
    {/* Left Kidney (bean shape) */}
    <path
      d="M36 28C22 30 18 46 22 58C26 68 38 66 38 54C38 42 34 38 36 28Z"
      fill="#B45309"
      stroke="#78350F"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    {/* Right Kidney */}
    <path
      d="M64 32C78 34 82 50 78 62C74 72 62 70 62 58C62 46 66 42 64 32Z"
      fill="#B45309"
      stroke="#78350F"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    {/* Ureters to bladder */}
    <path d="M34 56C36 70 44 76 48 82" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M66 60C64 70 56 76 52 82" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
    {/* Bladder */}
    <ellipse cx="50" cy="85" rx="8" ry="6" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.5" />
  </svg>
);

export const SkeletonIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#F1F5F9" />
    {/* Skull */}
    <circle cx="50" cy="22" r="10" fill="#FFFFFF" stroke="#475569" strokeWidth="3" />
    <circle cx="46" cy="21" r="2" fill="#475569" />
    <circle cx="54" cy="21" r="2" fill="#475569" />
    <path d="M47 27H53" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
    {/* Spine & Ribs */}
    <line x1="50" y1="32" x2="50" y2="60" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
    <path d="M40 38C44 36 56 36 60 38" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
    <path d="M38 44C44 42 56 42 62 44" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
    <path d="M40 50C44 48 56 48 60 50" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
    {/* Pelvis */}
    <path d="M42 60Q50 64 58 60" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
    {/* Arms */}
    <path d="M40 38L28 48L24 60" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M60 38L72 48L76 60" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
    {/* Legs */}
    <path d="M44 62L42 78L40 92" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M56 62L58 78L60 92" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

export const MusclesIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#FEE2E2" />
    {/* Flexing Bicep Arm */}
    <path
      d="M24 78C26 66 32 58 40 54C46 51 52 42 56 32C62 34 68 40 68 48C74 50 82 56 82 68C82 78 74 84 62 84C46 84 32 82 24 78Z"
      fill="#EF4444"
      stroke="#B91C1C"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* Muscle Fiber Bundles */}
    <path d="M48 42C56 46 60 52 58 60" stroke="#FCA5A5" strokeWidth="3" strokeLinecap="round" />
    <path d="M42 58C50 62 58 68 62 76" stroke="#FCA5A5" strokeWidth="3" strokeLinecap="round" />
    <path d="M32 70C40 73 50 75 56 76" stroke="#FCA5A5" strokeWidth="2.5" strokeLinecap="round" />
    {/* Power sparkle */}
    <path d="M74 26L76 32L82 34L76 36L74 42L72 36L66 34L72 32Z" fill="#F59E0B" />
  </svg>
);

export const BrainIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#EDE9FE" />
    {/* Brain lobes */}
    <path
      d="M50 24C40 24 32 30 30 38C24 40 20 48 22 56C20 66 28 74 36 76C40 82 48 80 50 78C52 80 60 82 64 76C72 74 80 66 78 56C80 48 76 40 70 38C68 30 60 24 50 24Z"
      fill="#F472B6"
      stroke="#BE185D"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* Hemisphere division and convolutions */}
    <path d="M50 26V76" stroke="#9D174D" strokeWidth="3" strokeLinecap="round" />
    <path d="M38 36Q44 42 36 50" stroke="#FBCFE8" strokeWidth="3" strokeLinecap="round" />
    <path d="M62 36Q56 42 64 50" stroke="#FBCFE8" strokeWidth="3" strokeLinecap="round" />
    <path d="M34 60Q42 66 46 62" stroke="#FBCFE8" strokeWidth="3" strokeLinecap="round" />
    <path d="M66 60Q58 66 54 62" stroke="#FBCFE8" strokeWidth="3" strokeLinecap="round" />
    {/* Sparkle thought */}
    <circle cx="50" cy="18" r="3" fill="#8B5CF6" />
    <circle cx="58" cy="14" r="2" fill="#8B5CF6" />
  </svg>
);

export const IntestineIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#FEF3C7" />
    {/* Large intestine outer frame */}
    <path
      d="M26 72V38C26 30 34 26 50 26C66 26 74 30 74 38V72"
      stroke="#D97706"
      strokeWidth="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Small intestine inner coils */}
    <path
      d="M38 52Q50 46 62 52Q50 58 38 64Q50 70 62 64"
      stroke="#F59E0B"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <circle cx="50" cy="58" r="2" fill="#B45309" />
  </svg>
);

export const BloodVesselsIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#FEE2E2" />
    {/* Red artery */}
    <path d="M40 18C44 32 36 50 42 68C46 76 44 82 42 84" stroke="#DC2626" strokeWidth="6" strokeLinecap="round" />
    <path d="M40 38C32 44 26 42 22 46" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
    {/* Blue vein */}
    <path d="M60 18C54 32 64 50 58 68C54 76 56 82 58 84" stroke="#2563EB" strokeWidth="6" strokeLinecap="round" />
    <path d="M60 44C68 48 74 46 78 50" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
    {/* Capillaries loop */}
    <circle cx="50" cy="51" r="5" stroke="#9333EA" strokeWidth="2" strokeDasharray="3 3" />
  </svg>
);

export const BladderIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#E0F2FE" />
    <path d="M34 22L42 42M66 22L58 42" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
    <ellipse cx="50" cy="62" rx="24" ry="20" fill="#FEF08A" stroke="#EAB308" strokeWidth="4" />
    <path d="M48 82V90M52 82V90" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
    <path d="M42 56Q50 62 58 56" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const NoseIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#FEF3C7" />
    <path d="M50 20V58C50 68 38 68 38 72C38 76 44 78 50 78C56 78 62 76 62 72C62 68 50 68 50 58" stroke="#D97706" strokeWidth="5" strokeLinecap="round" />
    <circle cx="43" cy="73" r="2.5" fill="#92400E" />
    <circle cx="57" cy="73" r="2.5" fill="#92400E" />
  </svg>
);

export const EyeIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#E0E7FF" />
    <path d="M20 50C30 32 70 32 80 50C70 68 30 68 20 50Z" fill="#FFFFFF" stroke="#4F46E5" strokeWidth="4" strokeLinejoin="round" />
    <circle cx="50" cy="50" r="12" fill="#0284C7" />
    <circle cx="50" cy="50" r="6" fill="#0F172A" />
    <circle cx="53" cy="47" r="2.5" fill="#FFFFFF" />
  </svg>
);

export const EarIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#FCE7F3" />
    <path d="M42 22C60 22 72 32 72 48C72 66 54 68 54 80C54 84 46 86 42 82C36 76 40 66 44 60C48 54 58 50 58 42C58 34 50 30 42 30" stroke="#DB2777" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M46 44C50 44 52 48 50 52" stroke="#F472B6" strokeWidth="3" strokeLinecap="round" />
    {/* Musical sound wave */}
    <path d="M78 36C84 40 84 56 78 60" stroke="#A855F7" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const HandIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#FEF3C7" />
    {/* Hand with 5 fingers */}
    <path
      d="M36 86V54C36 48 42 48 42 54V38C42 32 48 32 48 38V34C48 28 54 28 54 34V36C54 30 60 30 60 36V50C60 46 66 46 66 52V64C66 76 60 86 48 86Z"
      fill="#FDE68A"
      stroke="#D97706"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
  </svg>
);

// --- Seres Vivos e Inertes (Misión 1) ---
export const RabbitIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#ECFDF5" />
    {/* Ears */}
    <ellipse cx="40" cy="28" rx="7" ry="18" fill="#FBCFE8" stroke="#DB2777" strokeWidth="2.5" />
    <ellipse cx="60" cy="28" rx="7" ry="18" fill="#FBCFE8" stroke="#DB2777" strokeWidth="2.5" />
    {/* Head */}
    <circle cx="50" cy="58" r="24" fill="#FFFFFF" stroke="#059669" strokeWidth="3" />
    {/* Eyes */}
    <circle cx="42" cy="52" r="3" fill="#1F2937" />
    <circle cx="58" cy="52" r="3" fill="#1F2937" />
    {/* Nose and mouth */}
    <polygon points="47,60 53,60 50,64" fill="#F472B6" />
    <path d="M45 66Q50 70 55 66" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
    {/* Whiskers */}
    <line x1="30" y1="58" x2="20" y2="56" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
    <line x1="30" y1="64" x2="20" y2="66" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
    <line x1="70" y1="58" x2="80" y2="56" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
    <line x1="70" y1="64" x2="80" y2="66" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ScarecrowIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#FFFBEB" />
    {/* Wooden cross post */}
    <rect x="47" y="15" width="6" height="75" rx="3" fill="#92400E" />
    <rect x="20" y="48" width="60" height="6" rx="3" fill="#92400E" />
    {/* Straw head */}
    <circle cx="50" cy="38" r="14" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2.5" />
    <path d="M42 34L46 38M46 34L42 38M54 34L58 38M58 34L54 38" stroke="#713F12" strokeWidth="2" />
    <path d="M44 44Q50 48 56 44" stroke="#713F12" strokeWidth="2" strokeLinecap="round" />
    {/* Straw Hat */}
    <ellipse cx="50" cy="28" rx="22" ry="6" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
    <path d="M38 28L42 16H58L62 28" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
    <rect x="41" y="24" width="18" height="4" fill="#DC2626" />
    {/* Flannel coat */}
    <path d="M36 50L28 72H72L64 50Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
    <line x1="50" y1="50" x2="50" y2="72" stroke="#FEF08A" strokeWidth="2" />
  </svg>
);

export const PlantIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#F0FDF4" />
    {/* Pot */}
    <path d="M34 62L38 88H62L66 62Z" fill="#EA580C" stroke="#C2410C" strokeWidth="2.5" />
    <rect x="30" y="58" width="40" height="6" rx="2" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
    {/* Stems & Leaves */}
    <path d="M50 58V26" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" />
    <path d="M50 44C40 38 34 40 32 46C38 48 46 48 50 44Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
    <path d="M50 34C60 28 66 30 68 36C62 38 54 38 50 34Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
    <path d="M50 26C44 20 44 14 50 12C56 14 56 20 50 26Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
    {/* Red Tomatoes */}
    <circle cx="38" cy="46" r="6" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
    <circle cx="62" cy="38" r="5" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
  </svg>
);

export const RockIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#F8FAFC" />
    {/* Big Rock */}
    <path
      d="M24 74L30 46L54 32L78 44L82 72L58 80Z"
      fill="#94A3B8"
      stroke="#475569"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    {/* Rock facets */}
    <path d="M30 46L54 58L78 44" stroke="#64748B" strokeWidth="2" />
    <path d="M54 32V58L58 80" stroke="#64748B" strokeWidth="2" />
    {/* Small pebble */}
    <ellipse cx="26" cy="78" rx="8" ry="5" fill="#CBD5E1" stroke="#64748B" strokeWidth="2" />
  </svg>
);

export const GirlIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#FFF1F2" />
    {/* Pigtails */}
    <circle cx="28" cy="42" r="8" fill="#B45309" />
    <circle cx="72" cy="42" r="8" fill="#B45309" />
    {/* Hair back */}
    <circle cx="50" cy="44" r="22" fill="#B45309" />
    {/* Face */}
    <circle cx="50" cy="48" r="18" fill="#FED7AA" />
    {/* Bangs */}
    <path d="M34 40C40 44 48 42 50 40C54 44 62 42 66 40C66 34 58 30 50 30C42 30 34 34 34 40Z" fill="#92400E" />
    {/* Eyes & smile */}
    <circle cx="44" cy="48" r="2.5" fill="#1F2937" />
    <circle cx="56" cy="48" r="2.5" fill="#1F2937" />
    <path d="M46 56Q50 60 54 56" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
    {/* Cheeks */}
    <circle cx="40" cy="52" r="3" fill="#FDA4AF" />
    <circle cx="60" cy="52" r="3" fill="#FDA4AF" />
    {/* Shirt */}
    <path d="M36 66C38 64 62 64 64 66L68 84H32L36 66Z" fill="#F43F5E" />
  </svg>
);

export const RobotIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#F1F5F9" />
    {/* Antenna */}
    <line x1="50" y1="16" x2="50" y2="28" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
    <circle cx="50" cy="14" r="4" fill="#EF4444" />
    {/* Head */}
    <rect x="32" y="28" width="36" height="28" rx="8" fill="#94A3B8" stroke="#475569" strokeWidth="2.5" />
    <rect x="38" y="34" width="24" height="14" rx="4" fill="#1E293B" />
    {/* Digital glowing eyes */}
    <circle cx="44" cy="41" r="3" fill="#22D3EE" />
    <circle cx="56" cy="41" r="3" fill="#22D3EE" />
    {/* Ears */}
    <rect x="28" y="38" width="4" height="8" rx="2" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5" />
    <rect x="68" y="38" width="4" height="8" rx="2" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5" />
    {/* Body */}
    <rect x="34" y="58" width="32" height="26" rx="6" fill="#64748B" stroke="#334155" strokeWidth="2.5" />
    <circle cx="42" cy="70" r="3" fill="#F59E0B" />
    <circle cx="50" cy="70" r="3" fill="#10B981" />
    <circle cx="58" cy="70" r="3" fill="#3B82F6" />
  </svg>
);

// --- Situaciones del libro (Pág. 10) ---
export const CactusIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#ECFDF5" />
    {/* Pot */}
    <path d="M36 64L40 88H60L64 64Z" fill="#F97316" stroke="#C2410C" strokeWidth="2.5" />
    <rect x="32" y="60" width="36" height="6" rx="2" fill="#EA580C" stroke="#C2410C" strokeWidth="2" />
    {/* Main Cactus stem */}
    <rect x="44" y="24" width="12" height="38" rx="6" fill="#10B981" stroke="#047857" strokeWidth="2" />
    {/* Left branch */}
    <path d="M44 42H34V32" stroke="#047857" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M44 42H34V32" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    {/* Right branch */}
    <path d="M56 46H66V36" stroke="#047857" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M56 46H66V36" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    {/* Pink flower on top */}
    <circle cx="50" cy="22" r="5" fill="#F43F5E" />
    <circle cx="50" cy="22" r="2" fill="#FEF08A" />
    {/* Prickles */}
    <circle cx="48" cy="30" r="1" fill="#064E3B" />
    <circle cx="52" cy="36" r="1" fill="#064E3B" />
    <circle cx="48" cy="44" r="1" fill="#064E3B" />
  </svg>
);

export const HenChicksIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#FFFBEB" />
    {/* Mother Hen body */}
    <ellipse cx="44" cy="54" rx="22" ry="18" fill="#F97316" stroke="#C2410C" strokeWidth="2.5" />
    {/* Hen head */}
    <circle cx="30" cy="38" r="12" fill="#FB923C" stroke="#C2410C" strokeWidth="2.5" />
    {/* Red comb & wattle */}
    <circle cx="28" cy="24" r="4" fill="#DC2626" />
    <circle cx="34" cy="24" r="4" fill="#DC2626" />
    <ellipse cx="28" cy="46" rx="3" ry="5" fill="#DC2626" />
    {/* Eye & beak */}
    <circle cx="27" cy="36" r="2" fill="#1F2937" />
    <polygon points="18,38 24,35 24,41" fill="#FACC15" />
    {/* Little yellow chick */}
    <circle cx="68" cy="62" r="9" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
    <polygon points="76,62 82,60 76,64" fill="#F97316" />
    <circle cx="72" cy="60" r="1.5" fill="#1F2937" />
    {/* Nest straw base */}
    <path d="M20 74C35 84 65 84 80 74" stroke="#A16207" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export const AppleEatingIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#FEF2F2" />
    {/* Stem & Leaf */}
    <path d="M50 28C50 20 54 16 56 14" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
    <path d="M52 22C60 18 64 22 66 26C60 28 54 26 52 22Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
    {/* Crisp red apple */}
    <path
      d="M50 36C40 26 22 30 22 52C22 74 38 86 50 86C62 86 78 74 78 52C78 30 60 26 50 36Z"
      fill="#EF4444"
      stroke="#B91C1C"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    {/* Shine reflection */}
    <ellipse cx="36" cy="48" rx="4" ry="10" fill="#FCA5A5" transform="rotate(-25 36 48)" />
    {/* Friendly smile */}
    <path d="M44 60Q50 66 56 60" stroke="#7F1D1D" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// --- Embarazo y Reproducción (Misión 5) ---
export const PregnancyStage1Illustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#FFF1F2" />
    {/* Mom torso subtle bump */}
    <path d="M38 18V42C38 52 44 58 48 64C50 68 50 82 50 82" stroke="#FB7185" strokeWidth="5" strokeLinecap="round" />
    {/* Tiny embryo spark */}
    <circle cx="56" cy="52" r="10" fill="#FFE4E6" stroke="#F43F5E" strokeWidth="2" strokeDasharray="3 3" />
    <circle cx="56" cy="52" r="4" fill="#E11D48" />
    {/* Small sprout badge */}
    <path d="M68 34C74 30 78 32 80 38C74 40 70 38 68 34Z" fill="#10B981" />
  </svg>
);

export const PregnancyStage2Illustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#FFF1F2" />
    {/* Mom torso noticeable rounded belly */}
    <path d="M36 18V38C36 44 48 46 56 56C62 64 58 72 48 78C46 80 46 84 46 84" stroke="#FB7185" strokeWidth="5" strokeLinecap="round" />
    {/* Baby silhouette inside womb */}
    <ellipse cx="54" cy="58" rx="14" ry="12" fill="#FDA4AF" stroke="#E11D48" strokeWidth="2" />
    <circle cx="50" cy="54" r="4" fill="#BE123C" />
    <path d="M50 58C52 64 56 64 58 62" stroke="#BE123C" strokeWidth="2" strokeLinecap="round" />
    {/* Heartbeat pulse */}
    <path d="M72 40L75 46L80 44L76 52" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const PregnancyStage3Illustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#FFF1F2" />
    {/* Big full belly ready for birth */}
    <path d="M34 18V34C34 42 46 44 62 54C74 62 70 76 54 82C48 84 46 86 46 86" stroke="#FB7185" strokeWidth="5" strokeLinecap="round" />
    {/* Ready baby */}
    <circle cx="58" cy="62" r="14" fill="#FECDD3" stroke="#E11D48" strokeWidth="2.5" />
    <circle cx="54" cy="58" r="3" fill="#BE123C" />
    <path d="M54 64Q58 68 62 64" stroke="#BE123C" strokeWidth="2" strokeLinecap="round" />
    {/* Newborn star aura */}
    <polygon points="80,32 82,36 86,37 83,40 84,44 80,42 76,44 77,40 74,37 78,36" fill="#F59E0B" />
  </svg>
);

// --- Hábitos Saludables (Misión 6) ---
export const WashHandsIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#F0FDFA" />
    {/* Water tap drop */}
    <path d="M50 14V26" stroke="#0EA5E9" strokeWidth="4" strokeLinecap="round" />
    <path d="M50 32C46 36 44 40 44 44C44 48 47 50 50 50C53 50 56 48 56 44C56 40 54 36 50 32Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
    {/* Washing hands with soap */}
    <path d="M32 68C32 60 40 56 50 62C60 56 68 60 68 68C68 76 58 84 50 84C42 84 32 76 32 68Z" fill="#CCFBF1" stroke="#0D9488" strokeWidth="3" />
    {/* Bubbles */}
    <circle cx="36" cy="52" r="5" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="2" />
    <circle cx="64" cy="50" r="4" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="2" />
    <circle cx="48" cy="72" r="3" fill="#FFFFFF" stroke="#0D9488" strokeWidth="1.5" />
  </svg>
);

export const SleepBedIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#EEF2FF" />
    {/* Bed headboard */}
    <rect x="22" y="44" width="8" height="38" rx="3" fill="#475569" />
    <rect x="76" y="56" width="6" height="26" rx="3" fill="#475569" />
    {/* Mattress & Blanket */}
    <rect x="28" y="58" width="50" height="18" rx="4" fill="#6366F1" stroke="#4338CA" strokeWidth="2" />
    {/* Pillow */}
    <ellipse cx="36" cy="54" rx="8" ry="5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
    {/* Crescent Moon & Zzz */}
    <path d="M68 20C64 24 64 30 68 34C60 34 54 28 54 20C54 18 56 16 56 16C54 18 64 16 68 20Z" fill="#FACC15" />
    <path d="M42 22H48L42 28H48" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
    <path d="M50 14H54L50 18H54" stroke="#818CF8" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const SportBallIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#FEF3C7" />
    {/* Basketball */}
    <circle cx="44" cy="56" r="22" fill="#F97316" stroke="#C2410C" strokeWidth="3" />
    <line x1="22" y1="56" x2="66" y2="56" stroke="#C2410C" strokeWidth="2.5" />
    <line x1="44" y1="34" x2="44" y2="78" stroke="#C2410C" strokeWidth="2.5" />
    <path d="M30 40C38 46 38 66 30 72" stroke="#C2410C" strokeWidth="2" />
    <path d="M58 40C50 46 50 66 58 72" stroke="#C2410C" strokeWidth="2" />
    {/* Small tennis ball */}
    <circle cx="70" cy="36" r="10" fill="#A3E635" stroke="#65A30D" strokeWidth="2" />
    <path d="M63 32C68 35 68 41 65 44" stroke="#4D7C0F" strokeWidth="1.5" />
  </svg>
);

export const HealthyFoodIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#F0FDF4" />
    {/* Carrot */}
    <path d="M32 72L62 38" stroke="#EA580C" strokeWidth="8" strokeLinecap="round" />
    <path d="M62 38L68 32M62 38L70 36M62 38L66 42" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />
    {/* Red Apple */}
    <circle cx="40" cy="46" r="14" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
    <path d="M40 32V26" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
    <path d="M40 28C46 26 48 30 48 30Z" fill="#22C55E" />
    {/* Sparkle vitality */}
    <circle cx="68" cy="62" r="3" fill="#F59E0B" />
  </svg>
);

export const OutdoorNatureIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#ECFEFF" />
    {/* Sun */}
    <circle cx="28" cy="28" r="10" fill="#FDE047" stroke="#EAB308" strokeWidth="2" />
    {/* Rolling green hills */}
    <path d="M12 84C32 64 68 64 88 84Z" fill="#86EFAC" stroke="#16A34A" strokeWidth="2" />
    {/* Friendly Tree */}
    <rect x="52" y="56" width="6" height="24" rx="2" fill="#78350F" />
    <circle cx="55" cy="46" r="16" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
    <circle cx="46" cy="42" r="10" fill="#4ADE80" />
    {/* Butterfly */}
    <path d="M74 34C78 30 84 32 82 38C80 40 76 38 74 34Z" fill="#F43F5E" />
    <path d="M74 34C78 38 84 36 82 40C80 42 76 40 74 34Z" fill="#FB7185" />
  </svg>
);

