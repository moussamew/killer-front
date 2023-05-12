import { useTranslation } from '@killerparty/intl';
import { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';

import styles from './styles/index.module.css';

export function CreateRoomPage(): JSX.Element {
  const [text, onChangeText] = useState('');
  const { t } = useTranslation();

  return (
    <View style={styles.view}>
      <View style={styles.content}>
        <Text style={styles.label}>{t('home.create.pseudo.label')}</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          placeholder={t('home.create.pseudo.placeholder')}
          value={text}
        />
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          styles.primary,
          pressed && styles.primaryPressed,
        ]}
      >
        <Text style={styles.primaryText}>
          {t('home.create.room.confirm.button')}
        </Text>
      </Pressable>
    </View>
  );
}
