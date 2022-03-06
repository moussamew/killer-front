import { screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { renderWithProviders } from '../../../tools/tests/utils';
import Room from '../Room';

describe('<Room />', () => {
  it('should show a room with the correct room code', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/room/P9LDG']}>
        <Routes>
          <Route path="/room/:roomCode" element={<Room />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByText('The code to join this room is P9LDG.'));
  });
});
