import { useTranslation } from '@killerparty/intl';
import { useState } from 'react';
import { View } from 'react-native';

import { avatarsList, getRandomAvatar } from '../helpers/avatars';

import { Button } from './Button';
import styles from './styles/CurrentAvatar.module.css';

export function CurrentAvatar(): JSX.Element {
  const { t } = useTranslation();
  const [currentAvatar, updateCurrentAvatar] = useState(getRandomAvatar());

  return (
    <View style={styles.content}>
      <View style={styles.avatar}>
        {avatarsList({ height: 200, width: 200 })[currentAvatar]}
      </View>
      <Button
        color="secondary"
        onPress={() => updateCurrentAvatar(getRandomAvatar())}
        text={t('avatar.refresh.title')}
      />
    </View>
  );
}
