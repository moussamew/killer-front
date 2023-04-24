import { t } from '@killerparty/intl';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '@/tests/render';

describe('<NotFoundPage />', () => {
  it('should redirect the player to the home page if wanted', async () => {
    renderWithProviders({ route: '/unknown' });

    await screen.findByText(t('notfound.title'));

    await userEvent.click(screen.getByText(t('notfound.back')));

    expect(await screen.findByText(t('home.title'))).toBeInTheDocument();
  });
});
