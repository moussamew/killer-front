import { useTranslation } from '@killerparty/intl';
import { useState } from 'react';

import { type CarouselApi } from '@/components/ui/Carousel';

import { GameCarousel } from './GameCarousel';

export function ChooseRoom() {
  const { t } = useTranslation();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  return (
    <div className="shadow-md rounded-lg p-8 bg-brand grid">
      <GameCarousel setApi={setCarouselApi} />
    </div>
  );
}
