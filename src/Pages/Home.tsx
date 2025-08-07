import Grid from '@mui/material/Grid';
import RoomCard from '../components/RoomCard';
import { Room } from '../types/types';
import { useRoom } from '../context/RoomContext';
import { useEffect, useState } from 'react';
import HomeBar from '../components/HomeBar';
import { Box } from '@mui/material';
import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined';
import ConnectionError from '../components/ConnectionError'

function EmptyHome() {
    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2, 
            textAlign: 'center' }}>
            <SearchOffOutlinedIcon sx={{ fontSize: 100, color: 'grey.500' }} />
            <h1>No Rooms Found</h1>
            <p>It seems there are no rooms available for the selected date.</p>
            
        </Box>  
    );
}
function Home() {
    const roomContext  = useRoom();
    let [rooms, setRooms] = useState<Room[]>([]);
    let [searchDate, setSearchDate] = useState<string | null>(null);
    useEffect(() => {
        if(!roomContext.isThereAConnection()) return;
        if (roomContext.rooms) {
            let filteredRooms = roomContext.getAvailableRooms(searchDate)
            setRooms(filteredRooms);
        } else {
            roomContext.refreshRooms();
        }
    }, [roomContext, searchDate]);
    return (
        <>
            <HomeBar dateValue={searchDate} onDateChange={(newVal) => {setSearchDate(newVal)}}/>
            {(roomContext.isThereAConnection())?(rooms.length === 0)? (
                <EmptyHome/>
            ): (
                <Grid container spacing={{xs: 1, sm: 3, md: 6, lg: 8}} sx={{ paddingX: {xs: 3,sm: 4, md: 10 ,lg: 25},paddingY:5 , justifyContent: "center", }}>
                    {rooms.map((room: Room) => 
                        <Grid size={{ xs: 12, sm: 6, md: 5, lg: 4 }}>
                            <RoomCard room={room}/>
                        </Grid>
                    )}
                    
                </Grid>
            ):(
                <ConnectionError />
            )
            }
        </>
    );
}
export default Home;