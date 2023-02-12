import Spinner from '@/assets/icons/spinner.svg';

import styles from './styles/Spinner.module.css';

export function Loader(): JSX.Element {
  return <Spinner className={styles.spinner} />;
}
