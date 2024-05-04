import { useTranslation } from '@killerparty/intl';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

import { type CarouselApi } from '@/components/ui/Carousel';
import { Typography } from '@/components/ui/Typography';
import { modes } from '@/constants/app';
import { type GameMode } from '@/constants/types';

import { CreateRoomButton } from './CreateRoomButton';
import { GameCarousel } from './GameCarousel';
import { GameModeSelector } from './GameModeSelector';

interface Props {
  mode: GameMode;
  setMode: Dispatch<SetStateAction<GameMode>>;
  pseudo?: string | null;
  defaultAvatar: string;
}

export function ChooseGameMode({
  mode,
  setMode,
  pseudo,
  defaultAvatar,
}: Props) {
  const { t } = useTranslation();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  useEffect(() => {
    if (carouselApi) {
      carouselApi.scrollTo(mode.id);

      carouselApi.on('select', ({ selectedScrollSnap }) => {
        const selectedScroll = selectedScrollSnap();

        if (mode.id !== selectedScroll) {
          setMode(modes[selectedScroll]);
        }
      });
    }
  }, [carouselApi, setMode, mode]);

  return (
    <div className="flex flex-col shadow-md rounded-lg p-8 bg-brand justify-between">
      {mode.value === 'game master' && (
        <div className="text-center">
          <Typography.H3 className="mb-4">
            {t('create.room.game.master.mode.title')}
          </Typography.H3>
          <p>{t('create.room.game.master.mode.description')}</p>
        </div>
      )}
      {mode.value === 'player' && (
        <div className=" text-center">
          <Typography.H3 className="mb-4">
            {t('create.room.free.for.all.mode.title')}
          </Typography.H3>
          <p>{t('create.room.free.for.all.mode.description')}</p>
        </div>
      )}
      <GameCarousel setApi={setCarouselApi} />
      <GameModeSelector mode={mode} setMode={setMode} />
      <CreateRoomButton
        currentAvatar={defaultAvatar}
        pseudo={pseudo}
        mode={mode}
      />
    </div>
  );
}
