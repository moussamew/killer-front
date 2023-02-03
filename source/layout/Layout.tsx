import { Fragment, type ReactNode, useContext } from 'react';
import tw from 'twin.macro';

import { Loader } from '@/components/Loader';
import { Modal } from '@/components/Modal';
import { Notification } from '@/components/Notification';
import { ModalContext } from '@/context/modal';
import { useSession } from '@/services/player/queries';

import Header from './Header';
import { WebViewDetector } from './WebViewDetector';

const Content = tw.div`
  max-w-screen-xl m-auto
  inset-0 px-2 mb-2
`;

interface Props {
  children: ReactNode | ReactNode[];
}

export function Layout({ children }: Props): JSX.Element {
  const { modal, closeModal } = useContext(ModalContext);
  const { isLoading, session } = useSession();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <Header playerName={session?.name} />
      <Content>
        <WebViewDetector>{children}</WebViewDetector>
      </Content>
      {modal && <Modal closeModal={closeModal}>{modal}</Modal>}
      <Notification />
    </Fragment>
  );
}
