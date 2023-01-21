import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { PLAYER_SESSION_ENDPOINT } from '@/constants/endpoints';
import { PendingRoomPage } from '@/pages/Room/Pending';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<RoomSettingsModal />', () => {
  it('should be able to delete the room as an admin', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            id: 0,
            name: 'Neo',
            roomCode: 'X7VBD',
          }),
        ),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/X7VBD']}>
        <Routes>
          <Route path="/room/:roomCode" element={<PendingRoomPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await userEvent.click(await screen.findByTitle('roomSettings'));

    await userEvent.type(
      screen.getByPlaceholderText('Confirm by typing the room code'),
      'X7VBD',
    );

    await userEvent.click(screen.getByText('Delete the room'));

    await waitForElementToBeRemoved(() => screen.queryByText('Room settings'));

    expect(screen.queryByText('Room settings')).not.toBeInTheDocument();
  });
});
