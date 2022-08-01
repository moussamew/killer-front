import { fireEvent, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { HomePage } from '@/pages/home';
import { renderWithProviders } from '@/tests/utils';

import { NotFoundPage } from '..';

describe('<NotFoundPage />', () => {
  it('should redirect the player to home page when the button is clicked', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/join/unknownRoomCode']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/join/unknownRoomCode" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByText('Oops, something goes wrong!');

    fireEvent.click(screen.getByText('Go back to home page'));

    expect(
      await screen.findByText('The right way to kill your friends..'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Go back to home page')).not.toBeInTheDocument();
  });
});
