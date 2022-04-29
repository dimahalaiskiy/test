import { styled } from '@mui/system';
import { Button } from '@mui/material';

export const MainContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});

export const ButtonContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '30px',
});

export const Btn = styled(Button)({
  width: '100px',
});
