import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '@/tests/utils';

import PlayerMissions from '../PlayerMissions';

describe('<PlayerMissions />', () => {
  it('should show the input to create a new Mission', async () => {
    renderWithProviders(<PlayerMissions />);

    expect(await screen.findByText('Manage my missions'));
    expect(
      await screen.findByPlaceholderText(
        'Your victim must drink from a glass that you have prepared for him',
      ),
    );
  });

  it('should update the mission value inside the mission input after user changes', async () => {
    renderWithProviders(<PlayerMissions />);

    fireEvent.change(
      await screen.findByPlaceholderText(
        'Your victim must drink from a glass that you have prepared for him',
      ),
      { target: { value: 'Rundown a League of Legends game' } },
    );

    expect(
      screen.getByDisplayValue('Rundown a League of Legends game'),
    ).toBeInTheDocument();
  });
});
