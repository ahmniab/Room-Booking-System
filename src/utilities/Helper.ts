import { Room } from '../types/types';
import axios from 'axios';
 
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
export function getDatesInDuration(date: string, durationInDays:number): string[] {
    const dates: string[] = [];
    let nowDate = new Date(date);
    dates.push(nowDate.toISOString().split('T')[0]);
    durationInDays--;
    for (let i = 0; i < durationInDays; i++) {
        nowDate.setDate(nowDate.getDate() + 1);
        dates.push(nowDate.toISOString().split('T')[0]);
    }
    return dates;
}

export function canRoomBeBooked(room: Room): boolean {
    if (!room || !room.availability) {
        return false;
    }
    const availableDates = Object.keys(room.availability).filter(date => room.availability[date]);
    return availableDates.length > 0;
}

