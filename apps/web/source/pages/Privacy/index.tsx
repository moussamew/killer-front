import styles from './styles/index.module.css';

export function PrivacyPage(): JSX.Element {
  return (
    <div className={styles.content}>
      <h1>Politique de confidentialité</h1>
      <p>
        Cette Politique de confidentialité décrit comment&nbsp;
        <strong>Moussa Iskounene</strong> et <strong>Arthur Jacquemin</strong>
        &nbsp;recueille, utilise et partage vos informations lorsque vous
        utilisez notre application <strong>Killerparty</strong> (ci-après
        dénommée "l'Application").
      </p>
      <h2>Informations collectées</h2>
      <p>
        Nous pouvons collecter les types d'informations suivants lorsque vous
        utilisez notre Application :
      </p>
      <p>
        <strong>Informations personnelles identifiables :</strong> Certaines
        fonctionnalités de l'Application peuvent nécessiter que vous nous
        fournissiez des informations personnelles telles que votre nom, votre
        adresse e-mail, etc. Ces informations ne sont collectées que si vous les
        soumettez volontairement.
      </p>
      <p>
        <strong>Données d'utilisation :</strong> Nous pouvons recueillir des
        informations sur la manière dont vous accédez et utilisez l'Application,
        y compris des données telles que l'adresse IP de votre appareil, les
        pages consultées, les heures et dates de vos visites, etc.
      </p>
      <h2>Utilisation des informations</h2>
      <p>
        Nous utilisons les informations collectées pour les finalités suivantes
        :
      </p>
      <ul className={styles.list}>
        <li>Fournir, maintenir et améliorer notre Application.</li>
        <li>
          Vous informer sur les mises à jour, les nouveautés et les offres
          spéciales liées à l'Application.
        </li>
        <li>Répondre à vos demandes et fournir un support client.</li>
        <li>
          Assurer le respect des conditions d'utilisation de l'Application.
        </li>
      </ul>
      <h2>Partage des informations</h2>
      <p>
        Nous ne partageons pas vos informations personnelles avec des tiers,
        sauf dans les cas suivants :
      </p>
      <ul className={styles.list}>
        <li>Avec votre consentement explicite.</li>
        <li>
          Pour respecter les obligations légales ou pour répondre à une demande
          gouvernementale.
        </li>
        <li>Pour protéger nos droits, votre sécurité ou celle d'autrui.</li>
      </ul>
      <h2>Sécurité</h2>
      <p>
        Nous nous engageons à protéger la sécurité de vos informations.
        Cependant, aucune méthode de transmission sur Internet ou de stockage
        électronique n'est totalement sécurisée. Nous ne pouvons donc pas
        garantir une sécurité absolue.
      </p>
      <h2>Modifications de la Politique de confidentialité</h2>
      <p>
        Nous pouvons mettre à jour notre Politique de confidentialité de temps à
        autre. Nous vous informerons de toute modification en publiant la
        nouvelle Politique de confidentialité sur cette page.
      </p>
      <h2>Contactez-nous</h2>
      <p>
        Si vous avez des questions ou des préoccupations concernant notre
        Politique de confidentialité, veuillez nous contacter à l'adresse&nbsp;
        <strong>hello@killerparty.app</strong>.
      </p>
      <p>
        En utilisant notre Application, vous acceptez les termes de notre
        Politique de confidentialité
      </p>
      <p className={styles.margin}>
        Dernière mise à jour : <strong>03/12/2023</strong>
      </p>
    </div>
  );
}
