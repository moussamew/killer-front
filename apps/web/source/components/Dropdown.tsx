import { useState } from 'react';

import Active from '@/assets/icons/active.svg';
import Expand from '@/assets/icons/expand.svg';
import { onEnterKey } from '@/helpers/keys';

import styles from './styles/Dropdown.module.css';

interface Props {
  items: string[];
  activeItem: string;
  onClick: (item: string) => void;
}

export function Dropdown({ items, activeItem, onClick }: Props): JSX.Element {
  const [showList, setShowList] = useState(false);

  const handleShowList = (): void => {
    setShowList(!showList);
  };

  const handleClick = (item: string): void => {
    onClick(item);
    setShowList(false);
  };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        className={styles.dropdown}
        onClick={handleShowList}
        onKeyDown={({ key }) => onEnterKey(key, handleShowList)}
      >
        <p>{activeItem}</p>
        <Expand />
      </div>
      {showList && (
        <div className={styles.list}>
          {items.map((item) => (
            <div
              role="button"
              tabIndex={0}
              className={styles.item}
              key={item}
              onClick={() => handleClick(item)}
              onKeyDown={({ key }) => onEnterKey(key, () => handleClick(item))}
            >
              <p>{item}</p>
              {item === activeItem && <Active />}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
