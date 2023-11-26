import { useTranslation } from '@killerparty/intl';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import { View, Text, ScrollView } from 'react-native';

import { Button } from '../../components/Button';
import { Gallery } from '../../components/Gallery';
import { type RootStackParamList } from '../../types/navigation';

import { Rules } from './Rules';
import styles from './styles/index.module.css';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomePage({ navigation }: Props): JSX.Element {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.view}>
        <Text style={styles.description}>{t('home.description')}</Text>
        <LottieView
          source={require('../../assets/lotties/home.json')}
          autoPlay
          style={styles.lottie}
          loop
        />
        <Button
          color="primary"
          onPress={() => navigation.navigate('CreateRoom')}
          text={t('home.create.room.button')}
        />
        <Button
          color="secondary"
          onPress={() => navigation.navigate('JoinRoom')}
          text={t('home.join.room')}
        />
        <Gallery />
        <Rules />
      </View>
    </ScrollView>
  );
}
