import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import { Button } from '@/components/Button';
import t from '@/helpers/translate';
import { useKickPlayer } from '@/services/player/mutations';

const HeadContent = tw.div`
  flex flex-row mb-2
  items-center
`;

const Title = tw.h2`
  mb-0
`;

const TextContent = tw.div`
  mb-1
`;

interface Props {
  playerName: string;
  playerId: number;
}

export function KickPlayerModal({ playerName, playerId }: Props): JSX.Element {
  const { roomCode } = useParams();
  const { kickPlayer } = useKickPlayer();

  const handleKickPlayer = (): void => {
    kickPlayer.mutate({ id: playerId, roomCode: roomCode! });
  };

  return (
    <Fragment>
      <HeadContent>
        <Title>{t('room.kick_room')}</Title>
      </HeadContent>
      <TextContent>
        <p>{t('room.kick_room_warning', { playerName })}</p>
      </TextContent>
      <Button
        content={t('room.kick_room_confirmation', { playerName })}
        onClick={handleKickPlayer}
      />
    </Fragment>
  );
}
