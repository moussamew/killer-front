import { QueryObserverResult, UseMutationResult } from 'react-query';

import { Room } from '../room/types';

import { PlayerRole, PlayerStatus } from './constants';

export interface Player {
  id: number;
  name: string;
  status: PlayerStatus;
  roomCode: string | null;
  role: PlayerRole;
  targetId?: number;
  missionId?: number;
}

export interface PlayerSession {
  name: string;
  killer: string | null;
  assignedMission: number | null;
  authoredMissions: number[];
  status: PlayerStatus;
  target: number | null;
  room: Room;
}

export interface PlayerSessionQuery {
  playerSession: PlayerSession | undefined;
  refetchPlayerSession(): Promise<QueryObserverResult<PlayerSession, unknown>>;
  isPlayerSessionLoading: boolean;
}

export interface UpdatePlayerMutation {
  updatePlayer: UseMutationResult<void, unknown, Partial<Player>, unknown>;
}
export interface CreatePlayerMutation {
  createPlayer: UseMutationResult<void, unknown, Partial<Player>, unknown>;
}

export interface KickPlayerMutation {
  kickPlayer: UseMutationResult<
    void,
    unknown,
    Pick<Player, 'id' | 'roomCode'>,
    unknown
  >;
}
