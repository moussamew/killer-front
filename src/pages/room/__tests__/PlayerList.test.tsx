import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { sources } from 'eventsourcemock';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import {
  PLAYER_SESSION_ENDPOINT,
  ROOM_ENDPOINT,
  ROOM_TOPIC,
} from '@/constants/endpoints';
import { PlayerRole } from '@/constants/enums';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

import PlayerList from '../PlayerList';

describe('<PlayerList />', () => {
  it('should show all the player in the room', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            id: 1,
            name: 'Trinity',
          }),
        ),
      ),
      rest.get(`${ROOM_ENDPOINT}/X7JKL/players`, async (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json([
            { id: 0, name: 'Neo', role: PlayerRole.ADMIN },
            { id: 1, name: 'Trinity' },
            { id: 2, name: 'Morpheus' },
          ]),
        ),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/X7JKL']}>
        <Routes>
          <Route path="/room/:roomCode" element={<PlayerList />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByText('Neo')).toBeInTheDocument();
    expect(await screen.findByText('Trinity')).toBeInTheDocument();
    expect(await screen.findByText('Morpheus')).toBeInTheDocument();
  });

  it('should update the players list when SSE emits a new message', async () => {
    const mockRoomEventSource = `${ROOM_TOPIC}/X7JKL`;

    sources[mockRoomEventSource].emitOpen();

    server.use(
      rest.get(`${ROOM_ENDPOINT}/X7JKL/players`, async (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json([
            {
              id: 0,
              name: 'Neo',
              passcode: null,
              status: 'ALIVE',
              role: 'PLAYER',
              target: null,
              missionId: null,
              roomCode: 'X7JKL',
            },
          ]),
        ),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/X7JKL']}>
        <Routes>
          <Route path="/room/:roomCode" element={<PlayerList />} />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByText('Neo');

    server.use(
      rest.get(`${ROOM_ENDPOINT}/X7JKL/players`, async (_req, res, ctx) =>
        res(ctx.status(200), ctx.json([])),
      ),
    );

    const messageEvent = new MessageEvent('message', {
      data: JSON.stringify({
        type: null,
      }),
    });

    sources[mockRoomEventSource].emit(messageEvent.type, messageEvent);

    await waitForElementToBeRemoved(() => screen.queryByText('Neo'));

    expect(screen.queryByText('Neo')).not.toBeInTheDocument();
  });
});
