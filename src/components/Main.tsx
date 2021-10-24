import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


export default () => {

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar color="secondary" position="static">
                    <Toolbar>

                    <IconButton
                        size="medium"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                        <Typography variant="h6" component="div">
                            News
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}