import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PlayerMissions } from '@/pages/Room/Pending/PlayerMissions';
import { renderWithProviders } from '@/tests/utils';

describe('<PlayerMissions />', () => {
  it('should show the input to create a new Mission', async () => {
    renderWithProviders(<PlayerMissions />);

    expect(await screen.findByText('Manage my missions'));
    expect(await screen.findByPlaceholderText('Make him drink his glass dry'));
  });

  it('should remove a mission', async () => {
    renderWithProviders(<PlayerMissions />);

    await screen.findByText('Drink Jack Daniels');

    await userEvent.click(screen.getByTitle('deleteMission'));

    await waitForElementToBeRemoved(() =>
      screen.queryByText('Drink Jack Daniels'),
    );

    expect(screen.queryByText('Drink Jack Daniels')).not.toBeInTheDocument();
  });
});
