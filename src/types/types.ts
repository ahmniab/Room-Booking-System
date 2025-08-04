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
  bookRoom: (room:Room, startDate: string) => boolean;
}

export interface BookingDetails {
    email: string;
    name: string;
    roomId: string;
    startDate: string;
    startTime?: string;
    duration: number;
    totalCost: number;
}

export type BookingContextType = {
  selectedRoom: string | null;
  bookingDetails: BookingDetails | null;
  setSelectedRoom: (room: string ) => void;
  setBookingDetails: (details: BookingDetails) => void;
};
export interface BookingFormErrors {
  name?: string;
  email?: string;
  duration?: string;
  startDate?: string;
  startTime?: string;
}
//props 
export interface RoomCardProps {
  room: Room;
}
export interface RoomDatePickerProps {
  dateValue: string | null;
  onDateChange: (date: string | null) => void;
}
export interface CheckoutFormProps {
  onValidSubmit: (details: BookingDetails) => void;
  availableDays: string[];
}

export interface TimePickerProps {
  value: string | null;
  onChange: (value: string | null) => void;
}