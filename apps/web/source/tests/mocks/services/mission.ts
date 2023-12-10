import { http, HttpResponse, type HttpHandler } from 'msw';

import { MISSION_ENDPOINT } from '@/constants/endpoints';
import { ErrorCode } from '@/constants/errors';

export function createMission(): HttpHandler {
  return http.post(MISSION_ENDPOINT, async ({ request }) => {
    const content = (await request.json()) as string;

    if (content.length < 5) {
      return new HttpResponse(
        JSON.stringify({ detail: ErrorCode.MISSION_TOO_SHORT_CONTENT }),
        { status: 400 },
      );
    }

    return HttpResponse.json({});
  });
}

export function deleteMission(missionId: string): HttpHandler {
  return http.delete(`${MISSION_ENDPOINT}/${missionId}`, () =>
    HttpResponse.json({}),
  );
}
