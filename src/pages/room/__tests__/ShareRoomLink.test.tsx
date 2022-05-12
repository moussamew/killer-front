import { render, screen } from '@testing-library/react';

import { ShareRoomLink } from '../ShareRoomLink';

describe('<ShareRoomLink />', () => {
  it('should render the share room link button', () => {
    render(<ShareRoomLink roomCode="P9LDG" />);

    expect(screen.getByText('Share link to join the room')).toBeInTheDocument();
  });
});
