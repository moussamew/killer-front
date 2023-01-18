import { QueryObserverResult, UseMutationResult } from 'react-query';

import { Player } from '@/services/player/types';

import { RoomStatus } from './constants';

export interface Room {
  id: number;
  missions: number[];
  code: string;
  name: string;
  status: RoomStatus;
  admin: Player;
  players: Player[];
}

export interface CreateRoomMutation {
  createRoom: UseMutationResult<Room, unknown, void, unknown>;
}

export interface DeleteRoomMutation {
  deleteRoom: UseMutationResult<void, unknown, string, unknown>;
}

export interface StartPartyMutation {
  startParty: UseMutationResult<void, unknown, string, unknown>;
}

export interface RoomQuery {
  room: Room | undefined;
  refetchRoom(): Promise<QueryObserverResult<Room, unknown>>;
}
