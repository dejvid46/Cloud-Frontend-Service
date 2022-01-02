
export const apiFetch = async (path: string, method: string, json?: any) => {

    const contentType = json ? "application/json" : "application/octet-stream";

    return await fetch(
        path,
        {
            method: method,
            headers: new Headers({
                'Content-Type': contentType,
                'token': getCookie("token") || ""
            }),
            body: JSON.stringify(json)
        }
    ); 
}

export function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? (parts.pop() || "").split(';').shift(): undefined;
}

export function setCookie(name: string, val: string) {
    const date = new Date();
    const value = val;

    date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));

    document.cookie = name+"="+value+"; expires="+date.toUTCString()+"; path=/";
}

export function deleteCookie(name: string) {
    const date = new Date();

    // Set it expire in -1 days
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

    document.cookie = name+"=; expires="+date.toUTCString()+"; path=/";
}