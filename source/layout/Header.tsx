import { useContext } from 'react';
import tw from 'twin.macro';

import { ReactComponent as SettingsIcon } from '@/assets/icons/settings.svg';
import { ModalContext } from '@/context/modal';

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

interface Props {
  playerName?: string;
}

function Header({ playerName }: Props): JSX.Element {
  const { openModal } = useContext(ModalContext);

  const handleOpenSettings = (): void => {
    openModal(<SettingsModal playerName={playerName} />);
  };

  return (
    <Navigation>
      <Text>Killer Party</Text>
      <PlayerInfos>
        {playerName && <Text>{playerName}</Text>}
        <SettingsIcon onClick={handleOpenSettings} />
      </PlayerInfos>
    </Navigation>
  );
}

export default Header;
