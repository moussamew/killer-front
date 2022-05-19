import {
  createContext,
  Dispatch,
  FunctionComponent,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { usePrevious } from '../usePrevious';

interface ModalContextInterface {
  modal: ReactNode;
  openModal: Dispatch<SetStateAction<ReactNode>>;
  closeModal: () => void;
}

const ModalContext = createContext({} as ModalContextInterface);

const ModalProvider: FunctionComponent = ({ children }) => {
  const [modal, openModal] = useState<ReactNode>(null);

  const memoizedModalComponent = useMemo(
    () => ({
      modal,
      openModal,
      closeModal: () => openModal(null),
    }),
    [modal, openModal],
  );

  const previousModal = usePrevious(modal);

  /**
   * Prevent page scrolling when a modal is open.
   */
  useEffect(() => {
    if (!previousModal && modal) {
      document.body.style.position = 'fixed';
    }

    if (previousModal && !modal) {
      document.body.style.removeProperty('position');
    }
  }, [previousModal, modal]);

  return (
    <ModalContext.Provider value={memoizedModalComponent}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
