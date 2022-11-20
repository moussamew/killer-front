import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { MemoryRouter } from 'react-router-dom';

import { PLAYER_SESSION_ENDPOINT } from '@/constants/endpoints';
import { HomePage } from '@/pages/Home';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<ModalProvider />', () => {
  it('should close any modal opened when the user navigate through the history', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo', roomCode: null })),
      ),
    );

    renderWithProviders(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    await screen.findByText('Neo');

    await userEvent.click(screen.getByTitle('userSettings'));

    expect(screen.getByText('Update my pseudo')).toBeInTheDocument();

    window.dispatchEvent(new Event('popstate'));

    await waitForElementToBeRemoved(() =>
      screen.queryByText('Update my pseudo'),
    );

    expect(screen.queryByText('Update my pseudo')).not.toBeInTheDocument();
  });
});
