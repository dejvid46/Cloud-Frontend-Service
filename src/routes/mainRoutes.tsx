import { Route } from '../features/Router';
import Main from '../components/Main';
import Login from '../components/Login';


const routes: Array<Route> = [
    {
        name: "/",
        component: <Login />
    },
    {
        name: "/showfolder",
        component: <Main />
    },
    {
        name: "/showfile",
        component: <Main />
    },
    {
        name: "/users",
        component: <Main />
    },
    {
        name: "/folder",
        component: <Main />
    },
    {
        name: "/login",
        component: <Login />
    },
    {
        name: "/edit",
        component: <Main />
    }
];

export default routes;