import { FilterPill } from '@/components/FilterPill';
import { cva, type VariantProps } from '@/cva.config';
import type { Filter } from '@/types/api';
import { type ComponentProps } from 'react';

const filterSection = cva({
  base: 'flex',
  variants: {
    wrapFilters: {
      true: 'flex-wrap gap-2',
      false: 'flex-col gap-2.5',
    },
    loading: {
      true: null,
      false: null,
    },
    filterSection: {
      'food-category': 'flex flex-col gap-4',
      'delivery-time': 'flex gap-3',
      'price-range': 'flex gap-3',
    },
  },
});

interface FilterSectionProps extends VariantProps<typeof filterSection> {
  filterPillSize?: ComponentProps<typeof FilterPill>['size'];
  filters: Filter[];
  handleClick: (filterId: string) => void;
  loading?: boolean;
  sectionHeading: string;
  selectedFilter: string | null;
}

export const FilterSection = ({
  filterPillSize,
  filters,
  handleClick,
  loading = false,
  sectionHeading,
  selectedFilter,
  wrapFilters = false,
}: FilterSectionProps) => (
  <section className="flex flex-col gap-4">
    <div className="text-brand-gray text-xs font-bold uppercase">
      {sectionHeading}
    </div>
    <div className={filterSection({ wrapFilters })}>
      {loading ?
        <div className="h-10 w-full animate-pulse rounded-full bg-brand-gray/10" />
      : filters.map(({ id, name }) => (
          <FilterPill
            key={id}
            label={name}
            selected={id === selectedFilter}
            onClick={() => handleClick(id)}
            size={filterPillSize}
          />
        ))
      }
    </div>
  </section>
);
