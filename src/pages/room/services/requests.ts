import {
  MISSION_ENDPOINT,
  PLAYER_MISSION_ENDPOINT,
  ROOM_ENDPOINT,
  ROOM_MISSION_ENDPOINT,
} from '@/constants/endpoints';
import { Method, RoomStatus } from '@/constants/enums';
import { fetchRequest, request } from '@/helpers/apis';
import { Mission, Player, Room } from '@/types';

const { GET, POST, DELETE, PATCH } = Method;

export const getRoomPlayers = (roomCode?: string): Promise<Player[]> =>
  request(`${ROOM_ENDPOINT}/${roomCode}/players`, GET);

export const getRoomMissions = (): Promise<number> =>
  request(ROOM_MISSION_ENDPOINT, GET);

export const getPlayerMissions = (): Promise<Mission[]> =>
  request(PLAYER_MISSION_ENDPOINT, GET);

export const createMission = (content: string): Promise<void> =>
  request(MISSION_ENDPOINT, POST, {
    body: JSON.stringify({ content }),
  });

export const deleteMission = async (missionId: number): Promise<void> => {
  await fetchRequest(`${MISSION_ENDPOINT}/${missionId}`, DELETE);
};

export const kickPlayerFromRoom = (
  roomCode: string,
  playerId: number,
): Promise<void> =>
  request(`${ROOM_ENDPOINT}/${roomCode}/player/${playerId}/admin`, PATCH, {
    body: JSON.stringify({ roomCode: null }),
  });

export const deleteRoom = (roomCode: string): Promise<void> =>
  request(`${ROOM_ENDPOINT}/${roomCode}`, DELETE);

export const startParty = async (roomCode: string): Promise<void> =>
  request(`${ROOM_ENDPOINT}/${roomCode}`, PATCH, {
    body: JSON.stringify({ status: RoomStatus.IN_GAME }),
  });

export const getRoom = async (roomCode: string): Promise<Room> =>
  request(`${ROOM_ENDPOINT}/${roomCode}`, GET);
