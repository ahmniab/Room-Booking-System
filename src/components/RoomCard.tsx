import * as React from 'react';
import {Box, Card, CardActions, CardContent, Button, Typography, Chip} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import {RoomCardProps} from '../types/types';
import {canRoomBeBooked} from '../utilities/Helper';
import { useNavigate } from 'react-router-dom';

function RoomCard(props: RoomCardProps) {
    const {room} = props;
    const isAvailable = canRoomBeBooked(room); 
    const navigate = useNavigate();
    const handleBookNow = () => {
        if (isAvailable) {
            navigate(`/checkout/${room.id}`);
        }
    };
  return (
    <Box sx={{ minWidth: {md: 275} }}>
        <Card variant="outlined">
            <React.Fragment>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {room.name}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{room.pricePerHour}$ per hour</Typography>
                    <Typography variant="h3">
                        {room.capacity} <PeopleIcon/>
                    </Typography>
                    <Chip label={isAvailable ? "Available" : "Unavailable"}
                        color={isAvailable ? "success" : "error"}
                        sx={{ mt: 1 }}/>
                </CardContent>
                <CardActions>
                    <Button 
                    disabled={!isAvailable} 
                    size="small"
                    onClick={handleBookNow}>
                        Book Now
                    </Button>
                </CardActions>
            </React.Fragment>
        </Card>
    </Box>
  );
}
export default RoomCard;