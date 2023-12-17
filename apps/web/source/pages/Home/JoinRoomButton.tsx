import { useTranslation } from '@killerparty/intl';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button';

export function JoinRoomButton(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleJoinRoom = (): void => {
    navigate('/choose-pseudo', { state: 'join-room' });
  };

  return (
    <Button color="secondary" onClick={handleJoinRoom}>
      {t('home.join.room')}
    </Button>
  );
}
