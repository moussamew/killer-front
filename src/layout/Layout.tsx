import { Fragment, ReactNode, useContext } from 'react';

import Header from './Header';

import { Modal } from '@/components';
import { ModalContext } from '@/hooks/context/modal';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props): JSX.Element => {
  const { modal, closeModal } = useContext(ModalContext);

  return (
    <Fragment>
      <Header />
      {children}
      {modal && <Modal closeModal={closeModal}>{modal}</Modal>}
    </Fragment>
  );
};

export default Layout;
