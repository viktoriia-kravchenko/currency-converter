import { Suspense } from 'react';
import MutualConvertingForm from '@/src/components/MutualConvertingForm/MutualConvertingForm';

import styles from './page.module.scss';

const page: React.FC = () => (
  <section className={styles.container}>
    <h2 className={styles.title}>Main page</h2>

    <Suspense>
      <MutualConvertingForm />
    </Suspense>
  </section>
);

export default page;
