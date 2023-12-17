import { useTranslation } from '@killerparty/intl';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button';

export function CreateRoomButton(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCreateRoom = (): void => {
    navigate('/choose-pseudo', { state: 'create-room' });
  };

  return (
    <Button color="primary" onClick={handleCreateRoom}>
      {t('home.create.room.button')}
    </Button>
  );
}
