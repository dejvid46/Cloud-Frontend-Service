import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Loading from './Loading';
import hljs from 'highlight.js';
import { useState, useEffect } from 'react';
import { apiFetch } from '../features/Fetch';

import "highlight.js/styles/agate.css";

interface TextProps {
    path: String
}

export default ({ path }: TextProps) => {

    let [data, setData] = useState<string | undefined>();

    const fetchText = async () => {
        (await 
            apiFetch(`/file${path}`, "GET")
        ).text()
        .then((text) => {
            setData(hljs.highlight(text, {language: path.split(".").pop() || ""}).value);
        });
    }

    useEffect(() => {
        fetchText();
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
                                <pre>
                                    <code className='hljs' dangerouslySetInnerHTML={{ __html: data}} />
                                </pre>
                            </Box>
                        </Paper>
                    </Grid>
                :
                    <Loading />
            }   
        </>
    )
}