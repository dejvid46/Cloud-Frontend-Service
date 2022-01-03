import { useState, useEffect } from "react";
import FolderTable from './FolderTable';
import { tableData } from './FolderTable';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { fileURL } from '../features/Router';
import { apiFetch, setCookie } from '../features/Fetch';



export default () => {

    const [rows, setRows] = useState<tableData[]>([]);

    const getTableData = async () => {
        const res = await apiFetch(`/folder${fileURL()}`, "GET");

        if (res.status < 300) {

            const json = await res.json();
            setRows(json.map((row: any, index: number) => {
                return {
                    id: index,
                    name: row.name,
                    modified: row.date,
                    size: row.size
                } as tableData;
            }))

        }else{
            console.log(await res.text());
        }
    }

    useEffect(() => {
        window.addEventListener('popstate', function (event) {
            getTableData();
            console.log("jdgssdgjksdfsd")
        });
        (getTableData())
    }, []);

    const tableHeight = window.screen.height * 0.60;

    const rowsCount = Math.round(tableHeight / 51);

    return (
        <>
            <div id="tableDiv" style={{ height: `${tableHeight}px`, width: '100%' }}>
                
                {rows.length !== 0 ? 
                    <FolderTable table={rows} rowsCount={rowsCount} /> 
                    : 
                    <>
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            style={{ minHeight: '70vh' }}
                        >
                            <Grid item xs={3}>
                                <Typography variant="h6" component="div" style={{marginBottom: "5vh"}} >
                                    Folder is empty
                                </Typography>
                                <Button variant="contained">Upload files</Button>
                            </Grid>
                        </Grid>
                    </>
                }
            </div>
        </>
    );
}