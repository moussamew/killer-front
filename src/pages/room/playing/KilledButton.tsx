import tw from 'tailwind-styled-components';

import Knife from '@/assets/images/knife.png';
import { Button } from '@/components/Button';
import t from '@/helpers/translate';

const Content = tw.section`
  flex flex-col items-center
  text-center
`;

const Image = tw.img`
  h-[12rem]
`;

const Text = tw.p`
  font-medium
`;

export const KilledButton = (): JSX.Element => {
  return (
    <Content>
      <Image alt="killed" src={Knife} />
      <h2>{t('playing_room.killed_section_title')}</h2>
      <Text>{t('playing_room.killed_button_infos')}</Text>
      <Button content={t('playing_room.killed_button_text')} />
    </Content>
  );
};
