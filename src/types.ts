import { PlayerStatus, RoomStatus } from 'constants/enums';

export interface Player {
  id?: number;
  name?: string;
  status?: PlayerStatus;
  missionId?: number;
  roomCode?: string;
  targetId?: number;
}

export interface Room {
  code: string;
  name: string;
  status: RoomStatus;
}
