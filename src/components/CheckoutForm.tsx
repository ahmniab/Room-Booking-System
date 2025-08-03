import { BookingDetails, BookingFormErrors, CheckoutFormProps } from "../types/types";
import { useBooking } from "../context/BookingContext";
import { useState } from "react";
import { Button, TextField, Box, styled } from "@mui/material";
import { object, string, number, InferType } from 'yup';
import RoomDatePicker from "./RoomDatePicker";


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
const isYupSchema = (obj: any): obj is { validate: (val: any) => Promise<any> } =>
  obj && typeof obj.validate === 'function';


// Validation Schema
let bookingSchema = object({
    name: string().required('Name is required'),
    email: string()
        .email('Please write a valid email')
        .required('Email is required'),
    duration: number()
        .required('Duration is required')
        .positive('Duration must be positive')
        .integer('Duration must be an integer'),
    startDate: string()
    .matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, 'Date must be in YYYY-MM-DD format')
    .required(),
});


// CheckoutForm Component

function CheckoutForm(props: CheckoutFormProps) {
    const { onValidSubmit } = props;
    const [formData, setFormData] = useState<BookingDetails>({
        name: '',
        email: '',
        roomId: '',
        duration: 1,
        startDate: '',
        totalCost: 0,
    });
    const [formDataErrors, setFormDataErrors] = useState<BookingFormErrors>({
        name: undefined,
        email: undefined,
        duration: undefined,
        startDate: undefined,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'duration' ? parseInt(value) : value,
        });
        const fieldSchema = bookingSchema.fields[name as keyof typeof bookingSchema.fields];
        if (isYupSchema(fieldSchema)) {
            fieldSchema.validate(value)
            .then(() => {
                setFormDataErrors({
                ...formDataErrors,
                [name]: undefined,
                });
            })
            .catch((error: any) => {
                setFormDataErrors({
                ...formDataErrors,
                [name]: error.message,
                });
            });
        }

    };
    const handleOnDateChange = (date: string | null) => {
        if(date){
            setFormData({
                ...formData,
                startDate: date
            })
        }
    }
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

    return (
        <FormContainer 
            sx={{width: {sm: '80%', md: '60%', lg: '50%'}}}
            as="form" 
            onSubmit={handleSubmit}>
            <FormField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
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
                value={formData.duration}
                onChange={handleChange}
                required
                error={formDataErrors.duration !== undefined}
                helperText={formDataErrors.duration}
            />
            <RoomDatePicker
                onDateChange={handleOnDateChange} 
                dateValue={formData.startDate}/>
            <Button
                type="submit" 
                variant="contained" 
                color="primary">
                Confirm Booking
            </Button>
        </FormContainer>
    );
}
export default CheckoutForm;