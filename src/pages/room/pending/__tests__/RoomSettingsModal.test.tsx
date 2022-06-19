import {
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { PLAYER_SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { PlayerRole } from '@/constants/enums';
import { RoomPage } from '@/pages/room';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

import { PendingRoomPage } from '..';
import { RoomSettingsModal } from '../RoomSettingsModal';

describe('<RoomSettingsModal />', () => {
  it('should be able to delete the room as admin', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            id: 0,
            name: 'Neo',
            roomCode: 'X7VBD',
            role: PlayerRole.ADMIN,
          }),
        ),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/X7VBD']}>
        <Routes>
          <Route
            path="/room/:roomCode"
            element={<RoomPage page={<PendingRoomPage />} />}
          />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(await screen.findByAltText('roomSettings'));

    fireEvent.change(
      screen.getByPlaceholderText('Confirm by typing the room code'),
      { target: { value: 'X7VBD' } },
    );

    fireEvent.click(screen.getByText('Delete the room'));

    await waitForElementToBeRemoved(() => screen.queryByText('Room settings'));

    expect(screen.queryByText('Room settings')).not.toBeInTheDocument();
  });

  it('should let the user close error message if showed', async () => {
    server.use(
      rest.delete(`${ROOM_ENDPOINT}/X7VBD`, (_req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({
            errorCode: 'ROOM.FORBIDDEN',
            message: 'Cannot delete this room',
          }),
        ),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/X7VBD']}>
        <Routes>
          <Route path="/room/:roomCode" element={<RoomSettingsModal />} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.change(
      await screen.findByPlaceholderText('Confirm by typing the room code'),
      { target: { value: 'X7VBD' } },
    );

    fireEvent.click(screen.getByText('Delete the room'));

    await screen.findByText('Cannot delete this room');

    fireEvent.click(screen.getByAltText('closeErrorMessage'));

    expect(
      screen.queryByAltText('Cannot delete this room'),
    ).not.toBeInTheDocument();
  });
});
