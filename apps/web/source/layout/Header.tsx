import { Menu } from './Menu';
import styles from './styles/Header.module.css';

function Header(): JSX.Element {
  return (
    <div className={styles.content}>
      <header className={styles.header}>
        <p className={styles.text}>Killer Party</p>
        <Menu />
      </header>
    </div>
  );
}

export default Header;
