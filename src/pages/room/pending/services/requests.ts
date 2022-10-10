import {
  MISSION_ENDPOINT,
  PLAYER_MISSION_ENDPOINT,
  ROOM_ENDPOINT,
} from '@/constants/endpoints';
import { Method } from '@/constants/enums';
import { request } from '@/helpers/apis';
import { Mission } from '@/services/mission/types';
import { RoomStatus } from '@/services/room/constants';

const { GET, POST, DELETE, PATCH } = Method;

export function getPlayerMissions(): Promise<Mission[]> {
  return request({ url: PLAYER_MISSION_ENDPOINT, method: GET });
}

export function createMission(content: string): Promise<void> {
  return request({
    url: MISSION_ENDPOINT,
    method: POST,
    requestInit: {
      body: JSON.stringify({ content }),
    },
  });
}

export function deleteMission(missionId: number): Promise<void> {
  return request({ url: `${MISSION_ENDPOINT}/${missionId}`, method: DELETE });
}

export function deleteRoom(roomCode: string): Promise<void> {
  return request({ url: `${ROOM_ENDPOINT}/${roomCode}`, method: DELETE });
}
export function startParty(roomCode: string): Promise<void> {
  return request({
    url: `${ROOM_ENDPOINT}/${roomCode}`,
    method: PATCH,
    requestInit: {
      body: JSON.stringify({ status: RoomStatus.IN_GAME }),
    },
  });
}
