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
const DetailsList = styled('ol')(({ theme }) => ({
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '200px',
    overflowY: 'auto',

}));
const DetailsListElement = styled('li')(({ theme }) => ({
    textAlign: 'center',
    marginBottom: '5px',
    display: 'flex',
    alignItems: 'center',
}));

function RoomDetails(params:RoomCardProps) {
    const { room } = params;

    return (
        <DetailsBox sx={{ padding: 2, maxWidth:{ xs: '95%', sm: '80%', lg: '70%' } }}>
            <h2>{room.name}</h2>
            <DetailElement>cost: {room.pricePerHour}$ per hour</DetailElement>
            <DetailElement>capacity: {room.capacity} peaple</DetailElement>
            <DetailElement>available days</DetailElement>
            <DetailsList>
                {Object.keys(room.availability).map((date) => room.availability[date] ? (
                    <DetailsListElement key={date}>
                        {date}
                    </DetailsListElement>
                ) : null)}
            </DetailsList>
        </DetailsBox>
    );
    
}
export default RoomDetails;