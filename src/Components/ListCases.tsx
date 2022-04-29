import React from 'react';

interface Props {
  covidCases: Array<{
    Cases: number;
  }>;
}

const ListCases: React.FC<Props> = ({ covidCases }) => {
  const from = covidCases[0]?.Cases;
  const to = covidCases[covidCases.length - 1]?.Cases;

  return (
    <div>
      <p> {from && to && to - from} number of infected </p>
    </div>
  );
};

export default ListCases;
