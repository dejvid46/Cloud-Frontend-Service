import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';


export default () => {

    return (
        <>
            <Box>
                <Toolbar>
                    <AppBar color="secondary">
                        <Typography variant="h6">
                            News
                        </Typography>
                    </AppBar>
                </Toolbar>
            </Box>
        </>
    );
}