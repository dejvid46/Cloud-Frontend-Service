import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useState, useEffect } from 'react';
import { apiFetch, apiFetchDownload } from '../features/Fetch';
import { useSnackbar } from 'notistack';

interface TextProps {
    path: String
}

export default ({ path }: TextProps) => {

    const [exist, setExist] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const download = async () => {
        let newPath = path.split("/");
        let file = newPath.pop() || "";
        apiFetchDownload(`/file${path}`, "GET", file);
    }

    const existing = async () => {
        const res = await apiFetch(`/file${path}`, "GET");

        if (res.status < 300) {
            setExist(true);
        }
    }

    useEffect(() => {
        existing();
    }, [path]);

    return (
        <>
            {
                exist ?
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        style={{ minHeight: '70vh' }}
                    >
                        <Box sx={{display: "flex", flexDirection: "column", textAlign: "center" }}>
                            <Typography variant="h6" component="div" style={{marginBottom: "5vh"}} >
                                Cant show file
                            </Typography>
                            <Button sx={{ margin: "5px" }} onClick={download} variant="contained">Download</Button>
                        </Box>
                    </Grid>
                :
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        style={{ minHeight: '70vh' }}
                    >
                        <Grid item xs={3}>
                            <Typography variant="h6" align="center" component="div" style={{marginBottom: "2vh"}} >
                                Error 404
                            </Typography>
                            <Typography variant="overline" component="div" >
                                cant find file
                            </Typography>
                        </Grid>
                    </Grid>
                
            }   
        </>
    )
}