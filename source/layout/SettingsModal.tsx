import { useTranslation } from '@/hooks/useTranslation';

import { SwitchLanguage } from './SwitchLanguage';
import { UpdatePseudo } from './UpdatePseudo';

interface Props {
  playerName?: string;
}

export function SettingsModal({ playerName }: Props): JSX.Element {
  const { t } = useTranslation();

  return (
    <section>
      <h2>{t('layout.user.settings.title')}</h2>
      {playerName && <UpdatePseudo />}
      <SwitchLanguage />
    </section>
  );
}
