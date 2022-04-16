import { screen } from '@testing-library/react';
import { sources } from 'eventsourcemock';
import { rest } from 'msw';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import PlayerList from '../PlayerList';

import { ROOM_ENDPOINT, ROOM_TOPIC } from '@/constants/endpoints';
import { server } from '@/tools/server';
import { renderWithProviders } from '@/tools/tests/utils';

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

  describe('RoomEventSource > Event Message (SSE)', () => {
    const mockRoomEventSource = `${ROOM_TOPIC}/X7JKL`;

    beforeAll(() => {
      sources[mockRoomEventSource].emitOpen();
    });

    it('should update the players list when SSE emits a new message with a new player', async () => {
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

      const messageEvent = new MessageEvent('message', {
        data: '{"id":1,"name":"Oracle","passcode":null,"status":"ALIVE","role":"PLAYER","targetId":null,"missionId":null,"roomCode":"X7JKL"}',
      });

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

    it('should update the players list when SSE emits a new message with an updated player name', async () => {
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

      const messageEvent = new MessageEvent('message', {
        data: '{"id":0,"name":"Super Neo","passcode":null,"status":"ALIVE","role":"PLAYER","targetId":null,"missionId":null,"roomCode":"X7JKL"}',
      });

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

      expect(screen.queryByText('Neo')).not.toBeInTheDocument();
      expect(await screen.findByText('Super Neo')).toBeInTheDocument();
    });

    it('should update the players list when SSE emits a new message with a leaving player', async () => {
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

      const messageEvent = new MessageEvent('message', {
        data: '{"id":0,"name":"Neo","passcode":null,"status":"ALIVE","role":"PLAYER","targetId":null,"missionId":null,"roomCode":null}',
      });

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

      expect(screen.queryByText('Neo')).not.toBeInTheDocument();
    });
  });
});
