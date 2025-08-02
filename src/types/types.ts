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