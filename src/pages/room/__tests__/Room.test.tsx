import { screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import Room from '../Room';

import { renderWithProviders } from '@/tools/tests/utils';

describe('<Room />', () => {
  it('should show a room with the correct room code', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/room/P9LDG']}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/room/:roomCode" element={<Room />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByText('The code to join this room is P9LDG.'));
  });
});
