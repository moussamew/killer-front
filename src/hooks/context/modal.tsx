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
  setModal: Dispatch<SetStateAction<ReactNode>>;
  closeModal: () => void;
}

const ModalContext = createContext({} as ModalContextInterface);

const ModalProvider: FunctionComponent = ({ children }) => {
  const [modal, setModal] = useState<ReactNode>(null);

  const memoizedModalComponent = useMemo(
    () => ({
      modal,
      setModal,
      closeModal: (): void => setModal(null),
    }),
    [modal, setModal],
  );

  return (
    <ModalContext.Provider value={memoizedModalComponent}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
