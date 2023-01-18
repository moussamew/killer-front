import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { PLAYER_SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { PendingRoomPage } from '@/pages/Room/Pending';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<LeaveRoomModal />', () => {
  it('should be able to leave the room', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            id: 0,
            name: 'Neo',
            roomCode: 'X7VBD',
          }),
        ),
      ),
      rest.get(`${ROOM_ENDPOINT}/X7VBD/players`, async (_req, res, ctx) =>
        res(ctx.status(200), ctx.json([{ id: 0, name: 'Neo' }])),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/X7VBD']}>
        <Routes>
          <Route path="/room/:roomCode" element={<PendingRoomPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await userEvent.click(await screen.findByTitle('leaveRoom'));

    await userEvent.click(screen.getByText('Leave this room'));

    await waitForElementToBeRemoved(() =>
      screen.queryByText('Leave this room'),
    );

    expect(
      screen.queryByText('Leave the current room'),
    ).not.toBeInTheDocument();
  });
});
