import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { user as userState } from '../features/Atoms';
import { useRecoilState } from 'recoil';
import { useState } from 'react';

export default () => {

    const [user, setUser] = useRecoilState(userState);

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [pass, setPass] = useState(user.pass);
    const [size, setSize] = useState(user.size);
    const [path, setPath] = useState(user.path);
    const [status, setStatus] = useState(user.status);

    const valid = () => {
        console.log(name);
        console.log(email);
        console.log(pass);
        console.log(size);
        console.log(path);
        console.log(status);
    }

    return (
        <>
            <Box sx={{
                maxWidth: "400px",
                margin: "0 auto",
                verticalAlign: "middle"
            }}>
                <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField 
                                sx={{ margin: "10px" }}
                                required 
                                defaultValue={name} 
                                id="name" 
                                label="Name" 
                                variant="standard" 
                                size="medium"
                                onChange={e => setName(e.target.value)} 
                            />
                            <TextField 
                                sx={{ margin: "10px" }}
                                required 
                                defaultValue={email} 
                                id="email" 
                                label="Email" 
                                variant="standard"
                                size="medium" 
                                onChange={e => setEmail(e.target.value)} 
                            />
                            <TextField 
                                sx={{ margin: "10px" }}
                                required 
                                defaultValue={pass} 
                                id="pass" 
                                label="Password" 
                                variant="standard"
                                size="medium" 
                                onChange={e => setPass(e.target.value)} 
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                                sx={{ margin: "10px" }}
                                required 
                                defaultValue={path} 
                                id="path" 
                                label="Path" 
                                variant="standard"
                                size="medium" 
                                onChange={e => setPath(e.target.value)} 
                            />
                            <TextField 
                                sx={{ margin: "10px" }}
                                required 
                                defaultValue={status} 
                                id="status" 
                                label="Status" 
                                variant="standard" 
                                type="number"
                                size="medium"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={e => parseInt(e.target.value) ? setStatus(parseInt(e.target.value)) : ""} 
                            />
                            <TextField 
                                sx={{ margin: "10px" }}
                                required 
                                defaultValue={size} 
                                id="size" 
                                label="Size" 
                                variant="standard" 
                                type="number"
                                size="medium"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">Mb</InputAdornment>
                                }}
                                onChange={e => parseInt(e.target.value) ? setSize(parseInt(e.target.value)) : ""} 
                            />
                        </Grid>
                    </Grid>
                <Button sx={{float: "right", marginTop: "20px"}} variant="contained" onClick={valid}>Submit</Button>
            </Box>
        </>
    )
}