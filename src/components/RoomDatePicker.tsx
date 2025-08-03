import { RoomDatePickerProps } from "../types/types";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

function RoomDatePicker(params: RoomDatePickerProps) {
    const { dateValue, onDateChange } = params;
    const handleDateChange = (newValue: Dayjs | null) => {
        if (newValue) {
            onDateChange(newValue.format('YYYY-MM-DD'));
        } else {
            onDateChange(null);
        }
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                format="YYYY-MM-DD"
                label="pick a date"
                value={dateValue ? dayjs(dateValue) : null}
                onChange={handleDateChange}
                />
        </LocalizationProvider>
    );
        
}
export default RoomDatePicker;