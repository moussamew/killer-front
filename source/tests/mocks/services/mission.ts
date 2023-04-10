import { type RestHandler, rest } from 'msw';

import { MISSION_ENDPOINT } from '@/constants/endpoints';

export function createMission(): RestHandler {
  return rest.post(MISSION_ENDPOINT, (_, res, ctx) =>
    res(ctx.status(200), ctx.json({})),
  );
}

export function deleteMission(missionId: string): RestHandler {
  return rest.delete(`${MISSION_ENDPOINT}/${missionId}`, (_, res, ctx) =>
    res(ctx.status(200), ctx.json({})),
  );
}
