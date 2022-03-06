import { render, screen } from '@testing-library/react';

import Application from '..';

jest.mock('../assets/styles/app.css', () => {});

describe('<Application />', () => {
  it('should render correctly the application', async () => {
    render(<Application />);

    expect(
      await screen.findByText('The right way to kill your friends..'),
    ).toBeInTheDocument();
  });
});
