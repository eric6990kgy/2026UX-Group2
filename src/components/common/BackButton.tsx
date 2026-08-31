import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface BackButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

export function BackButton({ label = '返回', onClick, className = '' }: BackButtonProps) {
  const navigate = useNavigate();

  const handlePress = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      id="back-button"
      onClick={handlePress}
      className={`flex items-center gap-1.5 px-4 h-13 min-h-[52px] font-medium text-lg text-ink active:bg-primary-light rounded-xl transition-colors cursor-pointer ${className}`}
      aria-label="返回上一頁"
    >
      <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
      <span>{label}</span>
    </button>
  );
}

export default BackButton;
