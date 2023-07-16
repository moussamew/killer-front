import { useTranslation } from '@killerparty/intl';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, ScrollView } from 'react-native';

import { type RootStackParamList } from '../../app/routes';
import { Button } from '../../components/Button';
import { Gallery } from '../../components/Gallery';

import { Rules } from './Rules';
import styles from './styles/index.module.css';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomePage({ navigation }: Props): JSX.Element {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.view}>
        <Text style={styles.subtitle}>{t('home.subtitle')}</Text>
        <Text style={styles.description}>{t('home.description')}</Text>
        <Button
          color="primary"
          onPress={() => navigation.navigate('CreateRoom')}
          text={t('home.create.room.button')}
        />
        <Button
          color="secondary"
          onPress={() => {}}
          text={t('home.join.room')}
        />
        <Gallery />
        <Rules />
      </View>
    </ScrollView>
  );
}
