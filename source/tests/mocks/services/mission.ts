import { type RestHandler, rest } from 'msw';

import { MISSION_ENDPOINT } from '@/constants/endpoints';
import { ErrorCode } from '@/constants/errors';

export function createMission(): RestHandler {
  return rest.post(MISSION_ENDPOINT, async (request, response, context) => {
    const { content } = await request.json();

    if (content.length < 5) {
      return response(
        context.status(400),
        context.json({ detail: ErrorCode.MISSION_TOO_SHORT_CONTENT }),
      );
    }

    return response(context.status(200), context.json({}));
  });
}

export function deleteMission(missionId: string): RestHandler {
  return rest.delete(`${MISSION_ENDPOINT}/${missionId}`, (_, res, ctx) =>
    res(ctx.status(200), ctx.json({})),
  );
}
