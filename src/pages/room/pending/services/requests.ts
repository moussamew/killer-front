import {
  MISSION_ENDPOINT,
  PLAYER_MISSION_ENDPOINT,
  ROOM_ENDPOINT,
  ROOM_MISSION_ENDPOINT,
} from '@/constants/endpoints';
import { Method, RoomStatus } from '@/constants/enums';
import { request } from '@/helpers/apis';
import { Mission, Player } from '@/types';

const { GET, POST, DELETE, PATCH } = Method;

export function getRoomPlayers(roomCode: string): Promise<Player[]> {
  return request({ url: `${ROOM_ENDPOINT}/${roomCode}/players`, method: GET });
}

export function getRoomMissions(): Promise<number> {
  return request({ url: ROOM_MISSION_ENDPOINT, method: GET });
}

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

export function kickPlayerFromRoom(
  roomCode: string,
  playerId: number,
): Promise<void> {
  return request({
    url: `${ROOM_ENDPOINT}/${roomCode}/player/${playerId}/admin`,
    method: PATCH,
    requestInit: {
      body: JSON.stringify({ roomCode: null }),
    },
  });
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
