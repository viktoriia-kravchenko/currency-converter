import { RatesTableRow } from '../types/types';

export const updateRatesTable = (
  rows: RatesTableRow[],
  coefficient: number,
) => {
  return rows.map(row => ({
    ...row,
    rate: row.rate * coefficient,
  }));
};
