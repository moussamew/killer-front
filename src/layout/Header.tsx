import { useContext } from 'react';
import tw, { styled } from 'twin.macro';

import { ReactComponent as SettingsIcon } from '@/assets/icons/settings.svg';
import Logo from '@/assets/imagesV2/logo.png';
import t from '@/helpers/translate';
import { isEmptyObject } from '@/helpers/utils';
import { ModalContext } from '@/hooks/context/modal';
import { usePlayerSession } from '@/services/player/queries';

import { SettingsModal } from './SettingsModal';

const Navigation = tw.header`
  p-2 flex justify-between
`;

const Text = styled.p`
  font-size: 3rem;
  color: #111827;
  filter: drop-shadow(0.2rem 0.2rem 0.1rem #0f172a);
  ${tw`font-light text-black mr-1`};
`;

const Img = styled.img`
  height: 3rem;
  filter: drop-shadow(0.2rem 0.2rem 0.2rem #0f172a);
  margin-right: 2rem;
`;

const PlayerInfos = tw.div`
  flex flex-row cursor-pointer
`;

function Header(): JSX.Element {
  const { playerSession } = usePlayerSession();
  const { openModal } = useContext(ModalContext);

  const handleOpenSettings = (): void => {
    openModal(<SettingsModal />);
  };

  return (
    <Navigation>
      <div>
        <Text>{t('header.project_name')}</Text>
        <Img src={Logo} />
      </div>

      {playerSession && !isEmptyObject(playerSession) && (
        <PlayerInfos>
          <Text>{playerSession?.name}</Text>
          <SettingsIcon title="userSettings" onClick={handleOpenSettings} />
        </PlayerInfos>
      )}
    </Navigation>
  );
}

export default Header;
