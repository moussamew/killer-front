import { type QueryObserverResult, type UseMutationResult } from 'react-query';

import { type Mission } from '../mission/types';
import { type Room } from '../room/types';

import { type PlayerStatus } from './constants';

export interface Player {
  id: number;
  name: string;
  status: PlayerStatus;
}

export interface Session {
  id: number;
  name: string;
  killer: string | null;
  assignedMission: Mission | null;
  authoredMissions: Mission[];
  status: PlayerStatus;
  target: Player | null;
  room: Omit<Room, 'admin' | 'players'> | null;
}

export interface PlayerUpdateInfos {
  id: number;
  name: string;
  room: string | null;
  status: PlayerStatus;
}

export interface SessionQuery {
  session: Session | null | undefined;
  refetchSession(): Promise<QueryObserverResult<Session | null, unknown>>;
  isLoading: boolean;
}

export interface UpdatePlayerMutation {
  updatePlayer: UseMutationResult<
    void,
    unknown,
    Partial<PlayerUpdateInfos>,
    unknown
  >;
}
export interface CreatePlayerMutation {
  createPlayer: UseMutationResult<Player, unknown, string, unknown>;
}
