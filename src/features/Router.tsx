import React, { useState } from 'react';

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
            {routes.find(({name, component}) => name === url)?.component || "error 404"}
        </>
    );
}