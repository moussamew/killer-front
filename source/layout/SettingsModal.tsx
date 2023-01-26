import tw from 'twin.macro';

import { useTranslation } from '@/hooks/useTranslation';

import { SwitchLanguage } from './SwitchLanguage';
import { UpdatePseudo } from './UpdatePseudo';

const HeadContent = tw.div`
  flex flex-row mb-1
  items-center
`;

const Title = tw.h2`
  mb-0
`;

interface Props {
  playerName?: string;
}

export function SettingsModal({ playerName }: Props): JSX.Element {
  const { t } = useTranslation();

  return (
    <section>
      <HeadContent>
        <Title>{t('layout.user.settings.title')}</Title>
      </HeadContent>
      {playerName && <UpdatePseudo />}
      <SwitchLanguage />
    </section>
  );
}
