import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { PLAYER_SESSION_ENDPOINT } from '@/constants/endpoints';
import { playerWithoutRoom } from '@/tests/mocks/sessions';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<ModalProvider />', () => {
  it('should close any modal opened when the user navigate through the history', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerWithoutRoom)),
      ),
    );

    renderWithProviders();

    await screen.findByText(playerWithoutRoom.name);

    await userEvent.click(screen.getByText(playerWithoutRoom.name));

    expect(screen.getByText('Update my pseudo')).toBeInTheDocument();

    window.dispatchEvent(new Event('popstate'));

    await waitForElementToBeRemoved(() => screen.getByText('Update my pseudo'));

    expect(screen.queryByText('Update my pseudo')).not.toBeInTheDocument();
  });
});
