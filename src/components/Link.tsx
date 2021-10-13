import React from "react";

interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
    children: React.ReactNode,
    link: string
}

export default ({children, link, ...rest}: LinkProps) => {


    return (
        <a {...rest} href={link} onClick={(e) => {
            e.preventDefault();
            window.history.pushState({}, "", link);
            window.dispatchEvent(new Event("popstate"));
        }}>{children}</a>
    );
}