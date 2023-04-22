import { clsx } from 'clsx';

import Spinner from '@/assets/icons/spinner.svg';
import { isPromise } from '@/helpers/utils';
import { useSafeState } from '@/hooks/useSafeState';

import styles from './styles/Button.module.css';

interface Props {
  onClick: () => void | Promise<void>;
  children: string;
  color: 'primary' | 'secondary';
  disabled?: boolean;
  customStyle?: string;
}

export function Button({
  onClick,
  children,
  color,
  disabled = false,
  customStyle,
}: Props): JSX.Element {
  const [isLoading, setLoading] = useSafeState(false);

  const handleClick = async (): Promise<void> => {
    if (!isPromise(onClick)) {
      return onClick();
    }

    setLoading(true);

    return onClick().finally(() => setLoading(false));
  };

  return (
    <button
      className={clsx(styles.button, styles[color], customStyle)}
      onClick={handleClick}
      type="button"
      disabled={isLoading || disabled}
    >
      {isLoading && <Spinner className={styles.spinner} />}
      <span className={clsx({ [styles.hidden]: isLoading })}>{children}</span>
    </button>
  );
}
