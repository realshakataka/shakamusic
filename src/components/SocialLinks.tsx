import React from 'react';
import { Instagram, Twitter, Youtube, Music2, GitBranch as BrandTiktok, Facebook, Apple } from 'lucide-react';

interface SocialLinksProps {
  social: {
    instagram: string;
    twitter: string;
    youtube: string;
    spotify: string;
    tiktok: string;
    facebook: string;
    appleMusic: string;
  };
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ social }) => {
  const socialLinks = [
    {
      icon: Instagram,
      url: `https://instagram.com/${social.instagram}`,
      color: 'hover:text-pink-500'
    },

    {
      icon: Youtube,
      url: `https://youtube.com/@${social.youtube}`,
      color: 'hover:text-red-500'
    },

    {
      icon: Music2,
      url: `https://open.spotify.com/artist/${social.spotify}`,
      color: 'hover:text-green-500'
    },

    {
      icon: Apple,
      url: `https://music.apple.com/${social.appleMusic}`,
      color: 'hover:text-red-500'
    },

    {
      icon: Facebook,
      url: `https://facebook.com/${social.facebook}`,
      color: 'hover:text-blue-600'
    },

    {
      icon: Twitter,
      url: `https://twitter.com/${social.twitter}`,
      color: 'hover:text-blue-400'
    },
    {
      icon: BrandTiktok,
      url: `https://tiktok.com/@${social.tiktok}`,
      color: 'hover:text-purple-500'
    }
  ];

  return (
    <div className="flex items-center gap-4">
      {socialLinks.map((link, index) => {
        const Icon = link.icon;
        return (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`dark:bg-white/10 bg-black/5 p-2 rounded-full 
              transition-all duration-300 hover:scale-110 ${link.color}`}
          >
            <Icon className="w-5 h-5" />
          </a>
        );
      })}
    </div>
  );
};