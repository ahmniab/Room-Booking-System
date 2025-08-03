import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { HomeBarProps } from '../types/types';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import {styled} from '@mui/material/styles';

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

export default function SearchAppBar(props: HomeBarProps) {
    const { dateValue, onDateChange } = props;
    const [value, setValue] = React.useState<Dayjs | null>(dateValue? dayjs(dateValue) : null);

    const handleDateChange = (newValue: Dayjs | null) => {
        setValue(newValue);
        if (newValue) {
            onDateChange(newValue.format('YYYY-MM-DD'));
        } else {
            onDateChange(null);
        }
    };
    
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky">
            <Box sx={{ display: 'flex', justifyContent: 'center',alignItems: 'center' , paddingY: 2 }}>
                <Reset  onClick={() => {
                    setValue(null);
                    onDateChange(null);
                }}>
                    <RestartAltOutlinedIcon/>
                </Reset>
                <DatePicker
                    format="YYYY-MM-DD"
                    label="pick a date"
                    value={value}
                    onChange={handleDateChange}
                    />
            </Box>
        </AppBar>
        </Box>
    </LocalizationProvider>
  );
}
