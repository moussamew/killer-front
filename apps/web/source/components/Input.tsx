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
  onEnter?: () => void;
}

export function Input({
  id,
  value,
  onChange,
  type = 'text',
  placeholder,
  label,
  uppercase = false,
  onEnter,
}: Props): JSX.Element {
  const handleOnEnter = (key: string): void => {
    if (key === 'Enter') {
      onEnter?.();
    }
  };

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
        onKeyDown={({ key }) => handleOnEnter(key)}
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
