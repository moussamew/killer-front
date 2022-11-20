import { useContext } from 'react';
import tw from 'twin.macro';

import { ReactComponent as SettingsIcon } from '@/assets/icons/settings.svg';
import t from '@/helpers/translate';
import { isEmptyObject } from '@/helpers/utils';
import { ModalContext } from '@/hooks/context/modal';
import { usePlayerSession } from '@/services/player/queries';

import { SettingsModal } from './SettingsModal';

const Navigation = tw.header`
  p-2 flex justify-between
`;

const Text = tw.p`
  font-bold text-black uppercase mr-1
`;

const PlayerInfos = tw.div`
  flex flex-row cursor-pointer
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
          <SettingsIcon title="settings" />
        </PlayerInfos>
      )}
    </Navigation>
  );
}

export default Header;
