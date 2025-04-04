
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

export const apiFetchDownload = async (path: string, method: string, fileName: string) => {

    const res = fetch(
        path,
        {
            method: method,
            headers: new Headers({
                'token': getCookie("token") || ""
            })
        }
    )

    if((await res).status < 300){
        res.then(response => response.blob())
        .then(blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
        return "file downloaded";
    }else{ 
        return await (await res).text();
    }
}

export const apiFetchUpload = async (path: string, method: string, file: File) => {
    var formData = new FormData();
    formData.append("file", file);

    return await fetch(
        path,
        {
            method: method,
            headers: new Headers({
                'token': getCookie("token") || ""
            }),
            body: formData
        }
    )
}

export const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? (parts.pop() || "").split(';').shift(): undefined;
}

export const setCookie = (name: string, val: string) => {
    const date = new Date();
    const value = val;

    date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));

    document.cookie = name+"="+value+"; expires="+date.toUTCString()+"; path=/";
}

export const deleteCookie = (name: string) => {
    const date = new Date();

    // Set it expire in -1 days
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

    document.cookie = name+"=; expires="+date.toUTCString()+"; path=/";
}

export const bufferToBase64 = ( buffer: ArrayBuffer ) => {
    let binary = '';
    let bytes = new Uint8Array( buffer );
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}