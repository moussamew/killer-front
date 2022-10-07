import { fireEvent, screen } from '@testing-library/react';
import { sources } from 'eventsourcemock';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { PLAYER_SESSION_ENDPOINT, ROOM_TOPIC } from '@/constants/endpoints';
import { MercureEventType, PlayerRole } from '@/constants/enums';
import { RoomProvider } from '@/hooks/context/room';
import { RoomPage } from '@/pages/room';
import { PendingRoomPage } from '@/pages/room/pending';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<StartPartyButton />', () => {
  it('should be able to start a new party', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            id: 0,
            name: 'Neo',
            roomCode: 'P9LDG',
            role: PlayerRole.ADMIN,
          }),
        ),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/P9LDG']}>
        <Routes>
          <Route path="/room/P9LDG/playing" element={<p>Party started!</p>} />
          <Route
            path="/room/:roomCode"
            element={
              <RoomProvider>
                <RoomPage page={<PendingRoomPage />} />
              </RoomProvider>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(await screen.findByText('Start the party'));

    const messageEvent = new MessageEvent('message', {
      data: JSON.stringify({
        type: MercureEventType.ROOM_IN_GAME,
      }),
    });

    const roomEventSource = `${ROOM_TOPIC}/P9LDG`;

    sources[roomEventSource].emit(messageEvent.type, messageEvent);

    expect(await screen.findByText('Party started!')).toBeInTheDocument();

    sources[roomEventSource].close();
  });
});
