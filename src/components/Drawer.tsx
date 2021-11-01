import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { drawer as drawerState } from '../features/Atoms';
import { useRecoilState } from 'recoil';
import FileTree from './FileTree';

const drawerWidth = 240;

interface DrawerProps extends React.HTMLProps<HTMLDivElement> {};

export default () => {

    const [drawer, setDrawer] = useRecoilState(drawerState);

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
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <FileTree />
                </Box>
            </MyDrawer>
        </>
    )
}