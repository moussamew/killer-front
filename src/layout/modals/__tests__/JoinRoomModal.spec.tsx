import { screen } from '@testing-library/react';

import { renderWithProviders } from 'tools/tests/utils';

import JoinRoomModal from '../JoinRoomModal';

describe('<JoinRoomModal />', () => {
  it('should render JoinRoom modal', async () => {
    renderWithProviders(<JoinRoomModal />);

    expect(await screen.findByText('Join a room')).toBeInTheDocument();
  });
});
