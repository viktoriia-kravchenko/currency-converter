import { Suspense } from 'react';
import RatesTableSection from '@/src/components/RatesTableSection/RatesTableSection';

import styles from './page.module.scss';

const page: React.FC = () => (
  <section className={styles.container}>
    <h2 className={styles.title}>Rates page</h2>

    <div className={styles.content}>
      <Suspense>
        <RatesTableSection />
      </Suspense>
    </div>
  </section>
);

export default page;
