import { useTranslation } from '@killerparty/intl';
import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

import { Button } from '../../components/Button';
import { CurrentAvatar } from '../../components/CurrentAvatar';

import styles from './styles/index.module.css';

export function CreateRoomPage(): JSX.Element {
  const [text, onChangeText] = useState('');
  const { t } = useTranslation();

  return (
    <View style={styles.view}>
      <CurrentAvatar />
      <View style={styles.content}>
        <Text style={styles.label}>{t('home.create.pseudo.label')}</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          placeholder={t('home.create.pseudo.placeholder')}
          value={text}
        />
      </View>

      <Button
        color="primary"
        onPress={() => {}}
        text={t('home.create.room.confirm.button')}
      />
    </View>
  );
}
