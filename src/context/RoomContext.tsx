import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { RoomContextType, Room } from '../types/types';
import { fetchRooms, updateRoom } from '../utilities/Helper';

const RoomsContext = createContext<RoomContextType>({
    rooms: null,
    refreshRooms: () => new Promise<void>(resolve => resolve()),
    setRooms: () => {},
    setRoom: () => {},
    getRoomById: () => undefined,
    getAvailableRooms: () => [],
    bookRoom: () => false,
    isThereAConnection: () => false,
});

export const RoomProvider = ({ children }:{children: ReactNode}) => {

    const [rooms, setRooms] = useState<Room[] | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(rooms !== null);
    const isThereAConnection = (): boolean => {
        return isConnected;
    };
    const refreshRooms = async (): Promise<void> => {
        try {
            const fetchedRooms = await fetchRooms();
            setRooms(fetchedRooms);
            setIsConnected(true);
        } catch (error) {
            setIsConnected(false);
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
            });
        }
    };
    const getAvailableRooms = (date: string | null): Room[] => {
        if (rooms == null) {
            throw new Error('Rooms not initialized');
        }
        return date? rooms.filter(room => room.availability[date] === true) : rooms;
    };
    
    const bookRoom = (room:Room, startDate: string): boolean => {
        if (rooms == null) {
            return false;
        }
        room.availability[startDate] = false;
        try {
            setRoom(room);
        } catch (error) {
            return false;
        }

        return true;
    };
    useEffect(() => {
        refreshRooms().catch(error => {
            console.error(`Failed to fetch rooms on initialization: ${error}`);
            setIsConnected(false);
        });
        setIsConnected(true);
    }, []);


    return (
        <RoomsContext.Provider value={{ 
            rooms: rooms, 
            setRooms: setRooms, 
            refreshRooms: refreshRooms, 
            setRoom: setRoom, 
            getRoomById: getRoomById,
            getAvailableRooms: getAvailableRooms,
            bookRoom: bookRoom,
            isThereAConnection: isThereAConnection
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