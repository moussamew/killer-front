import { QueryObserverResult, UseMutationResult } from 'react-query';

import { Player } from '@/services/player/types';

import { PlayerStatus } from '../player/constants';

import { RoomStatus } from './constants';

interface RoomPlayer {
  id: number;
  name: string;
  status: PlayerStatus;
}

export interface Room {
  id: number;
  missions: number[];
  code: string;
  name: string;
  status: RoomStatus;
  admin: RoomPlayer;
  players: RoomPlayer[];
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

export interface RoomPlayersQuery {
  roomPlayers: Player[] | undefined;
  refetchRoomPlayers(): Promise<QueryObserverResult<Player[], unknown>>;
}

export interface RoomMissionsQuery {
  roomMissions: number | undefined;
  refetchRoomMissions(): Promise<QueryObserverResult<number, unknown>>;
}

export interface RoomQuery {
  room: Room | undefined;
  refetchRoom(): Promise<QueryObserverResult<Room, unknown>>;
}
