import { useParams, useNavigate } from 'react-router-dom';
import { Room, BookingDetails } from '../types/types';
import { useRoom } from '../context/RoomContext';
import { useBooking } from '../context/BookingContext';
import { useEffect, useState } from 'react';
import RoomDetails from '../components/RoomDetails';
import CheckoutForm from '../components/CheckoutForm';
import { Box } from '@mui/material';



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
                console.log(room);
            } catch (error) {
                setRoom(undefined);
                console.error(`Error fetching room: ${error}`);
            }finally {
                if (room) {
                    setAvailableDays(Object.keys(room.availability)
                        .map((date) => room?.availability[date] ? date : null)
                        .filter((date) => date !== null) as string[]);
                    console.log(availableDays);
                }
            }
        }
    }, [roomId, roomContext, room, availableDays]);

    const roomCanBeBooked = (date:string, duration:number) =>{
        if (room?.availability[date]) {
            return true;
        }
    }
    const handleValidSubmit = (data:BookingDetails) => {
        if (roomCanBeBooked(data.startDate, data.duration)) {
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
            {(room !== undefined)? (
                <>
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        padding: 2,
                        flexDirection: 'column',}}>
                        <h1>Checkout Page</h1>
                        <RoomDetails room={room}/>
                    <CheckoutForm 
                        onValidSubmit={handleValidSubmit} 
                        availableDays={availableDays}/>
                    </Box>
                </>
            ) : (
                <div>
                    <h1>Room Not Found</h1>
                    <p>The room with ID {roomId} does not exist.</p>
                </div>
            )}
        </>
    );
}
export default Checkout;