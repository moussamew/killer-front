import { useContext } from 'react';
import tw from 'twin.macro';

import Knife from '@/assets/images/knife.png';
import { Button } from '@/components/Button';
import { ModalContext } from '@/context/modal';
import { useTranslation } from '@/hooks/useTranslation';

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

export function PlayerKilledButton(): JSX.Element {
  const { t } = useTranslation();
  const { openModal } = useContext(ModalContext);

  const handleOpenModal = (): void => {
    openModal(<PlayerKilledModal />);
  };

  return (
    <Content>
      <Image alt="killed" src={Knife} />
      <h2>{t('room.killed.message')}</h2>
      <Text>{t('room.killed.notify')}</Text>
      <Button content={t('room.killed.button')} onClick={handleOpenModal} />
    </Content>
  );
}
