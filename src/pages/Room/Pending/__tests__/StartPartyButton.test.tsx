import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { sources } from 'eventsourcemock';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { PLAYER_SESSION_ENDPOINT, ROOM_TOPIC } from '@/constants/endpoints';
import { MercureEventType } from '@/constants/enums';
import { PendingRoomPage } from '@/pages/Room/Pending';
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
          }),
        ),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/P9LDG']}>
        <Routes>
          <Route path="/room/P9LDG/playing" element={<p>Party started!</p>} />
          <Route path="/room/:roomCode" element={<PendingRoomPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await userEvent.click(await screen.findByText('Start the party'));

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
