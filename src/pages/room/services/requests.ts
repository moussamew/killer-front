import {
  MISSION_ENDPOINT,
  PLAYER_MISSION_ENDPOINT,
  ROOM_ENDPOINT,
} from '@/constants/endpoints';
import { Method } from '@/constants/enums';
import { fetchRequest, request } from '@/helpers/apis';
import { Mission, Player } from '@/types';

const getPlayersInRoom = async (roomCode?: string): Promise<Player[]> => {
  const playersInRoom = await request<Player[]>(
    `${ROOM_ENDPOINT}/${roomCode}/players`,
    Method.GET,
  );

  return playersInRoom;
};

const getPlayerMissions = async (): Promise<Mission[]> => {
  const playerMissions = await request<Mission[]>(
    PLAYER_MISSION_ENDPOINT,
    Method.GET,
  );

  return playerMissions;
};

const createMission = async (content: string): Promise<void> => {
  await request(MISSION_ENDPOINT, Method.POST, {
    body: JSON.stringify({ content }),
  });
};

const deleteMission = async (missionId: number): Promise<void> => {
  await fetchRequest(`${MISSION_ENDPOINT}/${missionId}`, Method.DELETE);
};

export { getPlayersInRoom, getPlayerMissions, createMission, deleteMission };
