import { Fragment, ReactNode, useContext } from 'react';

import { Modal } from '@/components';
import { ModalContext } from '@/hooks/context/modal';

import Header from './Header';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props): JSX.Element => {
  const { modal, closeModal } = useContext(ModalContext);

  return (
    <Fragment>
      <Header />
      {children}
      {modal && <Modal closeModal={closeModal}>{modal}</Modal>}
    </Fragment>
  );
};
