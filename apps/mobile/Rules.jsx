import { useTranslation } from '@killerparty/intl';

import styles from './Rules.module.css';
import { View, Text } from 'react-native';

export function Rules() {
  const { t } = useTranslation();

  return (
    <>
      <View style={styles.step}>
        <View>
          <Text style={styles.title}>{t('home.first.rule.title')}</Text>
          <Text style={styles.text}>{t('home.first.rule.text')}</Text>
        </View>
      </View>
      <View style={styles.step}>
        <View>
          <Text style={styles.title}>{t('home.second.rule.title')}</Text>
          <Text style={styles.text}>{t('home.second.rule.text')}</Text>
        </View>
      </View>
      <View style={styles.step}>
        <View>
          <Text style={styles.title}>{t('home.third.rule.title')}</Text>
          <Text style={styles.text}>{t('home.third.rule.text')}</Text>
        </View>
      </View>
    </>
  );
}
