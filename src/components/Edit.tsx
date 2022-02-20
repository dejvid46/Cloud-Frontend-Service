import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { user as userState, folderPath as folderPathState } from '../features/Atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';
import { apiFetch } from '../features/Fetch';
import { useSnackbar } from 'notistack';
import { fileURL } from '../features/Router';

export default () => {

    const [user, setUser] = useRecoilState(userState);
    const path = useRecoilValue(folderPathState) || fileURL();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [pass, setPass] = useState(user.pass);

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const editMe = async () => {
        const res = await apiFetch("/user", "PATCH", 
            {
                name: name,
                email: email,
                pass: pass
            }
        )

        if (res.status < 300) {
            enqueueSnackbar(await res.text(), { variant: "success" });
            refreshMe();
        }else{
            enqueueSnackbar(await res.text(), { variant: "error" });
        }
    }

    const refreshMe = async () => {
        const res = await apiFetch("/user", "GET");

        if(res.status >= 300) return;

        setUser(await res.json());

    }
    
    useEffect(() => {
        if(Object.keys(user).length === 0) {
            refreshMe();
        }
    }, [path]);

    return (
        <>
            <Box sx={{
                maxWidth: "400px",
                margin: "0 auto",
                verticalAlign: "middle"
            }}>
                        <Box>
                            <TextField 
                                sx={{ margin: "10px" }}
                                required 
                                defaultValue={user.name} 
                                id="name" 
                                label="Name" 
                                variant="standard" 
                                size="medium"
                                onChange={e => setName(e.target.value)} 
                            />
                            <TextField 
                                sx={{ margin: "10px" }}
                                required 
                                defaultValue={user.email} 
                                id="email" 
                                label="Email" 
                                variant="standard"
                                size="medium" 
                                onChange={e => setEmail(e.target.value)} 
                            />
                            <TextField 
                                sx={{ margin: "10px" }}
                                required 
                                defaultValue={user.pass} 
                                id="pass" 
                                label="Password" 
                                variant="standard"
                                size="medium" 
                                onChange={e => setPass(e.target.value)} 
                            />
                        </Box>
                <Button color="primary" sx={{ marginTop: "20px" }} variant="contained" onClick={editMe}>Submit</Button>
            </Box>
        </>
    )
}