import styles from './index.module.css';

export function Landing(): JSX.Element {
  return (
    <div className={styles.content}>
      <h1>Un petit meurtre entre amis.. Ça vous tente ?</h1>
      <div className={styles.textDescription}>
        <h3>Tuer ou être tuer, faites votre choix.</h3>
        <p>
          Killerparty est un jeu en ligne où vous devez demasquez vos ennemis
        </p>
        <p>
          avant de vous faire tuer. Vous pouvez être la proie comme le
          prédateur.
        </p>
      </div>
      <div className={styles.actions}>
        <button className={styles.button} type="button" onClick={() => {}}>
          Créer une nouvelle partie
        </button>
        <button className={styles.button} type="button" onClick={() => {}}>
          Rejoindre une partie
        </button>
        {/*  <Button content="Rejoindre une partie" onClick={() => {}} />
        <Button
          content="Créer une nouvelle partie"
          onClick={() => {}}
          buttonColor="yellow"
          textColor="lightDark"
        /> */}
      </div>
    </div>
  );
}
