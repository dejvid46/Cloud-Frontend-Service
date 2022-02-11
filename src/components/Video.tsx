import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import { useEffect } from 'react';
import { apiFetch } from '../features/Fetch';

interface TextProps {
    path: string
}

export default ({ path }: TextProps ) => {

    const play = () => {

        let video = document.querySelector('#video') as any;

        apiFetch(`/file${path}`, "GET")
            .then(response => response.blob())
            .then(blob => { video.src = URL.createObjectURL(blob) });
    }
    
    useEffect(() => {
        play();
    }, [path]);

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <Paper>
                <script>
                    import MP4Source from "../codecs/mp4Codec";
                </script>
                <Box sx={{ margin: "20px"}}>
                    <video style={{ maxWidth: "100%", maxHeight: "500px" }} id="video" controls preload="auto"></video>
                </Box>
            </Paper>
        </Grid>
    )
}