import { Fragment, ReactNode, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Modal } from '@/components/Modal';
import { ModalContext } from '@/hooks/context/modal';
import { PlayerContext } from '@/hooks/context/player';
import { usePrevious } from '@/hooks/usePrevious';

import Header from './Header';

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
      {children}
      {modal && <Modal closeModal={closeModal}>{modal}</Modal>}
    </Fragment>
  );
};
