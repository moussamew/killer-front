import Avenger from '@/assets/images/avatars/avenger.svg';
import Beach from '@/assets/images/avatars/beach.svg';
import Captain from '@/assets/images/avatars/captain.svg';
import Football from '@/assets/images/avatars/football.svg';
import Gladiator from '@/assets/images/avatars/gladiator.svg';
import Jedi from '@/assets/images/avatars/jedi.svg';
import Milk from '@/assets/images/avatars/milk.svg';
import Pirate from '@/assets/images/avatars/pirate.svg';
import Samurai from '@/assets/images/avatars/samurai.svg';
import Surf from '@/assets/images/avatars/surf.svg';

import styles from './styles/Gallery.module.css';

export function Gallery(): JSX.Element {
  return (
    <div className={styles.gallery}>
      <Samurai />
      <Milk />
      <Beach />
      <Surf />
      <Jedi />
      <Captain />
      <Gladiator />
      <Football />
      <Pirate />
      <Avenger />
    </div>
  );
}
