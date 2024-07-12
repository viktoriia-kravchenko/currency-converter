'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import styles from './GenericError.module.scss';

interface GenericErrorProps {
  error: Error & { digest?: string };
}

const GenericError = ({ error }: GenericErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const { refresh } = useRouter();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Something went wrong!</h2>

      <Button variant="outlined" color="error" onClick={refresh}>
        Try again
      </Button>
    </div>
  );
};

export default GenericError;
