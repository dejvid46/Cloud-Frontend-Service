import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { apiFetch, setCookie } from '../features/Fetch';
import { route } from '../features/Router';


export default () => {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const valid = async () => {

        const res = await apiFetch("/login", "POST", 
            {
                email: email,
                pass: pass
            }
        )

        if (res.status < 300) {
            setCookie("token", (await res.json()).token || "");
            route("showfolder")
        }else{
            console.log(await res.text());
        }

    }

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
                    <Container max-width="600px">
                        <Typography style={{margin: "20px"}} variant="h4">Login</Typography>
                        <TextField 
                            fullWidth 
                            margin="normal" 
                            id="outlined-basic" 
                            label="Email" 
                            type="email" 
                            variant="outlined" 
                            onChange={e => setEmail(e.target.value)} 
                        />
                        <br />
                        <TextField 
                            fullWidth 
                            margin="normal" 
                            id="outlined-basic" 
                            label="Password" 
                            type="password" 
                            variant="outlined" 
                            onChange={e => setPass(e.target.value)} 
                        />
                        <br />
                        <Button color="primary" style={{margin: "20px"}} variant="contained" onClick={valid}>Submit</Button>
                    </Container>
                </Paper>
            </Grid>
        </>
    );
}