import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import SearchBar from './SearchBar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { drawer as drawerState } from '../features/Atoms';
import { useRecoilState } from 'recoil';
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { route } from './Link';


export default () => {

    const [drawer, setDrawer] = useRecoilState(drawerState);

    const [menu, setMenu] = React.useState<null | HTMLElement>(null);
    const open = Boolean(menu);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenu(event.currentTarget);
    };
    const handleClose = () => {
        setMenu(null);
    };

    const logout = () => {
        window.location.href = "/login";
    }

    const editMe = () => {
        route("/edit");
        handleClose();
    }

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
                        onClick={() => setDrawer(!drawer)}
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
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <AccountCircleIcon />
                    </IconButton>
                    <Menu
                        id="user-menu"
                        anchorEl={menu}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={editMe}>Edit me</MenuItem>
                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </>
    )
}