'use client';

import { useRestaurantsContext } from '@/contexts/RestaurantsContext';
import { cx } from '@/cva.config';
import Image from 'next/image';

export const CategoryBar = () => {
  const { filters, selectedFilter, handleSelectFilter, loadingFilters } =
    useRestaurantsContext();

  return loadingFilters ?
      <div className="no-scrollbar overflow-x-scroll">
        <div className="h-10 w-full animate-pulse rounded-full bg-brand-gray/10" />
      </div>
    : <div className="no-scrollbar overflow-x-scroll">
        <div className="flex gap-4">
          {filters.map(({ id, image_url, name }) => (
            <button
              key={id}
              type="button"
              onClick={() => handleSelectFilter(id)}
              className={cx(
                'flex min-w-43.75 shrink-0 items-start justify-between gap-2 overflow-hidden rounded-2xl border bg-white pl-3 transition hover:border-neutral-300',
                selectedFilter === id ?
                  'border-brand-green ring-brand-green ring-1'
                : 'border-brand-stroke',
              )}
            >
              <span className="mt-4 text-sm font-medium tracking-tighter text-black">
                {name}
              </span>
              <div className="relative h-20 w-20 translate-x-2">
                <Image
                  src={`https://work-test-web-2024-eze6j4scpq-lz.a.run.app${image_url}`}
                  alt={name}
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </div>
            </button>
          ))}
        </div>
      </div>;
};
