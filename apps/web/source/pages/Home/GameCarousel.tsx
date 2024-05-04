import Lottie from 'lottie-react';

import FreeForAll from '@/assets/lotties/free-for-all.json';
import GameMaster from '@/assets/lotties/game-master.json';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/Carousel';

interface Props {
  setApi?: ((api: CarouselApi) => void) | undefined;
}

export function GameCarousel({ setApi }: Props) {
  return (
    <Carousel setApi={setApi} className="w-1/2 m-auto">
      <CarouselContent defaultValue={1}>
        <CarouselItem>
          <Lottie
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            animationData={GameMaster}
          />
        </CarouselItem>
        <CarouselItem>
          <Lottie
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            animationData={FreeForAll}
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
