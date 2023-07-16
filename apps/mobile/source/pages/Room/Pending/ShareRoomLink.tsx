import { useTranslation } from '@killerparty/intl';

import { Button } from '../../../components/Button';

export function ShareRoomLink(): JSX.Element {
  const { t } = useTranslation();

  return (
    <Button
      color="secondary"
      onPress={() => {}}
      text={t('room.share.link.button')}
    />
  );
}
