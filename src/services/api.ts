import axios from 'axios';

export const getCasesFromTo = async (from: Date | null, to: Date | null) => {
  const { data } = await axios(
    'https://api.covid19api.com/country/belgium/status/confirmed',
    {
      params: {
        from: from?.toISOString(),
        to: to?.toISOString(),
      },
    }
  );

  return data;
};
