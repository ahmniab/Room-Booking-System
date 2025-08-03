import { useParams, useNavigate } from 'react-router-dom';
import { Room, BookingDetails, CheckoutFormProps } from '../types/types';
import { useRoom } from '../context/RoomContext';
import { useBooking } from '../context/BookingContext';
import { useEffect, useState } from 'react';
import RoomDetails from '../components/RoomDetails';
import CheckoutForm from '../components/CheckoutForm';
import { Box } from '@mui/material';
import { getDatesInDuration } from '../utilities/Helper';



function Checkout() {
    const { roomId } = useParams<{ roomId: string }>();
    const roomContext = useRoom();
    const bookingContext = useBooking();
    const navigate = useNavigate();
    let [room, setRoom] = useState<Room | undefined>(undefined);
    useEffect(() => {
        if (roomId) {
            try {
                setRoom(roomContext.getRoomById(roomId));
                console.log(room);
            } catch (error) {
                setRoom(undefined);
                console.error(`Error fetching room: ${error}`);
            }
        }
    }, [roomId, roomContext]);

    const roomCanBeBooked = (date:string, duration:number) =>{
        if (room?.availability[date]) {
            getDatesInDuration(date, duration / 24)
            .forEach((d) => {
                if (room !== undefined && room.availability[d]) {
                    return false;
                }
            });
            return true;
        }
    }
    const handleValidSubmit = (data:BookingDetails) => {
        if (roomCanBeBooked(data.startDate, data.duration)) {
            data.totalCost = (room?.pricePerHour || 0) * data.duration;
            data.roomId = room?.id || '';
            bookingContext.setBookingDetails(data);
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
                        onValidSubmit={handleValidSubmit} />
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