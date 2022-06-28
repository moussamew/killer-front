import { useContext } from 'react';
import tw from 'tailwind-styled-components';

import Knife from '@/assets/images/knife.png';
import { Button } from '@/components/Button';
import t from '@/helpers/translate';
import { ModalContext } from '@/hooks/context/modal';

import { PlayerKilledModal } from './PlayerKilledModal';

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

export const PlayerKilledButton = (): JSX.Element => {
  const { openModal } = useContext(ModalContext);

  return (
    <Content>
      <Image alt="killed" src={Knife} />
      <h2>{t('playing_room.killed_section_title')}</h2>
      <Text>{t('playing_room.killed_button_infos')}</Text>
      <Button
        content={t('playing_room.killed_button_text')}
        onClick={() => openModal(<PlayerKilledModal />)}
      />
    </Content>
  );
};
