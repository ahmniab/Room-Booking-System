import { Box, styled, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useRoom } from '../context/RoomContext';
import { useBooking } from '../context/BookingContext';
import { useEffect, useState } from 'react';
import { Room } from '../types/types';
import { useNavigate } from 'react-router-dom';
import { convertTo12HourFormat } from '../utilities/Helper';
import ConnectionError from '../components/ConnectionError';

const ConfirmationContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4),
}));

function Confirmation() {
    const roomContext = useRoom();
    const bookingContext = useBooking();
    const bookingDetails = bookingContext.bookingDetails;
    const navigate = useNavigate();

    let [roomInfo, setRoom] = useState<Room | undefined>(undefined);

    useEffect(() => {
        if (roomContext.isThereAConnection() && bookingDetails?.roomId) {
            setRoom(roomContext.getRoomById(bookingDetails.roomId));
        }
    }, [bookingDetails, roomContext]);
    
    if (!bookingDetails) {
        return <div>No booking details available.</div>;
    }

    
    return (
        <>
            {(roomContext.isThereAConnection())?(
                
                <ConfirmationContainer>
                <CheckIcon color="success" fontSize="large" />
                <h1>Booking Confirmed!</h1>
                <p>Thank you for your booking, {bookingDetails.name}!</p>
                <p>Room: {roomInfo?.name}</p>
                <p>Date {bookingDetails.startDate}, Time {convertTo12HourFormat(bookingDetails.startTime as string)}</p>
                <p>Duration: {bookingDetails.duration} hours</p>
                <p>Total Cost: ${bookingDetails.totalCost.toFixed(2)}</p>
                <Button 
                onClick={() => {navigate('/');}}
                >
                Back to Home
                </Button>
                </ConfirmationContainer>
            ):(
                <ConnectionError />
            )};
        </>
    );
}
export default Confirmation;