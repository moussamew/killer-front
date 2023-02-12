import { useContext } from 'react';
import tw from 'twin.macro';

import Settings from '@/assets/icons/settings.svg';
import { ModalContext } from '@/context/modal';
import { useTranslation } from '@/hooks/useTranslation';

import { SettingsModal } from './SettingsModal';

const Navigation = tw.header`
  p-2 flex justify-between
`;

const Text = tw.p`
  font-semibold text-black uppercase mr-1
`;

const PlayerInfos = tw.div`
  flex flex-row cursor-pointer
`;

interface Props {
  playerName?: string;
}

function Header({ playerName }: Props): JSX.Element {
  const { openModal } = useContext(ModalContext);
  const { t } = useTranslation();

  const handleOpenSettings = (): void => {
    openModal(<SettingsModal playerName={playerName} />);
  };

  return (
    <Navigation>
      <Text>Killer Party</Text>
      <PlayerInfos>
        {playerName && <Text>{playerName}</Text>}
        <Settings
          title={t('tooltip.user.settings')}
          onClick={handleOpenSettings}
        />
      </PlayerInfos>
    </Navigation>
  );
}

export default Header;
