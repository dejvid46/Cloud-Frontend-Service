import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Modal from './Modal';
import { useState } from 'react';

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
    key: number
}


export default ({user, key}: UserCardProps) => {

    const [email, setEmail] = useState(user.email);
    const [pass, setPass] = useState(user.pass);
    const [size, setSize] = useState(user.size);
    const [path, setPath] = useState(user.path);
    const [status, setStatus] = useState(user.status);

    const valid = () => {
        console.log(email);
        console.log(pass);
        console.log(size);
        console.log(path);
        console.log(status);

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
                                        Status: {user.status}
                                    </li>
                                </ul>
                            </Grid>
                        </ Grid>
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Modal buttonText='Edit'>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField required defaultValue={email} id="email" label="Email" variant="standard" />
                            <TextField required defaultValue={pass} id="pass" label="Password" variant="standard" />
                            <TextField required defaultValue={size} id="size" label="Size" variant="standard" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField required defaultValue={path} id="path" label="Path" variant="standard" />
                            <TextField required defaultValue={status} id="status" label="Status" variant="standard" />
                            <Button variant="contained" onClick={valid}></Button>
                        </Grid>
                    </Grid>
                </Modal>
                <Button size="small">Delete</Button>
            </CardActions>
        </Card>

    );
}