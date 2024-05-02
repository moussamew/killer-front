import { t } from '@killerparty/intl';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Layout } from '@/layout/Layout';
import { getPlayerSession } from '@/tests/mocks/services/player';
import { noRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<Layout />', () => {
  it.skip('should show the user settings when current player click on settings icon', async () => {
    server.use(getPlayerSession(noRoomSession));

    renderWithProviders({ component: <Layout /> });

    await userEvent.click(await screen.findByTitle(t('tooltip.user.settings')));

    expect(
      screen.getByText(t('layout.user.settings.title')),
    ).toBeInTheDocument();
  });
});
