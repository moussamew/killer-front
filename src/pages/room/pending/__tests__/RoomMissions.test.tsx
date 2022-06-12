import { screen } from '@testing-library/react';
import { sources } from 'eventsourcemock';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { ROOM_MISSION_ENDPOINT, ROOM_TOPIC } from '@/constants/endpoints';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

import RoomMissions from '../RoomMissions';

describe('<RoomMissions />', () => {
  it('should show the count of all missions in the room', async () => {
    server.use(
      rest.get(ROOM_MISSION_ENDPOINT, async (_req, res, ctx) =>
        res(ctx.status(200), ctx.json(5)),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/X7JKL']}>
        <Routes>
          <Route path="/room/:roomCode" element={<RoomMissions />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      await screen.findByText('There is currently 5 missions in this room.'),
    ).toBeInTheDocument();
  });

  it('should update the count of all missions in the room when SSE emits a new message', async () => {
    const mockMissionsEventSource = `${ROOM_TOPIC}/X7JKL/mission/{id}`;

    sources[mockMissionsEventSource].emitOpen();

    server.use(
      rest.get(ROOM_MISSION_ENDPOINT, async (_req, res, ctx) =>
        res(ctx.status(200), ctx.json(2)),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/X7JKL']}>
        <Routes>
          <Route path="/room/:roomCode" element={<RoomMissions />} />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByText('There is currently 2 missions in this room.');

    server.use(
      rest.get(ROOM_MISSION_ENDPOINT, async (_req, res, ctx) =>
        res(ctx.status(200), ctx.json(3)),
      ),
    );

    const messageEvent = new MessageEvent('message');

    sources[mockMissionsEventSource].emit(messageEvent.type, messageEvent);

    expect(
      await screen.findByText('There is currently 3 missions in this room.'),
    ).toBeInTheDocument();
  });
});
