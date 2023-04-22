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

export const chooseAvatar: Record<string, JSX.Element> = {
  avenger: <Avenger />,
  beach: <Beach />,
  captain: <Captain />,
  football: <Football />,
  gladiator: <Gladiator />,
  jedi: <Jedi />,
  milk: <Milk />,
  pirate: <Pirate />,
  samurai: <Samurai />,
  surf: <Surf />,
};

export const randomAvatar = (): string => {
  const avatars = Object.keys(chooseAvatar);
  const randomIndex = Math.floor(Math.random() * avatars.length);
  return avatars[randomIndex];
};
