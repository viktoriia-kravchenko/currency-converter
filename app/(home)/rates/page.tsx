'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { API_KEY, BASE_URL, ENDPOINT } from '@/src/constants/Api';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import Selector from '@/src/components/Selector/Selector';
import { updateRatesTable } from '@/src/utils/helpers';
import { RatesTableRow } from '@/src/types/types';

import styles from './page.module.scss';

const Rates: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [base, setBase] = useState(searchParams.get('base') || 'EUR');
  const [baseAmount, setBaseAmount] = useState(1);

  const [options, setOptions] = useState<string[]>([]);
  const [rates, setRates] = useState<RatesTableRow[]>([]);

  useEffect(() => {
    fetch(`${BASE_URL}${ENDPOINT}?access_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        setOptions([data.base, ...Object.keys(data.rates)]);
      });
  }, []);

  useEffect(() => {
    if (base !== null) {
      fetch(`${BASE_URL}${ENDPOINT}?access_key=${API_KEY}&base=${base}`)
        .then(res => res.json())
        .then(data =>
          setRates([
            ...Object.entries(data.rates).map(([key, value]) => ({
              currency: key,
              rate: value as number,
            })),
          ]),
        );
    }
  }, [base]);

  const preparedTableValues = useMemo(
    () => updateRatesTable(rates, baseAmount),
    [rates, baseAmount],
  );

  const handleBaseAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setBaseAmount(+value);
    }
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const updateParams = (params: { [key: string]: string | '' }) => {
    const changes = Object.entries(params)[0];

    router.push(pathname + '?' + createQueryString(...changes));

    setBase(changes[1]);
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Rates page</h2>

      <div className={styles.content}>
        <Selector
          labels={['Amount', 'Base']}
          amount={baseAmount}
          currency={base}
          currencyList={options}
          handleAmountChange={handleBaseAmountChange}
          updateParams={updateParams}
        />

        <TableContainer component={Paper} sx={{ maxWidth: '450px' }}>
          <Table aria-label="simple table">
            <TableBody>
              {preparedTableValues.map(row => (
                <TableRow
                  key={row.currency}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="pair">
                    {row.currency}
                  </TableCell>
                  <TableCell align="right">{row.rate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </section>
  );
};

export default Rates;
