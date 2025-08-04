import { RoomCardProps } from '../types/types';
import { Box } from '@mui/material';

import styled from '@emotion/styled';

const DetailsBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    border: `1px solid #fff`,
    borderRadius: '10px',
    marginX: '50px'
}));
const DetailElement = styled('p')(({ theme }) => ({
    margin: 0,
    padding: '1px',
    textTransform: 'capitalize',

}));


function RoomDetails(params:RoomCardProps) {
    const { room } = params;

    return (
        <DetailsBox sx={{ padding: 2, maxWidth:{ xs: '95%', sm: '80%', lg: '70%' } }}>
            <h2>{room.name}</h2>
            <DetailElement>cost: {room.pricePerHour}$ per hour</DetailElement>
            <DetailElement>capacity: {room.capacity} peaple</DetailElement>
        </DetailsBox>
    );
    
}
export default RoomDetails;