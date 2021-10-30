import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import SearchBar from './SearchBar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default () => {
    return (
        <>
            <AppBar color="secondary" position="fixed" sx={{ flexGrow: 1, zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>

                    <IconButton
                        sx={{ display: { xs: 'block', sm: 'none' } }}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                
                    <Typography variant="h6" component="div" style={{margin: "10px"}} sx={{ display: { xs: 'none', sm: 'block' } }}>
                        yourCloud
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>
                        <FilterDramaIcon sx={{ fontSize: "30px", display: { xs: 'none', sm: 'block' } }} />
                    </Box>
                    <SearchBar />
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <AccountCircleIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </>
    )
}