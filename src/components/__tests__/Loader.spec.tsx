import { render, screen } from '@testing-library/react';

import { Loader } from '../Loader';

describe('<Loader />', () => {
  it('should display the loader', () => {
    render(<Loader />);

    expect(screen.getByTitle('Loader')).toBeInTheDocument();
  });
});
