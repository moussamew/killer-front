import { PlayerRole, PlayerStatus, RoomStatus } from '@/constants/enums';

export interface Player {
  id: number;
  name: string;
  status: PlayerStatus;
  roomCode: string | null;
  role: PlayerRole;
  targetId?: number;
  missionId?: number;
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

export interface Target {
  id: number;
  name: string;
}

export interface TargetInfos {
  name: string;
  mission: string;
}
