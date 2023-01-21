import { useQuery } from 'react-query';

import { getTargetInfosRequest } from './requests';
import { TargetInfosQuery } from './types';

export function useTargetInfos(): TargetInfosQuery {
  const { data: targetInfos, refetch: refetchTargetInfos } = useQuery(
    'targetInfos',
    getTargetInfosRequest,
  );

  return { targetInfos, refetchTargetInfos };
}
