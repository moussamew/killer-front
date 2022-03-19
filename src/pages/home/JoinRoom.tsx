import { Button } from 'components';
import t from 'helpers/translate';

const JoinRoom = (): JSX.Element => {
  const joinRoom = (): void => {
    console.log('hey');
  };
  return (
    <Button
      buttonColor="bg-yellow-200"
      textColor="text-lightDark"
      onClick={joinRoom}
    >
      {t('home.join_room')}
    </Button>
  );
};

export default JoinRoom;
