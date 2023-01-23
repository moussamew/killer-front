import t from '../translate';

describe('Helpers > Translate', () => {
  it('should returns the correct translation for the translate key given', () => {
    expect(t('home.title')).toEqual('The right way to kill your friends..');
  });

  it('should returns the correct translation with a string interpolation', () => {
    expect(t('room.join_room_code', { roomCode: 'AZ45G' })).toEqual(
      'The code to join this room is AZ45G.',
    );
  });

  it('should returns the translate key given if the key is not accessible', () => {
    expect(t('home.unknown')).toEqual('home.unknown');
  });

  it('should returns the translation with a placeholder if the string interpolation given is not accessible', () => {
    expect(t('room.join_room_code', { unknown: 'unknown' })).toEqual(
      'The code to join this room is {roomCode}.',
    );
  });

  it('should returns the translate key given if the key and the string interpolation are not accessible', () => {
    expect(t('home.unknown', { unknown: 'unknown' })).toEqual('home.unknown');
  });
});
