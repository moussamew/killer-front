import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import {
  MISSION_ENDPOINT,
  PLAYER_MISSION_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
} from '@/constants/endpoints';
import { PendingRoomPage } from '@/pages/Room/Pending';
import { CreateMission } from '@/pages/Room/Pending/CreateMission';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<CreateMission />', () => {
  it('should add a new mission', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            id: 0,
            name: 'Neo',
            roomCode: 'X7JKL',
          }),
        ),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/X7JKL']}>
        <Routes>
          <Route path="/room/:roomCode" element={<PendingRoomPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await userEvent.type(
      screen.getByPlaceholderText('Make him drink his glass dry'),
      'New mission',
    );

    await userEvent.click(screen.getByText('Add new mission in the room'));

    server.use(
      rest.get(PLAYER_MISSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json([{ id: 0, content: 'New mission' }])),
      ),
    );

    await screen.findByDisplayValue('New mission');

    await waitForElementToBeRemoved(() =>
      screen.getByDisplayValue('New mission'),
    );

    expect(
      screen.getByPlaceholderText('Make him drink his glass dry'),
    ).toBeInTheDocument();
  });

  it('should show error message when adding a new mission has failed', async () => {
    server.use(
      rest.post(MISSION_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({
            errorCode: 'MISSION.BAD_MISSION',
            message: 'Name must be longer than or equal to 1 characters',
          }),
        ),
      ),
    );

    renderWithProviders(<CreateMission />);

    await userEvent.type(
      screen.getByPlaceholderText('Make him drink his glass dry'),
      'New mission',
    );

    await userEvent.click(screen.getByText('Add new mission in the room'));

    expect(
      await screen.findByText(
        'Name must be longer than or equal to 1 characters',
      ),
    ).toBeInTheDocument();
  });
});
