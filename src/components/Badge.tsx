import { cva, cx, type VariantProps } from '@/cva.config';

const badge = cva({
  base: 'border-brand-stroke flex items-center gap-2 border px-3 py-2 shadow-floating-card',
  variants: {
    intent: {
      status: 'bg-white rounded-full',
      closed: 'bg-brand-offwhite max-w-fit mx-auto rounded-lg',
    },
  },
});

interface BadgeProps extends VariantProps<typeof badge> {
  label: string;
  isDeliveryTime?: boolean;
}

export const Badge = ({
  intent = 'status',
  isDeliveryTime = false,
  label,
}: BadgeProps) => (
  <div className={badge({ intent })}>
    {intent === 'status' && !isDeliveryTime && (
      <div
        className={cx('h-2 w-2 rounded-full', {
          'bg-brand-green': label.toLowerCase() === 'open',
          'bg-black': label.toLowerCase() === 'closed',
        })}
      />
    )}
    <span className="text-xs text-black">{label}</span>
  </div>
);
