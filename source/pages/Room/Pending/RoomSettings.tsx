import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import tw from 'twin.macro';

import RoomSettingsIcon from '@/assets/icons/roomSettings.svg';
import { ModalContext } from '@/context/modal';
import { useTranslation } from '@/hooks/useTranslation';
import { useSession } from '@/services/player/queries';
import { useRoom } from '@/services/room/queries';

import { RoomSettingsModal } from './RoomSettingsModal';

const Content = tw.div`
  mb-2 pb-2 border-b
`;

const SectionHeader = tw.div`
  relative
`;

const Settings = tw.div`
  absolute cursor-pointer
  right-0 top-0 md:top-0.5
`;

export function RoomSettings(): JSX.Element {
  const { t } = useTranslation();
  const { session } = useSession();
  const { roomCode } = useParams();
  const { room } = useRoom(roomCode!);
  const { openModal } = useContext(ModalContext);

  const handleRoomSettings = (): void => {
    openModal(<RoomSettingsModal />);
  };

  return (
    <Content>
      <SectionHeader>
        <h2>{t('room.players.list')}</h2>
        {session?.id === room?.admin.id && (
          <Settings onClick={handleRoomSettings}>
            <RoomSettingsIcon title={t('tooltip.room.settings')} />
          </Settings>
        )}
        <p>{t('room.players.list.description')}</p>
      </SectionHeader>
    </Content>
  );
}
