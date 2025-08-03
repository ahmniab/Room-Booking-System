export interface Room {
  id: string;
  name: string;
  capacity: number;
  pricePerHour: number;
  availability: Record<string, boolean>; 
}
export type RoomContextType = {
  rooms: Room[]| null;
  setRooms: (rooms: Room[]) => void;
  refreshRooms: () => Promise<void>;
  setRoom: (room: Room) => void;
  getRoomById: (id: string) => Room | undefined;
  getAvailableRooms: (date: string | null) => Room[];
  bookRoom: (room:Room, duration:number, startDate: string) => boolean;
}

export interface BookingDetails {
    user: {
        name: string;
        email: string;
    };
    roomId: string;
    startTime: string; 
    duration: number;
    totalCost: number;
}

export type BookingContextType = {
  selectedRoom: string | null;
  bookingDetails: BookingDetails | null;
  setSelectedRoom: (room: string ) => void;
  setBookingDetails: (details: BookingDetails) => void;
};

export interface RoomCardProps {
  room: Room;
}