import { render, screen } from '@testing-library/react';

import JoinRoom from '../JoinRoom';

describe('<JoinRoom />', () => {
  it('should show the button to join a room', () => {
    render(<JoinRoom />);

    expect(screen.getByText('Join a room')).toBeInTheDocument();
  });
});
