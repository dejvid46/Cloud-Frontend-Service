
export const apiFetch = async (path: string, json: any) => {
    const startUrl = "localhost:8080";

    return await fetch(
        startUrl + path,
        {
            headers: new Headers({
                'Content-Type': 'application/json',
                'token': getCookie("token") || ""
            }),
            body: JSON.stringify(json)
        }
    );
}

export function getCookie(name: string) {
    //const value = `; ${document.cookie}`;
    const value = document.cookie;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? (parts.pop() || "").split(';').shift(): undefined;
}

export function addCookie(name: string, value: string) {
    document.cookie = document.cookie + `; ${name}=${value}`
}