import { ScrollView, View } from 'react-native';

import Avenger from '../assets/avatars/avenger.svg';
import Beach from '../assets/avatars/beach.svg';
import Captain from '../assets/avatars/captain.svg';
import Football from '../assets/avatars/football.svg';
import Gladiator from '../assets/avatars/gladiator.svg';
import Jedi from '../assets/avatars/jedi.svg';
import Milk from '../assets/avatars/milk.svg';
import Pirate from '../assets/avatars/pirate.svg';
import Samurai from '../assets/avatars/samurai.svg';
import Surf from '../assets/avatars/surf.svg';

import styles from './styles/Gallery.module.css';

export const avatarList = {
  avenger: <Avenger height="100" width="100" />,
  beach: <Beach height="100" width="100" />,
  captain: <Captain height="100" width="100" />,
  football: <Football height="100" width="100" />,
  gladiator: <Gladiator height="100" width="100" />,
  jedi: <Jedi height="100" width="100" />,
  milk: <Milk height="100" width="100" />,
  pirate: <Pirate height="100" width="100" />,
  samurai: <Samurai height="100" width="100" />,
  surf: <Surf height="100" width="100" />,
};

export function Gallery() {
  return (
    <ScrollView horizontal={true}>
      <View style={styles.gallery}>
        {Object.entries(avatarList).map(([name, avatar]) => (
          <View key={name} style={styles.content}>
            {avatar}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
