import { useContext } from 'react';
import tw from 'tailwind-styled-components';

import RoomSettingsImage from '@/assets/icons/roomSettings.svg';
import KnifeImage from '@/assets/images/knife.png';
import t from '@/helpers/translate';
import { ModalContext } from '@/hooks/context/modal';
import { PlayerRole } from '@/services/player/constants';
import { usePlayerSession } from '@/services/player/queries';

import { RoomSettingsModal } from './RoomSettingsModal';

const Content = tw.div`
  flex flex-row items-center 
  mb-2
`;

const KnifeIcon = tw.img`
  h-7 mr-1 -rotate-45
`;

const RoomSettingsIcon = tw.img`
  absolute cursor-pointer h-2.5 
  right-2 top-0 md:top-0.5
`;

const SectionHeader = tw.div`
  relative
`;

export function RoomSettings(): JSX.Element {
  const { playerSession } = usePlayerSession();
  const { openModal } = useContext(ModalContext);

  return (
    <Content>
      <KnifeIcon alt="playerList" src={KnifeImage} />
      <div>
        <SectionHeader>
          <h2>{t('room.players_list')}</h2>
          {playerSession?.role === PlayerRole.ADMIN && (
            <RoomSettingsIcon
              alt="roomSettings"
              src={RoomSettingsImage}
              onClick={() => openModal(<RoomSettingsModal />)}
            />
          )}
        </SectionHeader>
        <p>{t('room.players_list_description')}</p>
      </div>
    </Content>
  );
}
