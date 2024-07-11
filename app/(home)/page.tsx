import Form from '@/src/components/Form/Form';

import styles from './page.module.scss';

const Main = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Main page</h2>

      <Form />
    </section>
  );
};

export default Main;
