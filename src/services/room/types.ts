import { QueryObserverResult, UseMutationResult } from 'react-query';

import { Player } from '@/services/player/types';

import { RoomStatus } from './constants';

export interface Room {
  id: number;
  missions: number[];
  code: string;
  name: string;
  status: RoomStatus;
}

export interface RoomInfos {
  roomCode: string;
  pathname: string;
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

export interface RoomInfosQuery {
  roomInfos: Room | undefined;
  refetchRoomInfos(): Promise<QueryObserverResult<Room, unknown>>;
}
