import { Fragment, ReactNode, useContext } from 'react';
import tw from 'twin.macro';

import { Loader } from '@/components/Loader';
import { Modal } from '@/components/Modal';
import { ModalContext } from '@/hooks/context/modal';
import { usePlayerSession } from '@/services/player/queries';

import Header from './Header';

const Content = tw.div`
  max-w-screen-xl m-auto
  inset-0 px-2 mb-2
`;

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props): JSX.Element {
  const { modal, closeModal } = useContext(ModalContext);
  const { isLoading, player } = usePlayerSession();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <Header playerName={player?.name} />
      <Content>{children}</Content>
      {modal && <Modal closeModal={closeModal}>{modal}</Modal>}
    </Fragment>
  );
}
