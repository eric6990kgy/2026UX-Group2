import React from 'react';

interface AvatarProps {
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ name, className = '', size = 'md' }: AvatarProps) {
  // Extract a 2-character friendly shorthand initials for Asian names
  const getInitials = (fullName: string) => {
    if (!fullName) return '';
    // If it contains "阿姨", "叔叔", "伯母" or typical titles, extract the main prefix
    let cleanName = fullName.replace(/(阿姨|叔叔|伯母|叔|姨|伯|母|公|婆)/g, '');
    if (cleanName.length > 2) {
      // e.g. "陳美玲" -> "美玲"
      return cleanName.slice(-2);
    }
    return cleanName || fullName.slice(0, 2);
  };

  const initials = getInitials(name);

  // Generate a distinct soft gradient background based on the name hash for customized feel
  const getColorGradient = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const idx = Math.abs(hash) % 5;
    const gradients = [
      'from-[#E07A5F] to-[#D96330]', // Primary terracotta
      'from-[#3DAA6C] to-[#2E8352]', // Emerald forest
      'from-[#4A90E2] to-[#357ABD]', // Royal blue
      'from-[#E0AC16] to-[#C4930A]', // Warm amber
      'from-[#9F63C4] to-[#8042A5]'  // Editorial orchid
    ];
    return gradients[idx];
  };

  const gradient = getColorGradient(name);

  const sizeShadowClasses = {
    sm: 'w-10 h-10 text-[14px]',
    md: 'w-[52px] h-[52px] text-[17px]',
    lg: 'w-16 h-16 text-[22px]'
  };

  const sizeClass = sizeShadowClasses[size];

  return (
    <div
      className={`rounded-full bg-gradient-to-br ${gradient} text-white font-black flex items-center justify-center tracking-wider shadow-md border-[2.5px] border-white/95 shrink-0 select-none ${sizeClass} ${className}`}
    >
      {initials}
    </div>
  );
}

export default Avatar;
