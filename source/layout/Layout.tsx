import clsx from 'clsx';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { Loader } from '@/components/Loader';
import { Modal } from '@/components/Modal';
import { Notification } from '@/components/Notification';
import { ModalContext } from '@/context/modal';
import { SidebarContext } from '@/context/sidebar';
import { useSession } from '@/services/player/queries';

import Header from './Header';
import { Sidebar } from './Sidebar';
import styles from './styles/Layout.module.css';
import { WebViewDetector } from './WebViewDetector';

export function Layout(): JSX.Element {
  const { modal, closeModal } = useContext(ModalContext);
  const { isLoading, session, refetchSession } = useSession();
  const { isSidebarOpen, setSidebarOpen } = useContext(SidebarContext);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.application}>
      <div
        className={clsx(styles.layout, {
          [styles.layoutWithSidebar]: isSidebarOpen,
        })}
      >
        <Header />
        <section className={styles.content}>
          <WebViewDetector>
            <Outlet context={{ isLoading, session, refetchSession }} />
          </WebViewDetector>
        </section>
      </div>
      <Sidebar
        session={session}
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      {modal && <Modal closeModal={closeModal}>{modal}</Modal>}
      <Notification />
    </div>
  );
}
