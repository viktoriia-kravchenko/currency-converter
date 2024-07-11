import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.content}>Currency Converter</h1>
    </header>
  );
};

export default Header;
