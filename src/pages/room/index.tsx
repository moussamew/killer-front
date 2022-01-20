import { useParams } from 'react-router-dom';

import Header from '../../components/Header';

const Room = (): JSX.Element => {
  const { roomCode } = useParams();

  return (
    <div>
      <Header />
      <p>Welcome to the room {roomCode}</p>
    </div>
  );
};

export default Room;
