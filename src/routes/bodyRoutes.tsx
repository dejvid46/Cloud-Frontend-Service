import { Route } from '../features/Router';
import Folder from '../components/Folder';
import Edit from '../components/Edit';
import UserStettings from '../components/UserStettings';


const routes: Array<Route> = [
    {
        name: "/",
        component: <Folder />
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