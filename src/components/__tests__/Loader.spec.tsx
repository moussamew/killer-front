import { render } from '@testing-library/react';

import { Loader } from '..';

describe('Input', () => {
  it('should display the loader', () => {
    const { getByTitle } = render(<Loader />);

    expect(getByTitle('Loader')).toBeInTheDocument();
  });
});
