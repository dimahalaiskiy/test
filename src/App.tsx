import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import ListCases from './Components/ListCases';
import DatePicker from './Components/DatePicker';
import useModal from './Components/Modal';
import { ButtonContainer, MainContainer, Btn } from './AppStyle';
import Heading from './Components/Heading';
import { getCasesFromTo } from './services/api';

const App = () => {
  const [covidCases, setCovidCases] = useState([]);
  const [from, setFrom] = React.useState<Date | null>(new Date());
  const [to, setTo] = React.useState<Date | null>(new Date());
  const [currentModal, setCurrentModal] = useState('from');

  const { toggleModal, isModalOpen } = useModal();

  const handleDateFrom = (newValue: Date | null) => {
    setFrom(newValue);
  };

  const handleDateTo = (newValue: Date | null) => {
    setTo(newValue);
  };

  const cases: any = async (from: Date | null, to: Date | null) => {
    setCovidCases(await getCasesFromTo(from, to));
  };
  useEffect(() => {
    cases(from, to);
  }, [from, to]);

  return (
    <div>
      <Heading />
      <MainContainer>
        <ButtonContainer>
          <Btn
            variant='contained'
            onClick={() => {
              setCurrentModal('from');
              toggleModal();
            }}
            sx={{}}>
            from
          </Btn>
          <p>{from?.toLocaleDateString()}</p>
        </ButtonContainer>
        <ButtonContainer>
          <Btn
            variant='contained'
            onClick={() => {
              setCurrentModal('to');
              toggleModal();
            }}>
            to
          </Btn>
          <p>{to?.toLocaleDateString()}</p>
        </ButtonContainer>
      </MainContainer>
      <DatePicker
        date={currentModal === 'from' ? from : to}
        onDateChange={currentModal === 'from' ? handleDateFrom : handleDateTo}
        isModal={isModalOpen}
        toggleModal={toggleModal}></DatePicker>
      <ListCases covidCases={covidCases} />
    </div>
  );
};

export default App;
