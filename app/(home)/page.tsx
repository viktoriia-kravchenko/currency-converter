import { Suspense } from 'react';
import Form from '@/src/components/Form/Form';

import styles from './page.module.scss';

const Main: React.FC = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Main page</h2>

      <Suspense>
        <Form />
      </Suspense>
    </section>
  );
};

export default Main;
