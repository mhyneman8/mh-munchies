'use client';

import { useState } from 'react';
import { Logo } from './Logo';

export const TitleScreen = () => {
  // Initialize state directly from localStorage (only runs once on mount)
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    const hasSeenTitleScreen = localStorage.getItem('hasSeenTitleScreen');
    return !hasSeenTitleScreen;
  });

  const handleContinue = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenTitleScreen', 'true');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-brand-green sm:hidden">
      <div className="flex h-full flex-col justify-between px-8 py-6">
        {/* Top section with logo */}
        <div className="pt-8">
          <div className="flex items-center gap-3">
            <Logo className="text-white" />
            <h2 className="text-2xl font-bold text-white">Munchies</h2>
          </div>
        </div>

        {/* Middle section with headline and description */}
        <div className="flex flex-1 flex-col justify-center">
          <h1 className="mb-6 text-5xl font-bold leading-tight text-white">
            Treat yourself.
          </h1>
          <p className="text-lg text-white">
            Find the best restaurants in your city and get it delivered to your
            place!
          </p>
        </div>

        {/* Bottom section with continue button */}
        <div className="pb-8">
          <button
            onClick={handleContinue}
            className="w-full rounded-lg border-2 border-white bg-brand-green px-6 py-4 text-lg font-bold text-white transition-colors hover:bg-brand-green/90"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

