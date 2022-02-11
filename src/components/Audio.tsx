import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import { bufferToBase64 } from '../features/Fetch';
import Loading from './Loading';
import { useState, useEffect } from 'react';
import { apiFetch } from '../features/Fetch';

interface TextProps {
    path: string
}

export default ({ path }: TextProps) => {

    let [data, setData] = useState<string | undefined>();

    const fetchAudio = async () => {
        const buffer = await (await 
            apiFetch(`/file${path}`, "GET")
        ).arrayBuffer()
        
        setData(bufferToBase64(buffer));
    }

    useEffect(() => {
        fetchAudio();
    }, [path]);

    return (
        <>
            {
                data ?
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
                :
                    <Loading />
            }   
        </>
    )
}