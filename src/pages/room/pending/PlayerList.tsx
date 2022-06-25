import { useContext } from 'react';
import tw from 'tailwind-styled-components';

import { RoomContext } from '@/hooks/context/room';

import { RoomPlayer } from './RoomPlayer';
import { RoomSettings } from './RoomSettings';

const Content = tw.div`
  mt-3 xl:mt-0
`;

const PlayerList = (): JSX.Element => {
  const { roomPlayers } = useContext(RoomContext);

  return (
    <Content>
      <RoomSettings />
      <hr />
      {roomPlayers.map(({ id, name, role }) => (
        <RoomPlayer
          key={id}
          playerId={id}
          playerName={name}
          playerRole={role}
        />
      ))}
    </Content>
  );
};

export default PlayerList;
