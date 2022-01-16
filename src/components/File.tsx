import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { getCookie } from '../features/Fetch';
import { fileURL } from '../features/Router';
import { useRecoilValue } from 'recoil';
import { folderPath as folderPathState } from '../features/Atoms';
import { apiFetch } from '../features/Fetch';

function _arrayBufferToBase64( buffer: ArrayBuffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}


export default () => {

    const folderPath = useRecoilValue(folderPathState) || fileURL();
    let [data, setData] = useState("")

    const getData = async () => {
        (await 
            apiFetch(`/file${folderPath}`, "GET")
        ).arrayBuffer()
        .then((buffer) => {
            setData(_arrayBufferToBase64(buffer));
        });
    }

    useEffect(() => {
        if((fileURL() === folderPath) && (folderPath.endsWith(".png") || folderPath.endsWith(".jpg") || folderPath.endsWith(".gif"))){
            getData();
        }
    }, [folderPath]);

    const Image = () => {
        return (
            <>
                <Box sx={{
                    margin: "auto"
                }}>
                    <img src={"data: image/png;base64,"+data} alt="photo" />
                </Box>
            </>
        )
    }

    const Text = () => {
        return (
            <>
                <Box sx={{
                    margin: "auto"
                }}>
                    {folderPath}
                </Box>
            </>
        )
    }

    return (
        <>
            {
                (
                    folderPath.endsWith(".jpg") ? 
                        <Image />
                    : folderPath.endsWith(".png") ? 
                        <Image />
                    : folderPath.endsWith(".gif") ?
                        <Image />
                    :
                        <Text />
                    
                )
            }
        </>
    )
}