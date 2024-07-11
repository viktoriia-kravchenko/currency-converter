import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';

interface SelectorProps {
  labels: string[];
  amount: number;
  currency: string;
  currencyList: string[];
  handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateParams: (params: { [key: string]: string | '' }) => void;
}

const Selector: React.FC<SelectorProps> = props => {
  const {
    labels,
    amount,
    currency,
    currencyList,
    handleAmountChange,
    updateParams,
  } = props;

  return (
    <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
      <TextField
        id="outlined-controlled"
        label={labels[0]}
        value={amount}
        onChange={handleAmountChange}
      />

      <FormControl>
        <InputLabel id="select-label">{labels[1]}</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={currency}
          label={labels[1]}
          onChange={(e: SelectChangeEvent<string>) =>
            updateParams({ [labels[1].toLowerCase()]: e.target.value })
          }
        >
          {currencyList.map((el, index) => (
            <MenuItem key={index} value={el}>
              {el}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default Selector;
