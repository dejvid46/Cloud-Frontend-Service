import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import { useState, useEffect } from 'react';
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
    let [data, setData] = useState<string | undefined>()

    const fetchImg = async () => {
        (await 
            apiFetch(`/file${folderPath}`, "GET")
        ).arrayBuffer()
        .then((buffer) => {
            setData(_arrayBufferToBase64(buffer));
        });
    }

    const fetchText = async () => {
        (await 
            apiFetch(`/file${folderPath}`, "GET")
        ).text()
        .then((text) => {
            setData(text);
        });
    }

    useEffect(() => {
        setData(undefined);
        if(fileURL() === folderPath) {
            if(
                folderPath.endsWith(".png") || 
                folderPath.endsWith(".jpg") || 
                folderPath.endsWith(".gif") || 
                folderPath.endsWith(".mp3")
            ){
                fetchImg();
            }
            if(
                folderPath.endsWith(".txt")  
            ){
                fetchText();
            }
        }
    }, [folderPath]);

    const Image = () => {
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Paper>
                    <Box sx={{ margin: "20px"}}>
                        <img style={{ maxWidth: "100%", maxHeight: "500px" }} src={"data: image/png;base64,"+data} alt="photo" />
                    </Box>
                </Paper>
            </Grid>
        )
    }

    const Text = () => {
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Paper>
                    <Box sx={{ margin: "20px"}}>
                        <pre style={{ width: "100%", overflow: "auto"}}>
                            {
                                data
                            }
                        </pre>
                    </Box>
                </Paper>
            </Grid>
        )
    }

    const MP3 = () => {
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Paper>
                    <Box sx={{ margin: "20px"}}>
                        <audio controls={true} autoPlay >
                            <source src={`data:audio/wav;base64,${data}`} />
                        </audio>
                    </Box>
                </Paper>
            </Grid>
        )
    }

    return (
        <>
            {
                data ? 
                    (
                        folderPath.endsWith(".jpg") ? 
                            <Image />
                        : folderPath.endsWith(".png") ? 
                            <Image />
                        : folderPath.endsWith(".gif") ?
                            <Image />
                        : folderPath.endsWith(".mp3") ?
                            <MP3 />
                        :
                            <Text />
                        
                    )
                :
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: "60vh" }}
                >
                    <CircularProgress/>
                </Grid>
            }
        </>
    )
}