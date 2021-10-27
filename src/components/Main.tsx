import React, { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import Button from '@mui/material/Button';
import SearchBar from './SearchBar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default () => {

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar color="secondary" position="static">
                    <Toolbar>

                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                        >
                            <MenuIcon />
                        </IconButton>
                    
                        <Typography variant="h6" component="div" style={{margin: "10px"}}>
                            yourCloud
                        </Typography>
                        <FilterDramaIcon sx={{ fontSize: "30px", flexGrow: 1}} />
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
            </Box>
        </>
    );
}