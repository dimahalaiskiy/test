import React from 'react';
import { TextCases } from '../AppStyle';

interface Props {
  covidCases: Array<{
    Cases: number;
  }>;
}

const ListCases: React.FC<Props> = ({ covidCases }) => {
  const from = covidCases[0]?.Cases;
  const to = covidCases[covidCases.length - 1]?.Cases;

  return (
    <TextCases>
      <span style={{ color: 'red' }}>{from && to && to - from}</span> number of
      infected
    </TextCases>
  );
};

export default ListCases;
