import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import Modal from './Modal';
import { useState } from 'react';
import { apiFetch } from '../features/Fetch';
import { User } from './UserCard';
import { useSnackbar } from 'notistack';

interface AddUserProps {
    setUsers: React.Dispatch<React.SetStateAction<User[]>>
}


export default ({setUsers}: AddUserProps) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [size, setSize] = useState(0);
    const [path, setPath] = useState("/");
    const [status, setStatus] = useState(4);

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const editUser = async () => {

        console.log({
            name: name,
            email: email,
            pass: pass,
            size: size,
            path: path,
            status: status
        } as User)
        
        const res = await apiFetch("/users", "POST", 
            {
                id: 0,
                name: name,
                email: email,
                pass: pass,
                size: size,
                path: path,
                status: status
            } as User
        )

        if (res.status < 300) {
            enqueueSnackbar(await res.text(), { variant: "success" });
            getUsers();
        }else{
            enqueueSnackbar(await res.text(), { variant: "error" });
        }
    }

    const getUsers = async () => {
        const res = await apiFetch("/users", "GET");

        if(res.status >= 300){
            enqueueSnackbar(await res.text(), { variant: "error" });
            return;
        }
        setUsers(await res.json())
    }

    return (
        
        <Modal buttonText='add User'>
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
                        label="Path" 
                        variant="standard" 
                        onChange={e => setPath(e.target.value)} 
                    />
                    <TextField 
                        required 
                        defaultValue={status} 
                        id="status" 
                        label="Status" 
                        variant="standard" 
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={e => parseInt(e.target.value) ? setStatus(parseInt(e.target.value)) : ""} 
                    />
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
            <Button sx={{float: "right", marginTop: "20px"}} variant="contained" onClick={editUser}>Submit</Button>
        </Modal>

    );
}