import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/Button';
import { ModalContext } from '@/context/modal';

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
