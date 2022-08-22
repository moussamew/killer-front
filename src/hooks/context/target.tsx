import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useQuery } from 'react-query';

import { Loader } from '@/components/Loader';
import { isEmptyObject } from '@/helpers/objects';
import { getTargetInfos } from '@/hooks/services/requests';
import { TargetInfos } from '@/types';

interface TargetContextInterface {
  targetInfos: Partial<TargetInfos>;
  refreshTargetInfos: () => Promise<void>;
}

interface Props {
  children: ReactNode;
}

const TargetContext = createContext({} as TargetContextInterface);

const TargetProvider = ({ children }: Props): JSX.Element => {
  const [targetInfos, setTargetInfos] = useState<Partial<TargetInfos>>({});

  const {
    isLoading,
    data: currentTarget,
    refetch: queryTargetInfos,
  } = useQuery('targetInfos', getTargetInfos);

  const refreshTargetInfos = useCallback(async (): Promise<void> => {
    const { data: updatedTarget } = await queryTargetInfos();

    if (updatedTarget) {
      setTargetInfos(updatedTarget);
    }
  }, [queryTargetInfos]);

  const memoizedTargetInfos = useMemo(
    () => ({
      targetInfos,
      refreshTargetInfos,
    }),
    [targetInfos, refreshTargetInfos],
  );

  if (isLoading) {
    return <Loader />;
  }

  if (
    isEmptyObject(targetInfos) &&
    currentTarget &&
    !isEmptyObject(currentTarget)
  ) {
    setTargetInfos(currentTarget);
  }

  return (
    <TargetContext.Provider value={memoizedTargetInfos}>
      {children}
    </TargetContext.Provider>
  );
};

export { TargetContext, TargetProvider };
