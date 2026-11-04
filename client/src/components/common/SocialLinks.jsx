import React from 'react';

// Official SVG vector logos
export function FacebookIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#1877F2" />
      <path
        d="M16.5 12.05h-2.73v7.95h-3.28v-7.95H8.62V9.27h1.87V7.24c0-1.85 1.1-2.86 2.78-2.86.81 0 1.66.14 1.66.14v1.82h-.94c-.92 0-1.2.57-1.2 1.16v1.77h2.05l-.34 2.78z"
        fill="#ffffff"
      />
    </svg>
  );
}

export function XIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#000000" />
      <path
        d="M17.53 4h2.55l-5.57 6.37L21 20h-5.13l-4.02-5.26L7.24 20H4.69l5.96-6.81L4 4h5.26l3.63 4.8L17.53 4zm-.9 14.47h1.41L7.74 5.43H6.23l10.4 13.04z"
        fill="#ffffff"
      />
    </svg>
  );
}

export function InstagramIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="igRadOfficial" cx="20%" cy="100%" r="130%">
          <stop offset="0%" stopColor="#ffda77" />
          <stop offset="10%" stopColor="#fca644" />
          <stop offset="50%" stopColor="#e1306c" />
          <stop offset="80%" stopColor="#c13584" />
          <stop offset="100%" stopColor="#833ab4" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#igRadOfficial)" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" stroke="#ffffff" strokeWidth="1.6" fill="none" />
      <circle cx="12" cy="12" r="3.2" stroke="#ffffff" strokeWidth="1.6" fill="none" />
      <circle cx="15.8" cy="8.2" r="0.9" fill="#ffffff" />
    </svg>
  );
}

export function YouTubeIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#FF0000" />
      <path d="M10 8.5l5.5 3.5-5.5 3.5v-7z" fill="#ffffff" />
    </svg>
  );
}

export function LinkedInIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#0A66C2" />
      <path
        d="M7.7 9h2.3v7.5H7.7V9zm1.15-3.6c.74 0 1.34.6 1.34 1.34 0 .74-.6 1.34-1.34 1.34-.74 0-1.34-.6-1.34-1.34 0-.74.6-1.34 1.34-1.34zM11.6 9h2.2v1.02h.03c.31-.58 1.05-1.2 2.18-1.2 2.33 0 2.76 1.54 2.76 3.54V16.5h-2.3v-3.48c0-.83-.02-1.9-1.16-1.9-1.16 0-1.34.9-1.34 1.84V16.5h-2.3V9z"
        fill="#ffffff"
      />
    </svg>
  );
}

export const OFFICIAL_SOCIAL_LINKS = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/acsaleslko',
    handle: '@acsaleslko',
    Icon: FacebookIcon,
    bgColor: 'hover:bg-[#1877F2]/20',
    borderColor: 'hover:border-[#1877F2]'
  },
  {
    name: 'X (Twitter)',
    url: 'https://x.com/ShuklaEnterpri5',
    handle: '@ShuklaEnterpri5',
    Icon: XIcon,
    bgColor: 'hover:bg-black/40',
    borderColor: 'hover:border-white/50'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/shukla_enterprises?igsh=OGh1NnIwcmx3ZnQ1',
    handle: '@shukla_enterprises',
    Icon: InstagramIcon,
    bgColor: 'hover:bg-[#e1306c]/20',
    borderColor: 'hover:border-[#e1306c]'
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@shuklaenterprises2895',
    handle: '@shuklaenterprises2895',
    Icon: YouTubeIcon,
    bgColor: 'hover:bg-[#FF0000]/20',
    borderColor: 'hover:border-[#FF0000]'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/shukla-enterprises/',
    handle: 'shukla-enterprises',
    Icon: LinkedInIcon,
    bgColor: 'hover:bg-[#0A66C2]/20',
    borderColor: 'hover:border-[#0A66C2]'
  }
];

export default function SocialLinks({ className = "", size = "md", showLabels = false }) {
  const iconSizeClass = size === "sm" ? "w-6 h-6" : size === "lg" ? "w-8 h-8" : "w-7 h-7";
  const containerPadding = size === "sm" ? "p-1.5" : size === "lg" ? "p-2.5" : "p-2";

  return (
    <div className={`flex items-center flex-wrap gap-2.5 sm:gap-3 ${className}`}>
      {OFFICIAL_SOCIAL_LINKS.map((item) => {
        const { Icon } = item;
        return (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`${item.name} (${item.handle})`}
            aria-label={`Official ${item.name} page`}
            className={`group relative flex items-center rounded-xl bg-slate-900 border border-slate-700/80 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 hover:shadow-lg ${containerPadding} ${item.bgColor} ${item.borderColor}`}
          >
            <Icon className={`${iconSizeClass} transition-transform duration-300 group-hover:scale-105`} />
            {showLabels && (
              <span className="text-xs font-semibold text-slate-300 group-hover:text-white ml-2 hidden sm:inline">
                {item.name}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}
