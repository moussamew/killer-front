import { Fragment, ReactNode, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import { Modal } from '@/components/Modal';
import { ModalContext } from '@/hooks/context/modal';
import { PlayerContext } from '@/hooks/context/player';
import { usePrevious } from '@/hooks/usePrevious';

import Header from './Header';

const Content = tw.div`
  max-w-screen-xl m-auto
  inset-0 px-2 mb-2
`;

interface Props {
  children: ReactNode;
  hideSettings?: boolean;
}

export const Layout = ({ children, hideSettings }: Props): JSX.Element => {
  const { modal, closeModal } = useContext(ModalContext);
  const { playerSession } = useContext(PlayerContext);

  const previousRoomCode = usePrevious(playerSession?.roomCode);

  const navigate = useNavigate();

  useEffect(() => {
    if (previousRoomCode && !playerSession.roomCode) {
      navigate('/');
    }
  }, [navigate, previousRoomCode, playerSession]);

  return (
    <Fragment>
      <Header hideSettings={hideSettings} />
      <Content>{children}</Content>
      {modal && <Modal closeModal={closeModal}>{modal}</Modal>}
    </Fragment>
  );
};
