import { useTranslation } from '@killerparty/intl';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, ScrollView, Pressable } from 'react-native';

import { type RootStackParamList } from '../../App';
import { Gallery } from '../../components/Gallery';

import { Rules } from './Rules';
import styles from './styles/index.module.css';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomePage({ navigation }: Props): JSX.Element {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.view}>
        <Text style={styles.title}>{t('home.title')}</Text>
        <Text style={styles.subtitle}>{t('home.subtitle')}</Text>
        <Text style={styles.description}>{t('home.description')}</Text>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.primary,
            pressed && styles.primaryPressed,
          ]}
          onPress={() => navigation.navigate('CreateRoom')}
        >
          <Text style={styles.primaryText}>{t('home.create.room.button')}</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.secondary,
            pressed && styles.secondaryPressed,
          ]}
        >
          <Text style={styles.secondaryText}>{t('home.join.room')}</Text>
        </Pressable>
        <Gallery />
        <Rules />
      </View>
    </ScrollView>
  );
}
