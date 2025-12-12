'use client';

import { Badge } from '@/components/Badge';
import { useRestaurantsContext } from '@/contexts/RestaurantsContext';
import { cx } from '@/cva.config';
import type { Restaurant } from '@/types/api';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard = ({
  restaurant: {
    id,
    image_url: imageUrl,
    name,
    delivery_time_minutes: deliveryTimeMinutes,
  },
}: RestaurantCardProps) => {
  const { statusLabel } = useRestaurantsContext();
  const openStatus = statusLabel(id);
  const isOpen = openStatus === 'Open';
  const isClosed = openStatus === 'Closed';
  const router = useRouter();

  return (
    <button
      className="cursor-pointer"
      onClick={() => router.push(`/${id}`)}
      type="button"
    >
      <div className="border-brand-stroke relative h-50.5 overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-brand-stroke/60">
        <div
          className={cx(
            'absolute -top-8 -right-8 h-36 w-36',
            isClosed && 'opacity-20',
          )}
        >
          <Image
            alt={name}
            className="object-contain drop-shadow-sm"
            fill
            sizes="112px"
            src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${imageUrl}`}
          />
        </div>
        <div className="flex h-full flex-col justify-between p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge label={openStatus} />
            {isOpen && (
              <Badge isDeliveryTime label={`${deliveryTimeMinutes} min`} />
            )}
          </div>
          {isClosed && (
            <Badge intent="closed" label="Opens tomorrow at 12 pm" />
          )}
          <div className="flex items-end justify-between">
            <p className={cx('text-2xl', isClosed && 'text-black/20')}>
              {name}
            </p>
            <div
              aria-label={`View ${name}`}
              className={cx(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition',
                isOpen ?
                  'bg-brand-green hover:bg-brand-green/80'
                : 'bg-brand-green/40',
              )}
            >
              →
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};
