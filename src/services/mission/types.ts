import { QueryObserverResult } from 'react-query';

export interface Mission {
  id: number;
  content: string;
}

export interface Target {
  id: number;
  name: string;
}

export interface TargetInfos {
  name: string;
  mission: string;
}

export interface TargetInfosQuery {
  targetInfos: Partial<TargetInfos> | undefined;
  refetchTargetInfos(): Promise<
    QueryObserverResult<Partial<TargetInfos>, unknown>
  >;
}
