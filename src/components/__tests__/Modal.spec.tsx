import { render, screen } from '@testing-library/react';

import { Modal } from '..';

const dummyProps = {
  children: <div>My Modal</div>,
  closeModal: () => {},
};

describe('<Modal />', () => {
  it('should display the Modal', () => {
    render(<Modal {...dummyProps} />);

    expect(screen.getByText('My Modal')).toBeInTheDocument();
  });
});
