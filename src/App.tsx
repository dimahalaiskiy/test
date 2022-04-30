import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import ListCases from './Components/ListCases';
import DatePicker from './Components/DatePicker';
import useModal from './Components/Modal';
import { ButtonContainer, MainContainer, Btn } from './AppStyle';
import Heading from './Components/Heading';
import { getCasesFromTo } from './services/api';
import SelectCountry from './Components/SelectCountry';

const App = () => {
  interface DateInterface {
    from: Date | null;
    to: Date | null;
  }

  const currentDate: Date = new Date();
  const getCurrentMaxDate = currentDate.setDate(currentDate.getDate() - 1);

  const [currentCountry, setCurrentCountry] = useState('belgium');
  const [covidCases, setCovidCases] = useState([]);
  const [currentDatePicker, setCurrentDatePicker] = useState('from');
  const [date, setDate] = useState<DateInterface>({
    from: new Date(getCurrentMaxDate),
    to: new Date(getCurrentMaxDate),
  });

  const [dateFrom, setDateFrom] = useState<Date | null>(
    new Date(getCurrentMaxDate)
  );
  const [dateTo, setDateTo] = useState<Date | null>(
    new Date(getCurrentMaxDate)
  );

  const { toggleModal, isModalOpen } = useModal();

  const getCurrentCountry = (country: string) => {
    setCurrentCountry(country);
  };

  const confirmDate = () => {
    setDate({ from: dateFrom, to: dateTo });
  };

  const handleDateFrom = (newValue: Date | null) => {
    setDateFrom(newValue);
  };

  const handleDateTo = (newValue: Date | null) => {
    setDateTo(newValue);
  };

  const getCovidCases = async (date: DateInterface, country: string) => {
    setCovidCases(await getCasesFromTo(date, country));
  };

  useEffect(() => {
    getCovidCases(date, currentCountry);
  }, [date, currentCountry]);

  return (
    <div>
      <Heading />
      <MainContainer>
        <ButtonContainer>
          <Btn
            variant='contained'
            onClick={() => {
              setCurrentDatePicker('from');
              toggleModal();
            }}>
            from
          </Btn>
          <p>{date.from?.toLocaleDateString()}</p>
        </ButtonContainer>
        <ButtonContainer>
          <Btn
            variant='contained'
            onClick={() => {
              setCurrentDatePicker('to');
              toggleModal();
            }}>
            to
          </Btn>
          <p>{date.to?.toLocaleDateString()}</p>
        </ButtonContainer>
        <SelectCountry getCurrentCountry={getCurrentCountry} />
      </MainContainer>
      <DatePicker
        confirmDate={confirmDate}
        value={currentDatePicker}
        date={currentDatePicker === 'from' ? dateFrom : dateTo}
        onDateChange={
          currentDatePicker === 'from' ? handleDateFrom : handleDateTo
        }
        isModal={isModalOpen}
        toggleModal={toggleModal}
        getCurrentMaxDate={getCurrentMaxDate}></DatePicker>
      <ListCases covidCases={covidCases} />
    </div>
  );
};

export default App;
