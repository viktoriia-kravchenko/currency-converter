'use client';

import { useCallback, useEffect, useState } from 'react';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { Box, IconButton } from '@mui/material';
import { API_KEY, BASE_URL, ENDPOINT } from '@/src/constants/Api';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Selector from '../Selector/Selector';

const Form: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [options, setOptions] = useState<string[]>([]);
  const [base, setBase] = useState(searchParams.get('base') || 'EUR');
  const [baseAmount, setBaseAmount] = useState(1);
  const [quote, setQuote] = useState(searchParams.get('quote') || 'USD');
  const [isBaseChanged, setIsBaseChanged] = useState(true);
  const [rate, setRate] = useState(1);

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

    changes[0] === 'quote' ? setQuote(changes[1]) : setBase(changes[1]);
  };

  useEffect(() => {
    fetch(`${BASE_URL}${ENDPOINT}?access_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        setOptions([data.base, ...Object.keys(data.rates)]);
        setRate(data.rates[base]);
      });
  }, []);

  useEffect(() => {
    if (base !== null && quote !== null) {
      fetch(
        `${BASE_URL}${ENDPOINT}?access_key=${API_KEY}&base=${base}&symbols=${quote}`,
      )
        .then(res => res.json())
        .then(data => setRate(data.rates[quote]));
    }
  }, [base, quote]);

  const reverseCurrency = () => {
    const params = new URLSearchParams(searchParams);
    const currentValue = base;

    setBase(quote);
    params.set('base', quote);

    setQuote(currentValue);
    params.set('quote', currentValue);

    router.replace(pathname + '?' + params.toString());
  };

  let toAmount;
  let fromAmount = 0;

  if (isBaseChanged) {
    fromAmount = baseAmount;
    toAmount = baseAmount * rate;
  } else {
    toAmount = baseAmount;
    fromAmount = baseAmount / rate;
  }

  const handleBaseAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setBaseAmount(+value);
      setIsBaseChanged(true);
    }
  };

  const handleQuoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setBaseAmount(+value);
      setIsBaseChanged(false);
    }
  };

  return (
    <>
      <form>
        <Selector
          labels={['Amount', 'Base']}
          amount={fromAmount}
          currency={base}
          currencyList={options}
          handleAmountChange={handleBaseAmountChange}
          updateParams={updateParams}
        />

        <Box sx={{ marginBottom: 2, textAlign: 'center' }}>
          <IconButton
            aria-label="reverse"
            color="success"
            onClick={reverseCurrency}
          >
            <SyncAltIcon />
          </IconButton>
        </Box>

        <Selector
          labels={['Converted to', 'Quote']}
          amount={toAmount}
          currency={quote}
          currencyList={options}
          handleAmountChange={handleQuoteChange}
          updateParams={updateParams}
        />
      </form>
    </>
  );
};

export default Form;
