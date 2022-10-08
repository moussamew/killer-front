import { useContext } from 'react';
import tw from 'tailwind-styled-components';

import Settings from '@/assets/icons/settings.svg';
import t from '@/helpers/translate';
import { isEmptyObject } from '@/helpers/utils';
import { ModalContext } from '@/hooks/context/modal';
import { usePlayerSession } from '@/services/player/queries';

import { SettingsModal } from './SettingsModal';

const Navigation = tw.header`
  p-2 flex justify-between
`;

const Text = tw.p`
  font-bold text-black uppercase
`;

const PlayerInfos = tw.div`
  flex flex-row cursor-pointer
`;

const Image = tw.img`
  ml-1
`;

function Header(): JSX.Element {
  const { playerSession } = usePlayerSession();
  const { openModal } = useContext(ModalContext);

  return (
    <Navigation>
      <Text>{t('header.project_name')}</Text>
      {playerSession && !isEmptyObject(playerSession) && (
        <PlayerInfos onClick={() => openModal(<SettingsModal />)}>
          <Text>{playerSession?.name}</Text>
          <Image alt="settings" src={Settings} />
        </PlayerInfos>
      )}
    </Navigation>
  );
}

export default Header;
