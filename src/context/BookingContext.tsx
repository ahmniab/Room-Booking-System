import { createContext, useContext, useState, ReactNode } from 'react';
import { BookingContextType, BookingDetails } from '../types/types';

const BookingContext = createContext<BookingContextType>(
  {
      bookingDetails: null, 
      setBookingDetails: () => {}
  });

  export const BookingProvider = ({ children }:{children: ReactNode}) => {
    
    const [booking, setBooking] = useState<BookingDetails | null>(null);

  return (
    <BookingContext.Provider value={{ 
        bookingDetails: booking, 
        setBookingDetails : setBooking, 
        }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};