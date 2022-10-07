import { vi } from 'vitest';

import { Method } from '@/constants/enums';

import { request } from '../apis';

describe('Helpers > APIs', () => {
  it('should log error when there is no json to parse on the response', async () => {
    const spyConsoleError = vi.spyOn(console, 'error');

    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.reject(),
    } as Response);

    await request({ url: 'fakeEndpoint', method: Method.GET });

    expect(spyConsoleError).toHaveBeenCalledWith(
      'GET > fakeEndpoint does not have JSON response format.',
    );
  });
});
