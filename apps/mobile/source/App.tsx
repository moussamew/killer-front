import { setupIntl, useTranslation } from '@killerparty/intl';
import { Pressable, Text, ScrollView, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { CustomStatusBar } from './components/CustomStatusBar';
import { Gallery } from './components/Gallery';
import styles from './index.module.css';
import { Rules } from './Rules';

import 'intl-pluralrules';

setupIntl('fr-FR');

export default function App(): JSX.Element {
  const { t } = useTranslation();

  return (
    <SafeAreaProvider>
      <CustomStatusBar />
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
          >
            <Text style={styles.primaryText}>
              {t('home.create.room.button')}
            </Text>
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
    </SafeAreaProvider>
  );
}
