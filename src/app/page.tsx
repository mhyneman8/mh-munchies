'use client';

import { CategoryBar } from '@/components/CategoryBar';
import { FilterLeftMenu } from '@/components/FilterLeftMenu';
import { Header } from '@/components/Header';
import { Restaurants } from '@/components/Restaurants';
import { TitleScreen } from '@/components/TitleScreen';

export default function HomePage() {
  return (
    <>
      <TitleScreen />
      <div className="bg-brand-offwhite min-h-screen text-black max-sm:pb-8">
        <div className="flex flex-col max-sm:pl-8">
          <Header />
          <div className="flex flex-row gap-5">
            <div className="hidden max-w-7xl px-4 sm:block md:px-6 lg:px-8">
              <FilterLeftMenu />
            </div>
            <div className="flex flex-col gap-10 overflow-x-auto">
              <CategoryBar />
              <div className="max-w-5xl pr-8">
                <Restaurants />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
