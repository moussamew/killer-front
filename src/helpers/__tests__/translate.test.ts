import t from '../translate';

jest.mock('../../translations/en.json', () => ({
  home: {
    first_title: 'First title',
    description: 'Description',
    welcome_user: 'Welcome {username}',
  },
}));

describe('Helpers > Translate', () => {
  it('should returns the correct translation for the translate key given', () => {
    expect(t('home.first_title')).toEqual('First title');
  });

  it('should returns the correct translation with a string interpolation', () => {
    expect(t('home.welcome_user', { username: 'John' })).toEqual(
      'Welcome John',
    );
  });

  it('should returns the translate key given if the key is not accessible', () => {
    expect(t('home.unknown')).toEqual('home.unknown');
  });

  it('should returns the translation with a placeholder if the string interpolation given is not accessible', () => {
    expect(t('home.welcome_user', { unknown: 'unknown' })).toEqual(
      'Welcome {username}',
    );
  });

  it('should returns the translate key given if the key and the string interpolation are not accessible', () => {
    expect(t('home.unknown', { unknown: 'unknown' })).toEqual('home.unknown');
  });
});
