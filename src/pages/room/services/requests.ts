import {
  MISSION_ENDPOINT,
  PLAYER_MISSION_ENDPOINT,
  ROOM_ENDPOINT,
  ROOM_MISSION_ENDPOINT,
} from '@/constants/endpoints';
import { Method, RoomStatus } from '@/constants/enums';
import { fetchRequest, request } from '@/helpers/apis';
import { Mission, Player } from '@/types';

const { GET, POST, DELETE, PATCH } = Method;

export const getRoomPlayers = async (roomCode?: string): Promise<Player[]> => {
  const roomPlayers = await request<Player[]>(
    `${ROOM_ENDPOINT}/${roomCode}/players`,
    GET,
  );

  return roomPlayers;
};

export const getRoomMissions = (): Promise<number> => {
  return request<number>(ROOM_MISSION_ENDPOINT, GET);
};

export const getPlayerMissions = async (): Promise<Mission[]> => {
  return request<Mission[]>(PLAYER_MISSION_ENDPOINT, GET);
};

export const createMission = async (content: string): Promise<void> => {
  await request(MISSION_ENDPOINT, POST, {
    body: JSON.stringify({ content }),
  });
};

export const deleteMission = async (missionId: number): Promise<void> => {
  await fetchRequest(`${MISSION_ENDPOINT}/${missionId}`, DELETE);
};

export const kickPlayerFromRoom = async (
  roomCode: string,
  playerId: number,
): Promise<void> => {
  await request(
    `${ROOM_ENDPOINT}/${roomCode}/player/${playerId}/admin`,
    PATCH,
    { body: JSON.stringify({ roomCode: null }) },
  );
};

export const deleteRoom = async (roomCode: string): Promise<void> => {
  await request(`${ROOM_ENDPOINT}/${roomCode}`, DELETE);
};

export const startParty = async (roomCode: string): Promise<void> =>
  request(`${ROOM_ENDPOINT}/${roomCode}`, PATCH, {
    body: JSON.stringify({ status: RoomStatus.IN_GAME }),
  });
