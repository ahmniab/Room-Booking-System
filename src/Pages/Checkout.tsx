import { useParams, useNavigate } from 'react-router-dom';
import { Room, BookingDetails } from '../types/types';
import { useRoom } from '../context/RoomContext';
import { useBooking } from '../context/BookingContext';
import { useEffect, useState } from 'react';
import RoomDetails from '../components/RoomDetails';
import CheckoutForm from '../components/CheckoutForm';
import { Box } from '@mui/material';
import ConnectionError from '../components/ConnectionError';



function Checkout() {
    const { roomId } = useParams<{ roomId: string }>();
    const roomContext = useRoom();
    const bookingContext = useBooking();
    const navigate = useNavigate();
    let [room, setRoom] = useState<Room | undefined>(undefined);
    let [availableDays, setAvailableDays] = useState< string[]>([]);
    useEffect(() => {
        if (roomId) {
            try {
                setRoom(roomContext.getRoomById(roomId));
                if (room) {
                    setAvailableDays(Object.keys(room.availability)
                        .map((date) => room?.availability[date] ? date : null)
                        .filter((date) => date !== null) as string[]);
                }
            } catch (error) {
                setRoom(undefined);
            }
        }
    }, [roomId, roomContext, room]);

    const roomCanBeBooked = (date:string) =>{
        if (room?.availability[date]) {
            return true;
        }
    }
    const handleValidSubmit = (data:BookingDetails) => {
        if (roomCanBeBooked(data.startDate)) {
            data.totalCost = (room?.pricePerHour || 0) * data.duration;
            data.roomId = room?.id || '';
            bookingContext.setBookingDetails(data);
            try {
                if (room) {
                    roomContext.bookRoom(room, data.startDate);
                }
            }catch (error) {
                console.error(`Error setting room: ${error}`);
            }
            navigate('/confirmation');
        }
    };
    return (
        <>
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                padding: 2,
                flexDirection: 'column',}}>
                {(roomContext.isThereAConnection())?(room !== undefined)? (
                    <>
                        <h1>Checkout Page</h1>
                        <RoomDetails room={room}/>
                        <CheckoutForm 
                            onValidSubmit={handleValidSubmit} 
                            availableDays={availableDays}/>
                    </>
                    ) : (
                        <div>
                            <h1>Room Not Found</h1>
                            <p>The room with ID {roomId} does not exist.</p>
                        </div>
                ):(
                    <ConnectionError />
                )}
            </Box>
        </>
    );
}
export default Checkout;