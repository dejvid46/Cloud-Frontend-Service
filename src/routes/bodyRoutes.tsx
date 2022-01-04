import { Route } from '../features/Router';
import Folder from '../components/Folder';
import Edit from '../components/Edit';
import File from '../components/File';
import UserStettings from '../components/UserStettings';
import { fileURL } from '../features/Router';


const routes: Array<Route> = [
    {
        name: "/showfolder",
        component: <Folder />
    },
    {
        name: "/showfile",
        component: <File />
    },
    {
        name: "/users",
        component: <UserStettings />
    },
    {
        name: "/edit",
        component: <Edit />
    }
];

export default routes;