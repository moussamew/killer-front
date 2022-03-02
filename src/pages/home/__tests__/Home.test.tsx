import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { renderWithProviders } from '../../../tools/tests/utils';
import Home from '../Home';

describe('<Home />', () => {
  it('should show the home page', async () => {
    renderWithProviders(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );

    expect(
      await screen.findByText('The right way to kill your friends..'),
    ).toBeInTheDocument();
  });
});
