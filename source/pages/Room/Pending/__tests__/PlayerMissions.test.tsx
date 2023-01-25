import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { SESSION_ENDPOINT } from '@/constants/endpoints';
import { PlayerMissions } from '@/pages/Room/Pending/PlayerMissions';
import { fakeMissionOne } from '@/tests/mocks/missions';
import { pendingRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<PlayerMissions />', () => {
  it('should show the input to create a new Mission', async () => {
    renderWithProviders({ component: <PlayerMissions /> });

    expect(await screen.findByText('Créer une nouvelle mission'));
    expect(
      await screen.findByPlaceholderText(
        /Boire un verre préparé par vos soins à votre victime/,
      ),
    );
  });

  it('should remove a mission', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            ...pendingRoomSession,
            authoredMissions: [fakeMissionOne],
          }),
        ),
      ),
    );

    renderWithProviders({ component: <PlayerMissions /> });

    await screen.findByText(fakeMissionOne.content);

    await userEvent.click(screen.getByTitle('deleteMission'));

    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            ...pendingRoomSession,
            authoredMissions: [],
          }),
        ),
      ),
    );

    await waitForElementToBeRemoved(() =>
      screen.queryByText(fakeMissionOne.content),
    );

    expect(screen.queryByText(fakeMissionOne.content)).not.toBeInTheDocument();
  });
});
