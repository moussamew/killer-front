import {
  createContext,
  Dispatch,
  FunctionComponent,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from 'react';

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
      closeModal: (): void => openModal(null),
    }),
    [modal, openModal],
  );

  return (
    <ModalContext.Provider value={memoizedModalComponent}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
