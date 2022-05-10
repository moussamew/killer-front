import { screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { renderWithProviders } from '@/tests/utils';

import { RoomPage } from '../RoomPage';

describe('<RoomPage />', () => {
  it('should show a room with the correct room code', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/room/P9LDG']}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route
            path="/join/P9LDG"
            element={<div>Check user before join a room</div>}
          />
          <Route path="/room/:roomCode" element={<RoomPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByText('The code to join this room is P9LDG.'));
  });
});
