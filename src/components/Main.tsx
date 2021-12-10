import AppBar from "./AppBar";
import Box from '@mui/material/Box';
import Drawer from "./Drawer";
import CssBaseline from '@mui/material/CssBaseline';
import Body from "./Body";

export default () => {

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar />

            <Drawer />
            
            <Body />
            
        </Box>
    );
}