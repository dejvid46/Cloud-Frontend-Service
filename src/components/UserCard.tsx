import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Modal from './Modal';
import { useState } from 'react';
import { apiFetch } from '../features/Fetch';
import { useSnackbar } from 'notistack';
import StatusSelector from './StatusSelector';

export interface User {
    id: number;
    name: string;
    email: string;
    pass: string;
    size: number;
    path: string;
    status: number;
}


interface UserCardProps {
    user: User, 
    key: number,
    editable: boolean,
    getUsers: () => Promise<void>
}


export default ({user, key, editable, getUsers}: UserCardProps) => {

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [pass, setPass] = useState(user.pass);
    const [size, setSize] = useState(user.size);
    const [path, setPath] = useState(user.path);
    const [status, setStatus] = useState(user.status);

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const addUser = async () => {
        const res = await apiFetch("/users/"+user.id, "PATCH", 
            {
                id: user.id,
                name: name,
                email: email,
                pass: pass,
                size: size,
                path: path,
                status: status
            }
        );

        if (res.status < 300) {
            enqueueSnackbar(await res.text(), { variant: "success" });
            getUsers();
        }else{
            enqueueSnackbar(await res.text(), { variant: "error" });
        }
    }

    const deleteUser = async () => {
        const res = await apiFetch("/users/"+user.id, "DELETE");

        if (res.status < 300) {
            enqueueSnackbar(await res.text(), { variant: "success" });
            getUsers();
        }else{
            enqueueSnackbar(await res.text(), { variant: "error" });
        }
    }

    return (
        <Card key={key} sx={{ minWidth: "220px", flex: "1", margin: "20px" }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {user.name}
                </Typography>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Typography variant="body2" color="text.secondary">
                        <Grid container spacing={2}>
                            <Grid  item xs={6}>
                                <ul>
                                    <li key="id">
                                        ID: {user.id}
                                    </li>
                                </ul>
                                <ul>
                                    <li key="email">
                                        Email: {user.email}
                                    </li>
                                </ul>
                                <ul>
                                    <li key="pass">
                                        Pass: ********
                                    </li>
                                </ul>
                            </Grid>
                            <Grid item xs={6}>
                                <ul>
                                    <li key="size">
                                        Size: {user.size}
                                    </li>
                                </ul>
                                <ul>
                                    <li key="path">
                                        Path: {user.path}
                                    </li>
                                </ul>
                                <ul>
                                    <li key="status">
                                        Status: 
                                        {user.status === 1 ?
                                            " Admin"
                                        :user.status === 2 ?
                                            " OP"
                                        :user.status === 3 ?
                                            " Can upload"
                                        : 
                                            " Can download"
                                        }
                                    </li>
                                </ul>
                            </Grid>
                        </ Grid>
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Modal editable={editable} buttonText='Edit'>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField 
                                required 
                                defaultValue={name} 
                                id="name" 
                                label="Name" 
                                variant="standard" 
                                onChange={e => setName(e.target.value)} 
                            />
                            <TextField 
                                required 
                                defaultValue={email} 
                                id="email" 
                                label="Email" 
                                variant="standard" 
                                onChange={e => setEmail(e.target.value)} 
                            />
                            <TextField 
                                defaultValue={pass} 
                                id="pass" 
                                label="Password" 
                                variant="standard" 
                                onChange={e => setPass(e.target.value)} 
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                                required 
                                defaultValue={path} 
                                id="path" 
                                label="Path to root existing folder" 
                                variant="standard" 
                                onChange={e => setPath(e.target.value)} 
                            />
                            <StatusSelector status={status} setStatus={setStatus} />
                            <TextField 
                                required 
                                defaultValue={size} 
                                id="size" 
                                label="Size" 
                                variant="standard" 
                                type="number"
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
                    <Button sx={{float: "right", marginTop: "20px"}} onClick={addUser}>Submit</Button>
                </Modal>
                <Button onClick={deleteUser} disabled={editable} size="small">Delete</Button>
            </CardActions>
        </Card>

    );
}