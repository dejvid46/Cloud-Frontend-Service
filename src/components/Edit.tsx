import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
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
            <Grid container spacing={2}>
                <Grid item xs={6}>
                <TextField required defaultValue={user.name} id="name" label="Name" variant="standard" onChange={e => setName(e.target.value)} />
                    <TextField required defaultValue={user.email} id="email" label="Email" variant="standard" onChange={e => setEmail(e.target.value)} />
                    <TextField required defaultValue={user.pass} id="pass" label="Password" variant="standard" onChange={e => setPass(e.target.value)} />
                </Grid>
                <Grid item xs={6}>
                    <TextField required defaultValue={user.path} id="path" label="Path" variant="standard" onChange={e => setPath(e.target.value)} />
                    <TextField required defaultValue={user.status} id="status" label="Status" variant="standard" onChange={e => parseInt(e.target.value) ? setStatus(parseInt(e.target.value)) : ""} />
                    <TextField required defaultValue={user.size} id="size" label="Size" variant="standard" onChange={e => parseInt(e.target.value) ? setSize(parseInt(e.target.value)) : ""} />
                </Grid>
            </Grid>
            <Button sx={{float: "right", marginTop: "20px"}} variant="contained" onClick={valid}>Submit</Button>
        </>
    )
}