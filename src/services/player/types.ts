import { QueryObserverResult, UseMutationResult } from 'react-query';

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

export interface PlayerSessionQuery {
  playerSession: Player | undefined;
  refetchPlayerSession(): Promise<QueryObserverResult<Player, unknown>>;
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
