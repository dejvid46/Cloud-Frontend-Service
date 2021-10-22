import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';


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
                        <TextField fullWidth margin="normal" id="outlined-basic" label="Email" variant="outlined" />
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