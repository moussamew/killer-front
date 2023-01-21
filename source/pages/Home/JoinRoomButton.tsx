import { useContext } from 'react';

import { Button } from '@/components/Button';
import { t } from '@/helpers/translate';
import { ModalContext } from '@/hooks/context/modal';

import { JoinRoomModal } from './JoinRoomModal';

export function JoinRoomButton(): JSX.Element {
  const { openModal } = useContext(ModalContext);

  const handleJoinRoom = (): void => {
    openModal(<JoinRoomModal />);
  };

  return (
    <Button
      content={t('home.join_room')}
      buttonColor="yellow"
      textColor="lightDark"
      onClick={handleJoinRoom}
    />
  );
}
