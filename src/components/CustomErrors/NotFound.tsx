import Link from 'next/link';

import styles from './GenericError.module.scss';

const NotFound = () => (
  <div className={styles.container}>
    <h2 className={styles.title}>This page could not be found.</h2>

    <Link href="/" className={styles.link}>
      Return Home
    </Link>
  </div>
);

export default NotFound;
