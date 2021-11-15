import { Route } from '../features/Router';
import Folder from '../components/Folder';
import UserStettings from '../components/UserStettings';


const routes: Array<Route> = [
    {
        name: "/",
        component: <Folder />
    },
    {
        name: "/users",
        component: <UserStettings />
    }
];

export default routes;