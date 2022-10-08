import {
  MISSION_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
  PLAYER_TARGET_ENDPOINT,
} from '@/constants/endpoints';
import { Method } from '@/constants/enums';
import { request } from '@/helpers/apis';
import { Player } from '@/services/player/types';
import { Mission, Target, TargetInfos } from '@/types';

export function getTargetInfos(): Promise<Partial<TargetInfos>> {
  return Promise.all([
    request<Target>({ url: PLAYER_TARGET_ENDPOINT, method: Method.GET }),
    request<Mission>({ url: MISSION_ENDPOINT, method: Method.GET }),
  ])
    .then(([target, mission]) => ({
      name: target.name,
      mission: mission.content,
    }))
    .catch(() => ({}));
}
