import { useNavigate } from 'react-router-dom';

import { FullScreenModal } from '@/components/FullScreenModal';

export function ChooseMode(): JSX.Element {
  const navigate = useNavigate();

  return (
    <FullScreenModal
      title="Choisir un mode de jeu"
      onClose={() => navigate('/')}
      hideBackButton={false}
    >
      <p>blabladdd</p>
    </FullScreenModal>
  );
}
