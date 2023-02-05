import { useContext } from 'react';

import { Button } from '@/components/Button';
import { ModalContext } from '@/context/modal';
import { useTranslation } from '@/hooks/useTranslation';

import { JoinRoomModal } from './JoinRoomModal';

export function JoinRoomButton(): JSX.Element {
  const { t } = useTranslation();
  const { openModal } = useContext(ModalContext);

  const handleJoinRoom = (): void => {
    openModal(<JoinRoomModal />);
  };

  return (
    <Button color="secondary" onClick={handleJoinRoom}>
      {t('home.join.room')}
    </Button>
  );
}
