import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import tw from 'twin.macro';

import { ReactComponent as RoomSettingsIcon } from '@/assets/icons/roomSettings.svg';
import { t } from '@/helpers/translate';
import { ModalContext } from '@/hooks/context/modal';
import { useSession } from '@/services/player/queries';
import { useRoom } from '@/services/room/queries';

import { RoomSettingsModal } from './RoomSettingsModal';

const Content = tw.div`
  mb-2
`;

const SectionHeader = tw.div`
  relative
`;

const Settings = tw.div`
  absolute cursor-pointer
  right-0 top-0 md:top-0.5
`;

export function RoomSettings(): JSX.Element {
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
        <h2>{t('room.players_list')}</h2>
        {session?.id === room?.admin.id && (
          <Settings onClick={handleRoomSettings}>
            <RoomSettingsIcon title="roomSettings" />
          </Settings>
        )}
        <p>{t('room.players_list_description')}</p>
      </SectionHeader>
    </Content>
  );
}
