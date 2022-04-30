import axios from 'axios';

interface DateInterface {
  from: Date | null;
  to: Date | null;
}

export const getCasesFromTo = async (date: DateInterface, country: string) => {
  const { data } = await axios(
    `https://api.covid19api.com/country/${country}/status/confirmed`,
    {
      params: {
        from: date.from?.toISOString(),
        to: date.to?.toISOString(),
      },
    }
  );

  return data;
};

export const getCountries = async () => {
  const { data } = await axios('https://api.covid19api.com/countries');

  return data;
};
