import { useTranslation } from '@killerparty/intl';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { avatarsList, getRandomAvatar } from '../helpers/avatars';

import styles from './styles/CurrentAvatar.module.css';

export function CurrentAvatar(): JSX.Element {
  const { t } = useTranslation();
  const [currentAvatar, updateCurrentAvatar] = useState(getRandomAvatar());

  return (
    <View style={styles.content}>
      <View style={styles.avatar}>
        {avatarsList({ height: 200, width: 200 })[currentAvatar]}
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          styles.secondary,
          pressed && styles.secondaryPressed,
        ]}
        onPress={() => updateCurrentAvatar(getRandomAvatar())}
      >
        <Text style={styles.secondaryText}>{t('avatar.refresh.title')}</Text>
      </Pressable>
    </View>
  );
}
