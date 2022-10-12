import { useContext } from 'react';

import { Button } from '@/components/Button';
import t from '@/helpers/translate';
import { ModalContext } from '@/hooks/context/modal';

import { JoinRoomModal } from './JoinRoomModal';

export function JoinRoomButton(): JSX.Element {
  const { openModal } = useContext(ModalContext);

  return (
    <Button
      content={t('home.join_room')}
      buttonColor="bg-yellow-200"
      textColor="text-lightDark"
      onClick={() => openModal(<JoinRoomModal />)}
    />
  );
}
