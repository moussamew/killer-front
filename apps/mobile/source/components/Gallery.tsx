import { ScrollView, View } from 'react-native';

import { avatarsList } from '../helpers/avatars';

import styles from './styles/Gallery.module.css';

export function Gallery(): JSX.Element {
  return (
    <ScrollView horizontal>
      <View style={styles.gallery}>
        {Object.entries(avatarsList({ height: 100, width: 100 })).map(
          ([name, avatar]) => (
            <View key={name} style={styles.content}>
              {avatar}
            </View>
          ),
        )}
      </View>
    </ScrollView>
  );
}
