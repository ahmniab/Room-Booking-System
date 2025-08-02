import { createContext, useContext, useState, ReactNode } from 'react';
import { RoomContextType, Room } from '../types/types';
import { fetchRooms, updateRoom, getDatesInDuration } from '../utilities/Helper';

const RoomsContext = createContext<RoomContextType>({
    rooms: null,
    refreshRooms: () => new Promise<void>(resolve => resolve()),
    setRooms: () => {},
    setRoom: () => {},
    getRoomById: () => undefined,
    getAvailableRooms: () => [],
    bookRoom: () => false
});

export const RoomProvider = ({ children }:{children: ReactNode}) => {

    const [rooms, setRooms] = useState<Room[] | null>(null);
    const refreshRooms = async (): Promise<void> => {
        try {
            const fetchedRooms = await fetchRooms();
            setRooms(fetchedRooms);
        } catch (error) {
            throw error;
        }
    };
    const getRoomById = (id: string): Room | undefined => {
        if (rooms == null) {
            throw new Error('Rooms not initialized');
        }
        return rooms.find(room => room.id === id);
    };
    const setRoom = async (room: Room): Promise<void> => {
        if (rooms == null) {
            throw new Error('Rooms not initialized');
        } else {
            updateRoom(room).then(() => {
                refreshRooms().then(() => {return;});
            }).catch(error => {
                console.error(`Failed to update room: ${error}`);
            });
        }
    };
    const getAvailableRooms = (date: string | null): Room[] => {
        if (rooms == null) {
            throw new Error('Rooms not initialized');
        }
        return date? rooms.filter(room => room.availability[date] === true) : rooms;
    };
    
    const bookRoom = (room:Room, duration:number, startDate: string): boolean => {
        if (rooms == null) {
            throw new Error('Rooms not initialized');
        }
        if (!room || Object.keys(room.availability).length < duration ||!room.availability[startDate]) {
            return false;
        }
        const datesInDuration = getDatesInDuration(startDate, duration);
        datesInDuration.forEach(date => {
            if (room.availability[date] !== undefined || !room.availability[date]) {
                return false; 
            }
        });
        datesInDuration.forEach(date => {
            room.availability[date] = false;
        });
        try {
            setRoom(room).then(() => {return true;});
        } catch (error) {
            console.error(`Failed to book room: ${error}`);
            return false;
        }

        return true;
    };


    return (
        <RoomsContext.Provider value={{ 
            rooms: rooms, 
            setRooms: setRooms, 
            refreshRooms: refreshRooms, 
            setRoom: setRoom, 
            getRoomById: getRoomById,
            getAvailableRooms: getAvailableRooms,
            bookRoom: bookRoom
        }}>
        {children}
        </RoomsContext.Provider>
    );
};

export const useRoom = () => {
  const context = useContext(RoomsContext);
  if (!context) {
    throw new Error('useBooking must be used within a RoomProvider');
  }
  return context;
};