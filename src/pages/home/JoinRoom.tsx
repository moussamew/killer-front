import { Button } from '../../components';
import t from '../../helpers/translate';

const JoinRoom = (): JSX.Element => {
  return (
    <Button disabled buttonColor="bg-yellow-200" textColor="text-lightDark">
      {t('home.join_room')}
    </Button>
  );
};

export default JoinRoom;
