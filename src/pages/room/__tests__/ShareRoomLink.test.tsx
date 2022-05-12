import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { ShareRoomLink } from '../ShareRoomLink';

describe('<ShareRoomLink />', () => {
  it('should share the room link with navigator share if exists when the user click on the share button', () => {
    const spyNavigatorShare = vi.fn();

    Object.defineProperty(window, 'navigator', {
      value: { share: spyNavigatorShare },
      writable: true,
    });

    render(<ShareRoomLink roomCode="P9LDG" />);

    fireEvent.click(screen.getByText('Share link to join the room'));

    expect(spyNavigatorShare).toHaveBeenCalledTimes(1);
    expect(spyNavigatorShare).toHaveBeenCalledWith({
      title: 'Killerparty',
      url: 'http://localhost:4000/join/P9LDG',
    });
  });

  it('should show directly the room link if the clipboard is not available', () => {
    Object.defineProperty(window, 'navigator', {
      value: { share: null, clipboard: null },
      writable: true,
    });

    render(<ShareRoomLink roomCode="P9LDG" />);

    fireEvent.click(screen.getByText('Share link to join the room'));

    expect(
      screen.getByText(
        'Copy and paste the following link: http://localhost:4000/join/P9LDG',
      ),
    ).toBeInTheDocument();
  });

  it('should save the room link in clipboard if share is not available', async () => {
    const spyNavigatorClipboard = vi.fn();

    Object.defineProperty(window, 'navigator', {
      value: {
        share: null,
        clipboard: { writeText: spyNavigatorClipboard.mockResolvedValue('') },
      },
      writable: true,
    });

    render(<ShareRoomLink roomCode="P9LDG" />);

    fireEvent.click(screen.getByText('Share link to join the room'));

    expect(spyNavigatorClipboard).toHaveBeenCalledTimes(1);
    expect(spyNavigatorClipboard).toHaveBeenCalledWith(
      'http://localhost:4000/join/P9LDG',
    );
    expect(
      await screen.findByText('Link saved in the clipboard!'),
    ).toBeInTheDocument();
  });

  it('should show directly the room link if the clipboard cant be performed', async () => {
    const spyNavigatorClipboard = vi.fn();

    Object.defineProperty(window, 'navigator', {
      value: {
        share: null,
        clipboard: { writeText: spyNavigatorClipboard.mockRejectedValue('') },
      },
      writable: true,
    });

    render(<ShareRoomLink roomCode="P9LDG" />);

    fireEvent.click(screen.getByText('Share link to join the room'));

    expect(spyNavigatorClipboard).toHaveBeenCalledTimes(1);
    expect(spyNavigatorClipboard).toHaveBeenCalledWith(
      'http://localhost:4000/join/P9LDG',
    );
    expect(
      await screen.findByText(
        'Copy and paste the following link: http://localhost:4000/join/P9LDG',
      ),
    ).toBeInTheDocument();
  });

  it('should let the user close the alert message if needed', async () => {
    Object.defineProperty(window, 'navigator', {
      value: { share: null, clipboard: null },
      writable: true,
    });

    render(<ShareRoomLink roomCode="P9LDG" />);

    fireEvent.click(screen.getByText('Share link to join the room'));

    expect(
      screen.getByText(
        'Copy and paste the following link: http://localhost:4000/join/P9LDG',
      ),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByAltText('closeAlertMessage'));

    expect(
      screen.queryByText(
        'Copy and paste the following link: http://localhost:4000/join/P9LDG',
      ),
    ).not.toBeInTheDocument();
  });
});
