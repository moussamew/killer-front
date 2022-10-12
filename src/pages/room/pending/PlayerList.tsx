import { useParams } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import { useRoomPlayers } from '@/services/room/queries';

import { RoomPlayer } from './RoomPlayer';
import { RoomSettings } from './RoomSettings';

const Content = tw.div`
  mt-3 xl:mt-0
`;

export function PlayerList(): JSX.Element {
  const { roomCode } = useParams();
  const { roomPlayers } = useRoomPlayers(roomCode!);

  return (
    <Content>
      <RoomSettings />
      <hr />
      {roomPlayers?.map(({ id, name, role }) => (
        <RoomPlayer
          key={id}
          playerId={id}
          playerName={name}
          playerRole={role}
        />
      ))}
    </Content>
  );
}
