import {
  MISSION_ENDPOINT,
  PLAYER_TARGET_ENDPOINT,
} from '@/constants/endpoints';
import { Method } from '@/constants/enums';
import { request } from '@/helpers/apis';
import { Mission, Target } from '@/types';

export const getPlayerTarget = (): Promise<Target> =>
  request(PLAYER_TARGET_ENDPOINT, Method.GET);

export const getPlayerMission = (): Promise<Mission> =>
  request(MISSION_ENDPOINT, Method.GET);
