import {
  MISSION_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
  PLAYER_TARGET_ENDPOINT,
} from '@/constants/endpoints';
import { Method } from '@/constants/enums';
import { request } from '@/helpers/apis';
import { Mission, Player, Target, TargetInfos } from '@/types';

export const getPlayerSession = (): Promise<Player> =>
  request<Player>(PLAYER_SESSION_ENDPOINT, Method.GET);

export const getTargetInfos = (): Promise<Partial<TargetInfos>> =>
  Promise.all([
    request<Target>(PLAYER_TARGET_ENDPOINT, Method.GET),
    request<Mission>(MISSION_ENDPOINT, Method.GET),
  ])
    .then(([target, mission]) => ({
      name: target.name,
      mission: mission.content,
    }))
    .catch(() => ({}));
