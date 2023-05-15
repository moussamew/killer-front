import {
  type QueryObserverResult,
  type UseMutationResult,
} from '@tanstack/react-query';

import { type RoomStatus } from '../../types';
import { type Mission } from '../mission/types';
import { type Player } from '../player/types';

export interface Room {
  id: string;
  missions: Mission[];
  name: string;
  status: RoomStatus;
  admin: Player;
  players: Player[];
  winner: Player | null;
  hasEnoughMissions: boolean;
  hasEnoughPlayers: boolean;
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
