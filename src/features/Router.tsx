import React, { useState } from 'react';

interface RouterProps {
    routes: Array<Route>
}

interface Route {
    name: string,
    component: React.ReactNode
}

export default ({routes}: RouterProps) => {

    let [url, setUrl] = useState(window.location.pathname);

    window.onpopstate = () => setUrl(window.location.pathname);

    return (
        <>
            {routes.find(({name, component}) => name === url)?.component || "error 404"}
        </>
    );
}