import { cva, type VariantProps } from "@/cva.config";

const filterPill = cva({
  base: ' hover:border-brand-green/60 max-w-fit rounded-lg border text-sm transition-all',
  variants: {
    selected: {
      true: 'border-brand-green bg-brand-green text-white',
      false: 'border-brand-stroke bg-white text-black',
    },
    size: {
      small: 'p-2',
      large: 'px-3 py-2',
    },
  },
  defaultVariants: {
    size: 'large',
  },
});

interface FilterPillProps extends VariantProps<typeof filterPill> {
  label: string;
  selected: boolean;
  onClick: (filterId: string) => void;
  size?: 'small' | 'large';
}

export const FilterPill = ({
    label,
    selected,
    onClick,
    size,
}: FilterPillProps) => (
  <button className={filterPill({ selected, size })} onClick={() => onClick(label)} >
    {label}
  </button>
);