import { useTranslation } from '@killerparty/intl';
import { type Dispatch, type SetStateAction } from 'react';
import { View } from 'react-native';

import { avatarsList, getRandomAvatar } from '../helpers/avatars';

import { Button } from './Button';
import styles from './styles/CurrentAvatar.module.css';

interface Props {
  avatar?: string;
  updateAvatarCallback?: Dispatch<SetStateAction<string>>;
}

export function CurrentAvatar({
  avatar,
  updateAvatarCallback,
}: Props): JSX.Element {
  const { t } = useTranslation();

  return (
    <View style={styles.content}>
      <View style={styles.avatar}>
        {avatarsList({ height: 250, width: 250 })[avatar ?? getRandomAvatar()]}
      </View>
      {updateAvatarCallback && (
        <Button
          color="primary"
          onPress={() => updateAvatarCallback(getRandomAvatar())}
          text={t('avatar.refresh.title')}
        />
      )}
    </View>
  );
}
