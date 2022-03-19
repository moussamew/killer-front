import { Fragment, ReactNode, useContext, useState } from 'react';
import tw from 'tailwind-styled-components';

import Settings from 'assets/icons/settings.svg';
import { isEmptyObject } from 'helpers/objects';
import t from 'helpers/translate';
import { PlayerContext } from 'hooks/context';

import SettingsModal from './SettingsModal';

const Header = tw.header`
  p-2 flex justify-between
`;

const Text = tw.p`
  font-bold text-black uppercase
`;

const PlayerInfos = tw.div`
  flex flex-row
`;

const Image = tw.img`
  ml-1 cursor-pointer
`;

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props): JSX.Element => {
  const { playerSession } = useContext(PlayerContext);
  const [isSettingsModalOpen, toggleSettingsModal] = useState(false);

  return (
    <Fragment>
      <Header>
        <Text>{t('header.project_name')}</Text>
        {!isEmptyObject(playerSession) && (
          <PlayerInfos>
            <Text>{playerSession.name}</Text>
            <Image
              alt="settings"
              src={Settings}
              onClick={(): void => toggleSettingsModal(true)}
            />
          </PlayerInfos>
        )}
      </Header>
      {children}
      {isSettingsModalOpen && (
        <SettingsModal closeModal={(): void => toggleSettingsModal(false)} />
      )}
    </Fragment>
  );
};

export default Layout;
