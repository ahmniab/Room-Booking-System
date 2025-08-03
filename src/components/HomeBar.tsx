import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { RoomDatePickerProps } from '../types/types';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import {styled} from '@mui/material/styles';
import HomeDatePicker from './RoomDatePicker'; 


const Reset = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(1.5),
    marginRight: theme.spacing(1),
    borderRadius: '50%',
    transitionDuration: '0.3s',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
  },
}));

export default function SearchAppBar(props: RoomDatePickerProps) {
    const { dateValue, onDateChange } = props;
    
  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky">
            <Box sx={{ display: 'flex', justifyContent: 'center',alignItems: 'center' , paddingY: 2 }}>
                <Reset  onClick={() => {
                    onDateChange(null);
                }}>
                    <RestartAltOutlinedIcon/>
                </Reset>
                <HomeDatePicker onDateChange={onDateChange} dateValue={dateValue}/>
            </Box>
        </AppBar>
        </Box>
  );
}
