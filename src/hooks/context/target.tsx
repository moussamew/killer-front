import {
  createContext,
  FunctionComponent,
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

const TargetContext = createContext({} as TargetContextInterface);

const TargetProvider: FunctionComponent = ({ children }) => {
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

  if (isEmptyObject(targetInfos) && currentTarget) {
    setTargetInfos(currentTarget);
  }

  return (
    <TargetContext.Provider value={memoizedTargetInfos}>
      {children}
    </TargetContext.Provider>
  );
};

export { TargetContext, TargetProvider };
