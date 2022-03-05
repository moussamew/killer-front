import { fireEvent, render, screen } from '@testing-library/react';

import Missions from '../Missions';

describe('<Missions />', () => {
  it('should show the input to create a new Mission', () => {
    render(<Missions />);

    expect(screen.getByText('Manage my missions'));
    expect(
      screen.getByPlaceholderText(
        'Your victim must drink from a glass that you have prepared for him',
      ),
    );
  });

  it('should update the mission value inside the mission input after user changes', () => {
    render(<Missions />);

    fireEvent.change(
      screen.getByPlaceholderText(
        'Your victim must drink from a glass that you have prepared for him',
      ),
      { target: { value: 'Rundown a League of Legends game' } },
    );

    expect(
      screen.getByDisplayValue('Rundown a League of Legends game'),
    ).toBeInTheDocument();
  });
});
