import { useTranslation } from '@killerparty/intl';
import { Text, Pressable, Share, View } from 'react-native';

import ShareIcon from '../../../../assets/icons/share.svg';

import styles from './styles/ShareRoomLink.module.css';

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
    <View style={styles.content}>
      <Pressable style={styles.button} onPress={shareRoomLink}>
        <ShareIcon height={14} width={14} />
        <Text style={styles.text}>{t('room.share.link.button')}</Text>
      </Pressable>
    </View>
  );
}
