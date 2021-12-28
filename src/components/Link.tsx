import React from "react";

interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
    children: React.ReactNode,
    link: string
}

export default ({children, link, ...rest}: LinkProps) => {


    const aStyle = {
        textDecoration: "none",
        color: "inherit",

        "&:hover": {
            textDecoration: "none",
            color: "inherit",
        },
        "&:focus": {
            textDecoration: "none",
            color: "inherit",
        },
        "&:active": {
            textDecoration: "none",
            color: "inherit",
        },
      };

    return (
        <a {...rest} href={link} style={aStyle} onClick={(e) => {
            e.preventDefault();
            window.history.pushState({}, "", link);
            window.dispatchEvent(new Event("popstate"));
        }}>{children}</a>
    );
}