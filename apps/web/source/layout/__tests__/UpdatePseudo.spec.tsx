import { t } from '@killerparty/intl';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { fakePlayerTwo } from '@/tests/mocks/players';
import { getPlayerSession } from '@/tests/mocks/services/player';
import { noRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<UpdatePseudo />', () => {
  it.skip('should let the user update his pseudo', async () => {
    server.use(getPlayerSession(noRoomSession));

    renderWithProviders();

    await userEvent.click(await screen.findByTitle(t('tooltip.user.settings')));

    await userEvent.type(
      screen.getByPlaceholderText(t('layout.user.update.pseudo.placeholder')),
      fakePlayerTwo.name,
    );

    server.use(
      getPlayerSession({ ...noRoomSession, name: fakePlayerTwo.name }),
    );

    await userEvent.click(
      screen.getByText(t('layout.user.update.pseudo.confirm.button')),
    );

    expect(
      await screen.findByText(
        t('layout.user.update.pseudo.success.message', {
          pseudo: fakePlayerTwo.name,
        }),
      ),
    );
  });
});
