import {
  type QueryObserverResult,
  type UseMutationResult,
} from '@tanstack/react-query';

import { type Player } from '@/services/player/types';

import { type Mission } from '../mission/types';

import { type RoomStatus } from './constants';

export interface Room {
  id: number;
  missions: Mission[];
  code: string;
  name: string;
  status: RoomStatus;
  admin: Player;
  players: Player[];
  winner: Player | null;
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
