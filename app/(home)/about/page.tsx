import styles from './page.module.scss';

const page: React.FC = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>About Our Currency Converter App</h2>

      <p className={styles.greeting}>
        Welcome to our Currency Converter App! This app is designed to help you
        easily convert between different currencies and keep track of the latest
        exchange rates.
      </p>

      <h3 className={styles.subtitle}>Main Tab</h3>
      <p className={styles.description}>
        The Main tab allows you to convert an entered amount
        from the selected base currency to a quote currency, with the option to
        switch between the two using a button with arrows.
      </p>

      <h3 className={styles.subtitle}>Rates Tab</h3>
      <p className={styles.description}>
        The Rates tab displays a table of converted amounts in
        various quote currencies based on the entered sum and selected base
        currency, updating values dynamically when changes are made.
      </p>

      <p className={styles.farewell}>
        We hope you find our app useful and easy to use. If you have any
        questions or feedback, feel free to reach out to us!
      </p>
    </section>
  );
};

export default page;
