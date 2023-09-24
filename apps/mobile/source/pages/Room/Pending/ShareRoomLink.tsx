import { useTranslation } from '@killerparty/intl';
import { Share } from 'react-native';

import { Button } from '../../../components/Button';

interface Props {
  roomCode: string;
}

export function ShareRoomLink({ roomCode }: Props): JSX.Element {
  const { t } = useTranslation();

  const shareRoomLink = async (): Promise<void> => {
    await Share.share({
      message: t('room.share.link.message'),
      url: `https://killerparty.app/join/${roomCode}`,
    });
  };

  return (
    <Button
      color="secondary"
      onPress={shareRoomLink}
      text={t('room.share.link.button')}
    />
  );
}
