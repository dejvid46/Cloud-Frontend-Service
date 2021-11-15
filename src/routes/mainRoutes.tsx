import { Route } from '../features/Router';
import Main from '../components/Main';
import Login from '../components/Login';


const routes: Array<Route> = [
    {
        name: "/",
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
    }
];

export default routes;