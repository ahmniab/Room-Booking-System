import { Room } from '../types/types';
import axios from 'axios';
import { object, string, number } from 'yup';

 
// Network Staff
const Host              = 'http://localhost:4000';
const RoomsEndpoint     = `${Host}/rooms`        ;

export async function fetchRooms(): Promise<Room[]> {
    const response = await axios.get(RoomsEndpoint);
    if (response.status !== 200) {
        throw new Error(`Failed to fetch rooms`);
    }
    return response.data as Room[];
}
export async function updateRoom(room : Room): Promise<void> {
    const response = await axios.put(`${RoomsEndpoint}/${room.id}`, room);
    if (response.status !== 200) {
        throw new Error(`Failed to update room with ID ${room.id}`);
    }
}

// General

export function canRoomBeBooked(room: Room): boolean {
    if (!room || !room.availability) {
        return false;
    }
    const availableDates = Object.keys(room.availability).filter(date => room.availability[date]);
    return availableDates.length > 0;
}
export function isInDayRange(timeHours: number, timeMinutes: number, duration: number): boolean {
    const totalHours = timeHours + timeMinutes / 60 + duration;
    return totalHours >= 0 && totalHours <= 24;
}

export const tryParseDuration = (value: string): number => {
    const parsed = parseInt(value);
    return isNaN(parsed) ? 1 : parsed;
};

/*
    pre: time is in HH:mm format && less than 24:00 && string length is 5
    post: returns time in 12-hour format with AM/PM
*/
export function convertTo12HourFormat(time: string): string {

    const splitTime = time.split(':');
    let hours = parseInt(splitTime[0]);
    const minutes = parseInt(splitTime[1]);

    const period = hours >= 12 ? 'PM' : 'AM';

    let hours12Format = hours % 12;
    if (hours12Format === 0) hours12Format = 12; // Convert 0 to 12 for 12-hour format
    const formatedHours = hours12Format.toString().padStart(2, '0');
    const formatedMinutes = minutes.toString().padStart(2, '0');

    return `${formatedHours}:${formatedMinutes} ${period}`;
}

//validation
// Validation Schema
export const isYupSchema = (obj: any): obj is { validate: (val: any) => Promise<any> } =>
  obj && typeof obj.validate === 'function';

export const bookingSchema = object({
    name: string().required('Name is required'),
    email: string()
        .email('Please write a valid email')
        .required('Email is required'),
    duration: number()
        .required('Duration is required')
        .positive('Duration must be positive')
        .integer('Duration must be an integer')
        .min(1, 'Duration must be at least 1 hour')
        .max(24, 'Duration cannot exceed 24 hours'),
    startDate: string()
    .matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, 'Date must be in YYYY-MM-DD format')
    .required(),
});
export const getYupField = (name: string) => {
    const fieldSchema = bookingSchema.fields[name as keyof typeof bookingSchema.fields];
    if (isYupSchema(fieldSchema)) {
        return fieldSchema;
    }
    throw new Error(`Field ${name} is not a valid Yup schema`);
}

