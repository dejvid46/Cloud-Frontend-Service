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

    const fetchImg = async () => {
        const buffer = await (await 
            apiFetch(`/file${path}`, "GET")
        ).arrayBuffer()
        
        setData(bufferToBase64(buffer));
    }

    useEffect(() => {
        fetchImg();
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
                                <img style={{ maxWidth: "100%", maxHeight: "500px" }} src={"data: image/png;base64,"+data} alt="photo" />
                            </Box>
                        </Paper>
                </Grid>
                :
                    <Loading />
            }   
        </>
    )
}