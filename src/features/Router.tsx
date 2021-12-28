import React, { useState } from 'react';
import Err404 from '../components/Err404';

export interface RouterProps {
    routes: Array<Route>
}

export interface Route {
    name: string,
    component: React.ReactNode
}

export default ({routes}: RouterProps) => {

    let [url, setUrl] = useState("/"+window.location.pathname.split("/")[1]);

    window.onpopstate = () => setUrl("/"+window.location.pathname.split("/")[1]);

    return (
        <>
            {routes.find(({name, component}) => name === url)?.component || <Err404 />}
        </>
    );
}

export const fileURL = () => {
    let url = window.location.pathname.split("/");
    url.shift();
    url[0] = "";

    return (url.length !== 0 ? url : [""]).join("/");
}

export const route = (link: string) => {
    window.history.pushState({}, "", "/"+link);
    window.dispatchEvent(new Event("popstate"));
}