import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { t } from 'i18next';
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

    expect(await screen.findByText(t('room.create.new.mission.label')));
    expect(await screen.findByPlaceholderText(t('room.mission.placeholder')));
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

    await userEvent.click(screen.getByTitle(t('tooltip.delete.mission')));

    await waitForElementToBeRemoved(() =>
      screen.queryByText(fakeMissionOne.content),
    );

    expect(screen.queryByText(fakeMissionOne.content)).not.toBeInTheDocument();
  });
});
