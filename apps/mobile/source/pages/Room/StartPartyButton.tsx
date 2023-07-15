import { useTranslation } from '@killerparty/intl';

import { Button } from '../../components/Button';

export function StartPartyButton(): JSX.Element {
  const { t } = useTranslation();

  return (
    <Button
      color="primary"
      disabled
      onPress={() => {}}
      text={t('room.start.party.button')}
    />
  );
}
