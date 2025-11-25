export function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background gradient */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>

      {/* Rounded square background */}
      <rect width="40" height="40" rx="10" fill="url(#logoGradient)" />

      {/* Log lines - representing log data */}
      <g opacity="0.9">
        {/* Line 1 - longest */}
        <rect x="8" y="10" width="18" height="2.5" rx="1.25" fill="white" opacity="0.95" />
        {/* Line 2 - medium */}
        <rect x="8" y="16" width="14" height="2.5" rx="1.25" fill="white" opacity="0.85" />
        {/* Line 3 - shorter */}
        <rect x="8" y="22" width="16" height="2.5" rx="1.25" fill="white" opacity="0.75" />
      </g>

      {/* Analytics chart - rising trend */}
      <g opacity="0.95">
        <path
          d="M28 28 L30 25 L32 26 L34 22"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Data points */}
        <circle cx="28" cy="28" r="1.5" fill="white" />
        <circle cx="30" cy="25" r="1.5" fill="white" />
        <circle cx="32" cy="26" r="1.5" fill="white" />
        <circle cx="34" cy="22" r="1.5" fill="white" />
      </g>
    </svg>
  );
}
