import { BookingDetails, BookingFormErrors, CheckoutFormProps } from "../types/types";
import { useState, useEffect } from "react";
import { Button, TextField, Box, styled } from "@mui/material";
import { MobileTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from "dayjs";
import { FormControl, InputLabel, Select, MenuItem, Alert } from '@mui/material';
import { isInDayRange } from "../utilities/Helper";
import { getYupField, tryParseDuration } from "../utilities/Helper";

// Styles
const FormContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: theme.spacing(2),
}));
const FormField = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    width: '100%',
}));



// CheckoutForm Component

function CheckoutForm(props: CheckoutFormProps) {
    const { onValidSubmit, availableDays } = props;
    const [selectedTimeDate, setSelectedTimeDate] = useState<Dayjs | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [formData, setFormData] = useState<BookingDetails>({
        name: '',
        email: '',
        roomId: '',
        duration: 1,
        startDate: '',
        startTime: '',
        totalCost: 0,
    });
    const setFormField = (name: string, value: string | number) => {
        setFormData({
            ...formData,
            [name]: name === 'duration' ? tryParseDuration(value as string) : value,
        });
    }
    const [formDataErrors, setFormDataErrors] = useState<BookingFormErrors>({
        name: undefined,
        email: undefined,
        duration: undefined,
        startDate: undefined,
        startTime: undefined,
    });

    const setError = (name:string, message:string|undefined) => {
        setFormDataErrors(prev => ({
            ...prev,
            [name]: message,
        }));
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const realValue:string|number = name === 'duration' ? tryParseDuration(value) : value;
        setFormField(name, realValue);
        validateFormField(name, realValue);
        
    };
    const handleDateSelectChange = (newVal:string) => {
        setSelectedDate(newVal);
        setFormData({
            ...formData,
            startDate: newVal,
        });
    };
    const formHasNoError = () => {
        for (const key in formDataErrors) {
            const value = formDataErrors[key as keyof typeof formDataErrors];
            if(value) return false;
        }
        return true;
    } 
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(formHasNoError())
            onValidSubmit(formData);
    };

    const validateFormField = (name: string, value: string | number) => {
        getYupField(name).validate(value).then(() => {
            setError(name, undefined);
        }).catch((error: any) => {
            setError(name, error.message);
            console.error(`Validation error for name: ${error.message}`);
        });
    }
    // Validation 

    useEffect(() => {
        if (selectedTimeDate) {
            const timeMinutes = parseInt(selectedTimeDate.format('mm'));
            const timeHours = parseInt(selectedTimeDate.format('HH'));
            if (!isInDayRange(timeHours, timeMinutes, formData.duration)) {
                setError('startTime', 'Selected time is out of range for the given duration');
            } else {
                setError('startTime', undefined);
                setFormData({
                    ...formData,
                    startTime: selectedTimeDate.format('HH:mm'),
                });
            }
        }
    }, [selectedTimeDate, formData.duration]);

    return (
        <>
            <FormContainer 
                sx={{width: {sm: '80%', md: '60%', lg: '50%'}}}
                as="form" 
                onSubmit={handleSubmit}>
                {formDataErrors.startTime ?(
                    <Alert
                        sx={{ width: '100%' }}
                        severity="error">
                            {formDataErrors.startTime}
                    </Alert>
                ) : null}
                {availableDays.length === 0 ? (
                    <Alert
                        sx={{ width: '100%' }}
                        severity="warning">
                        No available days for booking.
                    </Alert>
                ) : null}
                
                <FormField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={(handleChange)}
                    required
                    error={formDataErrors.name !== undefined}
                    helperText={formDataErrors.name}
                />
                <FormField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    error={formDataErrors.email !== undefined}
                    helperText={formDataErrors.email}
                />
                <FormField
                    label="Duration (hours)"
                    name="duration"
                    type="number"
                    inputProps={{ min: 1, max: 24, step: 1 }}
                    value={formData.duration}
                    onChange={handleChange}
                    required
                    error={formDataErrors.duration !== undefined}
                    helperText={formDataErrors.duration}
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Choose a day</InputLabel>
                    <Select
                        name="startDate"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedDate}
                        label="Choose a day"
                        onChange={(e) => {
                            const value = e.target.value as string;
                            handleDateSelectChange(value);
                        }}
                    >
                        {availableDays.map((day) => (
                            <MenuItem 
                                key={day} 
                                value={day}>
                                {day}
                            </MenuItem>
                        ))}
                    </Select>
                    </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileTimePicker
                        label="Select Time"
                        value={selectedTimeDate}
                        onChange={setSelectedTimeDate}
                    />
                </LocalizationProvider>

                <Button
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    disabled={!formHasNoError() || availableDays.length === 0}>
                    Confirm Booking
                </Button>
            </FormContainer>
        </>
    );
}
export default CheckoutForm;