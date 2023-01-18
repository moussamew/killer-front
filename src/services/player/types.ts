import { QueryObserverResult, UseMutationResult } from 'react-query';

import { Mission } from '../mission/types';
import { Room } from '../room/types';

import { PlayerStatus } from './constants';

export interface Player {
  id: number;
  name: string;
  room: string | null;
  status: PlayerStatus;
  token: string;
}

export interface PlayerSession {
  id: number;
  name: string;
  killer: string | null;
  assignedMission: number | null;
  authoredMissions: Mission[];
  status: PlayerStatus;
  target: number | null;
  room: Room | null;
}

export interface PlayerSessionQuery {
  playerSession: PlayerSession | undefined;
  refetchPlayerSession(): Promise<QueryObserverResult<PlayerSession, unknown>>;
  isLoading: boolean;
}

export interface UpdatePlayerMutation {
  updatePlayer: UseMutationResult<void, unknown, Partial<Player>, unknown>;
}
export interface CreatePlayerMutation {
  createPlayer: UseMutationResult<Player, unknown, string, unknown>;
}

export interface KickPlayerMutation {
  kickPlayer: UseMutationResult<
    void,
    unknown,
    Pick<Player, 'room' | 'id'>,
    unknown
  >;
}
