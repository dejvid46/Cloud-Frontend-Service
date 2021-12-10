import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { drawer as drawerState, user as userState } from '../features/Atoms';
import { useRecoilState } from 'recoil';
import FileTree from './FileTree';
import { route } from './Link';

const drawerWidth = 240;

interface DrawerProps extends React.HTMLProps<HTMLDivElement> {};

export default () => {

    const [drawer, setDrawer] = useRecoilState(drawerState);

    const [user, setUser] = useRecoilState(userState);

    const MyDrawer = ({children}: DrawerProps) => (
        <>
            
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                {children}
            </Drawer>
            <Drawer
                open={drawer}
                onClose={() => setDrawer(!drawer)}
                sx={{
                    width: drawerWidth,
                    display: { xs: 'block', sm: 'none' },
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                {children}
            </Drawer>
        </>
    );

    return (
        <>
            <MyDrawer>
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {
                            (user.status === 1 || user.status === 2) &&
                                (<ListItem button key="user" onClick={() => route("/users")}>
                                    <ListItemIcon>
                                        <PeopleAltIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Users" />
                                </ListItem>)
                        }
                        <ListItem button key="neviiim">
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary={user.name} />
                        </ListItem>
                    </List>
                    <Divider />
                    <FileTree />
                </Box>
            </MyDrawer>
        </>
    )
}