import {
  MISSION_ENDPOINT,
  PLAYER_MISSION_ENDPOINT,
  ROOM_ENDPOINT,
  ROOM_MISSION_ENDPOINT,
} from '@/constants/endpoints';
import { Method } from '@/constants/enums';
import { fetchRequest, request } from '@/helpers/apis';
import { Mission, Player } from '@/types';

export const getRoomPlayers = async (roomCode?: string): Promise<Player[]> => {
  const roomPlayers = await request<Player[]>(
    `${ROOM_ENDPOINT}/${roomCode}/players`,
    Method.GET,
  );

  return roomPlayers;
};

export const getRoomMissions = async (): Promise<number> => {
  const roomMissions = await request<number>(ROOM_MISSION_ENDPOINT, Method.GET);

  return roomMissions;
};

export const getPlayerMissions = async (): Promise<Mission[]> => {
  const playerMissions = await request<Mission[]>(
    PLAYER_MISSION_ENDPOINT,
    Method.GET,
  );

  return playerMissions;
};

export const createMission = async (content: string): Promise<void> => {
  await request(MISSION_ENDPOINT, Method.POST, {
    body: JSON.stringify({ content }),
  });
};

export const deleteMission = async (missionId: number): Promise<void> => {
  await fetchRequest(`${MISSION_ENDPOINT}/${missionId}`, Method.DELETE);
};
