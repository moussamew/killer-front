import clsx from 'clsx';
import { type ChangeEvent } from 'react';

import styles from './styles/Input.module.css';

interface Props {
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  label?: string;
  uppercase?: boolean;
}

export function Input({
  id,
  value,
  onChange,
  type = 'text',
  placeholder,
  label,
  uppercase = false,
}: Props): JSX.Element {
  return (
    <div className={styles.content}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        className={clsx(styles.input, {
          [styles.uppercase]: uppercase,
        })}
      />
    </div>
  );
}
