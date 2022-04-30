import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { getCountries } from '../services/api';
import { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  getCurrentCountry: (country: string) => void;
}

const SelectCountry: React.FC<Props> = ({ getCurrentCountry }) => {
  const [countries, setCountries] = useState<
    Array<{ Country: string; ISO2: string; Slug: string }>
  >([]);
  const [country, setCountry] = useState('belgium');

  const sortedCountryByName =
    countries?.length > 1
      ? [...countries].sort((firstCountry: any, secondCountry: any) =>
          firstCountry.Country.localeCompare(secondCountry.Country)
        )
      : countries;

  const onCountryChange = (event: SelectChangeEvent) => {
    let country = event.target.value as string;
    setCountry(country);
    getCurrentCountry(country);
  };

  const getCountriesFromApi = async () => {
    setCountries(await getCountries());
  };

  useEffect(() => {
    getCountriesFromApi();
  }, []);

  return (
    <FormControl sx={{ width: 'inherit' }}>
      <InputLabel id='demo-simple-select-label'>Country</InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={country}
        label='Country'
        onChange={onCountryChange}>
        {sortedCountryByName &&
          sortedCountryByName.map((country) => {
            return (
              <MenuItem key={country.ISO2} value={country.Slug}>
                {country.Country}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};

export default SelectCountry;
