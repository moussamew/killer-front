import { QueryObserverResult, UseMutationResult } from 'react-query';

import { Player } from '@/services/player/types';

import { RoomStatus } from './constants';

export interface Room {
  code: string;
  name: string;
  status: RoomStatus;
}

export interface CreateRoomMutation {
  createRoom: UseMutationResult<Room, unknown, void, unknown>;
}

export interface RoomPlayersQuery {
  roomPlayers: Player[] | undefined;
  refetchRoomPlayers(): Promise<QueryObserverResult<Player[], unknown>>;
}
