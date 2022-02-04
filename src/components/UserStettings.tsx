import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { useRecoilValue } from 'recoil';
import { user as userState } from '../features/Atoms';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';

import UserCard from './UserCard';
import { User } from './UserCard';
import AddUser from './AddUser';
import { apiFetch } from '../features/Fetch';

export default () => {

    const [users, setUsers] = useState([] as User[]);
    const me = useRecoilValue(userState);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const res = await apiFetch("/users", "GET");

        if(res.status >= 300){
            enqueueSnackbar(await res.text(), { variant: "error" });
            return;
        }
        setUsers(await res.json())
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container sx={{ flexWrap: "wrap", display: "flex" }}>
                    {users.map((user, index) => (
                        <UserCard user={user} key={index} setUsers={setUsers} editable={user.status === 1 || user.id === me.id}/>
                    ))}
                </Grid>
            </Box>
            <AddUser setUsers={setUsers}/>
        </>
    );
}