import React, { useState } from 'react';
import Err404 from '../components/Err404';
import Login from '../components/Login';
import { useRecoilState } from 'recoil';
import { folderPath as folderPathState } from '../features/Atoms';
import { getCookie } from '../features/Fetch';

export interface RouterProps {
    routes: Array<Route>
}

export interface Route {
    name: string,
    component: React.ReactNode
}

export default ({routes}: RouterProps) => {

    let [url, setUrl] = useState(window.location.pathname);
    const [folderPath, setFolderPath] = useRecoilState(folderPathState);

    window.onpopstate = () => {
        setFolderPath(fileURL());
        setUrl(window.location.pathname);
    };

    document.title = fileURL().split("/").pop() || "yourCloud";

    return (
        <>
            {
                getCookie("token")
                ?
                routes.find(({name, component}) => name === "/"+url.split("/")[1])?.component || <Err404 />
                :
                <Login />
            }
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