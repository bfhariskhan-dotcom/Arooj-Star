import React from 'react';
import { Facebook, Instagram, Youtube, MessageSquare, Globe } from 'lucide-react';
import { SocialLinkItem } from '../types';
import { COMPANY_DETAILS } from '../data/products';

interface SocialLinksBarProps {
  links?: SocialLinkItem[];
  className?: string;
}

const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.81a8.24 8.24 0 0 0 4.76 1.5v-3.4a4.85 4.85 0 0 1-1-.22Z" />
  </svg>
);

export const getPlatformBadgeStyle = (platform: SocialLinkItem['platform']) => {
  switch (platform) {
    case 'facebook':
      return 'text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-600 hover:text-white';
    case 'instagram':
      return 'text-rose-600 bg-rose-50 border-rose-200 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-600 hover:to-purple-600 hover:text-white';
    case 'youtube':
      return 'text-red-600 bg-red-50 border-red-200 hover:bg-red-600 hover:text-white';
    case 'tiktok':
      return 'text-slate-900 bg-slate-100 border-slate-300 hover:bg-slate-900 hover:text-white';
    case 'whatsapp':
      return 'text-emerald-600 bg-emerald-50 border-emerald-200 hover:bg-emerald-600 hover:text-white';
    default:
      return 'text-violet-600 bg-violet-50 border-violet-200 hover:bg-violet-600 hover:text-white';
  }
};

export const renderSocialIcon = (platform: SocialLinkItem['platform'], className = 'w-4 h-4') => {
  switch (platform) {
    case 'facebook':
      return <Facebook className={className} />;
    case 'instagram':
      return <Instagram className={className} />;
    case 'youtube':
      return <Youtube className={className} />;
    case 'tiktok':
      return <TikTokIcon className={className} />;
    case 'whatsapp':
      return <MessageSquare className={className} />;
    default:
      return <Globe className={className} />;
  }
};

export const SocialLinksBar: React.FC<SocialLinksBarProps> = ({ links, className = '' }) => {
  const activeLinks = (links && links.length > 0 ? links : COMPANY_DETAILS.socialLinks).filter(
    (item) => item.enabled !== false
  );

  if (activeLinks.length === 0) return null;

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {activeLinks.map((item) => {
        const cleanUrl = (item.url || '#').trim() || '#';
        const isHashPlaceholder = cleanUrl === '#';

        return (
          <a
            key={item.id}
            href={cleanUrl}
            target={isHashPlaceholder ? undefined : '_blank'}
            rel={isHashPlaceholder ? undefined : 'noreferrer'}
            onClick={(e) => {
              if (isHashPlaceholder) e.preventDefault();
            }}
            title={item.label}
            aria-label={item.label}
            className={`inline-flex items-center justify-center w-8 h-8 rounded-md border transition-all cursor-pointer ${getPlatformBadgeStyle(
              item.platform
            )}`}
          >
            {renderSocialIcon(item.platform, 'w-4 h-4')}
          </a>
        );
      })}
    </div>
  );
};
