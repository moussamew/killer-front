import { ReactComponent as Avenger } from '@/assets/images/avatars/avenger.svg';
import { ReactComponent as Beach } from '@/assets/images/avatars/beach.svg';
import { ReactComponent as Captain } from '@/assets/images/avatars/captain.svg';
import { ReactComponent as Football } from '@/assets/images/avatars/football.svg';
import { ReactComponent as Gladiator } from '@/assets/images/avatars/gladiator.svg';
import { ReactComponent as Jedi } from '@/assets/images/avatars/jedi.svg';
import { ReactComponent as Milk } from '@/assets/images/avatars/milk.svg';
import { ReactComponent as Pirate } from '@/assets/images/avatars/pirate.svg';
import { ReactComponent as Samurai } from '@/assets/images/avatars/samurai.svg';
import { ReactComponent as Surf } from '@/assets/images/avatars/surf.svg';

import styles from './styles/Gallery.module.css';

export function Gallery(): JSX.Element {
  const avatars = [
    <Samurai title="samurai" key="samurai" />,
    <Milk title="milk" key="milk" />,
    <Beach title="beach" key="beach" />,
    <Surf title="surf" key="surf" />,
    <Jedi title="jedi" key="jedi" />,
    <Captain title="captain" key="captain" />,
    <Gladiator title="gladiator" key="gladiator" />,
    <Football title="football" key="football" />,
    <Pirate title="pirate" key="pirate" />,
    <Avenger title="avenger" key="avenger" />,
  ];

  return <div className={styles.gallery}>{avatars}</div>;
}
