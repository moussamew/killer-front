import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { t } from 'i18next';

import { fakePlayerOne } from '@/tests/mocks/players';
import { getPlayerSession } from '@/tests/mocks/services/player';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<CreateRoomModal />', () => {
  it('should close modal after creating a new room', async () => {
    server.use(getPlayerSession(null));

    renderWithProviders();

    await screen.findByText(t('home.title'));

    await userEvent.click(screen.getByText(t('home.create.room.button')));

    await userEvent.type(
      screen.getByPlaceholderText(t('home.create.pseudo.placeholder')),
      fakePlayerOne.name,
    );

    await userEvent.click(
      screen.getByText(t('home.create.room.confirm.button')),
    );

    await waitForElementToBeRemoved(() =>
      screen.queryByText(t('home.create.room.confirm.button')),
    );

    expect(
      screen.queryByText(t('home.create.room.confirm.button')),
    ).not.toBeInTheDocument();
  });
});
