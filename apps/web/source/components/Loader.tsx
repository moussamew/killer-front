import Spinner from '@/assets/icons/spinner.svg';

import styles from './styles/Loader.module.css';

export function Loader(): JSX.Element {
  return <Spinner className={styles.spinner} />;
}
