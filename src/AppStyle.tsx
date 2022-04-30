import { styled } from '@mui/system';
import { Button } from '@mui/material';

export const MainContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '50px',
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

export const TextCases = styled('p')({
  fontSize: '20px',
  marginTop: '30px',
  padding: '20px',
});
