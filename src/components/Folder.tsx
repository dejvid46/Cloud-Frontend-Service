import { useState, useEffect } from "react";
import FolderTable from './FolderTable';
import { tableData } from './FolderTable';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { fileURL } from '../features/Router';
import { apiFetch, setCookie } from '../features/Fetch';
import { useRecoilValue } from 'recoil';
import { folderPath as folderPathState } from '../features/Atoms';

export default () => {

    const [rows, setRows] = useState<tableData[]>([]);
    const [find, setFind] = useState(true);

    const folderPath = useRecoilValue(folderPathState) || fileURL();

    const getTableData = async () => {

        const res = await apiFetch(`/folder${folderPath === "" ? "/" : folderPath}`, "GET");

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
            setFind(true);
        }else{
            setFind(false);
            setRows([]);
            console.log(await res.text());
        }
    }

    useEffect(() => {
        if(fileURL() === folderPath){
            getTableData()
        }
    }, [folderPath]);

    const tableHeight = window.screen.height * 0.60;

    const rowsCount = Math.round(tableHeight / 51);

    return (
        <>
            <div id="tableDiv" style={{ height: `${tableHeight}px`, width: '100%' }}>
                
                {rows.length !== 0 ? 
                    <FolderTable table={rows}  rowsCount={rowsCount} setRows={setRows} /> 
                : find ?
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
                            <Typography variant="h6" align="center" component="div" style={{marginBottom: "2vh"}} >
                                Error 404
                            </Typography>
                            <Typography variant="overline" component="div" >
                                cant find folder
                            </Typography>
                        </Grid>
                    </Grid>
                </>
                }
            </div>
        </>
    );
}