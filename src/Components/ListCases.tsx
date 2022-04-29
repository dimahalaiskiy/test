import React from 'react';

const ListCases = (props: any) => {
  const { cases } = props;

  const from = cases[0]?.Cases;
  const to = cases[cases.length - 1]?.Cases;

  return (
    <div>
      <p> {from && to && to - from} number of infected </p>
    </div>
  );
};

export default ListCases;
