import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField, Modal, Box, Button } from '@mui/material';
import useModal from './Modal';

interface Props {
  date: Date | null;
  onDateChange: (newValue: Date | null) => void;
  isModal: boolean;
  toggleModal: () => void;
  value: string;
  getCurrentMaxDate: number;
  confirmDate: () => void;
}

const DatePicker: React.FC<Props> = ({
  date,
  onDateChange,
  isModal,
  toggleModal,
  value,
  getCurrentMaxDate,
  confirmDate,
}) => {
  const { style } = useModal();

  return (
    <div>
      <Modal open={isModal} onClose={toggleModal}>
        <Box sx={style}>
          <LocalizationProvider
            sx={{ marginBottom: '30px' }}
            dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              minDate={new Date(2020, 1, 22)}
              maxDate={new Date(getCurrentMaxDate)}
              label={value === 'from' ? 'Date From' : 'Date To'}
              inputFormat='MM/dd/yyyy'
              value={date}
              onChange={onDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Button
            sx={{ margin: '30px 20px 0 0' }}
            color='success'
            onClick={() => {
              confirmDate();
              toggleModal();
            }}>
            Сonfirm
          </Button>
          <Button
            sx={{ marginTop: '30px' }}
            color='error'
            onClick={toggleModal}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default DatePicker;
