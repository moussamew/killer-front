import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { Loader } from '@/components/Loader';
import { Modal } from '@/components/Modal';
import { Notification } from '@/components/Notification';
import { ModalContext } from '@/context/modal';
import { useSession } from '@/services/player/queries';

import Header from './Header';
import styles from './styles/Layout.module.css';
import { WebViewDetector } from './WebViewDetector';

export function Layout(): JSX.Element {
  const { modal, closeModal } = useContext(ModalContext);
  const { isLoading, session } = useSession();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Header playerName={session?.name} />
      <section className={styles.layout}>
        <WebViewDetector>
          <Outlet />
        </WebViewDetector>
      </section>
      {modal && <Modal closeModal={closeModal}>{modal}</Modal>}
      <Notification />
    </>
  );
}
