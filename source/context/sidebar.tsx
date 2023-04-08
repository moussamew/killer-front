import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useMemo,
  useState,
} from 'react';

interface SidebarContextInterface {
  isSidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

interface Props {
  children: ReactNode;
}

const SidebarContext = createContext({} as SidebarContextInterface);

function SidebarProvider({ children }: Props): JSX.Element {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const memoizedSidebarContext = useMemo(
    () => ({
      isSidebarOpen,
      setSidebarOpen,
    }),
    [isSidebarOpen, setSidebarOpen],
  );

  return (
    <SidebarContext.Provider value={memoizedSidebarContext}>
      {children}
    </SidebarContext.Provider>
  );
}

export { SidebarContext, SidebarProvider };
