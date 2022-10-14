import { QueryObserverResult, UseMutationResult } from 'react-query';

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

export interface PlayerMissionsQuery {
  playerMissions: Mission[] | undefined;
}

export interface CreateMissionMutation {
  createMission: UseMutationResult<void, unknown, string, unknown>;
}

export interface DeleteMissionMutation {
  deleteMission: UseMutationResult<void, unknown, number, unknown>;
}
