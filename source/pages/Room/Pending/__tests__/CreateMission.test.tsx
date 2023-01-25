import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import {
  MISSION_ENDPOINT,
  SESSION_ENDPOINT,
  ROOM_ENDPOINT,
} from '@/constants/endpoints';
import { CreateMission } from '@/pages/Room/Pending/CreateMission';
import { fakeMissionThree } from '@/tests/mocks/missions';
import { pendingRoom, roomCode } from '@/tests/mocks/rooms';
import { pendingRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<CreateMission />', () => {
  it('should add a new mission', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await screen.findByText('Le code pour rejoindre cette partie est SOSPC.');

    await userEvent.type(
      screen.getByPlaceholderText(
        /Boire un verre préparé par vos soins à votre victime/,
      ),
      fakeMissionThree.content,
    );

    await userEvent.click(
      screen.getByText('Ajouter cette mission à la partie'),
    );

    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            ...pendingRoomSession,
            authoredMissions: [fakeMissionThree],
          }),
        ),
      ),
    );

    expect(
      await screen.findByText(fakeMissionThree.content),
    ).toBeInTheDocument();
  });

  it.skip('should show error message when adding a new mission has failed', async () => {
    server.use(
      rest.post(MISSION_ENDPOINT, (_, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({
            errorCode: 'MISSION.BAD_MISSION',
            message: 'Name must be longer than or equal to 1 characters',
          }),
        ),
      ),
    );

    renderWithProviders({ component: <CreateMission /> });

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
