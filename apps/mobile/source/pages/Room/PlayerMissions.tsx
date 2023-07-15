import { useTranslation } from '@killerparty/intl';
import { useDeleteMission, useSession } from '@killerparty/webservices';
import { View, Image, Text } from 'react-native';

import Delete from '../../assets/icons/delete.svg';

import styles from './styles/PlayerMissions.module.css';

export function PlayerMissions(): JSX.Element {
  const { t } = useTranslation();
  const { session } = useSession();
  const { deleteMission } = useDeleteMission();

  const handleDeleteMission = (missionId: number): void => {
    deleteMission.mutate(missionId);
  };

  return (
    <View>
      <View style={styles.missions}>
        <Image
          style={styles.image}
          source={require('../../assets/images/idea.png')}
        />
        <View>
          <Text style={styles.title}>{t('room.manage.missions')}</Text>
          <Text>{t('room.missions.description')}</Text>
        </View>
      </View>
      <View style={styles.cards}>
        {session?.authoredMissions.map(({ id, content }) => (
          <View key={`${id}-${content}`} style={styles.card}>
            <Text>{content}</Text>
            <Delete
              title={t('tooltip.delete.mission')}
              onPress={() => handleDeleteMission(id)}
              className={styles.deleteMission}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
