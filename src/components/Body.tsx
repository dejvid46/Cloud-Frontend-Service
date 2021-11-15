import Box from '@mui/material/Box';
import { ImportantDevices } from 'material-ui-icons';
import routes from '../routes/bodyRoutes';
import Router from '../features/Router';

export default () => {
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3, paddingTop: '80px' }}>
            <Router routes={routes} />
        </Box>
    );
}