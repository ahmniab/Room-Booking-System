import { Router } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { useRoom } from '../context/RoomContext';

function ConnectionError(){
    const roomContext = useRoom();
    return (
        <>
            <Box
                sx={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center',
                    alignItems: 'center'
                    }}>
                <Router sx={{ fontSize: 100, color: 'grey.500' }}/>
                <h2>Connection Error</h2>
                <Button 
                    size="small"
                    onClick={() => { roomContext.refreshRooms()}}>
                    retry to connect
                </Button>
            </Box>
        </>
    );
}

export default ConnectionError;