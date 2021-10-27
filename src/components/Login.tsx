import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


export default () => {

    return (
        <>
            <Grid
                
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: "100vh" }}
            >
                <Paper>
                    <Container max-width="500px">
                        <Typography style={{margin: "20px"}} variant="h4">Login</Typography>
                        <TextField fullWidth margin="normal" id="outlined-basic" label="Email" type="email" variant="outlined" />
                        <br />
                        <TextField fullWidth margin="normal" id="outlined-basic" label="Password" type="password" variant="outlined" />
                        <br />
                        <Button color="primary" style={{margin: "20px"}} variant="contained">Contained</Button>
                    </Container>
                </Paper>
            </Grid>
        </>
    );
}