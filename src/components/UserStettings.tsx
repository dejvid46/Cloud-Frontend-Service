import Toolbar from '@mui/material/Toolbar';
import Link from './Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import UserCard from './UserCard';
import { User } from './UserCard';
import { useRecoilState } from 'recoil';
import { users as usersState } from '../features/Atoms';

const users2: User[] = [
    {
        id: 0,
        name: "aaaaaaaaaaaaaaaa",
        email: "pipik",
        pass: "gd",
        size: 32432,
        path: "/",
        status: 1,
    },
    {
        id: 1,
        name: "ofnkdfkldfsp",
        email: "jhdsfhfs",
        pass: "gd",
        size: 32432,
        path: "/",
        status: 2,
    },
    {
        id: 2,
        name: "ofnkdfkldfsp",
        email: "jhdsfhfs",
        pass: "gd",
        size: 32432,
        path: "/",
        status: 2,
    },
    {
        id: 3,
        name: "ofnkdfkldfsp",
        email: "jhdsfhfs",
        pass: "gd",
        size: 32432,
        path: "/",
        status: 2,
    }
];

export default () => {

    const [users, setUsers] = useRecoilState(usersState);

    setUsers(users2);

    return (
        <>
            
            Folder
            <Link link="/showfolder">Link to folder</Link>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container sx={{ flexWrap: "wrap", display: "flex" }}>
                    {users.map((user, index) => (
                        <UserCard user={user} key={index}/>
                    ))}
                </Grid>
            </Box>
        </>
    );
}