import { useParams } from 'react-router-dom';

import { H1 } from '../../components/Heading';

const Room = (): JSX.Element => {
  const { roomCode } = useParams();

  return (
    <div>
      <H1>Welcome to the room {roomCode}</H1>
    </div>
  );
};

export default Room;
