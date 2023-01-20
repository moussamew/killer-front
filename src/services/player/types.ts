import { QueryObserverResult, UseMutationResult } from 'react-query';

import { Mission } from '../mission/types';
import { Room } from '../room/types';

import { PlayerStatus } from './constants';

export interface Player {
  id: number;
  name: string;
  status: PlayerStatus;
}

export interface PlayerSession {
  id: number;
  name: string;
  killer: string | null;
  assignedMission: number | null;
  authoredMissions: Mission[];
  status: PlayerStatus;
  target: number | null;
  room: Omit<Room, 'admin' | 'players'> | null;
}

export interface PlayerUpdateInfos {
  id: number;
  name: string;
  room: string | null;
  status: PlayerStatus;
}

export interface PlayerSessionQuery {
  player: PlayerSession | undefined;
  refetchPlayer(): Promise<QueryObserverResult<PlayerSession, unknown>>;
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
