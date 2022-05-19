import { PlayerStatus, RoomStatus } from '@/constants/enums';

export interface Player {
  id?: number;
  name?: string;
  status?: PlayerStatus;
  missionId?: number;
  roomCode?: string | null;
  targetId?: number;
  role?: string;
}

export interface Room {
  code: string;
  name: string;
  status: RoomStatus;
}

export interface Mission {
  id: number;
  content: string;
}
