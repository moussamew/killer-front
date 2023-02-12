import { Method } from '@/constants/enums';

import { request } from '../apis';

describe('Helpers > APIs', () => {
  it('should log error when there is no json to parse on the response', async () => {
    const spyConsoleError = jest.spyOn(console, 'error');

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.reject(),
    } as Response);

    await request({ url: 'fakeEndpoint', method: Method.GET });

    expect(spyConsoleError).toHaveBeenCalledWith(
      'GET > fakeEndpoint does not have JSON response format.',
    );
  });
});
