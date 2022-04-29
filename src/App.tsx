import React from 'react';
import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Box, Modal, Button } from '@mui/material';
import ListCases from './Components/ListCases';

const App = () => {
  const [covidCases, setCovidCases] = useState([]);
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());

  const [toggleModalFrom, setToggleModalFrom] = useState(false);
  const handlerModalFrom = () => setToggleModalFrom(!toggleModalFrom);

  const [toggleModalTo, setToggleModalTo] = useState(false);
  const handlerModalTo = () => setToggleModalTo(!toggleModalTo);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const getCasesFromTo: any = async (from: any, to: any) => {
    const { data } = await axios(
      'https://api.covid19api.com/country/belgium/status/confirmed',
      {
        params: {
          from: from.toISOString(),
          to: to.toISOString(),
        },
      }
    );

    setCovidCases(data);
  };

  useEffect(() => {
    getCasesFromTo(from, to);
  }, []);

  return (
    <div>
      <h2>
        Select the date <span style={{ color: 'violet' }}>FROM</span> and
        <span style={{ color: 'violet', marginBottom: '50px' }}> TO</span> to
        see the number of diseases on Covid
      </h2>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '30px',
          }}>
          <Button
            variant='contained'
            onClick={handlerModalFrom}
            sx={{ width: '100px' }}>
            from
          </Button>
          <p>{from.toLocaleDateString()}</p>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '30px',
          }}>
          <Button
            variant='contained'
            onClick={handlerModalTo}
            sx={{ width: '100px' }}>
            to
          </Button>
          <p>{to.toLocaleDateString()}</p>
        </Box>
        <Button
          onClick={() => getCasesFromTo(from, to)}
          variant='contained'
          color='success'
          sx={{ width: '100px', height: '36.7px' }}>
          Search
        </Button>
      </Box>
      <Modal
        open={toggleModalFrom}
        onClose={handlerModalFrom}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Calendar onChange={setFrom} value={from} />
          <Button sx={{ marginTop: '20px' }} onClick={handlerModalFrom}>
            Close
          </Button>
        </Box>
      </Modal>

      <Modal
        open={toggleModalTo}
        onClose={handlerModalTo}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Calendar onChange={setTo} value={to} />
          <Button sx={{ marginTop: '20px' }} onClick={handlerModalTo}>
            Close
          </Button>
        </Box>
      </Modal>

      <ListCases cases={covidCases} />
    </div>
  );
};

export default App;
