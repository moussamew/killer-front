import { screen } from '@testing-library/react';
import { sources } from 'eventsourcemock';
import { rest } from 'msw';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { ROOM_ENDPOINT, ROOM_TOPIC } from 'constants/endpoints';
import { server } from 'tools/server';
import { renderWithProviders } from 'tools/tests/utils';

import PlayerList from '../PlayerList';

describe('<PlayerList />', () => {
  it('should show all the player in the room', async () => {
    server.use(
      rest.get(`${ROOM_ENDPOINT}/X7JKL/players`, async (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json([
            { name: 'Neo' },
            { name: 'Trinity' },
            { name: 'Morpheus' },
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

  it('should update the players list when SSE emits a new message with a new player', async () => {
    server.use(
      rest.get(`${ROOM_ENDPOINT}/X7JKL/players`, async (_req, res, ctx) =>
        res(ctx.status(200), ctx.json([{ name: 'Neo' }])),
      ),
    );

    const messageEvent = new MessageEvent('message', {
      data: '{"name":"Oracle"}',
    });

    const mockRoomEventSource = `${ROOM_TOPIC}/X7JKL`;

    sources[mockRoomEventSource].emitOpen();

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/X7JKL']}>
        <Routes>
          <Route path="/room/:roomCode" element={<PlayerList />} />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByText('Neo');

    act(() => {
      sources[mockRoomEventSource].emit(messageEvent.type, messageEvent);
    });

    expect(await screen.findByText('Oracle')).toBeInTheDocument();
  });
});
