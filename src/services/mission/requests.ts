import {
  MISSION_ENDPOINT,
  PLAYER_MISSION_ENDPOINT,
  PLAYER_TARGET_ENDPOINT,
} from '@/constants/endpoints';
import { Method } from '@/constants/enums';
import { request } from '@/helpers/apis';

import { Mission, Target, TargetInfos } from './types';

const { GET, POST, DELETE } = Method;

export function getTargetInfosRequest(): Promise<Partial<TargetInfos>> {
  return Promise.all([
    request<Target>({ url: PLAYER_TARGET_ENDPOINT, method: GET }),
    request<Mission>({ url: MISSION_ENDPOINT, method: GET }),
  ])
    .then(([target, mission]) => ({
      name: target.name,
      mission: mission.content,
    }))
    .catch(() => ({}));
}

export function getPlayerMissionsRequest(): Promise<Mission[]> {
  return request({ url: PLAYER_MISSION_ENDPOINT, method: GET });
}

export function createMissionRequest(content: string): Promise<void> {
  return request({
    url: MISSION_ENDPOINT,
    method: POST,
    requestInit: {
      body: JSON.stringify({ content }),
    },
  });
}

export function deleteMissionRequest(missionId: number): Promise<void> {
  return request({ url: `${MISSION_ENDPOINT}/${missionId}`, method: DELETE });
}
