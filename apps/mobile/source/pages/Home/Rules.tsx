import { useTranslation } from '@killerparty/intl';
import { View, Text, Pressable } from 'react-native';

import CloseIcon from '../../assets/icons/close.svg';

import styles from './styles/Rules.module.css';

interface Props {
  toggleModal: () => void;
}

export function Rules({ toggleModal }: Props): JSX.Element {
  const { t } = useTranslation();

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.howToPlay}>Comment jouer à Killer Party</Text>
        <Pressable
          onPress={toggleModal}
          style={({ pressed }) => [
            styles.closeIcon,
            pressed && styles.closeIconPressed,
          ]}
        >
          <CloseIcon />
        </Pressable>
      </View>
      <View style={styles.content}>
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
      </View>
    </View>
  );
}
