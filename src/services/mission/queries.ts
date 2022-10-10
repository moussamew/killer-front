import { useQuery } from 'react-query';

import { getTargetInfosQuery } from './requests';
import { TargetInfosQuery } from './types';

export function useTargetInfos(): TargetInfosQuery {
  const { data: targetInfos, refetch: refetchTargetInfos } = useQuery(
    'targetInfos',
    getTargetInfosQuery,
  );

  return { targetInfos, refetchTargetInfos };
}
