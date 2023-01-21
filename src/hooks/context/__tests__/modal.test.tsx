import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { SESSION_ENDPOINT } from '@/constants/endpoints';
import { noRoomSession } from '@/tests/mocks/sessions';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<ModalProvider />', () => {
  it('should close any modal opened when the user navigate through the history', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(noRoomSession)),
      ),
    );

    renderWithProviders();

    await screen.findByText(noRoomSession.name);

    await userEvent.click(screen.getByText(noRoomSession.name));

    expect(screen.getByText('Update my pseudo')).toBeInTheDocument();

    window.dispatchEvent(new Event('popstate'));

    await waitForElementToBeRemoved(() => screen.getByText('Update my pseudo'));

    expect(screen.queryByText('Update my pseudo')).not.toBeInTheDocument();
  });
});
