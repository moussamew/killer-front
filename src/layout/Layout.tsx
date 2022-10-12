import { Fragment, ReactNode, useContext } from 'react';
import tw from 'tailwind-styled-components';

import { Modal } from '@/components/Modal';
import { ModalContext } from '@/hooks/context/modal';

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

  return (
    <Fragment>
      <Header />
      <Content>{children}</Content>
      {modal && <Modal closeModal={closeModal}>{modal}</Modal>}
    </Fragment>
  );
}
