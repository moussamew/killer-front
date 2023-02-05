import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as Avenger } from '@/assets/images/avatars/avenger.svg';
import { ReactComponent as Beach } from '@/assets/images/avatars/beach.svg';
import { ReactComponent as Captain } from '@/assets/images/avatars/captain.svg';
import { ReactComponent as Football } from '@/assets/images/avatars/football.svg';
import { ReactComponent as Gladiator } from '@/assets/images/avatars/gladiator.svg';
import { ReactComponent as Jedi } from '@/assets/images/avatars/jedi.svg';
import { ReactComponent as Milk } from '@/assets/images/avatars/milk.svg';
import { ReactComponent as Pirate } from '@/assets/images/avatars/pirate.svg';
import { ReactComponent as Samurai } from '@/assets/images/avatars/samurai.svg';
import { ReactComponent as Surf } from '@/assets/images/avatars/surf.svg';
import { useSession } from '@/services/player/queries';

import { CreateRoomButton } from './CreateRoomButton';
import { JoinRoomButton } from './JoinRoomButton';
import styles from './styles/index.module.css';

export function HomePage(): JSX.Element {
  const navigate = useNavigate();
  const { session } = useSession();

  useEffect(() => {
    if (session?.room?.code) {
      navigate(`/room/${session.room.code}`);
    }
  }, [navigate, session?.room?.code]);

  return (
    <>
      <div className={styles.introduction}>
        <h1>Ça vous tente un petit meurtre entre amis ?</h1>
        <h2>Tuer ou être tuer, faites votre choix.</h2>
        <p>
          Killerparty est un <strong>jeu en ligne</strong> où vous devez
          demasquez vos ennemis avant de vous faire assasiner.
        </p>
        <p>
          Vous pouvez être la <strong>proie</strong> comme le&nbsp;
          <strong>prédateur</strong>.
        </p>
      </div>
      <div className={styles.actions}>
        <CreateRoomButton playerName={session?.name} />
        <JoinRoomButton />
      </div>
      <div className={styles.gallery}>
        <Samurai />
        <Milk />
        <Beach />
        <Surf />
        <Jedi />
        <Captain />
        <Gladiator />
        <Football />
        <Pirate />
        <Avenger />
      </div>
      <div className={styles.step}>
        <span className={styles.number}>1.</span>
        <div>
          <h2>Élaborer vos contrats d&apos;assasinat</h2>
          <p>
            Les <strong>contrats d&apos;assasinats</strong> sont
            distribués&nbsp;
            <strong>aléatoirement</strong> entre les joueurs.
          </p>
          <p>
            Dans la salle d&apos;attente, vous pouvez ajouter vos&nbsp;
            <strong>propres contrats</strong> qui seront distribués aux autres
            joueurs !
          </p>
        </div>
      </div>
      <div className={styles.step}>
        <span className={styles.number}>2.</span>
        <div>
          <h2>
            Recevez un contrat d&apos;assasinat et eliminez vos cibles pour
            progresser.
          </h2>
          <p>
            En lançant une partie, vous recevrez un contrat avec&nbsp;
            <strong>une mission</strong> ainsi qu&apos;une&nbsp;
            <strong>cible à assasiner</strong>.
          </p>
          <p>
            Vous devrez réussir à faire executer la mission que vous avez reçu à
            votre cible.
          </p>
          <p>
            <strong>Mais !</strong> Il ne doit pas découvrir que vous êtes son
            chasseur de tête, il pourrait vous éliminer.
          </p>
        </div>
      </div>

      <div className={styles.step}>
        <span className={styles.number}>3.</span>
        <div>
          <h2>
            Récuperez les contrats de vos cibles après les avoir assasiner
          </h2>
          <p>
            Lorsque vous venez à bout de votre cible. Vous&nbsp;
            <strong>récuperer son contrat</strong> ainsi que la cible de ce
            contrat.
          </p>
          <p>
            Pour <strong>remporter la partie</strong>, il faut réussir à
            éliminer méthodiquement toutes vos cibles avec leurs contrats
            respectifs.
          </p>
          <p>
            Mais.. n&apos;oubliez pas que vous êtes également la cible d&apos;un
            autre assasin !
          </p>
        </div>
      </div>
    </>
  );
}
